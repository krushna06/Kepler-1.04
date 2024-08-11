const Discord = require('discord.js');
const ms = require('ms');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Interaction} interaction 
 * @param {*} args 
 * @returns 
 */
module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Cet ID de message ne provient pas de ce serveur", type: 'editreply' }, interaction);
    client.giveawaysManager.reroll(messageID).then(() => {
        client.succNormal({
            text: `Giveaway relancé`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je ne trouve pas le giveaway pour ${messageID}!`,
            type: 'editreply'
        }, interaction);
    });
}
