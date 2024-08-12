const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    var list = "";
    client.guilds.cache.forEach(guild => {
        list += `${guild.name} (${guild.id}) | ${guild.memberCount} membres | Propriétaire : ${guild.ownerId}\n`
    })

    const output = new Discord.AttachmentBuilder(Buffer.from(list), { name: 'serveurs.txt'});
    interaction.editReply({ files: [output] });
}
