const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('❌┆Rien de sélectionné')
                .addOptions([
                    {
                        label: `Serveur de support`,
                        description: `Rejoignez le serveur de support`,
                        emoji: "❓",
                        value: "support-linkspanel",
                    },
                    {
                        label: `Inviter le bot`,
                        description: `Invitez Bot sur votre serveur`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `Serveur communautaire`,
                        description: `Rejoignez le serveur communautaire!`,
                        emoji: "🌍",
                        value: "community-linkspanel",
                    },
                    {
                        label: `Top.gg`,
                        description: `Afficher le lien top.gg`,
                        emoji: "📃",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `🔗・Liens`,
        desc: `Accédez à tous les liens de Bot! Choisissez le lien dont vous avez besoin dans le menu ci-dessous`,
        image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474250270/standard_8.gif",
        components: [row],
        type: 'editreply'
    }, interaction)
}
