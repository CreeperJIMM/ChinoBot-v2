const Discord = require("discord.js")
module.exports = {
    "avatar": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {
            let avatar = "https://cdn.discordapp.com/avatars/"+interaction.member.user.id+"/"+interaction.member.user.avatar+"?size=2048"
            let em = new Discord.MessageEmbed().setTitle(interaction.member.user.username+" 的頭貼").setImage(avatar)
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                embeds: [em]
        }}})
        }
    },
    "savatar": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {
            let avatar = client.guilds.cache.get(interaction.guild_id).iconURL({ format: "png", dynamic: true ,size: 2048})
            let em = new Discord.MessageEmbed().setTitle(client.guilds.cache.get(interaction.guild_id).name+" 的群頭貼").setImage(avatar)
            client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [em]
        }}})}
    },
    "hello": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                content: "嗨嗨!",
            }}})
        }
    },
    "ping": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                type: 4,
                data: {
                content: `Pong! \`${client.ws.ping}ms\``
            }}})
        }
    },
    "say": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {
            let says = "❌請填入你要說的文字!"
            if(args != null) {says = args[0].value}
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                type: 4,
                data: {
                content: `${says}`
                }
            }})
        }
    },
    /*
    "hello": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {

        }
    },
    "hello": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {

        }
    },
        */
}