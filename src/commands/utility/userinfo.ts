import {
  Collection, Guild, Presence, Role, User,
} from 'discord.js';
import { TFunction } from 'i18next';
import { Locale, format, formatDistance } from 'date-fns';
import {
  Command, CommandContext, CommandError, SimplicityClient, SimplicityEmbed,
} from '../../structures';
import {
  Constants, DateUtil, PermissionUtil, Util,
} from '../../util';
import Config from '../../config';

const {
  SPOTIFY_LOGO_PNG_URL, PERMISSIONS, ADMINISTRATOR_PERMISSION: ADMINISTRATOR, NORMAL_PERMISSIONS,
} = Constants;
const { isEmpty } = Util;

export default class UserInfo extends Command {
  constructor(client: SimplicityClient) {
    super(client, 'userinfo', {
      aliases: ['ui', 'user', 'whois'],
      args: [
        {
          acceptBot: true,
          acceptSelf: true,
          fetchGlobal: true,
          missingError: 'errors:invalidUser',
          type: 'user',
        },
      ],
      category: 'utility',
      flags: [
        {
          aliases: ['music', 'song', 's', 'm'],
          name: 'spotify',
          type: 'booleanFlag',
        },
        {
          aliases: ['r', 'role'],
          name: 'roles',
          type: 'booleanFlag',
        },
      ],
      requirements: { clientPermissions: ['EMBED_LINKS'] },
    });
  }

  async run({
    author, channel, flags, guild, language, t,
  }: CommandContext, user = author): Promise<void> {
    const locale = DateUtil.getLocale(language);
    if (flags.spotify) {
      if (user.isPartial) {
        throw new CommandError('commands:userinfo.partial');
      } else if (!this.isListeningToSpotify(user.presence)) {
        throw new CommandError('commands:userinfo.notListeningToSpotify');
      }
      await channel.send(this.spotifyEmbed(author, user, t));
    } if (flags.roles) {
      const member = guild.member(user);
      if (!member) {
        throw new CommandError('commands:userinfo.notInGuild');
      }
      await channel.send(this.rolesEmbed(member.roles.cache.filter((r) => r.id !== guild.id), user, author, t));
    } else {
      const content = user.isPartial ? t('commands:userinfo.cannotPartial') : '';
      await channel.send(content, this.userInfoEmbed(user, author, t, guild, locale));
    }
  }

  isListeningToSpotify(presence: Presence): boolean {
    const activities = presence?.activities;
    return !isEmpty(activities) && activities.some((a) => a.type === 'LISTENING' && a.party?.id?.includes('spotify:'));
  }

  spotifyEmbed(author: User, user: User, t: TFunction): SimplicityEmbed {
    const { presence } = user;
    const activity = presence?.activities?.find(
      (a) => a.type === 'LISTENING' && a.party?.id?.includes('spotify:')
    );
    if (!activity) throw new CommandError('commands:userinfo.notListeningToSpotify');

    const trackName = activity.details;
    const artist = activity.state?.split(';').join(',');
    const album = activity.assets?.largeText;
    const largeImage = activity.assets?.largeImage;
    const image = largeImage && `https://i.scdn.co/image/${largeImage.replace('spotify:', '')}`;

    const embed = new SimplicityEmbed(author, { t })
      .setAuthor('$$commands:userinfo.spotify', SPOTIFY_LOGO_PNG_URL)
      .setColor('GREEN');

    if (trackName) embed.addField('» $$commands:userinfo.track', trackName, true);
    if (artist) embed.addField('» $$commands:userinfo.artist', artist, true);
    if (album) embed.addField('» $$commands:userinfo.album', album);
    if (image) embed.setThumbnail(image);

    return embed;
  }

  rolesEmbed(roles: Collection<string, Role>, user: User, author: User, t: TFunction): SimplicityEmbed {
    const role = roles && roles.find((r) => !!r.color);
    const opts = { dynamic: true, format: 'png', size: 4096 } as const;
    return new SimplicityEmbed(author, { t })
      .setAuthor(
        '» $$commands:userinfo.authorRoles', user.displayAvatarURL(opts), '', { user: user.username },
      )
      .setDescription(roles.map((r) => r).sort((a, b) => b.position - a.position).join('\n'))
      .setColor(role ? role.hexColor : Config.COLOR);
  }

  getTitles(user: User, client: SimplicityClient, guild: Guild): string[] {
    const titles = [user.tag];
    if (PermissionUtil.verifyDev(user.id, client)) titles.push('#developer');
    if (guild && guild.ownerID === user.id) titles.push('#crown');
    if (user.bot) titles.push('#bot');
    return titles;
  }

  getClientStatus(presence: Presence): string[] {
    const status = presence.clientStatus && Object.keys(presence.clientStatus);
    if (status && status.length) return status.map((x) => `#${x}`);
    return [];
  }

  getJoinPosition(id: string, guild: Guild): number | null {
    if (!guild.member(id)) return null;

    const array = guild.members.cache.array();
    array.sort((a, b) => (a.joinedTimestamp as number) - (b.joinedTimestamp as number));

    const result = array.map((m, i) => ({ id: m.user.id, index: i })).find((m) => m.id === id);
    return (result && result.index) || null;
  }

  userInfoEmbed(user: User, author: User, t: TFunction, guild: Guild, locale: Locale): SimplicityEmbed {
    const { id, tag } = user;
    const member = guild.member(user);
    const presence = !user.isPartial && user.presence;
    const custom = this.getTitles(user, user.client, guild);
    const status = (presence && this.getClientStatus(presence)) || [];
    const titles = [...custom, ...status].join(' ');
    const highestRole = member && member.roles.highest.id !== guild.id && member.roles.highest;
    const activity: string[] | false = presence
      && presence.activities?.map((a) => `${t(`common:activityType.${a.type}`)} ${a.name}`);
    const joinPosition = this.getJoinPosition(user.id, guild);
    const joined = member && member?.joinedAt !== null && format(member.joinedAt, 'PPPP', { locale });
    const joinedRelative = member
      && member?.joinedAt !== null
      && formatDistance(member.joinedAt, new Date(), { locale });

    const rolesClean = member && member.roles.cache
      .filter((r) => r.id !== guild.id)
      .map((r) => r.name || `${r}`);

    const embed = new SimplicityEmbed(author, { autoAuthor: false, t })
      .setAuthor(titles, user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(user)
      .addField('» $$commands:userinfo.username', tag, true);

    if (member && member.nickname) embed.addField('» $$commands:userinfo.nickname', member.nickname, true);

    embed.addField('» $$commands:userinfo.id', id, true);

    if (presence) {
      const userStatus = `#${presence.status} $$common:status.${presence.status}`;
      embed.addField('» $$commands:userinfo.status', userStatus, true);
    }

    if (member && highestRole && member.roles.cache.size > 5) {
      const roleString = highestRole.name || `${highestRole}`;
      embed.addField('» $$commands:userinfo.highestRole', roleString, true);
    }

    if (rolesClean && rolesClean.length && rolesClean.length <= 5) {
      embed.addField('» $$commands:userinfo.roles', rolesClean.join(', '), true);
    }

    if (joinPosition) embed.addField('» $$commands:userinfo.joinPosition', joinPosition, true);

    if (activity) embed.addField('activityies', activity.join('\n'), true);

    embed.addField(
      '» $$commands:userinfo.createdAt',
      `${format(user.createdAt, 'PPPP', { locale })} (${formatDistance(user.createdAt, new Date(), { locale })})`,
    );

    if (joined) {
      embed.addField(
        '» $$commands:userinfo.joinedAt',
        `${joined} (${joinedRelative})`,
      );
    }

    const memberPermissions = member?.permissions?.toArray().filter((p) => !NORMAL_PERMISSIONS.includes(p));
    let resultAdministrator;
    let resultAllPermissions;
    let resultPermissions;

    if (memberPermissions) {
      resultAdministrator = memberPermissions.includes(ADMINISTRATOR) && t(`permissions:${ADMINISTRATOR}`);
      resultAllPermissions = memberPermissions.sort((a, b) => PERMISSIONS.indexOf(a) - PERMISSIONS.indexOf(b));
      resultPermissions = resultAdministrator
        || resultAllPermissions.map((p) => t(`permissions:${p}`)).join(', ');
    }

    if (resultPermissions) embed.addField('» $$commands:userinfo.permissions', resultPermissions as string);

    return embed;
  }
}