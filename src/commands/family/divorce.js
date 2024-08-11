const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    const author = interaction.user;

    if (author.id == target.id) return client.errNormal({
        error: "Vous ne pouvez pas divorcer de vous-même",
        type: 'editreply'
    }, interaction);

    if (target.bot) return client.errNormal({
        error: "Vous ne pouvez pas divorcer d'un bot",
        type: 'editreply'
    }, interaction);

    const data = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Partner: target.id });
    if (data) {
        const data2 = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });
        if (data2) {
            data2.Partner = null;
            data2.save();
        }

        data.Partner = null;
        data.save();

        client.embed({ 
            title: `👰・Divorcé`, 
            desc: `${author} et ${target} sont désormais divorcés`, 
            type: 'editreply' 
        }, interaction);

    }
    else {
        client.errNormal({ 
            error: "Vous n'êtes pas marié pour le moment", 
            type: 'editreply' 
        }, interaction);
    }
}
