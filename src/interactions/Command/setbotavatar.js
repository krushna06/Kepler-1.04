const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-botavatar')
        .setDescription('Set the bot\'s avatar')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('The URL of the new avatar')
                .setRequired(true)
        ),
    
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const url = interaction.options.getString('url');

        try {
            await interaction.deferReply({ ephemeral: true });

            await client.user.setAvatar(url);

            await interaction.editReply({
                content: 'Avatar updated successfully!',
                embeds: [
                    {
                        title: 'New Avatar',
                        image: { url: url },
                        color: 0x00FF00,
                    }
                ]
            });
        } catch (error) {
            console.error('Error updating avatar:', error);

            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({
                    content: 'Failed to update avatar. Please ensure the URL is valid and try again.',
                });
            } else {
                await interaction.reply({
                    content: 'Failed to update avatar. Please ensure the URL is valid and try again.',
                    ephemeral: true,
                });
            }
        }
    }
};
