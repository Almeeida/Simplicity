'use strict';

module.exports = {
  // Structures
  // discord
  SimplicityClient: require('./structures/discord/SimplicityClient'),
  SimplicityEmbed: require('./structures/discord/SimplicityEmbed'),
  Loader: require('./structures/Loader'),
  SimplicityListener: require('./structures/discord/SimplicityListener'),
  Parameter: require('./structures/Parameter'),
  // Command
  Command: require('./structures/command/Command'),
  CommandContext: require('./structures/command/CommandContext'),
  CommandError: require('./structures/command/CommandError'),
  CommandUtils: require('./structures/command/CommandUtils'),
  // Utils
  Constants: require('./utils/Constants'),
  Utils: require('./utils/Utils'),
  LogUtils: require('./utils/LogUtils'),
  FileUtils: require('./utils/FileUtils'),
  TextUtils: require('./utils/TextUtils'),
  PermissionsUtils: require('./utils/PermissionsUtils'),
  MessageUtils: require('./utils/MessageUtils'),
  Logger: require('./utils/Logger'),
  // Database
  Database: require('./database/Database'),
  // Parameters
  Parameters: require('./parameters'),
};