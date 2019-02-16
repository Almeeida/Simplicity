const { Command } = require('../../')
const { MessageEmbed } = require('discord.js')
const { exec } = require('child_process')

class Exec extends Command {
  constructor (client) {
    super(client)
    this.aliases = ['execute', 'run', 'npm']
    this.category = 'dev'
    this.requirements = { argsRequired: true, ownerOnly: true }
  }

  run ({ send, query }) {
    exec(query, (error, stdout) => {
      const embed = new MessageEmbed()
      if (error) {
        embed.setDescription(error)
        return send(embed, { error: true })
      } else {
        embed.setDescription(stdout)
        return send(embed)
      }
    })
  }
}

module.exports = Exec
