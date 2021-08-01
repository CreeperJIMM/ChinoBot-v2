const Discord = require("discord.js")
let fs =require("fs");
const lan = require('../commands/lang.json');
const gameX = require('../language/guild.json');
let code = new Set();
var loadUser = async (client,userid) => {/*讀取用戶檔案*/let dbo =client.db("mydb"),id = userid,query = { "id": id };let user = await dbo.collection("users").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeUser(client,id,data) {/*寫入用戶檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("users").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("users").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}
var loadGuild = async(client,guildid) => {/*讀取公會檔案*/let dbo =client.db("mydb"),id = guildid,query = { "id": id };let user = await dbo.collection("guilds").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeGuild(client,id,data) {/*寫入公會檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("guilds").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("guilds").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}

module.exports= {
    "setup":{
      description: {zh_TW:"設置伺服器資料",en_US:"Setup server data.",ja_JP:""},
      authority: "everyone",
      instructions: "setup [function]",
      category: "guild",
        fun: function (bot, message, p,clientDB,language,args ,nubmer, ...text) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
            if(args[0] == "text") {
                text2(bot,message,clientDB,language)
            }else if(args[0] == "voice") {
                voice(bot,message,clientDB,language)
            }else if(args[0] == "join") {
                Join(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "leave") {
                leave(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "rank") {
                rank(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "language") {
                lang(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "lang") {
                lang(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "normal") {
                nor(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "snipe") {
                setsnipe(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "safe") {
                setsafes(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "react") {
                setreact(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "slash") {
                setslash(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "prefix") {
                setprefix(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "detect") {
                  detects(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "help") {
                let sethelpEmbed = new Discord.MessageEmbed()
                .setTitle(k.setup.help)
                if(message.guild.members.cache.get("651095740390834176")) {sethelpEmbed.setDescription(k.setup.PBU)}
                sethelpEmbed.addField(`setup [${k.word.param}]`,k.setup.cmd.setup)
                sethelpEmbed.addField(k.setup.cmd.help , k.setup.cmd.help2)
                sethelpEmbed.addField(k.setup.cmd.other,k.setup.cmd.other2)
                sethelpEmbed.addField(k.setup.cmd.set,k.setup.cmd.set2)
                message.channel.send(sethelpEmbed);
            }else{
              if(!message.guild) return message.channel.send(l.error.No_DM)
              loadGuild(clientDB,message.guild.id).then((ser) => {
                if (ser === false) {          
                      message.channel.send(k.setup.create)
                      var obj = {
                        name: [message.guild.name],
                        language: {},
                        snipe: [],
                        snipeid: {},
                        snipefile: {},
                        snipetime: {},
                        rank: {},
                        rank2: [],
                        join: {},
                        join2: [],
                        leave: {},
                        leave2: [],
                        text: [],
                        voice: [],
                        text2: [],
                        voice2: [],
                        detect: {},
                        kill: []
                      };
                      var myobj = [
                        {"type":"guild" ,"id": message.guild.id, [message.guild.id]: obj}
                      ];
                    let dbo=clientDB.db("mydb")
                    dbo.collection("guilds").insertMany(myobj, function(err, res) {
                      if (err) throw err;})
                     message.channel.send(k.setup.success)
                    }else{message.channel.send(k.setup.used)}
                })
            }
        }
    },
    "text":{
        description: "測試",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "help") {
                let textEmbed = new Discord.MessageEmbed()
                .setTitle(k.help.text.title)
                .setDescription(k.help.text.desc)
                .setImage('https://cdn.discordapp.com/attachments/611040945495998464/746265308083519488/a59e501bd38b6299.gif')
                message.channel.send(textEmbed);
            }
        }
    },
    "voice":{
        description: "測試",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "help") {
                let voiceEmbed = new Discord.MessageEmbed()
                .setTitle(k.help.voice.title)
                .setDescription(k.help.voice.desc)
                .setImage('https://cdn.discordapp.com/attachments/611040945495998464/746265305042387074/1bca1519d1f116e3.gif')
                message.channel.send(voiceEmbed);
            }
        }
    },
    "join":{
      description: "測試",
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(args[0] == "help") {
              let voiceEmbed = new Discord.MessageEmbed()
              .setTitle(k.help.join.title)
              .setDescription(k.help.join.desc)
              message.channel.send(voiceEmbed);
          }
      }
  },
  "leave":{
    description: "測試",
    fun: function (bot, message, p,clientDB,language,args, ...ag) { 
      let l = lan.zh_TW,k = gameX.zh_TW
      if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
      }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(args[0] == "help") {
            let voiceEmbed = new Discord.MessageEmbed()
            .setTitle(k.help.leave.title)
            .setDescription(k.help.leave.desc)
            message.channel.send(voiceEmbed);
            }
        }
    },
    "ind":{
      description: {zh_TW:"新建動態頻道\n(必須在主動態頻道內使用)",en_US:"create dynamic channel.\n(Please use this command in master dynamic channel)",ja_JP:""},
      authority: "everyone",
      instructions: "ind",
      category: "guild",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
              loadGuild(clientDB,message.guild.id).then((user) => {
                if (user === false) {
                  message.channel.send(k.word.No_setup) }else{
                if(user.text2.indexOf(message.channel.id) != "-1") {
                  message.channel.send(k.word.crateing)
                let name = message.author.username;
                let gid = message.channel.parentID
                message.channel.clone({name: name + k.text.channel} , {type: 'text'}, {reason: '請使用 cr!clo 關閉' })
                .then(Channel => {
                  code.delete(message.author.id)
                  Channel.setParent(gid , { lockPermissions: true })
                  let id = Channel.id
                  setTimeout(() => {
                    Channel.createOverwrite(message.guild.me ,{
                      SEND_MESSAGES: true,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: true})
                    Channel.createOverwrite(message.author, {
                        SEND_MESSAGES: true,
                        MANAGE_CHANNELS: true,
                        VIEW_CHANNEL: true})}, 2000);
                  message.channel.send(k.text.crated+" <#"+ id + ">")
                  Channel.send("<@" + message.author.id + "> "+k.text.help)
                  user.text.push(Channel.id)
                  writeGuild(clientDB,message.guild.id,user).catch((err) => {
                if(err) { message.channel.send(k.word.Error_create)}})
        })}else{message.channel.send(k.text.No_create)}}});
        }
    },
    "clo":{
      description: {zh_TW:"關閉你的動態頻道\n(必須在你個人的頻道使用)",en_US:"Close your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "clo",
      category: "guild",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
          if(!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
          if(!message.channel.permissionOverwrites.get(message.author.id)) return message.channel.send(k.text.No_owner)
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {
                  message.channel.send(k.word.No_setup)
                }else{
                  var user = userInfo.toString();
                  user = JSON.parse(user);
                  if(user.text.indexOf(message.channel.id) != "-1") {message.channel.send(k.text.close)
                  setTimeout(function(){ message.channel.delete() } ,1200);
                  var array = user.text
                  var index = array.indexOf(message.channel.id)
                  if (index> -1) {array.splice(index, 1);}
                  writeGuild(clientDB,message.guild.id,user)
                }else{
                    message.channel.send(k.text.No_text)
                  }
            }
        })}
    },
    "set":{
      description: {zh_TW:"設定你的動態頻道\n(必須在你個人的頻道使用)",en_US:"setup your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "set [value]\nvalue:\n`name` setup your channel name.\n`self / open` setup your channel visible.\n`nsfw` setup your channel nsfw.",
      category: "guild",
      fun: function (bot, message, p,clientDB,language,args, ...text) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM)
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) return message.channel.send("❌發生錯誤!")
                if(user.text.indexOf(message.channel.id) != "-1") {
                  if(!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me+l.prem.manage_channel)
                  if(!message.channel.permissionOverwrites.get(message.author.id)) return message.channel.send(k.text.No_owner)
                  if(args[0] == "name") {
                    message.channel.setName(text.join(" ")).then(() => {
                    message.channel.send(k.text.set.name+ text.join(" "))}).catch(k.text.set.name_err)
                  }else if(args[0] == "self") {
                    if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) {return message.channel.send(k.text.set.no_perm)}
                    message.channel.createOverwrite(message.author, {
                      SEND_MESSAGES: true,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: true})
                      message.channel.createOverwrite(message.guild.me ,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true})
                    message.channel.createOverwrite(message.guild.roles.everyone ,{
                      SEND_MESSAGES: false,
                      VIEW_CHANNEL: false})
                    message.channel.send(k.text.set.self)
                  }else if(args[0] == "open") {
                    if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) {return message.channel.send(k.text.set.no_perm)}
                    message.channel.createOverwrite(message.author, {
                      SEND_MESSAGES: null,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: null})
                    message.channel.createOverwrite(message.guild.roles.everyone ,{
                      SEND_MESSAGES: null,
                      VIEW_CHANNEL: null})
                      message.channel.createOverwrite(message.guild.me ,{
                        SEND_MESSAGES: null,
                        VIEW_CHANNEL: null})
                    message.channel.send(k.text.set.open)
                  }else if(args[0] == "nsfw") {
                    if(!message.channel.nsfw) {message.channel.setNSFW(true,"動態權限設置")}else{message.channel.setNSFW(false,"動態權限設置")}
                    message.channel.send(k.text.set.setting)
                  }else{message.channel.send(k.text.help2)}
              }else{
                  message.channel.send(k.text.No_text)
                }
      })}
  },
    "code":{
      description: {zh_TW:"驗證指令(某些指令需要)",en_US:"verify.(some command need)",ja_JP:""},
      authority: "everyone",
      instructions: "code",
      category: "guild",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                let codeX = "CR" + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10)
              let codeEmbed = new Discord.MessageEmbed()
              .setColor('#2d9af8') .setTitle(k.code.title).setDescription(codeX).setFooter(k.code.use+message.author.username)
              message.channel.send(codeEmbed).then((ms) => {
                const filter = m => m.author.id == message.author.id;
                ms.channel.awaitMessages(filter,{max: 1, time: 10000})
                  .then(collected => {
                    if(collected.first().content != codeX) {
                      let error = new Discord.MessageEmbed().setTitle(k.code.error).setDescription(k.code.tryagain).setFooter(k.code.use+message.author.username)
                      return ms.edit(error);
                    }
                    let codeEmbed2 = new Discord.MessageEmbed()
              .setColor('#2d9af8') .setTitle(k.code.pass) .setDescription(k.code.pass2).setFooter(k.code.use+message.author.username).setTimestamp()
                ms.edit(codeEmbed2)
                code.add(message.author.id)
                collected.first().delete()
            }).catch(err => {
              let error = new Discord.MessageEmbed().setTitle(k.code.error).setDescription(k.code.tryagain).setFooter(k.code.use+message.author.username)
              ms.edit(error)
                  })
              })
        }
    },
    "snipes":{
      description: {zh_TW:"檢視前10個刪除訊息",en_US:"View top ten delete messages.",ja_JP:""},
      authority: "admin",
      instructions: "snipes",
      category: "guild",
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM);
        if(!message.member.hasPermission(['MENTION_EVERYONE'])) if(message.author.id == '546144403958398988') {}else{return message.channel.send("❌你沒有足夠的權限去察看這個.")}
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) {return message.channel.send(k.snipe.no_support)}
          var text = JSON.stringify(user.snipe);var text2 = text.toString();text2 = JSON.parse(text2);
          var textid = JSON.stringify(user.snipeid);var textid2 = textid.toString();textid2 = JSON.parse(textid2);
          var texttime = JSON.stringify(user.snipetime);var texttime2 = texttime.toString();texttime2 = JSON.parse(texttime2);
          var textfile = JSON.stringify(user.snipefile);var textfile2 = textfile.toString();textfile2 = JSON.parse(textfile2);
          if(text2.t1 == "[object Object]" || text2.t1 == "") return message.channel.send(k.snipe.no_snipe)
          const member=bot.users.cache.get(textid2.t1)
          const member2=bot.users.cache.get(textid2.t2)
          const member3=bot.users.cache.get(textid2.t3)
          const member4=bot.users.cache.get(textid2.t4)
          const member5=bot.users.cache.get(textid2.t5)
          const member6=bot.users.cache.get(textid2.t6)
          const member7=bot.users.cache.get(textid2.t7)
          const member8=bot.users.cache.get(textid2.t8)
          const member9=bot.users.cache.get(textid2.t9)
          const member10=bot.users.cache.get(textid2.t10)
          if(member) {
            let snipe = new Discord.MessageEmbed()
            .setColor(message.member.roles.highest.color)
            .setAuthor(member.username + "#" + member.discriminator, member.displayAvatarURL({format: "webp", dynamic: true ,size: 512}))
            .setFooter(texttime2.t1)
           var file = JSON.stringify(textfile2.t1)
           var file2 = file.toString()
           file2 = JSON.parse(file2);
             if(file2.file != "無") snipe.setImage(file2.file)
              snipe.setDescription(text2.t1)
              if(member2) {snipe.addField(k.snipe.last+"2"+k.snipe.message +" - " + member2.username + "#" + member2.discriminator, text2.t2 +"\n"+texttime2.t2)}
              if(member3) {snipe.addField(k.snipe.last+"3"+k.snipe.message +" - " + member3.username + "#" + member3.discriminator, text2.t3+"\n"+texttime2.t3)}
              if(member4) {snipe.addField(k.snipe.last+"4"+k.snipe.message +" - "+ member4.username + "#" + member4.discriminator, text2.t4+"\n"+texttime2.t4)}
              if(member5) {snipe.addField(k.snipe.last+"5"+k.snipe.message +" - "+ member5.username + "#" + member5.discriminator, text2.t5+"\n"+texttime2.t5)}
              if(member6) {snipe.addField(k.snipe.last+"6"+k.snipe.message+" - "+ member6.username + "#" + member6.discriminator, text2.t6+"\n"+texttime2.t6)}
              if(member7) {snipe.addField(k.snipe.last+"7"+k.snipe.message+" - "+ member7.username + "#" + member7.discriminator, text2.t7+"\n"+texttime2.t7)}
              if(member8) {snipe.addField(k.snipe.last+"8"+k.snipe.message +" - "+ member8.username + "#" + member8.discriminator, text2.t8+"\n"+texttime2.t8)}
              if(member9) {snipe.addField(k.snipe.last+"9"+k.snipe.message +" - "+ member9.username + "#" + member9.discriminator, text2.t9+"\n"+texttime2.t9)}
              if(member10) {snipe.addField(k.snipe.last+"10"+k.snipe.message +" - "+ member10.username + "#" + member10.discriminator, text2.t10+"\n"+texttime2.t10)}
              if(file2.file != "無") {
                snipe.addField("\n\n"+k.snipe.file+" \n", `[${file2.name}](${file2.file})`)}
            message.channel.send(snipe)}})
      }
    },
    "snipe":{
      description: {zh_TW:"檢視上一個刪除訊息",en_US:"View last delete message.",ja_JP:""},
      authority: "everyone",
      instructions: "snipe [number＊]",
      category: "guild",
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM);
        if(args[0] == " " || args[0] == null) {
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {return message.channel.send(k.snipe.no_support)}
            if(user.language.setting) {
              if(!user.language.setting.snipe) return message.channel.send(k.snipe.close_snipe)
            }
            var text = JSON.stringify(user.snipe);var text2 = text.toString();text2 = JSON.parse(text2);
            var textid = JSON.stringify(user.snipeid);var textid2 = textid.toString();textid2 = JSON.parse(textid2);
            var texttime = JSON.stringify(user.snipetime);var texttime2 = texttime.toString();texttime2 = JSON.parse(texttime2);
            var textfile = JSON.stringify(user.snipefile);var textfile2 = textfile.toString();textfile2 = JSON.parse(textfile2);
            if(text2.t1 == "[object Object]" || text2.t1 == "") return message.channel.send(k.snipe.no_snipe)
            const member=bot.users.cache.get(textid2.t1)
            if(member) {
              let snipe = new Discord.MessageEmbed()
              .setColor(message.member.roles.highest.color)
              .setAuthor(member.username + "#" + member.discriminator, member.displayAvatarURL({format: "webp", dynamic: true ,size: 512}))
              .setFooter(texttime2.t1)
             var file = JSON.stringify(textfile2.t1)
             var file2 = file.toString()
             file2 = JSON.parse(file2);
               if(file2.file != "無") snipe.setImage(file2.file)
                snipe.setDescription(text2.t1)
                if(file2.file != "無") {
                  snipe.addField("\n📎附件 \n", `[${file2.name}](${file2.file})`)}
              message.channel.send(snipe)}})
          }else{
          if(isNaN(args[0]) === true) {return message.channel.send(l.error.type_number)}
          if(args[0] > 10) {return message.channel.send(l.error.less_then+"10")}
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {return message.channel.send(k.snipe.no_support)}
            var text = JSON.stringify(user.snipe);var text2 = text.toString();text2 = JSON.parse(text2);
            var textid = JSON.stringify(user.snipeid);var textid2 = textid.toString();textid2 = JSON.parse(textid2);
            if(text2.t1 == "[object Object]" || text2.t1 == "") return message.channel.send(k.snipe.no_snipe)
            var texttime = JSON.stringify(user.snipetime);var texttime2 = texttime.toString();texttime2 = JSON.parse(texttime2);
            var textfile = JSON.stringify(user.snipefile);var textfile2 = textfile.toString();textfile2 = JSON.parse(textfile2);
            if(args[0] == "1") {var text0 = text2.t1}else if(args[0] == "2") {var text0 = text2.t2}else if(args[0] == "3") {var text0 = text2.t3}else if(args[0] == "4") {var text0 = text2.t4}else if(args[0] == "5") {var text0 = text2.t5}else if(args[0] == "6") {var text0 = text2.t6}else if(args[0] == "7") {var text0 = text2.t7}else if(args[0] == "8") {var text0 = text2.t8}else if(args[0] == "9") {var text0 = text2.t9}else if(args[0] == "10") {var text0 = text2.t10}      
            if(args[0] == "1") {var text1 = textid2.t1}else if(args[0] == "2") {var text1 = textid2.t2}else if(args[0] == "3") {var text1 = textid2.t3}else if(args[0] == "4") {var text1 = textid2.t4}else if(args[0] == "5") {var text1 = textid2.t5}else if(args[0] == "6") {var text1 = textid2.t6}else if(args[0] == "7") {var text1 = textid2.t7}else if(args[0] == "8") {var text1 = textid2.t8}else if(args[0] == "9") {var text1 = textid2.t9}else if(args[0] == "10") {var text1 = textid2.t10} 
            if(args[0] == "1") {var text22 = texttime2.t1}else if(args[0] == "2") {var text22 = texttime2.t2}else if(args[0] == "3") {var text22 = texttime2.t3}else if(args[0] == "4") {var text22 = texttime2.t4}else if(args[0] == "5") {var text22 = texttime2.t5}else if(args[0] == "6") {var text22 = texttime2.t6}else if(args[0] == "7") {var text22 = texttime2.t7}else if(args[0] == "8") {var text22 = texttime2.t8}else if(args[0] == "9") {var text22 = texttime2.t9}else if(args[0] == "10") {var text22 = texttime2.t10} 
            if(args[0] == "1") {var text3 = textfile2.t1}else if(args[0] == "2") {var text3 = textfile2.t2}else if(args[0] == "3") {var text3 = textfile2.t3}else if(args[0] == "4") {var text3 = textfile2.t4}else if(args[0] == "5") {var text3 = textfile2.t5}else if(args[0] == "6") {var text3 = textfile2.t6}else if(args[0] == "7") {var text3 = textfile2.t7}else if(args[0] == "8") {var text3 = textfile2.t8}else if(args[0] == "9") {var text3 = textfile2.t9}else if(args[0] == "10") {var text3 = textfile2.t10}
            if(text0 == "[object Object]" || text0 == " " || text0 == null) return message.channel.send(k.snipe.no_fond +args[0]+k.snipe.message2)
            if(text1 == "[object Object]" || text1 == " "|| text1 == null) return message.channel.send(k.snipe.no_fond +args[0]+k.snipe.message2)
            if(text22 == "[object Object]" || text22 == " "|| text22 == null) return message.channel.send(k.snipe.no_fond +args[0]+k.snipe.message2)
            const member=bot.users.cache.get(text1)
            if(member) {
              let snipe = new Discord.MessageEmbed()
              .setColor(message.member.roles.highest.color)
              .setAuthor(member.username + "#" + member.discriminator, member.displayAvatarURL({format: "webp", dynamic: true ,size: 512}))
              .setFooter(text22)
             var file = JSON.stringify(text3)
             var file2 = file.toString()
             file2 = JSON.parse(file2);
               if(file2.file != "無") snipe.setImage(file2.file)
                snipe.setDescription(text0)
                if(file2.file != "無") {
                  snipe.addField("\n"+k.snipe.file2+" \n", `[${file2.name}](${file2.file})`)}
              message.channel.send(snipe)
            }})}
          }
    },
    "server":{
      description: {zh_TW:"伺服器總體資料",en_US:"Show server data.",ja_JP:""},
      authority: "everyone",
      instructions: "server",
      category: "guild",
      fun: async function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM);
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) {return message.channel.send(k.word.No_setup)}
          let args = message.channel.guild.createdAt.toUTCString().split(" ")
          if(args[2] == "Jan") {var mon = l.date.months[1]}else if(args[2] == "Feb") {var mon = l.date.months[2]}else if(args[2] == "Mar") {var mon = l.date.months[3]}else if(args[2] == "Apr") {var mon = l.date.months[4]}else if(args[2] == "May") {var mon = l.date.months[5]}else if(args[2] == "Jun") {var mon = l.date.months[6]}else if(args[2] == "Jul") {var mon = l.date.months[7]}else if(args[2] == "Aug") {var mon = l.date.months[8]}else if(args[2] == "Sep") {var mon = l.date.months[9]}else if(args[2] == "Oct") {var mon = l.date.months[10]}else if(args[2] == "Nov") {var mon = l.date.months[11]}else if(args[2] == "Dec") {var mon = l.date.months[12]};if(args[0] == "Mon,") {var week = l.date.weeks.Mon}else if(args[0] == "Tue,") {var week = l.date.weeks.Tue}else if(args[0] == "Wed,") {var week = l.date.weeks.Wed}else if(args[0] == "Thu,") {var week = l.date.weeks.Thur}else if(args[0] == "Fri,") {var week = l.date.weeks.Fir}else if(args[0] == "Sat,") {var week = l.date.weeks.Sat}else if(args[0] == "Sun,") {var week = l.date.weeks.Sun}
          let hor = message.channel.guild.createdAt.getUTCHours(8);let H = (hor+8) + args[4].substring(2);let time = args[3] + " " + H + " " + mon + " " + args[1] +`${l.date.date} `+week + " UTC+8"
          var text = JSON.stringify(user.snipe);var text2 = text.toString();text2 = JSON.parse(text2);
          var textid = JSON.stringify(user.snipeid);var textid2 = textid.toString();textid2 = JSON.parse(textid2);
          if(text2.t1 == "[object Object]" || text2.t1 == "" || text2.t1 == null) {var snipe = "沒有"}else{var snipe = text2.t1}
          let server = new Discord.MessageEmbed()
          .setColor(message.member.roles.highest.color)
          .setTitle( message.guild.name + k.server.title)
          .setDescription("ID:  " + message.guild.id)
          if(user.language.lan) {if(user.language.lan == "zh_TW") {server.addField(k.server.lang, "繁體中文",true)}else if(user.language.lan == "en_US") {server.addField(k.server.lang, "English",true)}else if(user.language.lan == "ja_JP") {server.addField(k.server.lang, "日本語",true)}else if(user.language.lan == "zh_CN") {server.addField(k.server.lang, "简体中文",true)}}else{server.addField(k.server.lang, k.server.default+"(中文)",true)}
          server.addField(k.server.delmeg," <@" + textid2.t1 + "> \n◆"+snipe,true)
          server.addField(k.server.member, message.guild.memberCount,true)
          try{server.addField(k.server.owner," <@" + message.guild.owner.user.id + "> \n◆" + `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,true)}catch{server.addField(k.server.owner,"發生錯誤QwQ",true)}
          if(user.language.run) {if(user.language.run == "1") {server.addField(k.server.detect, "智乃小幫手#5407",true)}else if(user.language.run == "2") {server.addField(k.server.detect, "智乃小幫手2#5127",true)}}else{server.addField(k.server.detect, k.server.default,true)}
          let snipes = `(${k.server.prest})開啟`,safe = `(${k.server.prest})開啟`,react= `(${k.server.prest})開啟`,slash= `(${k.server.prest})開啟`
          if(user.language) {
          if(user.language.setting) {
          if(user.language.setting.snipe != null) {if(user.language.setting.snipe) {snipes = k.server.on}else{snipes = k.server.off}}
          if(user.language.setting.safe  != null) {if(user.language.setting.safe) {safe = k.server.on}else{safe = k.server.off}}
          if(user.language.setting.react != null) {if(user.language.setting.react) {react = k.server.on}else{react = k.server.off}}
          if(user.language.setting.slash != null) {if(user.language.setting.slash) {slash = k.server.on}else{slash = k.server.off}}
          }}
          server.addField(k.server.setting,`[${k.server.set.snipe}]: ${snipes}\n[${k.server.set.safe}]: ${safe}\n[${k.server.set.react}]: ${react}\n[${k.server.set.slash}]: ${slash}`,false)
          let joinid = l.word.none,leaveid= l.word.none
          if(user.join.toString() == "[object Object]" || user.join[0] == undefined) {}else {joinid = user.join}
          if(user.leave.toString() == "[object Object]" || user.leave[0] == undefined) {}else {leaveid = user.leave}
          server.addField(k.server.join," <#" + joinid + "> \n◆"+user.join2,false)
          server.addField(k.server.leave," <#" + leaveid + "> \n◆"+user.leave2,false)
          server.addField(k.server.levelup, "◆"+user.rank2,true)
          server.addField(k.server.createTime, time)
          message.channel.send(server)
        })
      }
    },
    /*
                    name: [message.author.username],
                user: {username: message.author.username,id: message.author.id ,avatar: message.author.avatar,locale: message.author.locale},
                guild: [message.guild.id],
                language: {},
                money: 0,
                usemoney: 0,
                rank: 0,
                guildrank: [],
                exp: 0,
                guildxep: [],
                marry: {},
                host: [],
                hostname: "",
                pet: [],
                petname: "",
                sex: {},
                age: {},
                chino: 0,
                cocoa: 0,
                tippy: 0,
                other: 0,
                work: 0,
                worktoal: { time: 0, work: 0 },
                picture: { love: [] },
                bank: 0,
                adv: [],
                role: [],
                item: [],
                bag: [],
                time: [time],
                ver: "6.1a(7/11)"
    */
    "updateuserx": {
      description: "更新",
      fun: function(bot, message, p,clientDB,language,args, ...ag) { 
          if(message.author.id !== '546144403958398988') return;
            /*讀取用戶檔案*/
            let dbo =clientDB.db("mydb"),query = { "type": "user" },up = 0
            dbo.collection("users").find(query).toArray(function(err, result) {
              result = Object.keys(result).map((key) => [result[key]]);
               for (let file of result) {
                   file = file[0]
                  let id= file.id
                  let user = file[id]
                      user.user = {username: user.name[0],id: id,avatar: "",locale: ""}
                      user.money = 0
                      user.rank = 0
                      user.exp = 0
                      user.picture = {love: []}
                      user.role = []
                      user.ver = "6.1a(7/11)"
                      writeUser(clientDB,id,user)
                      up++
               }
              })
              message.channel.send("已成功更新所有成員Json! " + up)}
      },
      "updateroles": {
        description: "更新",
        fun: function(bot, message, p,clientDB,language,args, ...ag) { 
            if(message.author.id !== '546144403958398988') return;
              /*讀取用戶檔案*/

              let money1 = ["608553248194035732","794841219096248330","752902409214230669"]
              let money2 = ["843089603719462942","682866707131662337","445021545686106114","742265285234393168","341935560971124738","679721982803443904","597430718359928832"]
              let money3 = ["821508148078313513","387573599919276032","836932004330340382","688061960956149834","177017566982701056","561152494189805588","691701076247838811","605007875647209472"]

              let rank1 = ["177017566982701056","597430718359928832","569798889197010955","387573599919276032","546144403958398988"]
              let rank2 = ["421585674710286337","631142240596525056","605007875647209472","458988300418416640","642185517768638504"]
              let rank3 = ["482413104286924820","459665834210623498","725022628133339177","694621701429919794","691701076247838811","573748486781272074","652423474270437378","654469005087604766","316141566173642752","653484046638383104"]
              let dbo =clientDB.db("mydb"),query = { "type": "user" },up = 0
              dbo.collection("users").find(query).toArray(function(err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                 for (let file of result) {
                     file = file[0]
                    let id= file.id
                    let user = file[id]
                    user.role = []
                    if(money1.indexOf(id) != -1) {
                      user.role.push("S1_moneyA")
                    }else if(money2.indexOf(id) != -1) {
                      user.role.push("S1_moneyB")
                    }else if(money3.indexOf(id) != -1) {
                      user.role.push("S1_moneyC")
                    }
                    if(rank1.indexOf(id) != -1) {
                      user.role.push("S1_rankA")
                    }else if(rank2.indexOf(id) != -1) {
                      user.role.push("S1_rankB")
                    }else if(rank3.indexOf(id) != -1) {
                      user.role.push("S1_rankC")
                    }
                    if(id === "546144403958398988") {
                      user.role.push("Bot_owner")
                    }

                        writeUser(clientDB,id,user)
                        up++
                 }
                 message.channel.send("已成功更新所有成員Json! " + up)
                })
                
              }
        },
}
async function lang(bot,message,clientDB,language,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+" `[zh_TW / en_US]`")
    if(args[1] === "zh_TW") {
      let nor2 = ser.language.run
      let set = ser.language.setting
    ser.language = {lan: "zh_TW",run: nor2,setting: set}
    writeGuild(clientDB,message.guild.id,ser)
    message.channel.send("✅伺服器已設置成中文")
  }else if(args[1] === "en_US") {
    let nor2 = ser.language.run
    let set = ser.language.setting
    ser.language = {lan: "en_US",run: nor2,setting: set}
    writeGuild(clientDB,message.guild.id,ser)
    message.channel.send("✅Has been set to English in guild.")
  }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[zh_TW / en_US]`")}
  })
}
async function nor(bot,message,clientDB,language,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+" `[1 / 2]`")
    if(args[1] === "1") {
      let lan2 = ser.language.lan
      let set = ser.language.setting
      ser.language = {lan: lan2,run: 1,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.detcet+"`智乃小幫手#5407`"+k.word2.detcet2)
    }else if(args[1] === "2") {
      let lan2 = ser.language.lan
      let set = ser.language.setting
      ser.language = {lan: lan2,run: 2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.detcet+"`智乃小幫手2#5127`"+k.word2.detcet2)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[1 / 2]`")}
  })
}
async function setsnipe(bot,message,clientDB,language,prefix,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+"```\n[true / false]```")
    if(args[1] === "true") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.snipe = true
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.snipe_on)
    }else if(args[1] === "false") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.snipe = false
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.snipe_off)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[true / false]`")}
  })
}
async function setsafes(bot,message,clientDB,language,prefix,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+"```\n[true / false]```")
    if(args[1] === "true") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.safe = true
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.safe_on)
    }else if(args[1] === "false") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.safe = false
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.safe_off)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[true / false]`")}
  })
}
async function setreact(bot,message,clientDB,language,prefix,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+"```\n[true / false]```")
    if(args[1] === "true") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.react = true
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.react_on)
    }else if(args[1] === "false") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.react = false
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.react_off)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[true / false]`")}
  })
}
async function setslash(bot,message,clientDB,language,prefix,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+"```\n[true / false]```")
    if(args[1] === "true") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set){ set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.slash = true
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.slash_on)
    }else if(args[1] === "false") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.slash = false
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.slash_off)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[true / false]`")}
  })
}
async function setprefix(bot,message,clientDB,language,prefix,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) {return message.channel.send(k.word.No_setup)}
    if(args[1] === "" || args[1] === null) return message.channel.send(k.word.please_type+"```\n[ rest ] or [ Custom prefix ]```")
    let prex = ""
    if(ser.language.lan) {prex = ser.language.lan}else{prex = "cr!"}
    if(args[1] === "rest" || args[1] === "null") {
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.prefix = prex
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.prefix_update + prex )
    }else if(args[1] != null || args[1] != "") {
      if(args[1].length > 8) return message.channel.send(l.error.less_then + "`8` word.")
      let lan2 = ser.language.lan
      let nor2 = ser.language.run
      let set = ser.language.setting
      if(!set) { set = {"snipe":null,"react":null,"safe":null,"prefix": prefix,"slash":null} }
      set.prefix = args[1]
      ser.language = {lan: lan2,run: nor2,setting: set}
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.prefix_update + args[1] + k.word2.prefix_tip)
    }else{message.channel.send(k.word.error_type_in+"\n"+k.word.please_type+" `[rest / custom_prefix]`")}
  })
}
////////////////////////
async function detects(bot,message,clientDB,language,args,number, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if(!message.guild) return message.channel.send(l.error.No_DM)
  if(!message.guild.me.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.hasPermission(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
  loadGuild(clientDB,message.guild.id).then((ser) => {
    if (ser === false) return message.channel.send(k.word.No_setup);
    let channel = null;
    if(message.mentions.channels.first()) {
      channel = message.mentions.channels.first().id
    }else if(message.guild.channels.cache.get(args[1])) {
      channel = args[1]
    }else{
      ser.detect = ""
      writeGuild(clientDB,message.guild.id,ser)
      message.channel.send(k.word2.msg_detect_off)
    }
    if(message.guild.channels.cache.get(channel)) {
    ser.detect = channel
    writeGuild(clientDB,message.guild.id,ser)
    message.channel.send(k.word2.msg_detect_set+" <#"+channel+">")
    }
  })
}
async function text2(bot,message,clientDB,language) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    if(!code.has(message.author.id)) {message.channel.send(k.word.No_code)}else{
    if(message.member.hasPermission(['MANAGE_CHANNELS'])) {
        if(message.guild.me.hasPermission(['MANAGE_CHANNELS'])) {
          code.delete(message.author.id)
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {
          message.channel.send(k.word.No_setup)
        }else{message.channel.send(k.word.crateing)
        message.guild.channels.create("動態文字頻道" , {type: 'category', reason: '' })
        .then(Channel => {
          let gid = Channel.id
          message.guild.channels.create("新增頻道" , {type: 'text', reason: '請使用 cr!clo 關閉' })
          .then(c => {
          c.setParent(gid , { lockPermissions: false })
            let id = c.id
          message.channel.send(k.word2.created_channel+" <#"+ id + ">")
          c.send("<@" + message.author.id + "> "+k.word2.created_channel2)
          user.text2 = []
          user.text2.push(c.id)
          writeGuild(clientDB,message.guild.id,user).catch((err) => {
        if(err) { message.channel.send(k.word.Error_create)}})
        })})}
})}else{
  message.channel.send(l.error.No_perm_me +```${l.prem.manage_channel}```);
}}else{
  message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2);
}}}
async function voice(bot,message,clientDB,language) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    if(!code.has(message.author.id)) {message.channel.send(k.word.No_code)}else{
    if(message.member.hasPermission(['MANAGE_CHANNELS'])) {
        if(message.guild.me.hasPermission(['MANAGE_CHANNELS'])) {
          code.delete(message.author.id)
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {
          message.channel.send(k.word.No_setup)
        }else{message.channel.send(k.word.crateing)
        message.guild.channels.create("動態語音頻道" , {type: 'category', reason: '' })
        .then(Channel => {
          let gid = Channel.id
          message.guild.channels.create("新增頻道" , {type: 'voice', reason: '請使用 cr!clo 關閉'})
          .then(c => {
          c.setParent(gid , { lockPermissions: false })
          c.edit({userLimit: 1})
            let id = c.id
          message.channel.send(k.word2.created_channel+" <#"+ id + ">")
          user.voice2 = []
          user.voice2.push(c.id)
          writeGuild(clientDB,message.guild.id,user)
    })})}
    })}else{
        message.channel.send(l.error.No_perm_me +```${l.prem.manage_channel}```);
      }}else{
        message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2);
}}}
async function Join(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+" 100")
    return;}
    if(!code.has(message.author.id)) {message.channel.send(k.word.No_code)}else{
        if(message.member.hasPermission(['MANAGE_CHANNELS'])) {
        code.delete(message.author.id)
        if(text.join(" ").toLowerCase().includes('<script>')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").toLowerCase().includes('</script>')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").includes('%3Cscript%3E')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").toLowerCase().includes('<img')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) {
                    message.channel.send(k.word.No_setup)
                  }else{
                    if(text.join(" ") === "" || text.join(" ") === null) {
                      user.join = []
                      user.join2 = []
                      writeGuild(clientDB,message.guild.id,user)
                      return message.channel.send(k.word2.join_off)
                    }
                    message.channel.send(k.word2.join_ing)
                    user.join = []
                    user.join2 = []
                    user.join = message.channel.id
                    user.join2.push(text.join(" "))
                    writeGuild(clientDB,message.guild.id,user)
                    var send = text.join(" ").replace(`{member}` , + message.guild.memberCount + "").replace(`{user}` , " " + " <@" + message.author.id + "> " + "").replace(`{server}` , " " + message.guild.name + "")
                    message.channel.send(k.word2.join_set + send)
                    }}
  )}else{
    message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2)}}
}
async function leave(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+" 100")
    return;}
    if(!code.has(message.author.id)) {message.channel.send(k.word.No_code)}else{
    if(message.member.hasPermission(['MANAGE_CHANNELS'])) {
        code.delete(message.author.id)
        if(text.join(" ").toLowerCase().includes('<script>')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").toLowerCase().includes('</script>')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").includes('%3Cscript%3E')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        if(text.join(" ").toLowerCase().includes('<img')) return message.channel.send(l.error.type_text+ "`Has Illegal text`")
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) {
                    message.channel.send(k.word.No_setup)
                  }else{
                    if(text.join(" ") === "" || text.join(" ") === null) {
                      user.leave = []
                      user.leave2 = []
                      writeGuild(clientDB,message.guild.id,user)
                      return message.channel.send(k.word2.leave_off)
                    }
                    message.channel.send(k.word2.leave_ing)
                    user.leave = []
                    user.leave2 = []
                    user.leave = message.channel.id
                    user.leave2.push(text.join(" "))
                    writeGuild(clientDB,message.guild.id,user)
                    var send = text.join(" ").replace(`{member}` , + message.guild.memberCount + "").replace(`{user}` , " " + " <@" + message.author.id + "> " + "").replace(`{server}` , " " + message.guild.name + "")
                    message.channel.send(k.word2.join_set + send)
                    }}
  )}else{
    message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2)}}
}
async function rank(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+"100")
    return;}
  if(!code.has(message.author.id)) {message.channel.send(k.word.No_code)}else{
  if(message.member.hasPermission(['MANAGE_CHANNELS'])) {
      code.delete(message.author.id)
      loadGuild(clientDB,message.guild.id).then((user) => {
        if (user === false) {
                  message.channel.send(k.word.No_setup)
                }else{
                  if(text.join(" ") === "" || text.join(" ") === null) {
                    user.rank = []
                    user.rank2 = []
                    var str = JSON.stringify(user);
                    writeGuild(clientDB,message.guild.id,user)
                    return message.channel.send(k.word2.rank_off)
                  }
                  message.channel.send(k.word2.rank_ing)
                  user.rank = []
                  user.rank2 = []
                  user.rank = message.channel.id
                  user.rank2.push(text.join(" "))
                  var str = JSON.stringify(user);
                  writeGuild(clientDB,message.guild.id,user)
                  var send = text.join(" ").replace(`{rank}` , + "**1**" + "").replace(`{user}` , " " + " <@" + message.author.id + "> " + "").replace(`{server}` , " " + message.guild.name + "")
                  message.channel.send(k.word2.rank_set + send)
                  }}
)}else{
  message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2);}}
}