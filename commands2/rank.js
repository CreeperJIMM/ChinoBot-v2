const Discord = require("discord.js")
const fs =require("fs");
const lan = require('../commands/lang.json');
const gameX = require('../language/rank.json');
let daily = new Set();
let payd = new Set();
module.exports= {
    "rank":{
        description: "等級查詢",
        fun: function(bot, message, prefix , language, args) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "help") {
                let voiceEmbed = new Discord.MessageEmbed()
                .setTitle(k.rank.setup.title)
                .setDescription(k.rank.setup.desc)
                message.channel.send(voiceEmbed);}else{
                    let member = null,member2 = null
                    let user=bot.users.cache.get(args[0])
                    if (message.mentions.users.size) { 
                        member = message.mentions.users.first()
                     } else if (args[0] != null) {
                        if (user) { member = user }else { member = message.author }
                    } else { member = message.author }
                    if(member){
            fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                if(err) {return}
               else{
                var user = userInfo.toString();
                user = JSON.parse(user);
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.rank.title + user.rank)
                .setDescription(k.rank.exp + user.exp + "/" + (1000+10*user.rank))
                .setFooter(member.username + k.rank.card + ((1000+10*user.rank) - user.exp) + k.rank.card2)
                message.channel.send(rankembed)
               }
            })
        }
        }}
    },
    "money":{
        description: "金錢查詢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let member = null;
            if (message.mentions.users.size) { 
                member = message.mentions.users.first()
             } else if (args[0] != null) {
                if (user) { member = user }else { member = message.author }
            } else { member = message.author }
            if(member){
            fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                if(err) {return}
               else{
                var user = userInfo.toString();
                user = JSON.parse(user);
                fs.readFile('./user.json',function (err2,user2) {
                    if(err2) {return message.channel.send(l.error.Try_again)}
                    var users = user2.toString();users = JSON.parse(users);
                if(users.daily.indexOf(member.id) != "-1") {var today = k.money.d1}else{var today = k.money.d2}
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.money.money + user.money + "$")
                .setDescription(k.money.daily + today)
                .setFooter(member.username + k.money.wallet)
                message.channel.send(rankembed)
               }
            )}})
            }
        }
    },
    "daily":{
        description: "金錢查詢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                if(err) {return message.channel.send(l.error.Try_again)}
               else{
                fs.readFile('./user.json',function (err2,user2) {
                    if(err2) {return message.channel.send(l.error.Try_again)}
                    var users = user2.toString();users = JSON.parse(users);
                if(users.daily.indexOf(message.author.id) != "-1") {return message.channel.send(k.daily.receive)}else{
                users.daily.push(message.author.id);var str2 = JSON.stringify(users);setTimeout(() => {fs.writeFileSync('./user.json',str2)}, 1000);
                var user = userInfo.toString();
                user = JSON.parse(user);
                let tody = 50
                user.work++
                let tod = new Date()
                user.worktoal = {time: user.worktoal.time,work: user.worktoal.work}
                if(user.worktoal.time == 30 || user.worktoal.time == 31) {if(tod.getUTCDate() != 1 || tod.getUTCDate() != 31) user.worktoal.work = 0}else{if(tod.getUTCDate()-1 != user.worktoal.time) user.worktoal.work = 0}
                user.worktoal = {time: tod.getUTCDate() ,work: (user.worktoal.work)+1}
                user.money = user.money + tody + ((user.worktoal.work)*5)
                var str = JSON.stringify(user);
                if(user.adv.indexOf("daily") == "-1") {user.adv.push("daily");message.author.send(k.daily.adv);var str = JSON.stringify(user);}
                setTimeout(() => {
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str);}, 2000); 
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.daily.clean)
                .setDescription(k.daily.dec+user.worktoal.work+k.daily.dec2+(user.worktoal.work)*5+k.daily.dec3)
                .setFooter(message.author.username + k.daily.pay)
                message.channel.send(rankembed)
                
               }})}
            })
        }
    },
    "levels": {
        description: "排行",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            var list = new Array();
            let rankfiles = fs.readdirSync("./users/")
             for (let file of rankfiles) {
                fs.readFile(`./users/${file}`,function (err,userInfo) {
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                if(user.rank > 0) {
                if(user.exp < 10) {
                        var exp = "000"+ user.exp}
                    else if(user.exp < 100) {
                    var exp = "00"+ user.exp}
                    else if(user.exp <1000) {
                        var exp = "0" + user.exp}
                        else{var exp = user.exp}
                if(user.rank < 10) {
                        var rank = "00"+ user.rank}
                    else if(user.rank < 100) {
                        var rank = "0"+ user.rank}
                    else{var rank = "" + user.rank}
                    setTimeout(() => {
                        list.push(rank +" | "+ exp +" | "+ user.name )
                        list.sort(function(a, b) {
                            return a > b;
                        })
                    }, 50);
                }})
            }
            setTimeout(() => {
                list.sort();
                list.reverse();
                list.splice(30);
                  }, 500);
            setTimeout(() => {
            let levelembed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(k.level.ranking.title)
            .setDescription(k.level.ranking.desc+"```js\n"+list.join("\n") + "\n```")
            .setFooter(k.level.ranking.footer)
            message.channel.send(levelembed)
        }, 700);
        }
    },
    "moneys": {
        description: "排行",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            var list = new Array();
            let rankfiles = fs.readdirSync("./users/")
             for (let file of rankfiles) {
                fs.readFile(`./users/${file}`,function (err,userInfo) {
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    if(user.money > 15) {
                    if(user.money < 10) {
                        var money = "00000"+ user.money}
                    else if(user.money < 100) {
                    var money = "0000"+ user.money}
                    else if(user.money <1000) {
                        var money = "000" + user.money}
                    else if(user.money <10000) {
                        var money = "00" + user.money}
                        else if(user.money <100000) {
                            var money = "0" + user.money}
                        else{var money = user.money}
                    list.push(money +" $| "+ user.name )
                    list.sort(function(a, b) {
                        return a > b;
                    });
                }})
            }
            setTimeout(() => {
                list.sort();
                list.reverse();
                list.splice(30);
                  }, 500);
            setTimeout(() => {
            let levelembed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(k.money.ranking.title)
            .setDescription("```js\n"+list.join("\n")+"\n```")
            .setFooter(k.money.ranking.footer)
            message.channel.send(levelembed)
        }, 600);
    }},
    "moneyadd": {
        description: "增加金錢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            fs.readFile('./users/'+ args[0] +'.json',function (err,userInfo) {
                if(err) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                var user = userInfo.toString();
                user = JSON.parse(user);
                user.money = (user.money + parseInt(args[1]))
                var str = JSON.stringify(user);
                message.channel.send("你讓用戶 " + user.name + "的金錢增加了 `" + args[1] + "`\n現在他有 `" + user.money + "`$ 了")
                fs.writeFileSync('./users/'+ args[0] +'.json',str)
            }})
        }
    },
    "moneyremove": {
        description: "減少金錢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            fs.readFile('./users/'+ args[0] +'.json',function (err,userInfo) {
                if(err) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                var user = userInfo.toString();
                user = JSON.parse(user);
                user.money = (user.money - parseInt(args[1]))
                var str = JSON.stringify(user);
                message.channel.send("你讓用戶 " + user.name + "的金錢減少了 `" + args[1] + "`\n現在他變成 `" + user.money + "`$ 了")
                fs.writeFileSync('./users/'+ args[0] +'.json',str)
            }})
        }
    },
    "moneyset": {
        description: "設置金錢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            fs.readFile('./users/'+ args[0] +'.json',function (err,userInfo) {
                if(err) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                var user = userInfo.toString();
                user = JSON.parse(user);
                user.money = parseInt(args[1])
                var str = JSON.stringify(user);
                message.channel.send("你將用戶 " + user.name + "的金錢調成 `" + args[1] + "`$")
                fs.writeFileSync('./users/'+ args[0] +'.json',str)
            }})
        }
    },
    "language": {
        description: "設置語言",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "zh_TW") {
                fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                    if(err) {return message.channel.send(l.error.Try_again)}
                   else{
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    user.language = "zh_TW"
                    var str = JSON.stringify(user);
                    message.channel.send("你的語言已設置成 `中文(繁體)`")
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str)
            }})}else if(args[0] == "zh_CN") {
                fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                    if(err) {return message.channel.send(l.error.Try_again)}
                   else{
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    user.language = "zh_CN"
                    var str = JSON.stringify(user);
                    message.channel.send("你的语言已设置成 `中文(简体)`")
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str)
            }})}else if(args[0] == "en_US") {
                fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                    if(err) {return message.channel.send("❌Write Error!")}
                   else{
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    user.language = "en_US"
                    var str = JSON.stringify(user);
                    message.channel.send("Your language is set to `English`")
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str)
            }})}else if(args[0] == "ja_JP") {
                fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                    if(err) {return message.channel.send("❌Write Error!")}
                   else{
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    user.language = "ja_JP"
                    var str = JSON.stringify(user);
                    message.channel.send("あなたの言語は `日本語` に設定されています")
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str)
            }})}else{
                let langembed = new Discord.MessageEmbed()
                .setTitle()
                .setDescription("The following are the language setting parameters")
                .addField("中文(繁體)","`zh_TW`")
                .addField("中文(简体)","`zh_CN`")
                .addField("English","`en_US`")
                .addField("日本語","`ja_JP`")
                .setFooter("◆本翻譯不是100%準確.\nThis translation is not 100% accurate.")
                .setTimestamp()
                message.channel.send(langembed)
            }
        }
    },
    "pay": {
        description: "給予金錢",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(!message.guild) return message.channel.send(l.error.No_DM)
            if(args[0] == null) {message.channel.send(k.word.mention)}
            else if(args[1] == null || args[1] == "") {message.channel.send(k.word.type_money)}else{
            if(isNaN(args[1])) return message.channel.send(l.error.type_number)
            if(!args[1].indexOf("-")) return message.channel.send(l.error.type_positive)
            if(!args[1].indexOf(".")) return message.channel.send(l.error.type_integer)
            args[1] = Math.round(args[1])
            if(payd.has(message.author.id)) return message.channel.send(k.pay.cool_down)
            fs.readFile('./users/'+ message.author.id +'.json',function (err2,userInfo2) {
                let user = bot.users.cache.get(args[0])
                let member = null;
                if(message.mentions.users.size){
                    member=message.mentions.users.first()
                }else if(user) {
                    member=user
                }else{return message.channel.send(l.error.Not_found_User)}
                if(member){
                    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                    if(err) {return message.channel.send(l.error.Not_found_User)}
                    if(err2) {return message.channel.send(l.error.cant_load)}
                   else{
                    if(member.id === message.author.id) return message.channel.send(k.pay.cant_own)
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    user.money = (user.money + parseInt(args[1]) - Math.floor(parseInt(args[1])* 0.02) )
                    var str = JSON.stringify(user);
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if(user2.money < args[1] + Math.floor(parseInt(args[1])* 0.05)) return message.channel.send(l.error.No_enough_monery)
                    user2.money = (user2.money - parseInt(args[1]) - Math.floor(parseInt(args[1])* 0.02) )
                    var str2 = JSON.stringify(user2);
                    payd.add(message.author.id);
                    payto(bot, message, args);
                    let pay = new Discord.MessageEmbed().setTitle(k.pay.pay+user.name+" "+args[1]+"$")
                    .setDescription(k.pay.you_will+" `" + args[1] + "`$ "+k.pay.give+" **" + user.name + "**\n"+k.pay.now_you+" `" + user2.money + "`$ \n" + user.name + " "+k.pay.now_have+" `" + user.money + "` $")
                    .setFooter("[$] "+k.pay.handing_free+"\n"+k.pay.extra+ Math.floor(parseInt(args[1])* 0.02) +"$ "+k.pay.give_someone).setTimestamp()
                    message.channel.send(pay)
                    fs.writeFileSync('./users/'+ member.id +'.json',str)
                    fs.writeFileSync('./users/'+ message.author.id +'.json',str2)
                }
                })}
        })}
    }},
    "marry": {
        description: "結婚系統",
        fun: function(bot, message2, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message2.guild) return message2.channel.send(l.error.No_DM)
        fs.readFile('./users/'+ message2.author.id +'.json',function (err2,userInfo2) {
            if(err2) {return message2.channel.send(l.error.cant_load)}
            var user2 = userInfo2.toString();
            user2 = JSON.parse(user2);
            let mary = [user2.marry]
            if(mary == "[object Object]" || mary == "") {
        if(args[0] == ``) {message2.channel.send(k.word.mention)}else{
            let user = bot.users.cache.get(args[0])
            let member = null;
            if(message2.mentions.users.size){
                member=message2.mentions.users.first()
            }else if(user) {
                member=user
            }else{return message2.channel.send(l.error.Not_found_User)}
            if(member){
                if(member.id === message2.author.id) {return message2.channel.send(k.marry.cant_own)}
                message2.channel.send(k.word.processing).then((message) => {
                    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                        if(err) {return message.channel.send(k.word.not_fond_user)}else{
                        var user = userInfo.toString();
                        user = JSON.parse(user);
                        let mary2 = [user.marry]
                        if(mary2 == "[object Object]" || mary2 == "") {
                    let marry = new Discord.MessageEmbed()
                    .setTitle(k.marry.timer)
                    .setDescription(k.marry.answer)
                    message.edit("<@" + member.id + "> ")
                message.channel.send(marry).then((message) => {
                        const filter = answer => {
                            return ['yes','no'].includes(answer.content) && answer.author.id === member.id;}
                message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                    .then((ms) => {
                        if(ms.array()[0].content === "yes") {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                    message.edit(marry2);
                    let marry1 = new Discord.MessageEmbed().setTitle(k.marry.marry_complete).setDescription(user2.name + "💕" + user.name).setFooter(k.marry.marry_complete2).setTimestamp()
                    message.channel.send(marry1);
                    user.marry = message2.author.id
                    var str = JSON.stringify(user);
                    fs.writeFileSync('./users/'+ member.id +'.json',str)
                    user2.marry = member.id
                    var str2 = JSON.stringify(user2);
                    fs.writeFileSync('./users/'+ message2.author.id +'.json',str2)
                }else if(ms.array()[0].content === "no") {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                        message.edit(marry2)}
                    }).catch(() => {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                        message.edit(marry2)});
               })}else{message.edit(k.marry.has_someone)}
            }})})}}}
    else{message2.channel.send(k.marry.you_have)
}
})}},
    "divorce": {
    description: "離婚系統",
    fun: function(bot, message2, prefix , language, args ,...ag) {
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    fs.readFile('./users/'+ message2.author.id +'.json',function (err2,userInfo2) {
        var user2 = userInfo2.toString();
        user2 = JSON.parse(user2);
        if(err2) {return message2.channel.send(l.error.cant_load)}
        let mary = [user2.marry]
        if(mary != "[object Object]" || mary != "") {
            fs.readFile('./users/'+ user2.marry +'.json',function (err,userInfo) {
                if(err) {return message2.channel.send(k.word.not_fond_user)}else{
                var other = user2.marry
                var user = userInfo.toString();
                user = JSON.parse(user);
                let marry = new Discord.MessageEmbed()
                .setTitle(k.divorce.sure)
                .setDescription(k.divorce.answer)
                message2.channel.send(marry).then((message) => {
                    const filter = answer => {
                        return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
            message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                .then((ms) => {
                    if(ms.array()[0].content === "yes") {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                message.edit(marry2);
                let marry1 = new Discord.MessageEmbed().setTitle(k.divorce.divorce).setDescription(user2.name + "💔" + user.name).setFooter(k.divorce.divorce2).setTimestamp()
                message.channel.send(marry1);
                user.marry = ""
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/'+ other +'.json',str)
                user2.marry = ""
                var str2 = JSON.stringify(user2);
                fs.writeFileSync('./users/'+ message2.author.id +'.json',str2)
            }else if(ms.array()[0].content === "no") {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                message.edit(marry2)}
                }).catch(() => {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                    message.edit(marry2)});
                    })}})}
else{message2.channel.send(k.divorce.hasnt)
}
})}},
"pet": {
    description: "寵物系統",
    fun: function(bot, message2, prefix , language, args ,...ag) {
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message2.guild) return message2.channel.send(l.error.No_DM)
        if(args[0] === "add") {
            fs.readFile('./users/'+ message2.author.id +'.json',function (err2,userInfo2) {
                if(err2) {return message2.channel.send(l.error.cant_load)}
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
            if(args[1] == ``) {message2.channel.send(k.word.not_fond_user)}else{
                let user = bot.users.cache.get(args[1])
                let member = null;
                if(message2.mentions.users.size){
                    member=message2.mentions.users.first()
                }else if(user) {
                    member=user
                }else{return message2.channel.send(l.error.Not_found_User)}
                if(member){
                    if(member.id === message2.author.id) {return message2.channel.send(k.pet.add.no_own)}
                    if(user2.pet.indexOf(member.id) != -1) {return message2.channel.send(k.pet.add.has_adot)}
                    message2.channel.send(k.word.processing).then((message) => {
                        fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                            if(err) {return message.channel.send(k.word.not_fond_user)}else{
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                        let marry = new Discord.MessageEmbed()
                        .setTitle(k.pet.add.timer)
                        .setDescription(k.pet.add.answer)
                        message.edit("<@" + member.id + "> ")
                    message.channel.send(marry).then((message) => {
                            const filter = answer => {
                                return ['yes','no'].includes(answer.content) && answer.author.id === member.id;}
                    message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                        .then((ms) => {
                            if(ms.array()[0].content === "yes") {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                        message.edit(marry2);
                        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.add.complete_adot).setDescription(user2.name + "🔗" + user.name).setFooter(k.pet.add.complete_adot2).setTimestamp()
                        message.channel.send(marry1);
                        user.host.push(message2.author.id)
                        user.hostname = user.hostname + message2.author.username + "#" + message2.author.discriminator+"\n"
                        var str = JSON.stringify(user);
                        fs.writeFileSync('./users/'+ member.id +'.json',str)
                        user2.pet.push(member.id)
                        user2.petname = user2.petname + member.username + "#" + member.discriminator+"\n"
                        var str2 = JSON.stringify(user2);
                        fs.writeFileSync('./users/'+ message2.author.id +'.json',str2)
                            }else if(ms.array()[0].content === "no") {
                                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                                message.edit(marry2)
                            }
                        }).catch(() => {
                            let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                            message.edit(marry2)});
                   })
                }})})}
        }})}else if(args[0] === "remove") {
            fs.readFile('./users/'+ message2.author.id +'.json',function (err2,userInfo2) {
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
                if(err2) {return message2.channel.send(l.error.cant_load)}
                        if(args[1] == ``) {message2.channel.send(k.word.not_fond_user)}else{
                            let user = bot.users.cache.get(args[1])
                            let member = null;
                            if(message2.mentions.users.size){
                                member=message2.mentions.users.first()
                            }else if(user) {
                                member=user
                            }else{return message2.channel.send(l.error.Not_found_User)}
                            if(member){
                            let id = member.id
                            if(id === message2.author.id) {return message2.channel.send(k.pet.add.no_own)}
                            if(user2.pet.indexOf(id) === -1) {return message2.channel.send(k.pet.remove.no_pet)}
                                fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                                    if(err) {return message2.channel.send(k.word.not_fond_user)}else{
                                    var user = userInfo.toString();
                                    user = JSON.parse(user);
                            if(user2.pet.indexOf(member.id) != "-1") {
                                message2.channel.send("🔄處理中").then((message) => {
                                    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                                        if(err) {return message.channel.send(k.word.not_fond_user)}else{
                                        var user = userInfo.toString();
                                        user = JSON.parse(user);
                        let marry = new Discord.MessageEmbed()
                        .setTitle(k.pet.remove.sure)
                        .setDescription(k.pet.remove.answer)
                        message2.channel.send(marry).then((message) => {
                            const filter = answer => {
                                return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
                    message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                        .then((ms) => {
                            if(ms.array()[0].content === "yes") {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                        message.edit(marry2);
                        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.remove.remome_adot).setDescription(user2.name + "❌" + user.name).setFooter(k.pet.remove.remove_adot2).setTimestamp()
                        message.channel.send(marry1);
                        var array = user.host
                        var index = array.indexOf(message2.author.id)
                        if (index> -1) {array.splice(index, 1);}
                        var str2 = user.hostname
                        user.hostname = str2.replace(message2.author.username + "#" + message2.author.discriminator + "\n", '').replace(message2.author.username + "#" + message2.author.discriminator, '')
                        var str = JSON.stringify(user);
                        fs.writeFileSync('./users/'+ member.id +'.json',str)
                        var array2 = user2.pet
                        var index2 = array2.indexOf(member.id)
                        if (index2> -1) {array2.splice(index2, 1);}
                        var str2 = user2.petname
                        user2.petname = str2.replace(member.username + "#" + member.discriminator + "\n", '').replace(member.username + "#" + member.discriminator, '')
                        var str2 = JSON.stringify(user2);
                        fs.writeFileSync('./users/'+ message2.author.id +'.json',str2)
                            }else if(ms.array()[0].content === "no")  {
                                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                                message.edit(marry2)
                            }
                    }).catch(() => {
                            let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                            message.edit(marry2)});
                            })}})})}}})}
                        }})
        }else if(args[0] === "disconnect") {
            fs.readFile('./users/'+ message2.author.id +'.json',function (err2,userInfo2) {
                if(err2) return message2.channel.send(l.error.cant_load)
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
                let member = null;
                let user=bot.users.cache.get(args[1])
                if(message2.mentions.users.first()) {member = message2.mentions.users.first()}else if(user) {
                   member = user
                  }else{return message2.channel.send(k.pet.disconnect.not_host)}
                  let id = member.id
                  if(user2.host.indexOf(id) === -1) {return message2.channel.send(k.pet.disconnect.not_fond_host)}
                  message2.channel.send(k.word.processing).then((message) => {
                    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                        if(err) {return message.channel.send(k.word.not_fond_user)}else{
                        var user = userInfo.toString();
                        user = JSON.parse(user);
        let marry = new Discord.MessageEmbed().setTitle(k.pet.disconnect.sure).setDescription(k.pet.disconnect.answer)
        message2.channel.send(marry).then((message) => {
            const filter = answer => {
                return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
    message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
        .then((ms) => {
            if(ms.array()[0].content === "yes") {
        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
        message.edit(marry2);
        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.disconnect.disconnect).setDescription(user2.name + "❌" + user.name).setFooter(k.pet.disconnect.disconnect2).setTimestamp()
        message.channel.send(marry1);
        var array = user2.host
        var index = array.indexOf(member.id)
        if (index> -1) {array.splice(index, 1);}
        let str2 = user2.hostname
        user2.hostname = str2.replace(member.username + "#" + member.discriminator + "\n", '').replace(member.username + "#" + member.discriminator, '').replace(user2.name+"#"+ member.discriminator, '')
        var str = JSON.stringify(user2);
        fs.writeFileSync('./users/'+ message2.author.id +'.json',str)
        var array2 = user.pet
        var index2 = array2.indexOf(message2.author.id)
        if (index2> -1) {array2.splice(index2, 1);}
        let str3 = user.petname
        user.petname = str3.replace(message2.author.username + "#" + message2.author.discriminator + "\n", '').replace(message2.author.username + "#" + message2.author.discriminator, '').replace(user2.name + "#" + message2.author.discriminator, '')
        var str4 = JSON.stringify(user);
        fs.writeFileSync('./users/'+ member.id +'.json',str4)
            }else if(ms.array()[0].content === "no")  {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                message.edit(marry2)
            }
        })
        })}})})})
        }else if(args[0] === "feed") {

        }else if(args[0] === "pat") {

        }else{
            let pethelp = new Discord.MessageEmbed().setColor( message2.member.roles.highest.color).setTitle(k.pet.help.title).setDescription(k.pet.help.desc).setTimestamp()
            message2.channel.send(pethelp)
        }
    }
},
"card": {
    description: "用戶資料",
    fun: function(bot, message, prefix , language, args ,...ag) {
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    if(!message.guild) return message.channel.send(l.error.No_DM)
    let member = null,member2 = null
    let user=bot.users.cache.get(args[0])
    if (message.mentions.users.size) { 
        member = message.mentions.users.first()
     } else if (args[0] != null) {
        if (user) { member = user }else { member = message.author }
    } else { member = message.author }
    if(member){
    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
        if(err) {return message.channel.send(l.error.Not_found_Member)}
        var user = userInfo.toString();
        user = JSON.parse(user);
        let userdata = new Discord.MessageEmbed()
        .setColor( message.member.roles.highest.color)
        .setTitle("Rabbit House " + k.card.card)
        .setDescription(member.username+" "+member.id)
        .setThumbnail(member.displayAvatarURL({format: "png", dynamic: true ,size: 512}))
        .addField(k.card.data, k.card.money + user.money + "\n"+k.card.exp + user.rank + " / " + user.exp)
        .addField(k.card.interactive,k.card.Chino+user.chino +`${k.card.times}\n${k.card.Cocoa}`+user.cocoa +`${k.card.times}\n${k.card.Tippy}`+user.tippy +`${k.card.times}\n${k.card.Other}`+user.other +`${k.card.times}`)
        .addField(k.card.stock+"\n"+k.card.loved, "◆"+user.picture.love)
        .addField(k.card.report, "◆"+user.picture.report)
        .addField(k.card.share, "◆"+user.picture.share)
        .addField(k.card.work_all + user.work + k.card.times+" \n"+k.card.work_last + user.worktoal.work + l.date.day,k.card.work_first + user.time)
        .setFooter(k.card.ID_card+" ▋▏▎▍▋▍▋▏▏▍▋▏▍▍▋▏▋▍▉▏▍")
        .setTimestamp()
        message.channel.send(userdata)
})}
}},
"giveall": {
    description: "更新",
    fun: function(bot,message,args) { 
        if(message.author.id !== '546144403958398988') return;
        let rankfiles = fs.readdirSync("./users/")
        for (let file of rankfiles) {
            fs.readFile('./users/'+file ,function (err,userInfo) {
                var user = userInfo.toString();
                user = JSON.parse(user);
                let money = user.money
                let marry = user.marry
                let adv = user.adv
                  var obj = {
                    name: user.name,
                    guild: user.guild,
                    language: user.language,
                    money: money,
                    usemoney: 0,
                    rank: user.rank,
                    guildrank: 0,
                    exp: user.exp,
                    guildxep: 0,
                    marry: marry,
                    host: [],
                    hostname: "",
                    pet: [],
                    petname: "",
                    sex: {},
                    age: {},
                    chino: user.chino,
                    cocoa: user.cocoa,
                    tippy: user.tippy,
                    other: user.other,
                    work: user.work,
                    bank: 0,
                    adv: adv,
                    item: [],
                    bag: [],
                    time: user.time,
                    ver: `4.1`,
                  };
                 var json = JSON.stringify(obj);
                 fs.writeFileSync('./users/'+file,json);
                })
        }
        message.channel.send("已成功更新所有成員Json!")}
    },
    "givepet": {
        description: "更新",
        fun: function(bot,message,a,args) { 
            if(message.author.id !== '546144403958398988') return;
            let up = 0
            let rankfiles = fs.readdirSync("./users/")
            for (let file of rankfiles) {
                fs.readFile('./users/'+file ,function (err,userInfo) {
                    var user = userInfo.toString();
                    user = JSON.parse(user);
                    let money = user.money
                    let marry = user.marry
                    let adv = user.adv
                      var obj = {
                        name: user.name,
                        guild: user.guild,
                        language: user.language,
                        money: money,
                        usemoney: 0,
                        rank: user.rank,
                        guildrank: 0,
                        exp: user.exp,
                        guildxep: 0,
                        marry: marry,
                        host: user.host,
                        hostname: user.hostname,
                        pet: user.pet,
                        petname: user.petname,
                        sex: {},
                        age: {},
                        chino: user.chino,
                        cocoa: user.cocoa,
                        tippy: user.tippy,
                        other: user.other,
                        work: user.work,
                        bank: 0,
                        adv: adv,
                        item: [],
                        bag: [],
                        time: user.time,
                        ver: `3.8.5`,
                      };
                     var json = JSON.stringify(obj);
                     fs.writeFileSync('./users/'+file,json);
                     up++
                    
                    })
            }
            message.channel.send("已成功更新所有成員Json!" + up)}
        },
        "updateall2": {
            description: "更新",
            fun: function(bot,message,a,args) { 
                if(message.author.id !== '546144403958398988') return;
                let up = 0
                let rankfiles = fs.readdirSync("./users/")
                for (let file of rankfiles) {
                    fs.readFile('./users/'+file ,function (err,userInfo) {
                        var user = userInfo.toString();
                        user = JSON.parse(user);
                        let money = user.money
                        let marry = user.marry
                        let adv = user.adv
                          var obj = {
                            name: user.name,
                            guild: user.guild,
                            language: user.language,
                            money: money,
                            usemoney: 0,
                            rank: user.rank,
                            guildrank: 0,
                            exp: user.exp,
                            guildxep: 0,
                            marry: marry,
                            host: user.host,
                            hostname: user.hostname,
                            pet: user.pet,
                            petname: user.petname,
                            sex: {},
                            age: {},
                            chino: user.chino,
                            cocoa: user.cocoa,
                            tippy: user.tippy,
                            other: user.other,
                            work: user.work,
                            worktoal:{time: 7,work: 1},
                            picture: {love: [],report: [],share: []},
                            bank: 0,
                            adv: adv,
                            item: [],
                            bag: [],
                            time: user.time,
                            ver: user.ver,
                          };
                         var json = JSON.stringify(obj);
                         fs.writeFileSync('./users/'+file,json);
                         up+1
                        })
                }
                message.channel.send("已成功更新所有成員Json!" + up)}
            },
    "permissions": {
        description: "權限",
        fun: function(bot, message, prefix , language, args) {
            access(bot,message,args,language)
       }
    },
    "permission": {
        description: "權限",
        fun: function(bot, message, prefix , language, args) {
            access(bot,message,args,language)
       }
    },
    "banlist": {
        description: "權限",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let guild = null
            if(args[0] != null) {
                guild = bot.guilds.cache.get(args[0])
            }else{
                guild = message.guild;}
            guild.fetchBans()
    .then(banned => {
        let list = banned.map(ban => ban.user.tag).join('\n');

        if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

        message.channel.send(`**${banned.size} users are banned:**\n${list}`);
    })
    .catch(console.error);
       }
    },
    "perm": {
        description: "權限",
        fun: function(bot, message, prefix , language, args) {
            access(bot,message,args,language)
       }
    },
    "adv": {
        description: "成就",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                fs.readFile('./users/'+ message.author.id +'.json',function (err,userInfo) {
                  if(err) {return}else{var user = userInfo.toString();user = JSON.parse(user);
                    var adv = new Array();
                    if(user.adv.indexOf("notfound") == "-1") {"無"}else{adv.push("[ 好像打錯了...(˘•ω•˘) ] - 打錯指令\n")}
                    if(user.adv.indexOf("speed") != "-1") adv.push("[ 打太快惹>_< ] - 打指令太快\n")
                    if(user.adv.indexOf("chino") != "-1") adv.push("[ 智乃初見面! ] - 打智乃指令\n")
                    if(user.adv.indexOf("chino10") != "-1") adv.push("[ 智乃熟客! ] - 打智乃指令十次\n")
                    if(user.adv.indexOf("nomoneychino") != "-1") adv.push("[ 就算沒錢我也要買智乃! ] - 沒有錢打智乃指令\n")
                    if(user.adv.indexOf("specaial") != "-1") adv.push("[ 特別服務>w< ] - 智乃Nsfw\n")
                    if(user.adv.indexOf("daily") != "-1") adv.push("[ 領薪水! ] - 領取今日金錢\n")
                    if(user.adv.indexOf("S3get") != "-1") adv.push("[ 2020新糧食! ] - 打點兔S3指令\n")
                    let advs = new Discord.MessageEmbed()
                    .setColor( message.member.roles.highest.color)
                    .setTitle(message.member.displayName + " 成就表")
                    .setDescription(message.author.username+"#"+message.author.discriminator)
                    .addField("🏅成就表","\n " + adv)
                    message.channel.send(advs)
                }})
        }}
}
async function access(bot,message,args,language) {
    let l = lan.zh_TW,k = gameX.zh_TW
    if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
    }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    let guild2 = null
    if(!message.guild) return message.channel.send(l.error.server_cmd)
    let member = null,member2 = null
    let user=bot.users.cache.get(args[0])
    if(args[1] != null) {
        if(bot.guilds.cache.get(args[1])) {
       guild2 = bot.guilds.cache.get(args[1])
        }else{guild2 = message.guild}
    }else{guild2 = message.guild}
    if (message.mentions.users.size) { 
        member = message.mentions.users.first()
        member = guild2.member(member.id)
     } else if (args[0] != null) {
        if (user) { 
            member = user
            member = guild2.member(member.id)
         }else { member = message.member }
    } else { member = message.member }
    if(member){
    if(member.presence.member.hasPermission(['ADMINISTRATOR'])) {var admi = "✅"}else{var admi = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_CHANNELS'])) {var manage = "✅"}else{var manage = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_GUILD'])) {var guild = "✅"}else{var guild = "❌"}
    if(member.presence.member.hasPermission(['VIEW_AUDIT_LOG'])) {var log = "✅"}else{var log = "❌"}
    if(member.presence.member.hasPermission(['KICK_MEMBERS'])) {var kick = "✅"}else{var kick = "❌"}
    if(member.presence.member.hasPermission(['BAN_MEMBERS'])) {var ban = "✅"}else{var ban = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_ROLES'])) {var role = "✅"}else{var role = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_WEBHOOKS'])) {var hook = "✅"}else{var hook = "❌"}
    if(member.presence.member.hasPermission(['MENTION_EVERYONE'])) {var tag = "✅"}else{var tag = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_EMOJIS'])) {var emoji = "✅"}else{var emoji = "❌"}
    if(member.presence.member.hasPermission(['MANAGE_MESSAGES'])) {var msg = "✅"}else{var msg = "❌"}
    if(member.presence.member.hasPermission(['CREATE_INSTANT_INVITE'])) {var inv = "✅"}else{var inv = "❌"}
    if(guild2.owner.user.id == member.id) {var owner = "👑 是"}else{var owner = "💂‍♂️ 否"}
    let acc = new Discord.MessageEmbed()
    .setColor(member.presence.member.roles.highest.color)
    .setTitle(member.user.username +k.prem.perm+k.prem.in+guild2.name)
    .setDescription(k.prem.hight + "<@&" + member.presence.member.roles.highest + "> \n"+k.prem.owner+ owner)
    .addField(k.prem.prem2, `${l.prem.ADMINISTRATOR} `+admi+`\n${l.prem.manage_guild} `+guild+`\n${l.prem.manage_channel} `+manage+`\n${k.prem.log} `+log+`\n${l.prem.kick_members} `+kick+ `\n${l.prem.ban_members} `+ban+`\n${l.prem.manage_roles} `+role+`\n${l.prem.manage_messages} `+msg+`\n${l.prem.manage_webhooks} `+hook+`\n${l.prem.mention_everyone} `+tag+`\n${k.prem.emoji} `+emoji+`\n${k.prem.ink} `+inv)
    message.channel.send(acc)
    }
};
async function payto(bot, message ,args) {
    setTimeout(() => {
        payd.delete(message.author.id)
    }, 20000);
};