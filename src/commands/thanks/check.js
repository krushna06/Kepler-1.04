const Discord = require('discord.js');
const thanksSchema = require("../../database/models/thanks");

module.exports = async (client, interaction, args) => {

    const member = interaction.options.getUser('user');

    thanksSchema.findOne({ User: member.id }, async (err, data) => {
        if (data) {

            return client.embed({ title: `🤝・Remerciements`, desc: `**${member.tag}** a \`${data.Received}\` remerciements`, type: 'editreply' }, interaction);

        }
        else {

            return client.embed({ title: `🤝・Remerciements`, desc: `**${member.tag}** a \`0\` remerciements`, type: 'editreply' }, interaction);
        }
    });

}
