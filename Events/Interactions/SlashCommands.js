const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "This command is outdated.",
            ephemeral: true,
        });

        if(command.developer && interaction.user.id !== "578690416858103818")
        return interaction.reply({
            content: "Este commando es solo para el creador.",
            ephermal: true,
        });

        command.execute(interaction, client);
    }
}