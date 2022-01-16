const Discord = require("discord.js")
function time(bot, message) { times = times + 1 }
//////////////// 成就 /////////////////////////
let adv = require("../../function/achievement")
let msgcmd = require("../../function/MessageCommand")
///////////// Ban list /////////////////////
let {banlist , why} = require('../../banlist.json')
let Mongo = require('../../function/MongoData')
let cooldown = new Set(),cdseconds = 3,channelcooldown = new Set(),channelcdseconds = 2,snipecool = new Set(),times = 0
const { prefix, token, prefix2, version, owner} = require('../../config3.json');
const fs = require('fs');
let command = {}
let commandfiles = fs.readdirSync("./commands")
commandfiles.splice(7,1)
let languages = require("../../commands/lang.json")
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
////////////// data cache ////////////////////
const UserCache = new Map()
setInterval(() => {
  UserCache.clear()
}, 600000);
const GuildCache = new Map()
setInterval(() => {
  GuildCache.clear()
}, 600000);
//let MusicFun = require("../../function/Music/main")
module.exports= [
{
"name":"ready",
"type":"once",
"fun": function(client,clientDB,prefix) {
  //MusicFun.main(client,clientDB,prefix)
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
  "name":"messageCreate",
  "type":"on",
  "fun": async function(client,clientDB,prefix,msg) {      
  if (msg.content.startsWith(prefix)) {
      if (!msg.guild) return;
      if (msg.content.startsWith('cr**')) return;
      if (!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return;
      if(!msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES')) return;
      if(!msg.guild.me.permissionsIn(msg.channel).has('VIEW_CHANNEL')) return;
      if (channelcooldown.has(msg.channel.id)) return;
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
          //msg.channel..sendTyping(1)
              if (cooldown.has(msg.author.id)) {
                  if (user2.language) {
                    if(!languages[user2.language]) return;
                      let lsay = languages.lan[user2.language].error.TooSpeed
                      msg.channel.send(lsay);
                      adv.speed(client, msg, user2.language)
                      return;
                  } else {
                      msg.channel.send("請等等再來使用此指令!\nplease wait.");
                      speed(client, msg)
                      return;
                  }
              } else {
                  let userlang = user2.language
                  if(userlang.length === 0) userlang = "zh_TW"
                  return zh_TW(client, msg, userlang,clientDB)
              }
  }
}
}
]
const language  = require("../../commands/lang.json");
let DBL = require("dblapi.js")
const {topToken} = require("../../token.json")
const dbl = new DBL(topToken);
///////////////// Command ////////////////////////
async function zh_TW(bot, msg, userlang,clientDB) {
  time(bot, msg)
  cooldown.add(msg.author.id)
  channelcooldown.add(msg.channel.id)
  deleteCooldown(msg)
  if (Object.keys(command).includes(msg.content.replace(prefix, "").split(" ")[0])) {
          try {
            let cmd = command[msg.content.replace(prefix, "").split(" ")[0]]
            if(!language[userlang]) userlang = "zh_TW"
            if(cmd.vote) {
              let voted = await dbl.hasVoted(msg.author.id)
              if(!voted && msg.author.id != "546144403958398988") {
                if(msg.content.replace(prefix, "").split(" ")[0] === "daily") {
                  let dvote = new Discord.MessageEmbed()
                  .setTitle(language[userlang].error.No_vote.titledaily)
                  .setDescription(language[userlang].error.No_vote.descdaily)
                  return msg.channel.send({embeds:[dvote]})
                }else{
                  let vote = new Discord.MessageEmbed()
                  .setTitle(language[userlang].error.No_vote.title)
                  .setDescription(language[userlang].error.No_vote.desc)
                  return msg.channel.send({embeds:[vote]})
                }
            }else{
              return mainCommand()
            }
          }else{
            return mainCommand()
          };
          async function mainCommand() {
            let ag = msg.content.split(" ")
            ag.shift()
            if(!cmd.help && ag[0] === "help") {
                let helper = new Discord.MessageEmbed()
                .setTitle(msg.content.replace(prefix, "").split(" ")[0])
                .setDescription("📄說明:\n"+cmd.description.zh_TW+`\n\n✏使用方式:\n${cmd.instructions}\n`)
                .setFooter("📊類別: "+cmd.category+"\n🗳是否投票: "+cmd.vote+"\n🎭指令權限: "+cmd.authority+"\n註: ＊ 非必填")
                return msg.channel.send({embeds:[helper]})
            }else{
              if (!msg.guild.me.permissionsIn(msg.channel).has(['READ_MESSAGE_HISTORY'])) return msg.channel.send("⚠智乃有缺漏的權限可能會影響指令運作><!!\n缺漏權限: `READ_MESSAGE_HISTORY`(讀取歷史訊息)");
              if (!msg.guild.me.permissionsIn(msg.channel).has(['EMBED_LINKS'])) return msg.channel.send("⚠智乃有缺漏的權限可能會影響指令運作><!!\n缺漏權限: `EMBED_LINKS`(嵌入連結)");
              command[msg.content.replace(prefix, "").split(" ")[0]]["fun"](bot, msg, prefix, clientDB, userlang, ag, ...ag)
              return;
            }
          }
          } catch (error) {
              msg.channel.send("❌嘗試執行發生錯誤!\n```js\n" + error + "\n```")
              bot.channels.cache.get("746185201675141241").send("錯誤!\n執行者:  " + msg.author.tag + ":" + msg.content + "\n```js\n" + error + "\n```")
              if (error) msg.react("<:error:787197851913945118>") //error
              console.log(msg.author.tag + ":" + msg.content)
              throw error;
          }
  }else{
    return;
  }
};
////////////////////////////////////////////////////////////////