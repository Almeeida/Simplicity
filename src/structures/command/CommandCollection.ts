import { Collection } from 'discord.js';
import Command from './Command';

export default class CommandCollection extends Collection<string, Command> {
  aliases: Collection<string, string>;

  constructor() {
    super();
    this.aliases = new Collection();
  }

  get(str: string): Command | undefined {
    return super.get(String(this.aliases.get(str.toLowerCase())));
  }

  register(command: Command): void {
    super.set(command.name, command);
    this.aliases.set(command.name, command.name);
    for (let alias of command.aliases) {
      const conflict = this.aliases.get(alias.toLowerCase());
      if (conflict) {
        throw new Error(`Alias '${alias}' of '${command.name}' already exists on '${conflict}'`);
      }
      alias = alias.toLowerCase();
      this.aliases.set(alias, command.name);
    }
  }
}
