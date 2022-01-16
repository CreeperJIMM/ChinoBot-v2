const { setupMaster } = require("cluster");
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
      vote: false,
      help: true,
        fun: function (bot, message, p,clientDB,language,args ,nubmer, ...text) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
            if(args[0] == "text") {
              return text2(bot,message,clientDB,language)
            }else if(args[0] == "voice") {
              return voice(bot,message,clientDB,language)
            }else if(args[0] == "join") {
              return Join(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "leave") {
              return leave(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "rank") {
              return rank(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "language") {
              return lang(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "lang") {
              return lang(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "normal") {
              return nor(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "snipe") {
              return setsnipe(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "safe") {
              return setsafes(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "react") {
              return setreact(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "slash") {
              return setslash(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "prefix") {
              return setprefix(bot,message,clientDB,language,p,args, nubmer, ...text)
            }else if(args[0] == "detect") {
              return detects(bot,message,clientDB,language,args, nubmer, ...text)
            }else if(args[0] == "help") {
                let sethelpEmbed = new Discord.MessageEmbed()
                .setTitle(k.setup.help)
                if(message.guild.members.cache.get("651095740390834176")) {sethelpEmbed.setDescription(k.setup.PBU)}
                sethelpEmbed.addField(`setup [${k.word.param}]`,k.setup.cmd.setup)
                sethelpEmbed.addField(k.setup.cmd.help , k.setup.cmd.help2)
                sethelpEmbed.addField(k.setup.cmd.other,k.setup.cmd.other2)
                sethelpEmbed.addField(k.setup.cmd.set,k.setup.cmd.set2)
                return message.channel.send({embeds:[sethelpEmbed]});
            }else{
              if(!message.guild) return message.channel.send(l.error.No_DM)
              loadGuild(clientDB,message.guild.id).then((ser) => {
                if (ser === false) {          
                      message.channel.send(k.setup.create)
                      var obj = {
                        name: [message.guild.name],
                        language: {},
                        snipe: [],
                        edit: [],
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
                      if (err) throw err;
                    })
                      return message.channel.send(k.setup.success);
                    }else{
                      return message.channel.send(k.setup.used);
                    }
                })
            }
        }
    },
    "text":{
        description: "測試",
        vote: false,
        help: true,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "help") {
                let textEmbed = new Discord.MessageEmbed()
                .setTitle(k.help.text.title)
                .setDescription(k.help.text.desc)
                .setImage('https://cdn.discordapp.com/attachments/611040945495998464/746265308083519488/a59e501bd38b6299.gif')
                return message.channel.send({embeds: [textEmbed]});
            }
        }
    },
    "voice":{
        description: "測試",
        vote: false,
        help: true,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "help") {
                let voiceEmbed = new Discord.MessageEmbed()
                .setTitle(k.help.voice.title)
                .setDescription(k.help.voice.desc)
                .setImage('https://cdn.discordapp.com/attachments/611040945495998464/746265305042387074/1bca1519d1f116e3.gif')
                return message.channel.send({embeds: [voiceEmbed]});
            }
        }
    },
    "join":{
      description: "測試",
      vote: false,
      help: true,
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(args[0] == "help") {
              let voiceEmbed = new Discord.MessageEmbed()
              .setTitle(k.help.join.title)
              .setDescription(k.help.join.desc)
              return message.channel.send({embeds: [voiceEmbed]});
          }
      }
  },
  "leave":{
    description: "測試",
    vote: false,
    help: true,
    fun: function (bot, message, p,clientDB,language,args, ...ag) { 
      let l = lan.zh_TW,k = gameX.zh_TW
      if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
      }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(args[0] == "help") {
            let voiceEmbed = new Discord.MessageEmbed()
            .setTitle(k.help.leave.title)
            .setDescription(k.help.leave.desc)
            return message.channel.send({embeds: [voiceEmbed]});
            }
        }
    },
    "ind":{
      description: {zh_TW:"新建動態頻道\n(必須在主動態頻道內使用)",en_US:"create dynamic channel.\n(Please use this command in master dynamic channel)",ja_JP:""},
      authority: "everyone",
      instructions: "ind",
      category: "guild",
      vote: false,
      help: false,
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
                let gid = message.channel.parentId
                let site = message.channel.parent.children.size
                message.channel.clone({name: name + k.text.channel,type: 'text',reason: '請使用 cr!clo 關閉',position: site})
                .then(Channel => {           
                  Channel.setParent(gid , { lockPermissions: true })
                  let id = Channel.id
                  setTimeout(() => {
                    Channel.permissionOverwrites.create(message.guild.me ,{
                      SEND_MESSAGES: true,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: true})
                    Channel.permissionOverwrites.create(message.author, {
                        SEND_MESSAGES: true,
                        MANAGE_CHANNELS: true,
                        VIEW_CHANNEL: true})}, 2000);
                        Channel.setPosition(site)
                  message.channel.send(k.text.crated+" <#"+ id + ">")
                  Channel.send("<@" + message.author.id + "> "+k.text.help)
                  user.text.push(Channel.id)
                  writeGuild(clientDB,message.guild.id,user)
        })}else{
          return message.channel.send(k.text.No_create)}
        }})
      }
    },
    "thcreate":{
      description: {zh_TW:"新建討論串頻道\n(必須在主動態頻道內使用)",en_US:"create dynamic channel.\n(Please use this command in master dynamic channel)",ja_JP:""},
      authority: "everyone",
      instructions: "create",
      category: "guild",
      vote: false,
      help: false,
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
                  setTimeout(() => {
                    let name = message.author.username;
                    let gid = message.channel.parentId
                    let site = message.channel.parent.children.size
                      message.channel.threads.create({
                        name: name + k.text.channel,
                        autoArchiveDuration: 1440,
                        reason: '請用 `cr!thclose` 關閉',
                      }).then((thread) =>{
                        thread.send(`<@${message.author.id}> `+k.text.crated+"\n使用 `cr!thsave` 將討論串存檔\n使用 `cr!thclose` 刪除討論串")
                        let thobj = {id: thread.id,owner: message.author.id,saved: false}
                        if(!user.thread) user.thread = []
                        user.thread.push(thobj)
                        writeGuild(clientDB,message.guild.id,user)
                    })              
                  }, 800);
              }else{
          return message.channel.send(k.text.No_create)}
        }})
      }
    },
    "thclose":{
      description: {zh_TW:"關閉你的動態頻道\n(必須在你個人的頻道使用)",en_US:"Close your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "clo",
      category: "guild",
      vote: false,
      help: false,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
          if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
          loadGuild(clientDB,message.guild.id).then(async(user) => {
            if (user === false) {
              return message.channel.send(k.word.No_setup)
            }else{
              if(user.text2.indexOf(message.channel.parentId) != "-1") {
              if(message.channel.type.includes("_THREAD")) {
              let thread = message.channel,hasperm = false,index = null
              if(!user.thread) return message.channel.send(k.text.No_create)
              user.thread.forEach((thread2,index2) => {
                if(thread2.id == thread.id) {
                  if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
                  if(message.channel.parent.permissionOverwrites.cache.get(message.author.id) || thread2.owner == message.author.id) {
                  hasperm = true,index = index2
                  }else{
                    return message.channel.send(k.text.No_owner)
                  }
                }
              });
              if(!hasperm) return;
              thread.send(k.text.close)
              setTimeout(() => {
              thread.delete("The user delete this thread.")                
              }, 2000);
              user.thread.splice(index,1)
              writeGuild(clientDB, message.guild.id, user);
              return;
              }else{
                return message.channel.send("無法刪除不是討論串的頻道")         
              }
            }else{
              return message.channel.send(k.text.No_create)}
            }
        })}
    },
    "thsave":{
      description: {zh_TW:"關閉你的動態頻道\n(必須在你個人的頻道使用)",en_US:"Close your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "clo",
      category: "guild",
      vote: false,
      help: false,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
          if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
          loadGuild(clientDB,message.guild.id).then(async(user) => {
            if (user === false) {
              return message.channel.send(k.word.No_setup)
            }else{
              if(user.text2.indexOf(message.channel.parentId) != "-1") {
              if(message.channel.type.includes("_THREAD")) {
              let thread = message.channel,hasperm = false,index = null
              if(!user.thread) return message.channel.send(k.text.No_create)
              user.thread.forEach((thread2,index2) => {
                if(thread2.id == thread.id) {
                  if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
                  if(message.channel.parent.permissionOverwrites.cache.get(message.author.id) || thread2.owner == message.author.id) {
                  hasperm = true,index = index2
                  }else{
                    return message.channel.send(k.text.No_owner)
                  }
                }
              });
              if(!hasperm) return;
              thread.send("🔄存檔中...\nSaving....")
              setTimeout(() => {
              thread.setArchived()              
              }, 1500);
              user.thread[index].saved = true
              writeGuild(clientDB, message.guild.id, user);
              return;
              }else{
                return message.channel.send("無法刪除不是討論串的頻道")         
              }
            }else{
              return message.channel.send(k.text.No_create)}
            }
        })}
    },
    "clo":{
      description: {zh_TW:"關閉你的動態頻道\n(必須在你個人的頻道使用)",en_US:"Close your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "clo",
      category: "guild",
      vote: false,
      help: false,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
          if(!message.guild) return message.channel.send(l.error.No_DM)
          if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me + l.prem.manage_channel)
          if(!message.channel.permissionOverwrites.cache.get(message.author.id)) return message.channel.send(k.text.No_owner)
          loadGuild(clientDB,message.guild.id).then(async(user) => {
            if (user === false) {
              return message.channel.send(k.word.No_setup)
            }else{
                  if(user.text.indexOf(message.channel.id) != "-1") {
                  await message.channel.send(k.text.close)
                  var array = user.text
                  var index = array.indexOf(message.channel.id)
                  if (index> -1) {array.splice(index, 1);}
                  await writeGuild(clientDB,message.guild.id,user)
                  message.channel.delete()
                  return;
                }else{
                  return message.channel.send(k.text.No_text);
                  }
            }
        })}
    },
    "set":{
      description: {zh_TW:"設定你的動態頻道\n(必須在你個人的頻道使用)",en_US:"setup your dynmic channel\n(Please use this command in your own channel.)",ja_JP:""},
      authority: "own",
      instructions: "set [value]\nvalue:\n`name` setup your channel name.\n`self / open` setup your channel visible.\n`nsfw` setup your channel nsfw.",
      category: "guild",
      vote: false,
      help: false,
      fun: function (bot, message, p,clientDB,language,args, ...text) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM)
        loadGuild(clientDB,message.guild.id).then((user) => {
          if (user === false) return message.channel.send("❌發生錯誤!")
                if(user.text.indexOf(message.channel.id) != "-1") {
                  if(!message.guild.me.permissions.has(['MANAGE_CHANNELS'])) return message.channel.send(l.error.No_perm_me+l.prem.manage_channel)
                  if(!message.channel.permissionOverwrites.cache.get(message.author.id)) return message.channel.send(k.text.No_owner)
                  if(args[0] == "name") {
                    message.channel.setName(text.join(" ").replace("name","")).then(() => {
                    message.channel.send(k.text.set.name+ text.join(" ").replace("name",""))}).catch(k.text.set.name_err)
                  }else if(args[0] == "self") {
                    if(!message.member.guild.me.permissions.has(['MANAGE_ROLES'])) {return message.channel.send(k.text.set.no_perm)}
                    message.channel.permissionOverwrites.create(message.author, {
                      SEND_MESSAGES: true,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: true})
                      message.channel.permissionOverwrites.create(message.guild.me ,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true})
                    message.channel.permissionOverwrites.create(message.guild.roles.everyone ,{
                      SEND_MESSAGES: false,
                      VIEW_CHANNEL: false})
                    message.channel.send(k.text.set.self)
                  }else if(args[0] == "open") {
                    if(!message.member.guild.me.permissions.has(['MANAGE_ROLES'])) {return message.channel.send(k.text.set.no_perm)}
                    message.channel.permissionOverwrites.create(message.author, {
                      SEND_MESSAGES: null,
                      MANAGE_CHANNELS: true,
                      VIEW_CHANNEL: null})
                    message.channel.permissionOverwrites.create(message.guild.roles.everyone ,{
                      SEND_MESSAGES: null,
                      VIEW_CHANNEL: null})
                      message.channel.permissionOverwrites.create(message.guild.me ,{
                        SEND_MESSAGES: null,
                        VIEW_CHANNEL: null})
                      return message.channel.send(k.text.set.open)
                  }else if(args[0] == "nsfw") {
                    if(!message.channel.nsfw) {message.channel.setNSFW(true,"動態權限設置")}else{message.channel.setNSFW(false,"動態權限設置")}
                    return message.channel.send(k.text.set.setting)
                  }else{
                    return message.channel.send(k.text.help2)
                  }
              }else{
                return message.channel.send(k.text.No_text);
                }
      })}
  },
    "code":{
      description: {zh_TW:"驗證指令(某些指令需要)",en_US:"verify.(some command need)",ja_JP:""},
      authority: "everyone",
      instructions: "code",
      category: "guild",
      vote: false,
      help: false,
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let l = lan.zh_TW,k = gameX.zh_TW
          if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
          }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                let codeX = "CR" + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10)
              let codeEmbed = new Discord.MessageEmbed()
              .setColor('#2d9af8') .setTitle(k.code.title).setDescription(codeX).setFooter(k.code.use+message.author.username)
              message.channel.send({embeds: [codeEmbed]}).then((ms) => {
                const filter = m => m.author.id == message.author.id;
                ms.channel.awaitMessages({filter,max: 1, time: 10000})
                  .then(collected => {
                    if(collected.first().content != codeX) {
                      let error = new Discord.MessageEmbed().setTitle(k.code.error).setDescription(k.code.tryagain).setFooter(k.code.use+message.author.username)
                      return ms.edit({embeds: [error]});
                    }
                    let codeEmbed2 = new Discord.MessageEmbed()
              .setColor('#2d9af8') .setTitle(k.code.pass) .setDescription(k.code.pass2).setFooter(k.code.use+message.author.username).setTimestamp()
                ms.edit({embeds: [codeEmbed2]})
                code.add(message.author.id)
                collected.first().delete()
                return;
            }).catch(err => {
              let error = new Discord.MessageEmbed().setTitle(k.code.error).setDescription(k.code.tryagain).setFooter(k.code.use+message.author.username)
              ms.edit({embeds: [error]})
              return;
                  })
              })
        }
    },
    "snipes":{
      description: {zh_TW:"檢視前10個刪除訊息",en_US:"View top ten delete messages.",ja_JP:""},
      authority: "admin",
      instructions: "snipes",
      category: "guild",
      vote: true,
      help: false,
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM);
        if(!message.member.permissions.has(['MENTION_EVERYONE'])) if(message.author.id == '546144403958398988') {}else{return message.channel.send("❌你沒有足夠的權限去察看這個.")}
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {return message.channel.send(k.snipe.no_support)}
            if(user.language.setting) {
              if(!user.language.setting.snipe) return message.channel.send(k.snipe.close_snipe)
            }
            if(user.snipe.t1) return message.channel.send("⚠此群組的snipe資料為舊版本!!\n請刪除一則訊息觸發更新!")
            if(!user.snipe[0]) return message.channel.send(k.snipe.no_snipe)
            let member = user.snipe[0].user
            let time = new Date(user.snipe[0].time).toLocaleString()
            let snipe = new Discord.MessageEmbed()
            .setColor(message.member.roles.highest.color)
            .setAuthor(member.name + "#" + member.tag, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`)
            .setFooter(time+`\n請使用 cr!snipe [數值]\n來查閱刪除訊息的附件(若有的話)`)
            .setDescription(user.snipe[0].message)
            let num = 1
            user.snipe.shift()
            user.snipe.forEach(snipes => {
              num++
              let times = new Date(snipes.time).toLocaleString()
              snipe.addField(k.snipe.last+num+k.snipe.message +` - ${snipes.user.name}#${snipes.user.tag}`,`${snipes.message}\n${times}`)
            });
            return message.channel.send({embeds: [snipe]});
            })
      }
    },
    "snipe":{
      description: {zh_TW:"檢視上一個刪除訊息",en_US:"View last delete message.",ja_JP:""},
      authority: "everyone",
      instructions: "snipe [number＊]",
      category: "guild",
      vote: false,
      help: false,
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message.guild) return message.channel.send(l.error.No_DM);
        if(message) {
          return message.channel.send(k.snipe.discord_snipe)
        }
        let num = 0
        if(args[0]) {
          if(!isNaN(parseInt(args[0]))) num = parseInt(args[0])-1
        }
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {return message.channel.send(k.snipe.no_support)}
            if(user.language.setting) {
              if(!user.language.setting.snipe) return message.channel.send(k.snipe.close_snipe)
            }
            if(user.snipe.t1) return message.channel.send("⚠此群組的snipe資料為舊版本!!\n請刪除一則訊息觸發更新!")
            if(!user.snipe[0]) return message.channel.send(k.snipe.no_snipe)
            if(num > 15) return message.channel.send(l.error.less_then+`**16**!`)
            if(!user.snipe[num]) return message.channel.send(k.snipe.no_fond+(num+1)+k.snipe.message2)
            let member = user.snipe[num].user
            let time = new Date(user.snipe[num].time).toLocaleString()
            let snipe = new Discord.MessageEmbed()
            .setColor(message.member.roles.highest.color)
            .setAuthor(member.name + "#" + member.tag, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`)
            .setFooter(time+`\n`+k.snipe.last+(num+1)+k.snipe.message)
            .setDescription(user.snipe[num].message)
            user.snipe[num].file.forEach(file => {
              if(file.file != "無") snipe.setImage(file.file)
              if(file.file != "無") {
                snipe.addField("\n📎附件 \n", `[${file.name}](${file.file})`)}
            });
            return message.channel.send({embeds: [snipe]});
            })
          }
    },
    "server":{
      description: {zh_TW:"伺服器總體資料",en_US:"Show server data.",ja_JP:""},
      authority: "everyone",
      instructions: "server",
      category: "guild",
      vote: false,
      help: false,
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
          let snipeid = user.snipe[0].user.id,snipe = user.snipe[0].message
          let server = new Discord.MessageEmbed()
          .setColor(message.member.roles.highest.color)
          .setTitle( message.guild.name + k.server.title)
          .setDescription("ID:  " + message.guild.id)
          if(user.language.lan) {if(user.language.lan == "zh_TW") {server.addField(k.server.lang, "繁體中文",true)}else if(user.language.lan == "en_US") {server.addField(k.server.lang, "English",true)}else if(user.language.lan == "ja_JP") {server.addField(k.server.lang, "日本語",true)}else if(user.language.lan == "zh_CN") {server.addField(k.server.lang, "简体中文",true)}}else{server.addField(k.server.lang, k.server.default+"(中文)",true)}
          server.addField(k.server.delmeg," <@" + snipeid + "> \n◆"+snipe,true)
          server.addField(k.server.member, message.guild.memberCount.toString(),true)
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
          message.channel.send({embeds: [server]})
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
  if(!message.guild.me.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_perm_me +`\`${l.prem.manage_guild}\``)
  if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send(l.error.No_Prem+l.prem.manage_guild+l.error.No_Prem2)
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
    if(message.member.permissions.has(['MANAGE_CHANNELS'])) {
        if(message.guild.me.permissions.has(['MANAGE_CHANNELS'])) {
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {
          message.channel.send(k.word.No_setup)
        }else{message.channel.send(k.word.crateing)
        message.guild.channels.create("動態文字頻道" , {type: 'GUILD_CATEGORY'})
        .then(Channel => {
          let gid = Channel.id
          message.guild.channels.create("新增頻道" , {type: 'GUILD_TEXT', reason: '請使用 cr!clo 關閉' })
          .then(c => {
          c.setParent(gid , { lockPermissions: false })
            let id = c.id
          message.channel.send(k.word2.created_channel+" <#"+ id + ">")
          c.send("<@" + message.author.id + "> "+k.word2.created_channel2)
          user.text2 = []
          user.text2.push(c.id)
          writeGuild(clientDB,message.guild.id,user)
        })})}
})}else{
  message.channel.send(l.error.No_perm_me +```${l.prem.manage_channel}```);
}}else{
  message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2);
}}
async function voice(bot,message,clientDB,language) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    if(message.member.permissions.has(['MANAGE_CHANNELS'])) {
        if(message.guild.me.permissions.has(['MANAGE_CHANNELS'])) {
          loadGuild(clientDB,message.guild.id).then((user) => {
            if (user === false) {
          message.channel.send(k.word.No_setup)
        }else{message.channel.send(k.word.crateing)
        message.guild.channels.create("動態語音頻道" , {type: 'GUILD_CATEGORY' })
        .then(Channel => {
          let gid = Channel.id
          message.guild.channels.create("新增頻道" , {type: 'GUILD_VOICE'})
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
}}
async function Join(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+" 100")
    return;}
        if(message.member.permissions.has(['MANAGE_CHANNELS'])) {
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
    message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2)}
}
async function leave(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+" 100")
    return;}
        if(message.member.permissions.has(['MANAGE_CHANNELS'])) {
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
    message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2)}
}
async function rank(bot,message,clientDB,language,args, nubmer, ...text) {
  let l = lan.zh_TW,k = gameX.zh_TW
  if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
  }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
  if (text.length > 100) {
    message.channel.send(l.error.less_then+"100")
    return;}
  if(message.member.permissions.has(['MANAGE_CHANNELS'])) {
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
  message.channel.send(l.error.No_Prem+l.prem.manage_channel+l.error.No_Prem2);}
}