const Discord = require('discord.js');

const thanksSchema = require("../../database/models/thanks");
const thanksAuthor = require("../../database/models/thanksAuthor");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    if (!target) return client.errUsage({ usage: "thanks [mentionner utilisateur]", type: 'editreply' }, interaction);

    if (target.id === interaction.user.id) return client.errNormal({ error: `Vous ne pouvez pas vous remercier vous-même !`, type: 'editreply' }, interaction);

    thanksAuthor.findOne({ User: target.id, Author: interaction.user.id }, async (err, data) => {
        if (data) {
            client.errNormal({ error: `Vous avez déjà remercié cet utilisateur !`, type: 'editreply' }, interaction);
        }
        else {
            thanksSchema.findOne({ User: target.id }, async (err, data) => {
                if (data) {
                    data.Received += 1;
                    data.save();
                    client.succNormal({ text: `Vous avez remercié <@${target.id}> ! Ils ont maintenant \`${data.Received}\` remerciements`, type: 'editreply' }, interaction);
                }
                else {
                    new thanksSchema({
                        User: target.id,
                        UserTag: target.tag,
                        Received: 1,
                    }).save();
                    client.succNormal({ text: `Vous avez remercié <@${target.id}> ! Ils ont maintenant \`1\` remerciement`, type: 'editreply' }, interaction);
                }
            })

            new thanksAuthor({
                User: target.id,
                Author: interaction.user.id,
            }).save();
        }
    })
}
