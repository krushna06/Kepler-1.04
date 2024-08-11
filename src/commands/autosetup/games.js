const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');

    if (choice == "counting") {
        interaction.guild.channels.create({
            name: "compter",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `🔢・Compter`,
                desc: `C'est le début du comptage! Le premier nombre est **1**`
            }, ch)

            client.createChannelSetup(Counting, ch, interaction)
        })
    }

    if (choice == "gtn") {
        interaction.guild.channels.create({
            name:"devinez-le-numéro",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `🔢・Devinez le numéro`,
                desc: `Devinez le numéro entre **1** et **10 000**!`
            }, ch)

            client.createChannelSetup(GTN, ch, interaction)
        })
    }

    if (choice == "gtw") {
        interaction.guild.channels.create({
            name: "devinez-le-mot",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            var word = "démarrer";
            var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

            client.embed({
                title: `💬・Devinez le mot`,
                desc: `Mettez les lettres dans le bon ordre!`,
                fields: [
                    {
                        name: `🔀┆Mot`,
                        value: `${shuffled.toLowerCase()}`
                    }
                ],
            }, ch)

            client.createChannelSetup(GTW, ch, interaction)
        })
    }

    if (choice == "wordsnake") {
        interaction.guild.channels.create({
            name: "serpent-de-mots",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.createChannelSetup(WordSnake, ch, interaction)
        })
    }
}
