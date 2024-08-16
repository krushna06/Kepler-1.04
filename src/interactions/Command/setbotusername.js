const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-botusername')
        .setDescription('Set the bot\'s username')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The new username for the bot')
                .setRequired(true)
        ),
    
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const newUsername = interaction.options.getString('name');

        try {
            
            await interaction.deferReply({ ephemeral: true });

            await client.user.setUsername(newUsername);

            await interaction.editReply({
                content: `Username updated successfully to **${newUsername}**!`,
            });
        } catch (error) {
            console.error('Error updating username:', error);

            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({
                    content: 'Failed to update username. Please ensure the username is valid and try again.',
                });
            } else {
                await interaction.reply({
                    content: 'Failed to update username. Please ensure the username is valid and try again.',
                    ephemeral: true,
                });
            }
        }
    }
};
