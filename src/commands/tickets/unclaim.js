const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id })

    if (ticketData) {
        if (interaction.user.id !== ticketData.creator) {
            const perms = await client.checkUserPerms({
                flags: [Discord.PermissionsBitField.Flags.ManageMessages],
                perms: [Discord.PermissionsBitField.Flags.ManageMessages]
            }, interaction)
        
            if (perms == false) return;

            if (data) {
                if (ticketData.claimed == "" || ticketData.claimed == undefined || ticketData.claimed == "None") {
                    client.errNormal({
                        text: "Ticket non réclamé !",
                        type: 'ephemeral'
                    }, interaction)
                }
                else {
                    if (ticketData.claimed == interaction.user.id) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Configurez le système !",
                                type: 'editreply'
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {

                            ticketData.claimed = "None";
                            ticketData.save();

                            return client.simpleEmbed({
                                desc: `Ce ticket peut maintenant être réclamé à nouveau !`,
                                type: 'editreply'
                            }, interaction)

                        }
                        else {
                            client.errNormal({
                                error: "Ce n'est pas un ticket !",
                                type: 'editreply'
                            }, interaction)
                        }
                    }
                    else {
                        client.errNormal({
                            error: "Vous n'avez pas réclamé ce ticket !",
                            type: 'editreply'
                        }, interaction)
                    }
                }
            }
            else {
                return client.errNormal({
                    error: "Configurez le système de tickets !",
                    type: 'editreply'
                }, interaction)
            }
        }
    }
}
