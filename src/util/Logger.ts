/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */

import moment from 'moment';
import { Message } from 'discord.js';

moment.locale('pt-br');

enum Colors {
  FgBlue = '\x1b[34m',
  FgCyan = '\x1b[36m',
  FgGreen = '\x1b[32m',
  FgMagenta = '\x1b[35m',
  FgRed = '\x1b[31m',
  FgWhite = '\x1b[37m',
  FgYellow = '\x1b[33m',
}

const resetColor = '\x1b[0m';

const setColor = (color: Colors, message: string) => `${color + message + resetColor}`;

/**
 * Contains various logger utility methods
 */
export default class Logger {
  /**
   * Gets the current timestamp
   * @returns The current timestamp formatted
   */
  static get timestamp(): string {
    return setColor(Colors.FgMagenta, moment().format('DD/MM/YYYY HH:mm:ss'));
  }

  /**
   * Logs to console
   * @param color The color of the log
   * @param message The message to log
   * @param type The type of log
   */
  static createLog(
    consoleFn: (...args: any) => void,
    color: Colors,
    message: any,
    optionalParams: any[] = [],
  ): void {
    return consoleFn(`${Logger.timestamp} ${setColor(color, message)}`, ...optionalParams);
  }

  /**
   * Logs normally
   * @param message The message to log
   */
  static log(message: any, ...optionalParams: any[]): void {
    return Logger.createLog(console.log, Colors.FgGreen, message, optionalParams);
  }

  /**
   * Logs an error
   * @param message The message to log
   */
  static error(message: any, ...optionalParams: any[]): void {
    return Logger.createLog(console.error, Colors.FgRed, message, optionalParams);
  }

  /**
   * Logs a warn
   * @param message The message to log
   */
  static warn(message: any, ...optionalParams: any[]): void {
    return Logger.createLog(console.warn, Colors.FgYellow, message, optionalParams);
  }

  /**
   * Logs a command.
   * @param {Object} object Object with multiple required properties
   * @param {User} object.author The author of the command.
   * @param {messageBasedChannel} object.channel The channel where the command was used.
   * @param {string} object.content The content of the command message.
   * @param {Guild} object.guild The guild where the command was used.
   * @returns {void}
   */
  static logCommand({
    guild, channel, author, content,
  }: Message) {
    const warn = setColor(Colors.FgYellow, '[Command]');
    const g = setColor(Colors.FgBlue, guild?.name ?? 'DM');
    const c = setColor(Colors.FgCyan, `#${channel}`);
    const u = setColor(Colors.FgGreen, `@${author}`);
    return console.warn(`${Logger.timestamp} ${warn} ${g} ${c} ${u} ${content}`);
  }
}