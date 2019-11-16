'use strict';

const { Command, SimplicityEmbed, CommandError } = require('@structures');
const AllowedImageFormats = [
  'webp',
  'png',
  'jpg',
  'gif',
];

class SnipeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'snipe',
      category: 'guild',
      cooldown: 3000,
      requirements: {
        guildOnly: true,
      },
    }, [
      {
        type: 'channel',
        required: false,
        acceptText: true,
        canBeHiddenUser: false,
        canBeHiddenBot: false,
      },
    ]);
  }

  async run({ channel: currentChannel, client, t, send }, channel = currentChannel) {
    const msg = client.deletedMessages.get(channel.id);

    if (!msg || (msg && !msg.author && msg.content && !msg.attachments.size && !msg.embeds.length)) {
      throw new CommandError('commands:snipe.notFound');
    }

    const embed = new SimplicityEmbed(msg.author)
      .setDescription(msg.content)
      .setFooter(`#${channel.name}`)
      .setTimestamp(msg.timestamp);

    let attachments = msg.attachments.array();
    if (attachments.length > 0) {
      const image = attachments.find((a) => AllowedImageFormats.some((format) => a.name.endsWith(format)));
      if (image) {
        embed.setImage(image.proxyURL);
        delete attachments[attachments.indexOf(image)];
      }

      attachments = attachments.filter((a) => a);
      if (attachments.length > 0) {
        embed.addField(t('commands:snipe.files'), attachments.map((a) => `[${a.name}](${a.url})`));
      }
    }

    await send(embed);
    if (msg.embeds.length > 0) await send(msg.embeds[0]);
  }
}

module.exports = SnipeCommand;
