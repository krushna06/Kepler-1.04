const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var reponses = [
        "Oui !",
        "Malheureusement non",
        "Vous avez tout à fait raison !",
        "Non, désolé.",
        "Je suis d'accord",
        "Aucune idée !",
        "Je ne suis pas si intelligent ..",
        "Mes sources disent non !",
        "C'est certain",
        "Vous pouvez compter là-dessus",
        "Probablement pas",
        "Tout indique un non",
        "Sans aucun doute",
        "Absolument",
        "Je ne sais pas"
    ];
    var resultat = Math.floor((Math.random() * reponses.length));

    client.embed({
        title: `${client.emotes.normal.ball}・8ball`,
        desc: `Voir la réponse à votre question !`,
        fields: [
            {
                name: `💬┆Votre Question`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `🤖┆Réponse du Bot`,
                value: `\`\`\`${reponses[resultat]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}