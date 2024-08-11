const Discord = require('discord.js');

const Schema = require('../../database/models/afk');

module.exports = async (client, interaction, args) => {
    const reason = interaction.options.getString('reason') || `Non spécifié`;

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ 
                error: `Vous êtes déjà en mode AFK!`,
                type: 'editreply' 
            }, interaction);
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Message: reason
            }).save();

            if (!interaction.member.displayName.includes(`[AFK] `)) {
                interaction.member.setNickname(`[AFK] ` + interaction.member.displayName).catch(e => { });
            }

            client.succNormal({ 
                text: `Votre mode AFK a été activé avec succès`,
                type: 'ephemeraledit'
            }, interaction);

            client.embed({ 
                desc: `${interaction.user} est maintenant en mode AFK! **Raison:** ${reason}` 
            }, interaction.channel)
        }
    })
}
