const Discord = require('discord.js');
const Schema = require("../../database/models/reminder");
const ms = require("ms");

module.exports = async (client, interaction, args) => {

    const time = interaction.options.getString('time');
    const text = interaction.options.getString('message');

    const endtime = new Date().getTime() + ms(time);

    Schema.findOne({ Text: text, User: interaction.user.id, endTime: endtime }, async (err, data) => {
        if (data) {
            return client.errNormal({ error: `Vous avez déjà créé ce rappel !`, type: 'editreply' }, interaction);
        }
        else {
            return client.succNormal({
                text: `Votre rappel est défini !`,
                fields: [{
                    name: `${client.emotes.normal.clock}┇Heure de fin`,
                    value: `${new Date(endtime).toLocaleTimeString()}`,
                    inline: true,
                },
                {
                    name: `💭┇Rappel`,
                    value: `${text}`,
                    inline: true,
                }
                ],
                type: 'editreply'
            }, interaction);
        }
    })

    setTimeout(async () => {

        client.embed({
            title: `🔔・Rappel`,
            desc: `Votre rappel vient de se terminer !`,
            fields: [
                {
                    name: `💭┇Rappel`,
                    value: `${text}`,
                    inline: true,
                }
            ],
        }, interaction.user);

        let deleted = await Schema.findOneAndDelete({ Text: text, User: interaction.user.id, endTime: endtime });
    }, endtime - new Date().getTime());

}

