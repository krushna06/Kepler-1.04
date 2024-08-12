const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');
    const channel = interaction.options.getChannel('channel');

    if (choice == "counting") {
        client.embed({
            title: `🔢・Counting`,
            desc: `C'est le début du comptage ! Le premier nombre est **1**`
        }, channel)

        client.createChannelSetup(Counting, channel, interaction)
    }

    if (choice == "gtn") {
        client.embed({
            title: `🔢・Devinez le nombre`,
            desc: `Devinez le nombre entre **1** et **10.000** !`
        }, channel)

        client.createChannelSetup(GTN, channel, interaction)
    }

    if (choice == "gtw") {
        var word = "start";
        var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

        client.embed({
            title: `💬・Devinez le mot`,
            desc: `Mettez les lettres dans le bon ordre !`,
            fields: [
                {
                    name: `🔀┆Mot`,
                    value: `${shuffled.toLowerCase()}`
                }
            ],
        }, channel)

        client.createChannelSetup(GTW, channel, interaction)
    }

    if (choice == "wordsnake") {
        client.createChannelSetup(WordSnake, channel, interaction)
    }
}
