const Discord = require("discord.js")
const lan = require('../commands/lang.json');
const helpX = require('../language/help.json');
const infoX = require('../language/info.json');
const guildX = require('../language/guild.json');
let Mongo = require("../function/MongoData")
module.exports = {
    "avatar": {
        description: "測試",
        fun: function(client, interaction, prefix,clientDB, userlang,args) {
            let num = 0,all = false,ephemeral = false,user = interaction.user
            args.forEach(ags => {
                if(ags.name === "user") {
                    user = ags.user
                }
                if(ags.name === "private") ephemeral = ags.value 
            });
            
            let avatar = "https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+"?size=2048"
            let em = new Discord.MessageEmbed().setTitle(user.username+" 的頭貼").setImage(avatar)
            interaction.reply({embeds: [em],ephemeral: ephemeral})
            return true;
        }
    },
    "savatar": {
        description: "測試",
        fun: function(client, interaction) {
            let avatar = interaction.guild.iconURL({ format: "png", dynamic: true ,size: 2048})
            let em = new Discord.MessageEmbed().setTitle(interaction.guild.name+" 的群頭貼").setImage(avatar)
            interaction.reply({embeds: [em]})
            return true;
        }
    },
    "hello": {
        description: "測試",
        fun: function(client, interaction) {
            interaction.reply("嗨嗨!")
            return true;
        }
    },
    "ping": {
        description: "測試",
        fun: function(client, interaction) {
            interaction.reply(`Pong! \`${client.ws.ping}ms\``)
            return true;
        }
    },
    "say": {
        description: "測試",
        fun: function(client, interaction, prefix,clientDB, userlang,args, ag) {
            let says = "❌請填入你要說的文字!"
            if(args[0] != null) {says = args[0].value}
            interaction.reply(says)
            return true;
        }
    },
    "help": {
        description: "測試",
        fun: function(client, interaction, prefix,clientDB, userlang,args, ag) {
            let lang = lan.zh_TW,h = helpX.zh_TW,language = userlang
            if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
            //interaction.deferReply()
            let BUTTON1 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON2 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON3 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON4 = new Discord.MessageButton().setStyle('LINK')
            let row = new Discord.MessageActionRow().addComponents([
                BUTTON1.setLabel("點我邀請到你的Server!").setURL('https://discord.com/oauth2/authorize?client_id='+client.user.id+'&scope=applications.commands%20bot&permissions=1476668478'),
                BUTTON2.setLabel("官方網站").setURL("https://dckabicord.com/main"),
                BUTTON3.setLabel("官方群組").setURL("https://discord.gg/P2yg5V2"),
                BUTTON4.setLabel("官方文檔(Beta)").setURL("https://docs.dckabicord.com/")
            ])
            let p = prefix
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setAuthor(client.user.username + "#" + client.user.discriminator+` `+h.help.command+`  V7.0` , client.user.displayAvatarURL())
            .setDescription(h.help.desc +prefix+ h.help.desc2 +prefix+ h.help.desc3)
            .addField(h.help.addA ,h.help.addF +p+h.help.addF2+p+h.help.addF3+p+h.help.addF4+p+h.help.addF5+p+h.help.addF6+client.user.id+h.help.addF7+p+h.help.addF8+p+h.help.addF9)
            .setFooter(h.word.all, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
            {interaction.reply({embeds: [helpEmbed],components:[row]})};
            return true;
        }
    },
    "info": {
        description: "測試",
        fun: function(client, interaction, p,clientDB, userlang,args, ag) {
            if(args[0].name != "type") return interaction.reply({content:"❌請填入查詢項目",ephemeral: true})
            switch (args[0].value) {
                case "user":
                    userinfo(client, interaction,p,clientDB,userlang,args)
                    break;
                case "guild":
                    serverinfo(client, interaction,p,clientDB,userlang,args)
                    break;
                case "channel":
                    channelinfo(client, interaction,p,clientDB,userlang,args)
                    break;
                case "role":
                    roleinfo(client, interaction,p,clientDB,userlang,args)
                    break;
                case "emoji":
                    emojiinfo(client, interaction,p,clientDB,userlang,args)
                    break;
                case "bot":
                    botinfo(client, interaction,p,clientDB,userlang,args,p)
                    break;
            }
        }
    },
    "snipe": {
        description: "測試",
        fun: function(client, interaction, p,clientDB, userlang,args, ag) {
            let l = lan.zh_TW,k = guildX.zh_TW
            if(userlang === "zh_TW") {l = lan.zh_TW;k = guildX.zh_TW}else if(userlang === "zh_CN") {l = lan.zh_CN;k = guildX.zh_CN}else if(userlang === "ja_JP") {l = lan.ja_JP;k = guildX.ja_JP
            }else if(userlang === "en_US") {l = lan.en_US;k = guildX.en_US}
            if(!interaction.guild) return interaction.reply({content: l.error.No_DM,ephemeral: true})
            if(interaction) {
                return interaction.reply(k.snipe.discord_snipe)
              }
            let num = 0,all = false,ephemeral = false
            args.forEach(ags => {
                if(ags.name === "number") {
                    if(!isNaN(parseInt(ags.value))) num = parseInt(ags.value)-1
                }
                if(ags.name === "all") all = ags.value 
                if(ags.name === "private") ephemeral = ags.value 
            });
            Mongo.loadGuild(clientDB,interaction.guild.id).then(async(user) => {
                if (user === false) {
                    return interaction.reply({content: k.snipe.no_support,ephemeral: true})
                }
                if(user.language.setting) {
                  if(!user.language.setting.snipe) return interaction.reply({content: k.snipe.close_snipe,ephemeral: true})
                }
                if(user.snipe.t1) return interaction.reply({content: "⚠此群組的snipe資料為舊版本!!\n請刪除一則訊息觸發更新!",ephemeral: true})
                if(!user.snipe[0]) return interaction.reply({content: k.snipe.no_snipe,ephemeral: true})
                if(num > 15) return interaction.reply({content: l.error.less_then+`**16**!`,ephemeral: true})
                if(!user.snipe[num]) return interaction.reply({content: k.snipe.no_fond+(num+1)+k.snipe.message2,ephemeral: true})
                let member = user.snipe[num].user
                let time = new Date(user.snipe[num].time).toLocaleString()
                let snipe = new Discord.MessageEmbed()
                .setColor(interaction.member.roles.highest.color)
                .setAuthor(member.name + "#" + member.tag, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`)
                .setFooter(time+`\n`+k.snipe.last+(num+1)+k.snipe.message)
                .setDescription(user.snipe[num].message)
                user.snipe[num].file.forEach(file => {
                  if(file.file != "無") snipe.setImage(file.file)
                  if(file.file != "無") {
                    snipe.addField("\n📎附件 \n", `[${file.name}](${file.file})`)}
                });
                if(all) {
                    let member = user.snipe[0].user
                    snipe.setAuthor(member.name + "#" + member.tag, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`)
                    .setDescription(user.snipe[0].message)
                    .setFooter(time)
                    let num = 1
                    await user.snipe.shift()
                    user.snipe.forEach((snipes) => {
                    num++
                    let times = new Date(snipes.time).toLocaleString()
                    snipe.addField(k.snipe.last+num+k.snipe.message +` - ${snipes.user.name}#${snipes.user.tag}`,`${snipes.message}\n${times}`)
                    });
                    return interaction.reply({embeds: [snipe],ephemeral: ephemeral})
                }else{
                    return interaction.reply({embeds: [snipe],ephemeral: ephemeral})
                }
                })
        }
    }
    /*
    "hello": {
        description: "測試",
        fun: function(client, interaction, prefix, userlang,args, ag) {

        }
    },*/
}

let userinfo = function(client, interaction,p,clientDB,userlang,args) {
    let lang = lan.zh_TW,h = infoX.zh_TW,language = userlang
    if(language === "zh_TW") {lang = lan.zh_TW;h = infoX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = infoX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = infoX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = infoX.en_US}
    var member = null,user = null;
    let iduser = null;
    if(!interaction.guild) return interaction.reply({content:"❌請在伺服器內使用",ephemeral: true})
    if(args[1] && args[1].type === "USER") {
        member = args[1].member
        user = args[1].user
    }else if(args[1] && args[1].type === "STRING") {
        iduser = interaction.guild.members.cache.get(args[1].value)
        if(iduser) member = iduser
    }else{member = interaction.member}
    let presence = null,Bott = null,time = "(未知)",time2 = "(未知)",clour = "#80ac76"
    let act = "(未知)";let gameact = null;let gameing = null;
    let member2 = member
    if(member){
    if(member.presence) {
        presence = `${member.presence.status}`
        Bott = `${member.user.bot}`
        if(member2.presence.guild) {
        clour= member2.presence.member.roles.highest.color
        if(member2.presence.guild.joinedAt) {
        let args = member2.presence.guild.joinedAt.toUTCString().split(" ")
        if(args[2] == "Jan") {var mon = lang.date.months[1]}else if(args[2] == "Feb") {var mon = lang.date.months[2]}else if(args[2] == "Mar") {var mon = lang.date.months[3]}else if(args[2] == "Apr") {var mon = lang.date.months[4]}else if(args[2] == "May") {var mon = lang.date.months[5]}else if(args[2] == "Jun") {var mon = lang.date.months[6]}else if(args[2] == "Jul") {var mon = lang.date.months[7]}else if(args[2] == "Aug") {var mon = lang.date.months[8]}else if(args[2] == "Sep") {var mon = lang.date.months[9]}else if(args[2] == "Oct") {var mon = lang.date.months[10]}else if(args[2] == "Nov") {var mon = lang.date.months[11]}else if(args[2] == "Dec") {var mon = lang.date.months[12]};if(args[0] == "Mon,") {var week = lang.date.weeks.Mon}else if(args[0] == "Tue,") {var week = lang.date.weeks.Tue}else if(args[0] == "Wed,") {var week = lang.date.weeks.Wed}else if(args[0] == "Thu,") {var week = lang.date.weeks.Thur}else if(args[0] == "Fri,") {var week = lang.date.weeks.Fir}else if(args[0] == "Sat,") {var week = lang.date.weeks.Sat}else if(args[0] == "Sun,") {var week = lang.date.weeks.Sun}
        let hor = member2.presence.guild.joinedAt.getUTCHours(8);let H = (hor+8) + args[4].substring(2);time = args[3] + " " + H + " " + mon + " " + args[1] +`${lang.date.date} `+week + " UTC+8"
        }
        if(member2.user) {
        let args2 = member2.user.createdAt.toUTCString().split(" ")
        if(args2[2] == "Jan") {var mon = lang.date.months[1]}else if(args2[2] == "Feb") {var mon = lang.date.months[2]}else if(args2[2] == "Mar") {var mon = lang.date.months[3]}else if(args2[2] == "Apr") {var mon = lang.date.months[4]}else if(args2[2] == "May") {var mon = lang.date.months[5]}else if(args2[2] == "Jun") {var mon = lang.date.months[6]}else if(args2[2] == "Jul") {var mon = lang.date.months[7]}else if(args2[2] == "Aug") {var mon = lang.date.months[8]}else if(args2[2] == "Sep") {var mon = lang.date.months[9]}else if(args2[2] == "Oct") {var mon = lang.date.months[10]}else if(args2[2] == "Nov") {var mon = lang.date.months[11]}else if(args2[2] == "Dec") {var mon = lang.date.months[12]};if(args2[0] == "Mon,") {var week = lang.date.weeks.Mon}else if(args2[0] == "Tue,") {var week = lang.date.weeks.Tue}else if(args2[0] == "Wed,") {var week = lang.date.weeks.Wed}else if(args2[0] == "Thu,") {var week = lang.date.weeks.Thur}else if(args2[0] == "Fri,") {var week = lang.date.weeks.Fir}else if(args2[0] == "Sat,") {var week = lang.date.weeks.Sat}else if(args2[0] == "Sun,") {var week = lang.date.weeks.Sun}
        let hor2 = member2.user.createdAt.getUTCHours(8);let H2 = (hor2+8) + args2[4].substring(2);time2 = args2[3] + " " + H2 + " " + mon + " " + args2[1] +`${lang.date.date} `+week + " UTC+8"
        }
    }
    if(member.presence.activities[0] != undefined) {
        if(member.presence.activities[0].name === "Custom Status") {if(member.presence.activities[0].emoji) {act = member.presence.activities[0].emoji.name+member.presence.activities[0].state}else{act =member.presence.activities[0].state}}else {act = lang.word.none}}else{act = lang.word.none;gameact = lang.word.none;gameing = ""}
        if(member.presence.activities[1] != undefined || member.presence.activities[0] != undefined) {
            if(member.presence.activities[0].name != "Custom Status") {
                let gm = member.presence.activities[0].type
                if(gm == "PLAYING") {gameing = h.user.gaming.Playing}else if(gm == "STREAMING") {gameing = h.user.gaming.Streaming}else if(gm == "LISTENING") {gameing = h.user.gaming.Listening}else if(gm == "WATCHING") {gameing = h.user.gaming.Watching}else{gameing = ""}
                gameact = member.presence.activities[0].name
            }else if(member.presence.activities[0].name != "Custom Status" ){
                let gm = member.presence.activities[1].type
                if(gm == "PLAYING") {gameing = h.user.gaming.Playing}else if(gm == "STREAMING") {gameing = h.user.gaming.Streaming}else if(gm == "LISTENING") {gameing = h.user.gaming.Listening}else if(gm == "WATCHING") {gameing = h.user.gaming.Watching}else{gameing = ""}
                gameact = member.presence.activities[1].name
                }else{gameact = lang.word.none;gameing = ""}}else{gameact = lang.word.none;gameing = ""}
    }
  if(Bott === "true") {var Bot = lang.word.yes}else if(Bott === "false") {var Bot = lang.word.no}else{var Bot = lang.word.no}
  if(interaction.guild.members.cache.has(member.id)) member2 = interaction.guild.members.cache.get(member.id);
if(presence === "online") {var online = h.status.online}else if(presence === "idle") {var online = h.status.afk}else if(presence === "dnd") {var online = h.status.dnd}else if(presence === "offline") {var online = h.status.offline}else{var online = h.status.offline}
let joindate = null;let nick = null;
if(member.id == interaction.user.id) {joindate = h.user.firstJoin}else{joindate= h.user.lastJoin}
if(member2.nickname == null) {nick = ""}else{nick = "("+member2.nickname+")"}
Mongo.loadUser(clientDB,member.id).then((user) => {
    const infoEmbed = new Discord.MessageEmbed()
  infoEmbed.setColor( clour )
  .setTitle(h.user.name +" " + member.user.username + "#" + member.user.discriminator + ` ${nick}`,true)
  .setDescription("ID:  " + member.id +`\n[[📄Link]](https://discordapp.com/users/${member.id})` ,true )
  .setThumbnail(member.user.displayAvatarURL({format: "png", dynamic: true ,size: 512}), true)
  .addField(h.user.bot , Bot ,true )
  .addField(h.user.status , online ,true)
  .addField(h.user.act, act ,true)
  .addField(h.user.gameAct, `${gameing} ${gameact}`,true)
  .setFooter(h.user.footer.user).setTimestamp()
  if(user != false) {
    let mary = [user.marry]
    if(mary != "[object Object]" || mary != "") {
        const member=client.users.cache.get(user.marry)
        if(member) {
        var mary2 = member.username+"#" + member.discriminator}else{var mary2 = h.user.emotion.alone}}else{var mary2 = h.user.emotion.alone}
        if(user.hostname != "[object Object]" || user.hostname != "") {var host = user.hostname}else{var host = h.user.emotion.none}
        if(user.petname != "[object Object]" || user.petname != "") {var pet = user.petname}else{var pet = h.user.emotion.none}
        let role = ""
        if(user.role.indexOf("S1_moneyA") != -1) {
            role = role+"[S1百萬富翁]"}
        if(user.role.indexOf("S1_moneyB") != -1) {
            role = role+"[S1富豪]"}
        if(user.role.indexOf("S1_moneyC") != -1) {
            role = role+"[S1土豪]"}
        if(user.role.indexOf("S1_rankA") != -1) {
            role = role+"[S1智乃玩弄者]"}
        if(user.role.indexOf("S1_rankB") != -1) {
            role = role+"[S1智乃愛好者]"}
        if(user.role.indexOf("S1_rankC") != -1) {
            role = role+"[S1智乃追隨者]"}
        if(user.role.indexOf("Bot_owner") != -1) {
            role = role+"[智乃開發者]"}
    infoEmbed.addField(h.user.money, user.money.toString() , false)
    .addField(h.user.emotion["?"], mary2 ,true)
    .addField(h.user.host, "឵ ឵឵" + host ,false)
    .addField(h.user.pet,"឵ ឵឵" + pet ,false)
    .setFooter(h.user.footer.user+h.user.footer.data+p+"card"+h.user.footer.data2).setTimestamp()
  }
  infoEmbed.addField(h.user.joinTime+joindate, `${time}`, false)
  .addField(h.user.createTime, `${time2}`, true)
  return interaction.reply({embeds: [infoEmbed]})})
}else{
    return interaction.reply({content:"❌找不到用戶",ephemeral: true})
}
}
let serverinfo = function(client, interaction,p,clientDB,userlang,ag) {
    let lang = lan.zh_TW,h = infoX.zh_TW,language = userlang
    if(language === "zh_TW") {lang = lan.zh_TW;h = infoX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = infoX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = infoX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = infoX.en_US}
    if(!interaction.guild) return interaction.reply({content:"❌請在伺服器內使用",ephemeral: true})
    let guild = null
    if(ag[1] && ag[1].type === "STRING") {
        guild = client.guilds.cache.get(ag[1].value)
    }else{
        guild = interaction.guild;}  
    if(!guild) return interaction.reply({content:"❌找不到伺服器",ephemeral: true})
    let args = guild.createdAt.toUTCString().split(" ")
    if(args[2] == "Jan") {var mon = lang.date.months[1]}else if(args[2] == "Feb") {var mon = lang.date.months[2]}else if(args[2] == "Mar") {var mon = lang.date.months[3]}else if(args[2] == "Apr") {var mon = lang.date.months[4]}else if(args[2] == "May") {var mon = lang.date.months[5]}else if(args[2] == "Jun") {var mon = lang.date.months[6]}else if(args[2] == "Jul") {var mon = lang.date.months[7]}else if(args[2] == "Aug") {var mon = lang.date.months[8]}else if(args[2] == "Sep") {var mon = lang.date.months[9]}else if(args[2] == "Oct") {var mon = lang.date.months[10]}else if(args[2] == "Nov") {var mon = lang.date.months[11]}else if(args[2] == "Dec") {var mon = lang.date.months[12]};if(args[0] == "Mon,") {var week = lang.date.weeks.Mon}else if(args[0] == "Tue,") {var week = lang.date.weeks.Tue}else if(args[0] == "Wed,") {var week = lang.date.weeks.Wed}else if(args[0] == "Thu,") {var week = lang.date.weeks.Thur}else if(args[0] == "Fri,") {var week = lang.date.weeks.Fir}else if(args[0] == "Sat,") {var week = lang.date.weeks.Sat}else if(args[0] == "Sun,") {var week = lang.date.weeks.Sun}
    let hor = guild.createdAt.getUTCHours(8);let H = (hor+8) + args[4].substring(2);let time = args[3] + " " + H + " " + mon + " " + args[1] +`${lang.date.date} `+week + " UTC+8"
    let rolemap = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join("\n");if (rolemap.length > 1024) rolemap = "To many roles to display";if (!rolemap) rolemap = "No roles";
    let emojilist = guild.emojis.cache.map(em => em).filter(em => !em.animated)
    let emojilist2 = guild.emojis.cache.map(em => em).filter(em => em.animated)
    var b = 1;var c = 1;
    for(let a=0;a< emojilist.length; a++) {if(b == "8") {emojilist.splice(a,0,"\n");b=1}else{;b++}}
    for(let a=0;a< emojilist2.length; a++) {if(c == "8") {emojilist2.splice(a,0,"\n");c=1}else{c++}}
    setTimeout(async() => {
        emojilist = emojilist.join(" ");
        emojilist2 = emojilist2.join(" ")
        if (guild.emojis.cache.map(em => em).filter(em => !em.animated).toString().length > 1024) emojilist = "To many emoji to display";if (!emojilist) emojilist = "No emojis";
        if (guild.emojis.cache.map(em => em).filter(em => em.animated).toString().length > 1024) emojilist2 = "To many emoji to display";if (!emojilist2) emojilist2 = "No emojis";
    let owner = await guild.fetchOwner()
    const infoEmbed = new Discord.MessageEmbed()
    .setColor('#3aad48')
    .setTitle(`${h.guild.server}` + guild.name ,true)
    infoEmbed.setDescription("ID:  " + guild.id ,true )
    infoEmbed.setThumbnail(guild.iconURL({format: "png", dynamic: true ,size: 512}), true)
    try {infoEmbed.addField(h.guild.owner, `<@${owner.user.id}> \n${owner.user.username}#${owner.user.discriminator}`, true)} catch (error) {infoEmbed.addField(h.guild.owner, h.guild.owner_error, true)} 
    infoEmbed.addField(h.guild.server +h.guild.area, `${guild.region}`, true)
    infoEmbed.addField(h.guild.avatar,"  ---->" ,true)
    infoEmbed.addField(`${h.guild.member.all}` + guild.memberCount,`${h.guild.member.member}` + guild.members.cache.filter(member =>!member.user.bot).size + `\n` + `${h.guild.member.bot} ` + guild.members.cache.filter(users =>users.user.bot).size  , true)
    try {infoEmbed.addField(h.status.member + guild.presences.cache.size,`${h.status.online} ` + guild.presences.cache.filter(user => user.member.presence.status === 'online').size + `\n` + `${h.status.afk} ` + guild.presences.cache.filter(user => user.member.presence.status === 'idle').size+ `\n` + `${h.status.dnd} ` + guild.presences.cache.filter(user => user.member.presence.status === 'dnd').size +"\n"+ `${h.status.offline} ` + guild.members.cache.filter(user => user.presence.status === 'offline').size ,true) }catch{infoEmbed.addField(h.status.member,h.status.error,true)}
    infoEmbed.addField(h.guild.channel.all + guild.channels.cache.size, h.guild.channel.category + guild.channels.cache.filter(c => c.type === "category").size + "\n" +  h.guild.channel.text + guild.channels.cache.filter(c => c.type === "text").size + '\n' + h.guild.channel.voice + guild.channels.cache.filter(c => c.type === "voice").size + '\n' + h.guild.channel.news + guild.channels.cache.filter(c => c.type === "news").size + '\n' + h.guild.channel.store + guild.channels.cache.filter(c => c.type === "store").size  , true)
    infoEmbed.addField(h.guild.emoji.all + guild.emojis.cache.size , h.guild.emoji.emoji + guild.emojis.cache.filter(emojis => !emojis.animated).size + "\n" + h.guild.emoji.gif + guild.emojis.cache.filter(emojis => emojis.animated).size,true)
    infoEmbed.addField(h.guild.boosts.all + "Lv."+guild.premiumTier, h.guild.boosts.level + guild.premiumTier + "\n" + h.guild.boosts.boost + guild.premiumSubscriptionCount,true)
    infoEmbed.addField(h.guild.role+ `${guild.roles.cache.size}`,`${rolemap}`,true)
    infoEmbed.addField(`\n${h.guild.emoji.emoji}\n`,emojilist.toString(),true)
    infoEmbed.addField(`\n${h.guild.emoji.gif}\n`,emojilist2.toString(),true)
    infoEmbed.addField(h.guild.verification, guild.verificationLevel )
    infoEmbed.addField(h.guild.createTime, time )
    return interaction.reply({embeds: [infoEmbed]})
}, 500);
}
let channelinfo = function(client, interaction,p,clientDB,userlang,ag) {
    return interaction.reply({content:"❌目前還沒實裝",ephemeral: true})
}
let roleinfo = function(client, interaction,p,clientDB,userlang,ag) {
    return interaction.reply({content:"❌目前還沒實裝",ephemeral: true})
}
let emojiinfo = function(client, interaction,p,clientDB,userlang,args) {
    const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const nameRegex = /:.+:/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    if(!args[1]) return interaction.reply({content:"❌請輸入表情符號",ephemeral: true})
    if(!args[1].value.match(hasEmoteRegex)) return interaction.reply({content:"❌找不到表情符號",ephemeral: true})
    if (emoji = emoteRegex.exec(args[1].value)) {
    const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
    return interaction.reply({content: url})
    }
    else if (emoji = animatedEmoteRegex.exec(args[1].value)) {
    const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
    return interaction.reply({content: url})
    }
    else {
        return interaction.reply({content:"❌找不到表情符號",ephemeral: true})
    }
}
const Open = new Date()
let botinfo = function(client, interaction,p,clientDB,userlang,ag,prefix) {
    let lang = lan.zh_TW,h = infoX.zh_TW,language = userlang
    if(language === "zh_TW") {lang = lan.zh_TW;h = infoX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = infoX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = infoX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = infoX.en_US}
    let Today=new Date();
    let member = client.user
    const member2 = interaction.guild.me
    let args = interaction.guild.me.joinedAt.toUTCString().split(" ")
    if(args[2] == "Jan") {var mon = lang.date.months[1]}else if(args[2] == "Feb") {var mon = lang.date.months[2]}else if(args[2] == "Mar") {var mon = lang.date.months[3]}else if(args[2] == "Apr") {var mon = lang.date.months[4]}else if(args[2] == "May") {var mon = lang.date.months[5]}else if(args[2] == "Jun") {var mon = lang.date.months[6]}else if(args[2] == "Jul") {var mon = lang.date.months[7]}else if(args[2] == "Aug") {var mon = lang.date.months[8]}else if(args[2] == "Sep") {var mon = lang.date.months[9]}else if(args[2] == "Oct") {var mon = lang.date.months[10]}else if(args[2] == "Nov") {var mon = lang.date.months[11]}else if(args[2] == "Dec") {var mon = lang.date.months[12]};if(args[0] == "Mon,") {var week = lang.date.weeks.Mon}else if(args[0] == "Tue,") {var week = lang.date.weeks.Tue}else if(args[0] == "Wed,") {var week = lang.date.weeks.Wed}else if(args[0] == "Thu,") {var week = lang.date.weeks.Thur}else if(args[0] == "Fri,") {var week = lang.date.weeks.Fir}else if(args[0] == "Sat,") {var week = lang.date.weeks.Sat}else if(args[0] == "Sun,") {var week = lang.date.weeks.Sun}
    let hor = member2.joinedAt.getUTCHours(8);let H = (hor+8) + args[4].substring(2);let time = args[3] + " " + H + " " + mon + " " + args[1] +`${lang.date.date} `+week + " UTC+8"
    let args2 = member2.user.createdAt.toUTCString().split(" ")
    if(args2[2] == "Jan") {var mon = lang.date.months[1]}else if(args2[2] == "Feb") {var mon = lang.date.months[2]}else if(args2[2] == "Mar") {var mon = lang.date.months[3]}else if(args2[2] == "Apr") {var mon = lang.date.months[4]}else if(args2[2] == "May") {var mon = lang.date.months[5]}else if(args2[2] == "Jun") {var mon = lang.date.months[6]}else if(args2[2] == "Jul") {var mon = lang.date.months[7]}else if(args2[2] == "Aug") {var mon = lang.date.months[8]}else if(args2[2] == "Sep") {var mon = lang.date.months[9]}else if(args2[2] == "Oct") {var mon = lang.date.months[10]}else if(args2[2] == "Nov") {var mon = lang.date.months[11]}else if(args2[2] == "Dec") {var mon = lang.date.months[12]};if(args2[0] == "Mon,") {var week = lang.date.weeks.Mon}else if(args2[0] == "Tue,") {var week = lang.date.weeks.Tue}else if(args2[0] == "Wed,") {var week = lang.date.weeks.Wed}else if(args2[0] == "Thu,") {var week = lang.date.weeks.Thur}else if(args2[0] == "Fri,") {var week = lang.date.weeks.Fir}else if(args2[0] == "Sat,") {var week = lang.date.weeks.Sat}else if(args2[0] == "Sun,") {var week = lang.date.weeks.Sun}
    let hor2 = member2.user.createdAt.getUTCHours(8);let H2 = (hor2+8) + args2[4].substring(2);let time2 = args2[3] + " " + H2 + " " + mon + " " + args2[1] +`${lang.date.date} `+week + " UTC+8"
    let day = (Today.getDate() - Open.getDate())
    if(Today.getHours() - Open.getHours() <0 || Today.getHours() - Open.getHours() != 0) {day -1;var hour = 24 - (Today.getHours() - Open.getHours())}else{var hour = (Today.getHours() - Open.getHours())}
    const infoEmbed = new Discord.MessageEmbed()
    .setColor('#3aad48')
    .setThumbnail(member.displayAvatarURL({format: "png", dynamic: true ,size: 512}))
    .setTitle(h.bot.info + member.username + "#" + member.discriminator ,true)
    .setDescription("ID:  " + member.id ,true )
    .addField(h.bot.prefix, prefix ,true)
    .addField(h.bot.version, `7.0` ,true)
    .addField(h.bot.from, "JS(JavaScript) / Discord.js")
    .addField(h.bot.from_version+" node.js/discord.js", "16.6.1(win7 32bit) / 13.1.0")
    .addField(h.bot.guild, `${client.guilds.cache.size}` ,true) 
    .addField(h.bot.bootup, day+lang.date.day+hour + lang.time.hour + (Today.getMinutes() - Open.getMinutes()) + lang.time.minute ,true)
    .addField(h.bot.inviteTime, `${time}`)
    .addField(h.bot.createTime, `${time2}`, true)
    .setTimestamp()
    .setFooter("◆製作者BY 苦力怕怕#8558", 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png')
    return interaction.reply({embeds: [infoEmbed]})
}