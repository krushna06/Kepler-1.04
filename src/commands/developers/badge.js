const Discord = require('discord.js');

const model = require('../../database/models/badge');

const webhookClientLogs = new Discord.WebhookClient({
    id: "",
    token: "",
});

module.exports = async (client, interaction, args) => {
    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        EVENT: client.emotes.badges.event,
        BOOSTER: client.emotes.badges.booster,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        BOOSTER: client.emotes.badges.booster,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing,
        ACTIVE: client.emotes.badges.active,
        VIP: client.emotes.badges.vip
    }

    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');
    const badge = interaction.options.getString('badge');

    let Badges = await model.findOne({ User: member.id });

    if (boolean === true) {
        if (member.id === interaction.user.id) {
            return client.errNormal({
                error: `Vous ne pouvez pas vous bannir du bot`,
                type: `editreply`
            }, interaction);
        }

        Schema.findOne({ Utilisateur: member.id }, async (err, data) => {
            if (data) {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) est déjà banni du bot`,
                    type: `editreply`
                }, interaction);
            }
            else {
                new Schema({
                    Utilisateur: member.id
                }).save();

                client.succNormal({
                    text: `<@!${member.id}> (${member.id}) banni du bot`,
                    type: 'editreply'
                }, interaction)

                let embedLogs = new Discord.EmbedBuilder()
                    .setTitle(`🔨・Bannissement ajouté`)
                    .setDescription(`<@!${member.id}> (${member.id}) banni du bot`)
                    .addFields(
                        { name: "👤┆Banni par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                    )
                    .setColor(client.config.colors.normal)
                    .setFooter({ text: client.config.discord.footer })
                    .setTimestamp();
                webhookClientLogs.send({
                    username: 'Bannissements du Bot',
                    embeds: [embedLogs],
                });
            }
        })
    }
    else if (boolean === false) {
        Schema.findOne({ Utilisateur: member.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ Utilisateur: member.id }).then(() => {
                    client.succNormal({
                        text: `<@!${member.id}> (${member.id}) débanni du bot`,
                        type: 'editreply'
                    }, interaction)

                    let embedLogs = new Discord.EmbedBuilder()
                        .setTitle(`🔨・Bannissement retiré`)
                        .setDescription(`<@!${member.id}> (${member.id}) débanni du bot`)
                        .addFields(
                            { name: "👤┆Débanni par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                        )
                        .setColor(client.config.colors.normal)
                        .setFooter({ text: client.config.discord.footer })
                        .setTimestamp();
                    webhookClientLogs.send({
                        username: 'Bannissements du Bot',
                        embeds: [embedLogs],
                    });
                })
            }
            else {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) n'est pas banni du bot`,
                    type: `editreply`
                }, interaction);
            }
        })
    }
}