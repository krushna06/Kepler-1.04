const Discord = require('discord.js');
const generator = require('generate-password');

const Schema = require("../../database/models/notes");

module.exports = async (client, interaction, args) => {
    const rawboard = await Schema.find({ Guild: interaction.guild.id, User: interaction.user.id })

    if (rawboard.length < 1) return client.errNormal({ error: "Aucune note trouvée !", type: 'editreply' }, interaction);

    const lb = rawboard.map(e => `**ID de la note : ${e.Code}** \n${e.Note} \n`);

    await client.createLeaderboard(`📓・Notes - ${interaction.user.username}`, lb, interaction);
}
