const Discord = require("discord.js")
const bot = new Discord.Client();
function time(bot, message) { times = times + 1 }
///////////////// Msg say ///////////////////////
let msgsay = require("../../function/detectSay")
//////////////// 成就 /////////////////////////
let adv = require("../../function/achievement")
let msgcmd = require("../../function/MessageCommand")
///////////// Ban list /////////////////////
let {banlist , why} = require('../../banlist.json')
let Mongo = require('../../function/MongoData')
let cooldown = new Set(),cdseconds = 3,channelcooldown = new Set(),channelcdseconds = 2,snipecool = new Set(),times = 0
const { prefix, token, prefix2, version, owner} = require('../../config.json');
const fs = require('fs');
let command = {}
let languages = require("../../commands/lang.json")
let commandfiles = fs.readdirSync("./commands")
commandfiles.splice(7,1)
console.log("commands file:" + commandfiles)
for (file of commandfiles) {
    let q = require(`../../commands/${file}`)
    Object.assign(command, q)
}
////////////// delete cooldown ///////////////
function deleteCooldown(message) {
  setTimeout(() => {
    cooldown.delete(message.author.id)}, cdseconds * 900)
  setTimeout(() => {
    channelcooldown.delete(message.channel.id)}, channelcdseconds * 700)
}
let voiceDVC = require("../../function/dynamicVC")
let memJoLe = require("../../function/memberJoLe")
let deleteSnipe = require("../../function/MessageSnipe")
////////////// data cache ////////////////////
const UserCache = new Map()
setInterval(() => {
  UserCache.clear()
}, 600000);
const GuildCache = new Map()
setInterval(() => {
  GuildCache.clear()
}, 600000);
let MusicFun = require("../../function/Music/main")
module.exports= [
{
"name":"ready",
"fun": function(client,clientDB,prefix) {
  MusicFun.main(client,clientDB,prefix)
    let timer = 1
    let Open = new Date()
    setInterval(() => {
      if(timer === 1) {
        timer++
        client.user.setActivity(prefix+'help • ' + client.guilds.cache.size + ' 個咖啡廳服務中' ,{"type": "STREAMING",url: "https://www.youtube.com/watch?v=ycfNxCroJiE"})}
        else if(timer === 2) {
          timer++
          let Today = new Date().getTime();
          let time = (Today - Open.getTime())/1000;
          let day = 0,H = 0,m = 0
            day = (time/60/60/24 >= 1) ? Math.floor(time/60/60/24) : 0;
            H = ((time % (60*60*24))/(60*60) >= 1) ? Math.floor((time % (60*60*24))/(60*60)) : 0;
            m = ((time % (60*60))/60 >= 1) ? Math.floor((time % (60*60))/60) : 0;
              let text = `${prefix}help • 累計運行${day}天${H}小時${m}分鐘 `
          client.user.setActivity(text,{"type": "STREAMING",url: "https://www.youtube.com/watch?v=ycfNxCroJiE"})}
          else if(timer === 3) {
            timer--
            client.user.setActivity(prefix+'help • '+ client.users.cache.size + ' 個顧客服務中',{"type": "STREAMING",url: "https://www.youtube.com/watch?v=ycfNxCroJiE"})
            timer--
  }} ,8000)
}
},
{
  "name":"message",
  "fun": async function(client,clientDB,prefix,msg) {      
  msgsay.detectsay(msg,1,clientDB)
  detectrank(msg,clientDB,client)
  if (msg.content.startsWith(prefix)) {
      if (!msg.guild) return;
      if (msg.content.startsWith('cr!!')) return;
      if (!msg.member.guild.me.hasPermission(['SEND_MESSAGES'])) return;
      if (channelcooldown.has(msg.channel.id)) return msg.channel.stopTyping();
      if (msg.author.bot) return;
      msgcmd.ifban(banlist,why,msg)
      let cache = UserCache.get(msg.author.id);
      if(!cache) {
        cache = await msgcmd.usercache(msg,cache,clientDB)
        UserCache.set(msg.author.id, cache);
      }
      let user2 = cache
          if (user2 === false) return zh_TW(client, msg, "zh_TW",clientDB);
          let uwu = GuildCache.get(msg.author.id);
          if(!uwu) {
            uwu = await msgcmd.guildcache(msg,uwu,clientDB)
            if(uwu === false) {
              return zh_TW(client, msg,"zh_TW",clientDB)
            }
            GuildCache.set(msg.guild.id, uwu);
          }
          if(msgcmd.ifpicture(msg,uwu,prefix)) return msg.channel.send("⛔此指令被本群管理員禁止.\nThis command has been disabled by server admin.");
          msg.channel.startTyping(1)
              if (cooldown.has(msg.author.id)) {
                  msg.channel.stopTyping();
                  if (user2.language) {
                    if(!languages[user2.language]) return;
                      let lsay = languages[user2.language].error.TooSpeed
                      msg.channel.send(lsay);
                      adv.speed(client, msg, user2.language,clientDB)
                  } else {
                      msg.channel.send("請等等再來使用此指令!\nplease wait.");
                      speed(client, msg)
                  }
              } else {
                  let userlang = user2.language
                  zh_TW(client, msg, userlang,clientDB)
              }
  }
}
},
{
  "name":"voiceStateUpdate",
  "fun": function(client,clientDB,prefix,oldMember,newMember) {
    voiceDVC.main(oldMember,newMember,1,clientDB,client)
  }
 },
 {
   "name":"guildMemberAdd",
   "fun": async function(client,clientDB,prefix,member) {       
   let gid = member.guild.id
   let ser= UserCache.get(gid)
   if(!ser) {
     await Mongo.loadGuild(clientDB,gid).then((user) => {
       ser = user
       GuildCache.set(gid,user)
   })}
   memJoLe.join(ser,member,clientDB,client,1)
  }
 },
 {
  "name":"guildMemberRemove",
  "fun": async function(client,clientDB,prefix,member) {
    let gid = member.guild.id
    let ser= UserCache.get(gid)
    if(!ser) {
      await Mongo.loadGuild(clientDB,gid).then((user) => {
        ser = user
        GuildCache.set(gid,user)
    })}
    memJoLe.leave(ser,member,clientDB,client,1)
  }
 },
 {
   "name":"messageDelete",
   "fun": async function(client,clientDB,prefix,message) {
    deleteMessage(message,clientDB,client)
    if (message.author.bot) return;
    if (snipecool.has(message.author.id)) return;
    if (!message.guild) return;
    let gid = message.guild.id
    let ser= UserCache.get(gid)
    if(!ser) {
      await Mongo.loadGuild(clientDB,gid).then((user) => {
        ser = user
        GuildCache.set(gid,user)
    })}
        if (ser === false) { return }
        if (ser.language.run) { if (ser.language.run != 1) return; }
        if(ser.language.setting) {if(ser.language.setting.snipe === false) return;}
        Mongo.loadGuild(clientDB, message.guild.id).then((user) => {
            if (user === false) { return } else {
                snipecool.add(message.author.id)
                deleteSnipe.main(message,clientDB,user)
            }
        })
        setTimeout(() => { snipecool.delete(message.author.id) }, 1000);
   }
 },
 {
 "name":"messageUpdate",
 fun: function(client,clientDB,prefix,oldmessage, newmessage) {
  if (!oldmessage.guild) return;
  if (oldmessage.content === newmessage.content) return;
  detects(client,oldmessage, newmessage, "edit", newmessage.guild.id,"",clientDB)
 }
 },
 {
  "name":"messageDeleteBulk",
  fun: function(client,clientDB,prefix,message) {
    if (!message.first().guild) return;
    let length = message.array().length
    let channel = message.first().channel.name
    detects(client,message, channel, "deleBulk", message.first().guild.id, length,clientDB)
  }
},
]
///////////////// Command ////////////////////////
async function zh_TW(bot, msg, userlang,clientDB) {
  time(bot, msg)
  cooldown.add(msg.author.id)
  channelcooldown.add(msg.channel.id)
  deleteCooldown(msg)
  if (Object.keys(command).includes(msg.content.replace(prefix, "").split(" ")[0])) {
      setTimeout(() => {
          try {
              let ag = msg.content.split(" ")
              ag.shift()
              command[msg.content.replace(prefix, "").split(" ")[0]]["fun"](bot, msg, prefix, clientDB, userlang, ag, ...ag)
              msg.channel.stopTyping()
          } catch (error) {
              msg.channel.stopTyping();
              msg.channel.send("❌嘗試執行發生錯誤!\n```js\n" + error + "\n```")
              bot.channels.cache.get("746185201675141241").send("錯誤!\n執行者:  " + msg.author.tag + ":" + msg.content + "\n```js\n" + error + "\n```")
              if (error) msg.react("<:error:787197851913945118>") //error
              console.log(msg.author.tag + ":" + msg.content)
              console.log(error)
          }
      }, 30);
  } else {
      setTimeout(() => {
      msg.channel.stopTyping()  
      }, 1000);
  }
};
/////////////////////////// Rank ////////////////////////////
let rank = new Set();
function deleRank(message) {
    if (message.author.bot) return;
    setTimeout(() => { rank.delete(message.author.id) }, 120000)
}
let openServer = true;
setTimeout(() => {openServer = false;}, 40000);

let rankMain = require("../../function/Rank")
async function detectrank(message,clientDB,client) {
    if (message.author.bot) return;
    if(openServer) return;
        if (rank.has(message.author.id)) { return; }else{
        rank.add(message.author.id)
        deleRank(message)
        let cache= UserCache.get(message.author.id)
        if(!cache) {
            await Mongo.loadUser(clientDB,message.author.id).then((user) => {
            cache = user
            UserCache.set(message.author.id,user)
        })}
        let user = cache
        rankMain.main(message,user,clientDB,client,1)
}
};
/////////////////////////////////////////////////////////////
function deleteMessage(message,clientDB,client) {
if (!message.guild) return;
detects(client,message, message.guild, "dele", message.guild.id,"",clientDB)
}
////////////////////////////////////////////////////////////////
let detectMsg = require("../../function/detectMessage")
async function detects(client,message, guild, channel, gid, length,clientDB) {
    let ser= UserCache.get(gid)
    if(!ser) {
      await Mongo.loadGuild(clientDB,gid).then((user) => {
        ser = user
        GuildCache.set(gid,user)
    })}
        if (ser === false) { return }
        detectMsg.main(message, guild, channel, gid, length,clientDB,client,ser,1)
};
///