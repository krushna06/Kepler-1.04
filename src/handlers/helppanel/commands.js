const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === "Bot-helppanel") {
            if (interaction.values[0] === "commands-Bothelp") {
                interaction.deferUpdate();

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Invite")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),

                        new Discord.ButtonBuilder()
                            .setLabel("Support server")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('No selection')
                            .addOptions([
                                {
                                    label: `Commands`,
                                    description: `Show the commands of Bot!`,
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Changelogs`,
                                    description: `Show the bot changelogs`,
                                    value: "changelogs-Bothelp",
                                },
                            ]),
                    );

                const commandsDescription = `
**Activities** - \`/activities\`
**AFK** - \`/afk help\`
**Announcement** - \`/announcement help\`
**Auto mod** - \`/automod help\`
**Auto setup** - \`/autosetup help\`
**Birthday** - \`/birthdays help\`
**Bot** - \`/bot help\`
**Casino** - \`/casino help\`
**Configuration** - \`/config help\`
**Custom commands** - \`/custom-commands help\`
**Dcredits** - \`/dcredits help\`
**Economy** - \`/economy help\`
**Family** - \`/family help\`
**Fun** - \`/fun help\`
**Games** - \`/games help\`
**Giveaway** - \`/giveaway help\`
**Guild settings** - \`/guild help\`
**Images** - \`/images help\`
**Invites** - \`/invites help\`
**Leveling** - \`/levels help\`
**Messages** - \`/messages help\`
**Moderation** - \`/moderation help\`
**Music** - \`/music help\`
**Notepad** - \`/notepad help\`
**Profile** - \`/profile help\`
**Radio** - \`/radio help\`
**Reaction roles** - \`/reactionroles help\`
**Search** - \`/search help\`
**Server stats** - \`/serverstats help\`
**Setup** - \`/setup help\`
**Soundboard** - \`/soundboard help\`
**Sticky messages** - \`/stickymessages help\`
**Suggestions** - \`/sugestions help\`
**Thanks** - \`/thanks help\`
**Tickets** - \`/tickets help\`
**Tools** - \`/tools help\`
**Voice** - \`/voice help\`
                `;

                client.embed({
                    title: `Help panel`,
                    desc: `View all command categories in the bot here!\n\n${commandsDescription}`,
                    image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message);
            }
        }
    }).setMaxListeners(0);
}
