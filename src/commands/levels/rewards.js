const Discord = require('discord.js');

const Schema = require("../../database/models/levelRewards");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id });

    if (rawLeaderboard.length < 1) return client.errNormal({
        error: `Aucune récompense trouvée !`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**Niveau ${e.Level}** - <@&${e.Role}>`);

    await client.createLeaderboard(`🆙・Récompenses de niveau - ${interaction.guild.name}`, lb, interaction);
}
