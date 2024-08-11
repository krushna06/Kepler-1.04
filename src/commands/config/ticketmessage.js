const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Merci d'avoir créé un ticket ! \nLe support sera avec vous sous peu \n\n🔒 - Fermer le ticket \n✋ - Réclamer le ticket \n📝 - Sauvegarder la transcription \n🔔 - Envoyer une notification";
                data.save();

                client.succNormal({
                    text: `Le message du ticket a été défini avec succès`,
                    fields: [
                        {
                            name: `📘┆Type de message`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Message`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Aucune donnée de message de ticket trouvée !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message du ticket a été défini avec succès`,
            fields: [
                {
                    name: `📘┆Type de message`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Voici la transcription de votre ticket, veuillez la conserver si vous souhaitez y faire référence !";
                data.save();

                client.succNormal({
                    text: `Le message du ticket a été défini avec succès`,
                    fields: [
                        {
                            name: `📘┆Type de message`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Message`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Aucune donnée de message de ticket trouvée !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message du ticket a été défini avec succès`,
            fields: [
                {
                    name: `📘┆Type de message`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}
