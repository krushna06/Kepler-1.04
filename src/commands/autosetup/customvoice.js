const Discord = require('discord.js');

const voiceSchema = require("../../database/models/voice");

module.exports = async (client, interaction, args) => {
    interaction.guild.channels.create({
        name: "Salon vocal personnalisé",
        type: Discord.ChannelType.GuildCategory,
    }).then((cat) => {
        interaction.guild.channels.create({
            name: "➕ Créer un salon vocal",
            type: Discord.ChannelType.GuildVoice,
            parent: cat.id,
            permissionOverwrites: [
                {
                    deny: [Discord.PermissionsBitField.Flags.Speak],
                    id: interaction.guild.id
                },
            ],
        }).then((ch) => {
            voiceSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (data) {
                    data.Category = cat.id;
                    data.Channel = ch.id;
                    data.ChannelName = "{emoji} {nom du salon}";
                    data.save();
                }
                else {
                    new voiceSchema({
                        Guild: interaction.guild.id,
                        Channel: ch.id,
                        ChannelName: "{emoji} {nom du salon}",
                        Category: cat.id
                    }).save();
                }
            });

            client.succNormal({
                text: `Le salon vocal personnalisé a été configuré avec succès!`,
                fields: [
                    {
                        name: `📘┆Salon`,
                        value: `${ch} (${ch.name})`
                    }
                ],
                type: 'editreply'
            }, interaction);
        })
    })
}
