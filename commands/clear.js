const Command = require('../structures/Command')

class Clear extends Command {
  constructor (name, client) {
    super(name, client)
    this.aliases = ['purge', 'prune', 'clean']
    this.description = 'This command clears messages from the chat.'
    this.usage = `Usage: **${process.env.PREFIX}clear [amount]**`
    this.category = 'Moderation'
    this.argsRequired = true
    this.permissions = ['MANAGE_MESSAGES']
    this.clientPermissions = ['MANAGE_MESSAGES']
  }
  run (message, [amount]) {
    let total = parseInt(amount, 10)
    if (!total || total <= 2 || total >= 100) {
      return message.reply('Por favor, indique entre 2 a 100 mensagens!')
    };
    const res = message.channel.fetchMessages({ limit: total }) // falta await aqui porem nsei onde coloco o async :ThinkPepe:
    message.channel.bulkDelete(res)
      // eslint-disable-next-line handle-callback-err
      .catch(error => {
        return message.reply('An error has ocurred while trying to delete the messages.')
      })
    message.channel.send(`${res.size} messages have been deleted by ${message.author}. `)
      .then(m => m.delete(15000))
      .catch(err => console.log(err))
  }
}

module.exports = Clear
