const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Cet ID de message ne provient pas de ce serveur", type: 'editreply' }, interaction);
    client.giveawaysManager.delete(messageID).then(() => {
        client.succNormal({
            text: `Le giveaway a été supprimé avec succès`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je ne trouve pas le giveaway pour ${messageID}!`,
            type: 'editreply'
        }, interaction);
    });
}
