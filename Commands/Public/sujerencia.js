const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sugerencia")
    .setDescription("Crea una nueva sujerencia")
    .addStringOption((option) => option.setName(`sugerencia`).setDescription(`Describe tu sujerencia`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction) {
        
       const sugerencia = interaction.options.getString(`sugerencia`);
       
       const { guild } = interaction;

       const channel = interaction.guild.channels.cache.find((c) => c.id == `1002656873960443904`);

       const embed = new EmbedBuilder()
       .setTitle(`Sugerencia:`)
       .setDescription(`${sugerencia}`)
       .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
       .setColor("Red")
       .setFooter({ text: "Criminales RP" })
       .setTimestamp()
       
       const message = await channel.send({embeds: [embed], fetchReply: true});

       message.react(`✔`);
       message.react(`❌`);

       interaction.reply({content: `Tu sugerencia fue agregada con exito`, ephemeral: true});
    },
};