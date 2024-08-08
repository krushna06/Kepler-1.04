const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = (client, node) => {
    console.log(chalk.blue(chalk.bold(`System`)), (chalk.white(`>>`)), chalk.hex('#85ff9d')(`Lavalink`), chalk.hex('#85ff9d')(`connected!`))
};