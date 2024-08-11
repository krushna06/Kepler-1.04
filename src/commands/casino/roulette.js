const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }

            let colour = interaction.options.getString('color');
            let money = parseInt(interaction.options.getNumber('amount'));

            let random = Math.floor(Math.random() * 37);

            if (!colour || !money) return client.errUsage({ usage: "roulette [color] [amount]", type: 'editreply' }, interaction);
            colour = colour.toLowerCase()
            if (money > data.Money) return client.errNormal({ error: `Vous pariez plus que ce que vous avez !`, type: 'editreply' }, interaction);

            if (colour == "b" || colour.includes("black")) colour = 0;
            else if (colour == "r" || colour.includes("red")) colour = 1;
            else if (colour == "g" || colour.includes("green")) colour = 2;
            else return client.errNormal({ error: `Couleur spécifiée incorrecte !`, type: 'editreply' }, interaction);

            if (random == 0 && colour == 2) { // Vert
                money *= 15

                data.Money += money;
                data.save();

                client.embed({ title: `🎰・Multiplicateur : 15x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${money}**`, type: 'editreply' }, interaction);
            }

            else if (isOdd(random) && colour == 1) { // Rouge
                money = parseInt(money * 1.5)
                data.Money += money;
                data.save();

                client.embed({ title: `🎰・Multiplicateur : 1.5x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${money}**`, type: 'editreply' }, interaction);
            }

            else if (!isOdd(random) && colour == 0) { // Noir
                money = parseInt(money * 2)
                data.Money += money;
                data.save();

                client.embed({ title: `🎰・Multiplicateur : 2x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${money}**`, type: 'editreply' }, interaction);
            }

            else { // Incorrect
                data.Money -= money;
                data.save();

                client.embed({ title: `🎰・Multiplicateur : 0x`, desc: `Vous avez perdu **${client.emotes.economy.coins} $${money}**`, type: 'editreply' }, interaction);
            }

        }
        else {
            client.errNormal({ error: `Vous n'avez pas de ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
        }
    })
}