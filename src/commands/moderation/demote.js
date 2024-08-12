const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);

  member.roles.remove(member.roles.highest.id).then(r => {
    client.embed({
      title: `🔨・Déclassement`,
      desc: `Vous avez été déclassé dans **${interaction.guild.name}**`,
      fields: [
        {
          name: "👤┆Modérateur",
          value: interaction.user.tag,
          inline: true
        },
      ]
    }, member).catch(() => { })

    client.succNormal({
      text: `L'utilisateur a été déclassé avec succès`, fields: [
        {
          name: "👤┆Utilisateur",
          value: `${member}`,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(e => {
    client.errNormal({
      error: "Je ne peux pas déclasser l'utilisateur",
      type: 'editreply'
    }, interaction)
  });
}
