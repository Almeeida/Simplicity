const { Command, CommandError, SimplicityEmbed } = require('../..')

class Language extends Command {
  constructor (client) {
    super(client)
    this.name = 'language'
    this.aliases = [ 'lang', 'l', 'botlanguage' ]
    this.category = 'bot'
    this.requirements = {
      argsRequired: true,
      permissions: [ 'MANAGE_GUILD' ] }
  }

  async run ({ author, client, guild, language, query, send, t }) {
    const languages = Object.keys(client.i18next.store.data)
    const lang = languages.find(i => i.toLowerCase() === query.toLowerCase())
    if (!lang) throw new CommandError('commands:language.invalidLang', { botLanguages: languages.map(i => `\`${i}\``).join(', ') })

    if (language === lang) throw new CommandError('commands:language.alreadySet', { lang })

    const data = await client.database.guilds.edit(guild.id, { lang }).catch(() => null)
    if (!data) throw new CommandError('commands:language.failed')

    const embed = new SimplicityEmbed({ author, t })
      .setTitle('commands:language.done')
      .setDescription('commands:language.success', { lang })
    await send(embed)
  }
}

module.exports = Language