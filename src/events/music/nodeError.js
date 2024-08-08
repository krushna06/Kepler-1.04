const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = (client, node, error) => {
    console.log(chalk.hex('#ff9985')(chalk.bold(`ERROR`)), (chalk.white(`>>`)), chalk.white(`Node`), chalk.hex('#ff9985')(`${node.options.identifier}`), chalk.white(`had an error:`), chalk.hex('#ff9985')(`${error.message}`))
};