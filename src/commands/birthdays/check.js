const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: "Aucun anniversaire trouvé!",
            type: 'editreply' 
        }, interaction);

        client.embed({ 
            title: `${client.emotes.normal.birthday}・Vérification de l'anniversaire`, 
            desc: `L'anniversaire de ${interaction.user.username} est le ${data.Birthday}`,
            type: 'editreply'
        }, interaction)
    })
}
