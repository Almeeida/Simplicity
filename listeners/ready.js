module.exports = function Ready() {
    console.log(`Logged on ${this.guilds.size} guilds with ${this.users.size} users`);
    this.user.setActivity(`and thinking`, { type: 'WATCHING' })
};