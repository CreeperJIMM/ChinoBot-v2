const Discord = require("discord.js")
const fs = require('fs');
const lan = require('../commands/lang.json');
const useful = require('../language/useful.json');
var loadUser = async (client,userid) => {/*讀取用戶檔案*/let dbo =client.db("mydb"),id = userid,query = { "id": id };let user = await dbo.collection("users").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeUser(client,id,data) {/*寫入用戶檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("users").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("users").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}
var loadGuild = async(client,guildid) => {/*讀取公會檔案*/let dbo =client.db("mydb"),id = guildid,query = { "id": id };let user = await dbo.collection("guilds").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeGuild(client,id,data) {/*寫入公會檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("guilds").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("guilds").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}
const disbut = require('discord-buttons');
var loadping = async(client) => {
  /*讀取公會檔案*/let dbo =client.db("mydb"),query = { "type": "ping" };
  let user = await dbo.collection("report").find(query).toArray();
  if(user[0] === undefined) return false;
  user = user[0]
  return user
}
module.exports = {
    "hi":{
        description: "測試",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          let button = new disbut.MessageButton(),button2 = new disbut.MessageButton()
          //button.setStyle('url').setLabel("test").setURL("https://dckabicord.com/")
          button2.setStyle('green').setLabel("uwu").setID("uwu")
          //let row = new disbut.MessageActionRow().addComponents(button, button2);
            message.reply(lang.word.hihi,button2).then((w) => {
              const filter = (button) => button.clicker.id === message.author.id
            w.awaitButtons(filter,{max: 1,time: 10000,errors:['time']}).then(async(buttons) => {
              buttons = buttons.first()
              await buttons.reply.think()
              await buttons.reply.edit("uwu")
            }).catch((err) => {
              return;
            })
          })
        }
    },
    "ping":{
        description: "ping",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          let time = new Date()
            if(message.author.bot) return;
          message.channel.send("pong!").then(( lastMessage) => {
            let time2 = new Date(),DBtime = new Date()
            loadping(clientDB).then((ping) => {
            let DB2 = (new Date().getUTCMilliseconds() - DBtime.getUTCMilliseconds())
            let time3 = (time2.getUTCMilliseconds() - time.getUTCMilliseconds())
            let time4 = new Date();
            if(lastMessage.content === `pong!`) {
              lastMessage.edit("pong!!").then((editmessage) => {
                let time5 = (new Date().getUTCMilliseconds() - time4.getUTCMilliseconds())
              {return message.channel.send(lang.word.chino+ useful2.ping.delay + (Math.round((lastMessage.createdAt - message.createdAt)) + ' ms\n\n'+lang.word.message + useful2.ping.delay+': '+ time3 +' ms\n'+lang.word.edit+useful2.ping.delay+': '+ time5 +" ms"+`\nDatabase: ${DB2}ms` ))};}
          )}})})
    }},
    "date":{
        description: "日期",
        fun: function (bot, msg, p,clientDB,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
            var Today=new Date();
            const TimeEmbed = new Discord.MessageEmbed()
            .setTitle(lang.time.today + lang.word.yes + Today.getFullYear()+ lang.date.year + (Today.getMonth()+1) + lang.date.month + Today.getDate() + " "+lang.date.day+"  "+lang.date.week + Today.getDay(),)
            .addField(lang.time.time , Today.getHours() + ":" + Today.getMinutes() + ":" + Today.getSeconds() + ":" + Today.getMilliseconds(),)
            {msg.channel.send(TimeEmbed)};
          
        }
    },
    "avatar":{
        description: "大頭貼",
        fun: function (bot, message, p,clientDB,language,ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
            if(ag[0] != null) {
            if(message.mentions.users.size){
                let member=message.mentions.users.first()
            if(member){
              const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({format: "png", dynamic: true ,size: 2048})).setTitle(member.username +" "+lang.word.of + useful2.avatar.avatar).setTimestamp().setFooter("🌎")
              return  message.channel.send(emb)
          }}else{              
            let member=bot.users.cache.get(ag[0])
            if(!isNaN(ag[0])) {
              if (!member) member = message.author
               }else{
                 let nickname = message.guild.members.cache.find(m => m.displayName.includes(ag[0]))
                 if(nickname) member = nickname.user }
           if(member){
              const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({format: "png", dynamic: true ,size: 2048})).setTitle(member.username +" "+lang.word.of + useful2.avatar.avatar).setTimestamp().setFooter("🌎")
              message.channel.send(emb)
          }else{
            return  message.channel.send(lang.error.Not_found_Member + ag)}
            console.log()
            }
          }else{
          const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({format: "png", dynamic: true ,size: 2048})).setTitle(message.author.username +" "+lang.word.of + useful2.avatar.avatar).setTimestamp().setFooter("🌎")
          message.channel.send(emb)
          }
        }
    },
    "savatar":{
        description: "群組大頭貼",
        fun: function (bot, message, p,clientDB,language,args) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          if(!message.guild) return message.channel.send(lang.error.No_DM);
            const avatarEmbed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(message.guild.name + ' '+lang.word.of+useful2.avatar.guild+useful2.avatar.avatar)
            .setImage(message.guild.iconURL({ format: "png", dynamic: true ,size: 2048})).setTimestamp().setFooter("🌎")
            {message.channel.send(avatarEmbed)};
          
        }
    },
    "serveravatar":{
      description: "群組大頭貼",
      fun: function (bot, message, p,clientDB,language,args) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(!message.guild) return message.channel.send(lang.error.No_DM);
          const avatarEmbed = new Discord.MessageEmbed()
          .setColor('#2d9af8')
          .setTitle(message.guild.name + ' '+lang.word.of+useful2.avatar.guild+useful2.avatar.avatar)
          .setImage(message.guild.iconURL({ format: "png", dynamic: true ,size: 2048}));
          {message.channel.send(avatarEmbed)};
        
      }
  },
  "banner":{
    description: "群組橫幅",
    fun: function (bot, message, p,clientDB,language,args) { 
      let lang = lan.zh_TW,useful2 = useful.zh_TW
      if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
      }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
      if(!message.guild) return message.channel.send(lang.error.No_DM);
      if(!message.guild.banner) return message.channel.send(useful2.avatar.No_banner)
        const avatarEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setTitle(message.guild.name + ' '+lang.word.of+useful2.avatar.banner)
        .setImage(message.guild.bannerURL({ format: "png", dynamic: true ,size: 2048})).setTimestamp().setFooter("🌎")
        {message.channel.send(avatarEmbed)};
      
    }
},
    "hooksay":{
      description: "測試",
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(!message.guild) return message.channel.send(lang.error.No_DM);
        if(message.member.hasPermission(['MANAGE_CHANNELS']) || message.author.id === "546144403958398988") {
        if(!message.guild.me.hasPermission(['MANAGE_WEBHOOKS'])) return message.channel.send(lang.error.No_perm_me+lang.word.add+"webhook .w.")
        if(ag.join == null || ag.join(" ") == "") return message.channel.send(lang.error.type_text)
        message.channel.createWebhook(message.author.username, {
          avatar: message.author.displayAvatarURL({format: "png", dynamic: true}),
          reason: 'Speak in'+message.channel.name+' by '+message.author.username}).then((hook) => {
        hook.send(ag.join(" ")).then(() => {
        message.channel.stopTyping()
        message.delete()
        hook.delete()
        message.channel.send("Adding...").then((ms) => { ms.delete() })
      })
          })
      }else{return message.channel.send(lang.error.No_Prem+lang.prem.manage_channel+lang.error.No_Prem2)}
    }
  },
    "say": {
        description: "機器人說話",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          function delt() {
            if(message.guild.me.hasPermission(['MANAGE_MESSAGES'])) {
              message.delete();
            }
          }
          if (message.member.hasPermission(['MANAGE_MESSAGES']) || message.author.id === "546144403958398988") {
            if(message.author.id === "546144403958398988") {
              {message.channel.send(ag.join(" ") )}
              delt();
            }else if(message.content.includes("@")) {
                if(message.member.hasPermission(['MENTION_EVERYONE'])) {
                  {message.channel.send("<:Transparent:751597051963506698> " + ag.join(" ") )}
                  delt();
                }else{
                  message.channel.send(lang.error.No_Prem+lang.prem.mention_everyone+lang.error.No_Prem2) }
              }else{
                  {message.channel.send("<:Transparent:751597051963506698> " + ag.join(" ") )}
                  delt();
            }
        }else{
          message.channel.send(lang.error.No_Prem+lang.prem.manage_messages+lang.error.No_Prem2)
        }
      }
    },
    "tts": {
        description: "機器人說話(tts)",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(!message.guild) {
          {message.channel.send(ag.join(" ") ,{tts: true})}
        }else{
          if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
        if(message.member.hasPermission(['SEND_TTS_MESSAGES'])) {
            if(message.content.includes("@")) {
              if(message.member.hasPermission(['MENTION_EVERYONE'])) {
                {message.channel.send(ag.join(" ") ,{tts: true})}
                message.delete();
           }else{
            message.channel.send(lang.error.No_Prem+lang.prem.mention_everyone+lang.error.No_Prem2)
          }
       }else{
        {message.channel.send(ag.join(" ") ,{tts: true})}
        message.delete();
       }
      }else{
        message.channel.send(lang.error.No_Prem+lang.prem.mention_everyone+lang.error.No_Prem2);
        }
      }else{
        message.channel.send(lang.error.No_Prem+lang.prem.mention_everyone+lang.error.No_Prem2)
      }
    }
    }
    },
    "feedback": {
      description: "意見箱",
      fun: function (bot, message, p,clientDB,language,hi, ...ag) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(hi[0] != null) {
          let dbemd = new Discord.MessageEmbed()
          .setTitle(message.author.username + "#" + message.author.discriminator)
          .setDescription(hi.join(" "))
          .setColor(message.member.roles.highest.color)
          .setThumbnail(message.author.displayAvatarURL({format: "png", dynamic: true ,size: 512}), true)
          .setTimestamp()
          try{
          bot.channels.cache.get("750279160743854091").send(dbemd)}
          catch{message.channel.send(lang.error.send)}
          message.channel.send(lang.success.send)

        }else(
          message.channel.send(lang.error.type_text)
        )
      }
    },
    "embed":{
      description: "鑲入",
      fun: function (bot, message, p,clientDB,language,args, ...ag) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(args === null || args == "") {
          let myEmbed = new Discord.MessageEmbed()
          .setColor('#2d9af8')
          .setTitle(useful2.embed.title+p+useful2.embed.title2)
          .setDescription(useful2.embed.desc)
          {message.channel.send(myEmbed)};
        }else{
          let myEmbed2 = new Discord.MessageEmbed()
          try {
          if(args[0] != null) myEmbed2.setTitle(args[0])
        } catch (error) {return message.channel.send(lang.error.Run_Command_error+error)}
        try{
          if(args[1] != null) myEmbed2.setDescription(args[1])
        } catch (error) {return message.channel.send(lang.error.Run_Command_error+error)}
        try{
          if(args[2] != null || args[2] != "") {myEmbed2.setAuthor(args[2] , message.author.displayAvatarURL())}
          if(args[2] == null || args[2] == "") {myEmbed2.setAuthor(message.author.username , message.author.displayAvatarURL())}
        } catch (error) {return message.channel.send(lang.error.Run_Command_error+error)}
          if(args[3] != null) myEmbed2.setFooter(args[3])
          if(args[5] != null) myEmbed2.setImage(args[5])
          try{
          if(args[4] != null) myEmbed2.setColor(args[4])
          myEmbed2.setTimestamp()
        } catch (error) {return message.channel.send(lang.error.Run_Command_error+error)}
          {message.channel.send(myEmbed2)
            message.delete()
          };
        }
      }
    },
    "chinocode":{
      description: "測試",
      fun: function (bot, message, p,clientDB,language,args2, ...ag) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          let code = ["update4.2","chino 1st anniversary","chino hbd","repair"]
          let args = ag.join(" ")
          if(args == null || args == "") return message.channel.send(useful2.code.type_correct)
          if(code.indexOf(args) == "-1") {return message.channel.send(useful2.code.code_error)}else{
            loadUser(clientDB,message.author.id).then((user) => {
              fs.readFile('./code.json',function (err2,userInfo2) {
              if (user === false) {return message.channel.send()};
            var data = userInfo2.toString();data = JSON.parse(data);
            ////////////////////////////
            if(args === "update4.2") {
              if(data.update42.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
              message.channel.send(useful2.code.code_sueccess+"\n`100$`")
              user.money = user.money + 100
              writeUser(clientDB,message.author.id,user)
              data.update42.push(message.author.id)
              var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
              if(args === "chino 1st anniversary") {
                if(data.update61.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
                message.channel.send(useful2.code.code_sueccess+"\n`200$` `Lv +1`\n智乃機器人一周年大禮!!")
                user.money = user.money + 200
                user.rank = user.rank +1
                writeUser(clientDB,message.author.id,user)
                data.update61.push(message.author.id)
                var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
              if(args === "chino hbd") {
                if(data.chinohbd.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
                message.channel.send(useful2.code.code_sueccess+"\n`400$` `Lv +2`\n記得祝智乃生日快樂唷!")
                user.money = user.money + 300
                user.rank = user.rank +2
                writeUser(clientDB,message.author.id,user)
                data.chinohbd.push(message.author.id)
                var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
                if(args === "repair") {
                  if(data.repair.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
                  message.channel.send(useful2.code.code_sueccess+"\n`100$`\n若有不便請見諒!")
                  user.money = user.money + 100
                  writeUser(clientDB,message.author.id,user)
                  data.repair.push(message.author.id)
                  var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
                })
        })}
      }
  },
  "sauce":{
    description: "測試",
    fun: function (bot, message, p,clientDB,language,args2, ...ag) { 
      let lang = lan.zh_TW,useful2 = useful.zh_TW
      if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
      }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
      if(!message.attachments.first()) return message.channel.send("Not found!")      
      let url = message.attachments.first().proxyURL;
      if(!url) return message.channel.send("Not found!")
      let ascii2d = require("ascii2d")
      message.channel.send("🔄請等一下喔...🔎搜尋中!")
      ascii2d.searchByUrl(url,"bovw").then((result2) => {
        if (!result2 || result2.length < 1)
        return message.channel.send("No result!");
        SendEmbed(result2)
        /*result2 = JSON.stringify(result2)
        fs.writeFileSync("./events/test.json",result2)*/
      }).catch((err) => {
        console.log(err)
      })
      let page = 0
      function SendEmbed(result2) {
        let embed = new Discord.MessageEmbed()
        .setTitle("🔄Loading...")
        let button = new disbut.MessageButton(),button2 = new disbut.MessageButton()
        button.setStyle('gray').setID("left").setEmoji('⬅')
        button2.setStyle('gray').setID("right").setEmoji("➡")
        let row = new disbut.MessageActionRow().addComponents(button, button2);
          message.channel.send(embed,row).then((w) => {
            editEmbed(result2,w)
        })
      }
      function ping(reply) {
        bot.api.interactions(reply.discordID,reply.token).callback.post({
            data: {
            type: 6
        }})
    }
    function editEmbed(result2,msg) {
          let length = result2.items.length
          let embed = new Discord.MessageEmbed()
          embed.setAuthor("作者: "+" [未知]")
          let best = ""
          if(page <= 0) best = "[最佳比對]"
          if(result2.items[page].source) {
            embed.setTitle(`[${result2.items[page].source.type}] ${best}`)
            .setDescription(result2.items[page].source.title)
            //.setThumbnail(result2.items[page].thumbnailUrl)
            .setImage(result2.items[page].thumbnailUrl)
            .setURL(result2.items[page].source.url)
          if(result2.items[page].source.author) {embed.setAuthor("作者: "+result2.items[page].source.author.name,null,result2.items[page].source.author.url)}
          else{embed.setAuthor("作者: "+" [未知]")}}else{
            embed.setTitle(`[無標題] [無出處]`)
            .setDescription(`[無內文]`)
            .setImage(result2.items[page].thumbnailUrl)
          }
          embed.setFooter(`[${page+1}/${length+1}] ${result2.items[page].height}x${result2.items[page].width}`)
          let button = new disbut.MessageButton(),button2 = new disbut.MessageButton()
          button.setStyle('gray').setID("left").setEmoji('⬅')
          button2.setStyle('gray').setID("right").setEmoji("➡")
          if(page <= 0) button.setStyle('grey').setID("left").setEmoji('⬅').setDisabled(true)
          if(page === length) button2.setStyle('grey').setID("right").setEmoji("➡").setDisabled(true)
          let row = new disbut.MessageActionRow().addComponents(button, button2);
          msg.edit(embed,row)
          const filter = (button) => button.clicker.id === message.author.id
          msg.awaitButtons(filter,{max: 1,time: 15000,errors:['time']})
          .then(async(buttons) => {
            button = buttons.first()
            ping(button)
            if(button.id === "left") {
              page = page - 1
              return editEmbed(result2,msg)
            }else if(button.id === "right") {
              page = page + 1
              return editEmbed(result2,msg)
            }
          }).catch((err) => {
            let embederr = new Discord.MessageEmbed()
            if(result2.items[page].source) {
              let best2 = ""
              if(page <= 0) best2 = "[最佳比對]"
              embederr.setTitle(`[${result2.items[page].source.type}] ${best2}`)
              .setDescription(result2.items[page].source.title)
              .setURL(result2.items[page].source.url)
              .setFooter(`${result2.items[page].height}x${result2.items[page].width}`)
            }else{
              embederr.setTitle(`[無標題] [無出處]`)
              .setDescription(`[無內文]`)
              .setFooter(`${result2.items[page].height}x${result2.items[page].width}`)
            }
            return msg.edit(embederr,null)
          })
        }
    }
  }
}