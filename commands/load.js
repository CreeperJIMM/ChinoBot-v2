module.exports = {
        "load": {
            description: "加載command檔案",
            authority: "owner",
            instructions: "load [檔案名稱]",
            fun: function(bot, message, filename) {
                if(!bot.is_owner(message)) return message.channel.send("You not a owner!");
                if (filename === undefined) {
                    message.channel.send("請輸入檔案名稱")
                    return
                }
                try {
                    bot.load(filename)
                    message.channel.send(`已加載${filename}`)
                } catch (e) {
                    message.channel.send(`似乎沒${filename}.js這檔案`)
                }
            }
        },
        "unload": {
            description: "卸載command檔案",
            authority: "owner",
            instructions: "unload [檔案名稱]",
            fun: function(bot, message, filename) {
                if(!bot.is_owner(message)) return message.channel.send("You not a owner!");
                if (filename === undefined) {
                    message.channel.send("請輸入檔案名稱")
                    return
                }
                try {
                    bot.unload(filename)
                    message.channel.send(`已卸載${filename}`)
                } catch (e) {
                    message.channel.send(`似乎沒${filename}.js這檔案`)
                }
            }
        },
        "reload": {
            description: "重載command檔案",
            authority: "owner",
            instructions: "reload [檔案名稱]",
            fun: function(bot, message, filename) {
                if(!bot.is_owner(message)) return message.channel.send("You not a owner!");
                if (filename === undefined) {
                    message.channel.send("請輸入檔案名稱")
                    return
                }
                try {
                    bot.unload(filename)
                    bot.load(filename)
                    message.channel.send(`已重載${filename}`)
                } catch (e) {
                    message.channel.send(`似乎沒${filename}.js這檔案`)
                }
            }
        },
        "list": {
           fun: function(bot, message) {
            if(!bot.is_owner(message)) return message.channel.send("You not a owner!");
            message.channel.send(bot.command)
        }
    }
}