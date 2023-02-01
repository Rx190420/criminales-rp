const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kickeare a un usario que elijas")
    .addUserOption((option) => option.setName(`target`).setDescription(`Usario a Kickear`).setRequired(true))
    .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del kickeo`))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser(`target`);
        const { guild } = interaction;

        let razon = interaction.options.getString(`razon`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!razon) razon = "No hay razon";
    if (user.id === interaction.user.id) return interaction.reply({content: `No puedes Kickearte a ti mismo`, ephemeral: true});
    if (user.id === client.user.id) return interaction.reply({content: `No puedes Kickearme a mi!!`, ephemeral: true});
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: `No puedes Kickear a alguien con un rol igual o superior al tuyo`, ephemeral: true});
    if (!member.kickable) return interaction.reply({content: `No puedo kickear a alguien con un rol superior al mio`, ephemeral: true});
    
    const embed = new EmbedBuilder()
    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({dynamic: true}) || ""}` })
    .setTitle(`${user.tag} ha sido kickeado del servidor`)
    .setColor(`#ff0000`)
    .setTimestamp()
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
    .addFields({ name: `Razon`, value: `${razon}`});

    await member.kick(razon).catch(console.error);

    interaction.reply({embeds: [embed]});


    },
};