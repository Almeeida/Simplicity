const { MessageEmbed } = require('discord.js')
const { Loggers } = require('../')
const wait = require('util').promisify(setTimeout)
module.exports = function Ready () {
  Loggers.log(['CLIENT', 'READY'], `Logged on ${this.guilds.size} guilds and ${this.users.size} users`)
  this.user.setActivity(`@${this.user.username} help | ${this.users.size} users | ${this.guilds.size} guilds`, { type: 'WATCHING' })

  const embed = new MessageEmbed()
    .setTitle('**Bot has started**')
    .setDescription(`Logged on **${this.guilds.size} guilds**, **${this.users.size} users** at: \`${require('moment')().format('LLLL')}\``)
    .setTimestamp()
    .setColor('GREEN')
    .setFooter(this.user.username, this.user.displayAvatarURL())

  if (process.env.CHANNEL_LOG_START && this.channels.has(process.env.CHANNEL_LOG_START)) {
    this.channels.get(process.env.CHANNEL_LOG_START).send(embed)
  }
  wait(1000)
  const invites = {}
  this.guilds.forEach(g => {
    if (g.me.hasPermission('MANAGE_GUILD')) {
      g.fetchInvites()
        .then(guildInvites => {
          invites[g.id] = guildInvites
        })
    }
  })
}