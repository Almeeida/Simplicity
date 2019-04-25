const { Command, SimplicityEmbed, Utils } = require('../../')
const { exec } = require('child_process')
const { cleanString } = Utils

class Exec extends Command {
  constructor (client) {
    super(client)
    this.aliases = [ 'execute', 'run' ]
    this.category = 'dev'
    this.requirements = {
      argsRequired: true,
      ownerOnly: true }
  }

  run ({ author, emoji, query, send, t }) {
    const embed = new SimplicityEmbed({ author, emoji, t }, { autoAuthor: false })

    exec(query, (error, stdout) => {
      if (error) {
        embed
          .setTitle('common:general')
          .setDescription(cleanString(error))
          .setError()
        return send(embed)
      } else {
        embed
          .setTitle('» $$commands:exec.result')
          .setDescription(cleanString(stdout))
        return send(embed)
      }
    })
  }
}

module.exports = Exec
