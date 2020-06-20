import { ClientOptions, PermissionString, PresenceStatus } from 'discord.js';

export const CLIENT_OPTIONS: ClientOptions = {
  disableMentions: 'everyone',
  fetchAllMembers: false,
  partials: ['MESSAGE', 'CHANNEL'],
  presence: {
    activity: {
      name: '@Simplicity help',
      type: 'WATCHING',
    },
  },
};

export const MANAGER_PERMISSIONS: PermissionString[] = [
  'ADMINISTRATOR',
  'VIEW_AUDIT_LOG',
  'MANAGE_GUILD',
  'MANAGE_ROLES',
  'MANAGE_CHANNELS',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'MANAGE_NICKNAMES',
  'MANAGE_EMOJIS',
  'MANAGE_WEBHOOKS',
  'MANAGE_MESSAGES',
  'MENTION_EVERYONE',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
];

export const NORMAL_PERMISSIONS: PermissionString[] = [
  'CHANGE_NICKNAME',
  'USE_VAD',
  'SPEAK',
  'CONNECT',
  'USE_EXTERNAL_EMOJIS',
  'READ_MESSAGE_HISTORY',
  'ATTACH_FILES',
  'EMBED_LINKS',
  'SEND_MESSAGES',
  'VIEW_CHANNEL',
  'ADD_REACTIONS',
  'CREATE_INSTANT_INVITE',
  'STREAM',
];

export const PERMISSIONS: PermissionString[] = [
  'ADMINISTRATOR',
  'VIEW_AUDIT_LOG',
  'MANAGE_GUILD',
  'MANAGE_ROLES',
  'MANAGE_CHANNELS',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'CREATE_INSTANT_INVITE',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_EMOJIS',
  'MANAGE_WEBHOOKS',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'ADD_REACTIONS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'PRIORITY_SPEAKER',
];

export const BOT_DEFAULT_PERMISSIONS: PermissionString[] = [
  'SEND_MESSAGES',
  'READ_MESSAGE_HISTORY',
  'ADD_REACTIONS',
  'USE_EXTERNAL_EMOJIS',
];

export const ADMINISTRATOR_PERMISSION: PermissionString = 'ADMINISTRATOR';

export const COLORS = {
  MEMBER_BAN: 'ff3535',
  MEMBER_UNBAN: '2ECC71',
  MESSAGE_BULK_DELETE: '36393f',
  MESSAGE_DELETE: '36393f',
  MESSAGE_EDIT: '36393f',
  MESSAGE_PIN: '36393f',
  MESSAGE_UNPIN: '36393f',
};

export const CUSTOM_EMOJIS = {
  BOT_TAG: '564800285596450847',
  CANCEL: '537327435180408842',
  dnd: '488658928540975104',
  idle: '493050914614280192',
  LOADING_EMOJI: '534521618177851393',
  offline: '488658962535809034',
  online: '488658856709455881',
  SPOTIFY: '560221641922052123',
  TICK_NO: '567751250079383552',
  TICK_NULL: '567753051071578112',
  TICK_YES: '567751193959596034',
};

export const NORMAL_EMOJIS = {
  ALIASES: '🗝',
  BACK: '↩',
  BOOKS: '📚',
  BOT: '🤖',
  CANCEL: '❎',
  CROWN: '👑',
  DESKTOP: '💻',
  DEVELOPER: '⚒️',
  ERROR: '🚫',
  HASH: '#⃣',
  MOBILE: '📱',
  MUSIC: '🎵',
  PAGE: '📄',
  PC: '💻',
  PHOTO: '🖼',
  PING: '🏓',
  PINGS: '📊',
  QUESTION: '❓',
  RAM: '💾',
  ROLES: '📜',
  STARBOARD: '⭐',
  SUCCESS: '✅',
  THUMBS_DOWN: '👎',
  THUMBS_UP: '👍',
  TICK_NO: '❌',
  TICK_YES: '✅',
  USAGE: '🖊',
  USERS: '👥',
  WATCH: '⌚',
  WEB: '🌐',
};

export const REGEX = { REGEX: /[.*+?^${}()|[\]\\]/g };
export const SPOTIFY_LOGO_PNG = 'src/assets/spotify-logo.png';
export const SPOTIFY_LOGO_PNG_URL = 'https://images-na.ssl-images-amazon.com/images/I/51rttY7a%2B9L.png';
