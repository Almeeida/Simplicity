const { MessageEmbed } = require('discord.js')
const { inspect } = require('util')
const { Command, Loggers } = require('../../')

class Eval extends Command {
  constructor (client) {
    super(client)
    this.aliases = ['compile']
    this.category = 'dev'
    this.requirements = { ownerOnly: true, argsRequired: true }
  }
  run ({ author, guild, channel, message, query, send, t, emoji }) {
    let code = query.replace(/^```(js|javascript ?\n)?|```$/g, '')
    let value = (l, c) => `\`\`\`${l}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``.replace(process.env.BOT_TOKEN, () => '*'.repeat(process.env.BOT_TOKEN.length))
    let embed = new MessageEmbed()
    try {
      // eslint-disable-next-line no-eval
      let resultEval = eval(code)
      let toEval = typeof resultEval === 'string' ? resultEval : inspect(resultEval, { depth: 1 })
      embed.addField('Result', value('js', toEval))
      embed.addField('Type', value('css', typeof resultEval))
      Loggers.warn(['COMMAND', 'EVAL', 'RESULT'], toEval)
    } catch (error) {
      embed.addField('Error', value('js', error))
      Loggers.error(['COMMAND', 'EVAL', 'RESULT', 'ERROR'], error)
    } finally {
      send(embed)
    };
  }
}
module.exports = Eval