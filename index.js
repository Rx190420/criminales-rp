const { Client, GatewayIntentBits, Partials, Collection, SlashCommandSubcommandGroupBuilder, Events, AuditLogEvent, EmbedBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User,Message, GuildMember, ThreadMember]
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

client.login(client.config.token);

client.on(Events.ChannelDelete, async (channel) => {
    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete
    })
    .then(async (audit) => {
        const { executor } = audit.entries.first();

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if(type == 0) type = `Texto`
        if(type == 2) type = `Voz`
        if(type == 13) type = `Stage`
        if(type == 15) type = `Foro`
        if(type == 5) type = `Announcement`
        if(type == 4) type = `Categoria`

        const channelID = `1066824320854282240`;
        const Channel = await channel.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
         .setTitle(`Canal eliminado`)
         .addFields({name: `Nombre del canal`, value: `${name}`})
         .addFields({name: `Tipo de canal`, value: `${type}`})
         .addFields({name: `ID del canal`, value: `${id}`})
         .addFields({name: `Eliminado por`, value: `${executor.tag}`})
         .setColor("Red")
         .setTimestamp()

        Channel.send({embeds: [embed]});


    });
});

client.on(Events.ChannelCreate, async (channel) => {
    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate
    })
    .then(async (audit) => {
        const { executor } = audit.entries.first();

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if(type == 0) type = `Texto`
        if(type == 2) type = `Voz`
        if(type == 13) type = `Stage`
        if(type == 15) type = `Foro`
        if(type == 5) type = `Announcement`
        if(type == 4) type = `Categoria`

        const channelID = `1066824320854282240`;
        const Channel = await channel.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
         .setTitle(`Canal creado`)
         .addFields({name: `Nombre del canal`, value: `${name} (<#${id}>)`})
         .addFields({name: `Tipo de canal`, value: `${type}`})
         .addFields({name: `ID del canal`, value: `${id}`})
         .addFields({name: `Creado por`, value: `${executor.tag}`})
         .setColor("Yellow")
         .setTimestamp()

        Channel.send({embeds: [embed]});


    });
});

