const Discord = require("discord.js")
const fs = require('fs');
const lan = require('../commands/lang.json');
const useful = require('../language/useful.json');
module.exports = {
    "hi":{
        description: "測試",
        fun: function (bot, message, p,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
            message.reply(lang.word.hihi)
        }
    },
    "ping":{
        description: "ping",
        fun: function (bot, message, p,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
          let time = new Date()
            if(message.author.bot) return;
          message.channel.send("pong!").then(( lastMessage) => {
            let time2 = new Date()
            let time3 = (time2.getUTCMilliseconds() - time.getUTCMilliseconds())
            if(lastMessage.content === `pong!`) {
              lastMessage.edit("pong!!").then((editmessage) => {
                let time4 = new Date();let time5 = (time4.getUTCMilliseconds() - time2.getUTCMilliseconds())
              {return message.channel.send(lang.word.chino+ useful2.ping.delay + (Math.round((lastMessage.createdAt - message.createdAt)) + ' ms\n\n'+lang.word.message + useful2.ping.delay+': '+ time3 +' ms\n'+lang.word.edit+useful2.ping.delay+': '+ time5 +" ms" ))};}
          )}})
    }},
    "date":{
        description: "日期",
        fun: function (bot, msg, p,language,args, ...ag) { 
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
        fun: function (bot, message, p,language,ag) { 
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
            const member=bot.users.cache.get(ag[0])
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
        fun: function (bot, message, p,language,args) { 
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
      fun: function (bot, message, p,language,args) { 
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
    fun: function (bot, message, p,language,args) { 
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
      fun: function (bot, message, p,language,args, ...ag) { 
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
        fun: function (bot, message, p,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
            if(message.content.includes("@")) {
                if(message.member.hasPermission(['MENTION_EVERYONE'])) {
                  {message.channel.send("<:Transparent:751597051963506698> " + ag.join(" ") )}
                  message.delete();
                }else{
                  message.channel.send(lang.error.No_Prem+lang.prem.mention_everyone+lang.error.No_Prem2) }
              }else{
                  {message.channel.send("<:Transparent:751597051963506698> " + ag.join(" ") )}
                  message.delete();
            }
        }
    },
    "tts": {
        description: "機器人說話(tts)",
        fun: function (bot, message, p,language,args, ...ag) { 
          let lang = lan.zh_TW,useful2 = useful.zh_TW
          if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
          }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        if(!message.guild) {
          {message.channel.send(ag.join(" ") ,{tts: true})}
        }else{
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
      }}
    },
    "feedback": {
      description: "意見箱",
      fun: function (bot, message, p,language,hi, ...ag) { 
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
      fun: function (bot, message, p,language,args, ...ag) { 
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
      fun: function (bot, message, p,language,args, ...ag) { 
        let lang = lan.zh_TW,useful2 = useful.zh_TW
        if(language === "zh_TW") {lang = lan.zh_TW;useful2 = useful.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;useful2 = useful.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;useful2 = useful.ja_JP
        }else if(language === "en_US") {lang = lan.en_US;useful2 = useful.en_US}
        fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
          if(err) {return message.channel.send(lang.error.Run_Command_error+lang.error.Try_again)}
          var user = userInfo.toString();user = JSON.parse(user);
          let code = ["update4.2","chino hbd","repair"]
          let args = args2.join(" ")
          if(args == null || args == "") return message.channel.send(useful2.code.type_correct)
          if(code.indexOf(args) == "-1") {return message.channel.send(useful2.code.code_error)}else{
          fs.readFile('./code.json',function (err,userInfo2) {
            if(err) {return message.channel.send()};
            var data = userInfo2.toString();data = JSON.parse(data);
            ////////////////////////////
            if(args === "update4.2") {
              if(data.update42.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
              message.channel.send(useful2.code.code_sueccess+"\n`100$`")
              user.money = user.money + 100
              var json = JSON.stringify(user);fs.writeFileSync('./users/'+ message.author.id +'.json',json);
              data.update42.push(message.author.id)
              var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
              if(args === "chino hbd") {
                if(data.chinohbd.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
                message.channel.send(useful2.code.code_sueccess+"\n`400$` `Lv +2`\n記得祝智乃生日快樂唷!")
                user.money = user.money + 400
                user.rank = user.rank +2
                var json = JSON.stringify(user);fs.writeFileSync('./users/'+ message.author.id +'.json',json);
                data.chinohbd.push(message.author.id)
                var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
                if(args === "repair") {
                  if(data.repair.indexOf(message.author.id) != "-1") return message.channel.send(useful2.code.code_wasClean)
                  message.channel.send(useful2.code.code_sueccess+"\n`100$`\n若有不便請見諒!")
                  user.money = user.money + 100
                  var json = JSON.stringify(user);fs.writeFileSync('./users/'+ message.author.id +'.json',json);
                  data.repair.push(message.author.id)
                  var json2 = JSON.stringify(data);fs.writeFileSync('./code.json',json2);}
        })}})
      }
  },
}