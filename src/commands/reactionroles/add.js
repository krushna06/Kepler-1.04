const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const role = interaction.options.getRole('role');
    const emoji = interaction.options.getString('emoji');

    const parsedEmoji = Discord.parseEmoji(emoji);
    if (!parsedEmoji) return client.errNormal({
        error: `Émoji non trouvé sur ce serveur !`,
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (data) {
            data.Roles[emoji] = [
                role.id,
                {
                    id: parsedEmoji.id,
                    raw: emoji
                }
            ];

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id, Category: category }, data);
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Message: 0,
                Category: category,
                Roles: {
                    [emoji]: [
                        role.id,
                        {
                            id: parsedEmoji.id,
                            raw: emoji
                        }
                    ]
                }
            }).save();
        }

        client.succNormal({
            text: "Rôle de réaction créé avec succès ! Créez un panneau de la manière suivante",
            fields: [
                {
                    name: `📘┆Panneau de menu`,
                    value: `\`/reactionroles menu [nom de la catégorie]\``,
                    inline: true
                },
                {
                    name: `📘┆Panneau de bouton`,
                    value: `\`/reactionroles button [nom de la catégorie]\``,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);
    });
}

