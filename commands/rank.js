const Discord = require("discord.js");
const fs =require("fs");
const lan = require('../commands/lang.json');
const gameX = require('../language/rank.json');
let daily = new Set();
let payd = new Set();
let Mongo = require("../function/MongoData");
let pooluser = new Set();
function deletepool(id) {
    setTimeout(() => {
        pooluser.delete(id)
    }, 60000);
}
let api = require("../function/apiping");
module.exports= {
    "rank":{
        description: {zh_TW:"查看經驗值",en_US:"View rank.",ja_JP:""},
        authority: "everyone",
        instructions: "rank [@muention/ID＊]",
        category: "rank",
        vote: false,
        help: false,
        fun: function(bot, message, prefix,clientDB , language, args) {
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
                        Mongo.loadUser(clientDB,member.id).then((user) => {
                            if (user === false) {return}else{
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.rank.title + user.rank)
                .setDescription(k.rank.exp + user.exp + "/" + (1000+50*user.rank))
                .setFooter(member.username + k.rank.card + ((1000+50*user.rank) - user.exp) + k.rank.card2)
                return message.channel.send({embeds: [rankembed]});
               }
            })
        }
        }}
    },
    "money":{
        description: {zh_TW:"查看金錢",en_US:"View money.",ja_JP:""},
        authority: "everyone",
        instructions: "money [@muention/ID＊]",
        category: "user",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let member = null;
            let user=bot.users.cache.get(args[0])
            if (message.mentions.users.size) { 
                member = message.mentions.users.first()
             } else if (args[0] != null) {
                if (user) { member = user }else { member = message.author }
            } else { member = message.author }
            if(member){
                Mongo.loadUser(clientDB,member.id).then((user) => {
                    if (user === false) {return}
               else{
                Mongo.loadDaily(clientDB).then((users) => {
                    if(users === false) {return message.channel.send(l.error.Try_again)}
                if(users.daily.indexOf(member.id) != "-1") {var today = k.money.d1}else{var today = k.money.d2}
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.money.money + user.money + "$")
                .setDescription(k.money.daily + today)
                .setFooter(member.username + k.money.wallet)
                return message.channel.send({embeds: [rankembed]});
               }
            )}})
            }
        }
    },
    "work":{
        description: {zh_TW:"查看金錢",en_US:"View money.",ja_JP:""},
        authority: "everyone",
        instructions: "work [ job type]\n\n[jobs]\n-`fish`",
        category: "money",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            //fish 釣魚
            //mine 挖礦
            //teacher 批改
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let member = message.author 
            if(member){
                Mongo.loadUser(clientDB,member.id).then((user) => {
                    if (user === false) {return}else{
                let workembed = new Discord.MessageEmbed()
                if(!args[0] || args[0] === "" || args[0] === null) {
                    return message.channel.send("❌你沒有告訴我你要哪個工作啊\n-`fish` 釣魚")
                }
                if(user.money >= 400) return message.channel.send("❌抱歉.\n這指令只能給低於400塊的成員和負債的成員使用!")
                if(pooluser.has(message.author.id)) return message.channel.send("💀連續工作會爆肝阿!\n60秒後再來吧.")
                let money = 0
                pooluser.add(message.author.id)
                deletepool(message.author.id)
                let button = new Discord.MessageButton()
                button.setStyle('SUCCESS').setEmoji("🎣").setCustomId("pick")
                let row = new Discord.MessageActionRow().addComponents(button)
                switch (args[0]) {
                    case "fish":
                        let ro = "<:rope:872014636688494632>"
                        let fishMain = new Discord.MessageEmbed()
                        .setTitle("釣魚場").setDescription(`
                        ⬛⬛🚣⬛⬛
                        🟦🟦${ro}🟦🟦
                        🟦🟦🪝🟦🟦
                        🟦🟦🟦🟦🟦
                        🟦🟦🟦🟦🟦
                        `).setFooter(`${message.author.username} 的魚場`)
                        message.channel.send({embeds: [fishMain],components:[row]}).then((im) => {
                            work_fish(im)
                        })
                        break;
                    case "mine":
                        work_mine()
                        break;
                    case "teacher":
                        work_teacher()
                        break;
                    default:
                        break;
                }
                function work_fish(im) {
                    let fishnum = Math.ceil(Math.random()*3)
                    let fishs = ["🐟","🐠","🦐","💣"]
                    let prices = [10,30,60,null]
                    let fish = fishs[fishnum]
                    let price = prices[fishnum]
                    let num = Math.floor(Math.random()*15)
                    let ro = "<:rope:872014636688494632>"
                    setTimeout(() => {
                        let fishMain = new Discord.MessageEmbed()
                        .setTitle("釣魚場").setDescription(`⬛⬛🚣⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦🟦🟦🟦\n${fish}🟦🟦🟦🟦`).setFooter(`${message.author.username} 的魚場\n[目前已賺到 ${money}$]`)
                        let num2 = Math.floor(Math.random()*10)
                        im.edit({embeds: [fishMain],components:[row]})
                        setTimeout(() => {
                            fishMain.setTitle("釣魚場 [上鉤了 快收竿!]")
                            fishMain.setDescription(`⬛⬛🚣⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦${fish}🟦🟦\n🟦🟦🟦🟦🟦`)
                            im.edit({embeds: [fishMain],components:[row]})
                            close(fishMain)
                        }, num2*1000);
                    }, num*1000);
                    function close(fishMain) {
                        let num2 = Math.floor(Math.random()*4)
                            const filter = (button) => button.user.id === message.author.id
                            im.awaitMessageComponent({filter, max: 1, time: 900+num2*1000, errors: ['time'] })
                                .then(collected => {
                                    api.ping(bot,collected)
                                    if(fishnum != 3) {
                                        fishMain.setTitle(`釣魚場 [恭喜賺到 ${price}]`).setDescription(`⬛⬛🚣⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦`)
                                        money = money + price
                                        im.edit({embeds: [fishMain],components:[row]})
                                        return work_fish(im);
                                        }else{
                                            fishMain.setTitle("釣魚場 [你釣到炸彈!] [遊戲結束]").setDescription(`⬛⬛💀⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦`)
                                            im.edit({embeds: [fishMain],components:[row]})
                                            user.money = user.money + money
                                            Mongo.writeUser(clientDB,message.author.id,user)
                                            return;
                                        }                                    
                                }).catch((err) => {
                                    if(fishnum != 3) {
                                    fishMain.setTitle("唉呀! 魚跑走了:( [遊戲結束]").setDescription(`⬛⬛🚣⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦`)
                                    im.edit({embeds: [fishMain],components:[row]})
                                    user.money = user.money + money
                                    Mongo.writeUser(clientDB,message.author.id,user)
                                    }else{
                                        fishMain.setTitle("釣魚場 [已跳過炸彈]").setDescription(`⬛⬛🚣⬛⬛\n🟦🟦${ro}🟦🟦\n🟦🟦🪝🟦🟦\n🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦`)
                                        im.edit({embeds: [fishMain],components:[row]})
                                        return work_fish(im)
                                    }
                                })
                    }
                }
                function work_mine() {

                }
                function work_teacher() {

                }

            }})
            }
        }
    },
    "daily":{
        description: {zh_TW:"領取今日金錢",en_US:"Receive daily money.",ja_JP:""},
        authority: "everyone",
        instructions: "daily",
        category: "money",
        vote: true,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            Mongo.loadUser(clientDB,message.author.id).then((user) => {
                if (user === false) {return message.channel.send(l.error.Try_again)}
               else{
                   Mongo.loadDaily(clientDB).then((users) => {
                    if(users === false) {return message.channel.send(l.error.Try_again)}
                if(users.daily.indexOf(message.author.id) != "-1") {return message.channel.send(k.daily.receive)}else{
                users.daily.push(message.author.id)
                Mongo.writeDaily(clientDB,users)
                let tody = 50
                user.work++
                let tod = new Date().getTime()
                user.worktoal = {time: user.worktoal.time,work: user.worktoal.work,top: user.worktoal.top}
                if(!isNaN(parseInt(user.worktoal.time))) {
                a=(parseInt(tod - user.worktoal.time))/(24*60*60*1000);a=Math.ceil(a*10)/10;
                if(a >= 1.5) user.worktoal.work = 0
                }else{
                    user.worktoal.work = 0
                }
                let top = 0
                if(user.worktoal.top) {
                    if((user.worktoal.work)+1 >= user.worktoal.top) {
                        top = (user.worktoal.work)+1
                    }else{
                        top = user.worktoal.top
                    }
                }
                user.worktoal = {time: tod ,work: (user.worktoal.work)+1,top: top}
                user.money = user.money + tody + ((user.worktoal.work)*5)
                if(user.adv.indexOf("daily") == "-1") {user.adv.push("daily");message.author.send(k.daily.adv);}
                Mongo.writeUser(clientDB,message.author.id,user)
                let rankembed = new Discord.MessageEmbed()
                .setColor('#2d9af8')
                .setTitle(k.daily.clean)
                .setDescription(k.daily.dec+user.worktoal.work+k.daily.dec2+(user.worktoal.work)*5+k.daily.dec3)
                .setFooter(message.author.username + k.daily.pay)
                return message.channel.send({embeds: [rankembed]});
               }})
            }})
        }
    },
    "levels": {
        description: {zh_TW:"查看經驗排行榜",en_US:"View level ranking.",ja_JP:""},
        authority: "everyone",
        instructions: "levels",
        category: "rank",
        vote: true,
        help: false,
        fun: async function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            var list = new Array();
            let dbo =clientDB.db("mydb"),query = { "type": "user" };
            message.channel.send(`🔄抓取資料中...\n請等一下!(約8秒)`)
            await dbo.collection("users").find(query).toArray(function(err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                 for (let file of result) {
                     file = file[0]
                    let id= file.id
                    let user = file[id]
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
                        list.push(rank +" | "+ exp +" | "+ user.name +`|${id}` )
                        list.sort(function(a, b) {
                            return a > b;
                        })
                }
            }
            list.sort();
            list.reverse();
            list.splice(30);
            setTimeout(() => {
            let levelembed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(k.level.ranking.title)
            .setDescription(k.level.ranking.desc+"```js\n"+list.join("\n") + "\n```")
            .setFooter(k.level.ranking.footer)
            return message.channel.send({embeds: [levelembed]});
        }, 600);
        })}
    },
    "moneys": {
        description: {zh_TW:"查看金錢排行榜",en_US:"View money ranking.",ja_JP:""},
        authority: "everyone",
        instructions: "moneys",
        category: "rank",
        vote: true,
        help: false,
        fun: async function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            var list = new Array();
            let dbo =clientDB.db("mydb"),query = { "type": "user" }
            message.channel.send(`🔄抓取資料中...\n請等一下!(約8秒)`)
            await dbo.collection("users").find(query).toArray(function(err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                 for (let file of result) {
                     file = file[0]
                    let id= file.id
                    let user = file[id]
                    if(!user) return;
                    if(user.money > 15) {
                    if(user.money < 10) {
                            var money = "000000"+ user.money}
                    else if(user.money < 100) {
                        var money = "00000"+ user.money}
                    else if(user.money < 1000) {
                    var money = "0000"+ user.money}
                    else if(user.money <10000) {
                        var money = "000" + user.money}
                    else if(user.money <100000) {
                        var money = "00" + user.money}
                        else if(user.money <1000000) {
                            var money = "0" + user.money}
                        else{var money = user.money}
                    list.push(money +" $| "+ user.name +`|${id}` )
                    list.sort(function(a, b) {
                        return a > b;
                    });
                }
            }
            list.sort();
            list.reverse();
            list.splice(30);
            setTimeout(() => {
            let levelembed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(k.money.ranking.title)
            .setDescription("```js\n"+list.join("\n")+"\n```")
            .setFooter(k.money.ranking.footer)
            return message.channel.send({embeds: [levelembed]});
        }, 600);
    })
    }},
    "moneyshigh": {
        description: {zh_TW:"查看金錢最高排行榜",en_US:"View moneys high ranking.",ja_JP:""},
        authority: "everyone",
        instructions: "moneyshigh",
        vote: true,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            var list = new Array();
            let dbo =clientDB.db("mydb"),query = { "type": "user" }
            message.channel.send(`🔄抓取資料中...\n請等一下!(約8秒)`)
            dbo.collection("users").find(query).toArray(function(err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                 for (let file of result) {
                     file = file[0]
                    let id= file.id
                    let user = file[id]
                    if(!user) return;
                    if(user.money > 15) {
                    if(user.money > 8000000) {
                    list.push(user.money +" $| "+ user.name +" | "+id)
                    list.sort(function(a, b) {
                        return a > b;
                    });
                }
            }}
            list.sort();
            list.reverse();
            list.splice(30);
            setTimeout(() => {
            let levelembed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(k.money.ranking.title)
            .setDescription("```js\n"+list.join("\n")+"\n```")
            .setFooter(k.money.ranking.footer)
            return message.channel.send({embeds: [levelembed]});
        }, 600);
    })
    }},
    "moneyadd": {
        description: {zh_TW:"增加用戶金錢",en_US:"Add user money.",ja_JP:""},
        authority: "owner",
        instructions: "moneyadd [ID] [money]",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            Mongo.loadUser(clientDB,args[0]).then((user) => {
                if (user === false) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                user.money = (user.money + parseInt(args[1]))
                message.channel.send("你讓用戶 " + user.name + "的金錢增加了 `" + args[1] + "`\n現在他有 `" + user.money + "`$ 了")
                Mongo.writeUser(clientDB,args[0],user)
                return;
            }})
        }
    },
    "moneyremove": {
        description: {zh_TW:"減少用戶金錢",en_US:"remove user money.",ja_JP:""},
        authority: "owner",
        instructions: "moneyremove [ID] [money]",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            Mongo.loadUser(clientDB,args[0]).then((user) => {
                if (user === false) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                user.money = (user.money - parseInt(args[1]))
                message.channel.send("你讓用戶 " + user.name + "的金錢減少了 `" + args[1] + "`\n現在他變成 `" + user.money + "`$ 了")
                Mongo.writeUser(clientDB,args[0],user)
                return;
            }})
        }
    },
    "moneyset": {
        description: {zh_TW:"設定用戶金錢",en_US:"Set user money.",ja_JP:""},
        authority: "owner",
        instructions: "moneyset [ID] [money]",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.author.id !== '546144403958398988') return;
            Mongo.loadUser(clientDB,args[0]).then((user) => {
                if (user === false) {return message.channel.send("❌沒有這個用戶資料")}
               else{
                user.money = parseInt(args[1])
                message.channel.send("你將用戶 " + user.name + "的金錢調成 `" + args[1] + "`$")
                Mongo.writeUser(clientDB,args[0],user)
                return;
            }})
        }
    },
    "language": {
        description: {zh_TW:"設置語言",en_US:"Set your languages.",ja_JP:""},
        authority: "everyone",
        instructions: "language [lang]",
        category: "user",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(args[0] == "zh_TW") {
                Mongo.loadUser(clientDB,message.author.id).then((user) => {
                    if (user === false) {return message.channel.send(l.error.Try_again)}
                   else{
                    user.language = "zh_TW"
                    message.channel.send("你的語言已設置成 `中文(繁體)`")
                    Mongo.writeUser(clientDB,message.author.id,user)
            }})}else if(args[0] == "zh_CN") {
                Mongo.loadUser(clientDB,message.author.id).then((user) => {
                    if(err) {return message.channel.send(l.error.Try_again)}
                   else{
                    user.language = "zh_CN"
                    message.channel.send("你的语言已设置成 `中文(简体)`")
                    Mongo.writeUser(clientDB,message.author.id,user)
            }})}else if(args[0] == "en_US") {
                Mongo.loadUser(clientDB,message.author.id).then((user) => {
                    if(user === false) {return message.channel.send("❌Write Error!")}
                   else{
                    user.language = "en_US"
                    message.channel.send("Your language is set to `English`")
                    Mongo.writeUser(clientDB,message.author.id,user)
            }})}else if(args[0] == "ja_JP") {
                Mongo.loadUser(clientDB,message.author.id).then((user) => {
                    if(user === false) {return message.channel.send("❌Write Error!")}
                   else{
                    user.language = "ja_JP"
                    message.channel.send("あなたの言語は `日本語` に設定されています")
                    Mongo.writeUser(clientDB,message.author.id,user)
            }})}else{
                Mongo.loadUser(clientDB,message.author.id).then((user) => {
                    if(user === false) {return message.channel.send(l.error.Try_again)}
                    let langes = "你現在的語言為 預設(繁體)"
                    if(user.language == "zh_TW") {langes = "你現在的語言為 中文(繁體)"}else if(user.language == "zh_CN") {langes = "你現在的语言為 `中文(简体)"}else if(user.language == "ja_JP") {langes = "あなたの言語は `日本語`"}else if(user.language == "en_US") {langes = "You language is `English`"} 
                let langembed = new Discord.MessageEmbed()
                .setTitle("以下是語言設置參數")
                .setDescription("The following are the language setting parameters\n["+langes+"]")
                .addField("中文(繁體)","`zh_TW`")
                .addField("中文(简体)","`zh_CN`")
                .addField("English","`en_US`")
                .addField("日本語","`ja_JP`")
                .setFooter("◆本翻譯不是100%準確.\nThis translation is not 100% accurate.")
                .setTimestamp()
                return message.channel.send({embeds: [langembed]});
                })
            }
        }
    },
    "pay": {
        description: {zh_TW:"設置語言",en_US:"Set your languages.",ja_JP:""},
        authority: "everyone",
        instructions: "pay [@muention/ID＊] [money]",
        category: "money",
        vote: true,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(!message.guild) return message.channel.send(l.error.No_DM)
            if(args[0] == null) {message.channel.send(k.word.mention)}
            else if(args[1] == null || args[1] == "") {message.channel.send(k.word.type_money)}else{
            if(isNaN(args[1])) return message.channel.send(l.error.type_number)
            if (args[1] > 50000) return message.channel.send(l.error.less_then+"50000!")
            if (args[1] < 10) return message.channel.send(l.error.more_then+"10!")
            if(!args[1].indexOf("-")) return message.channel.send(l.error.type_positive)
            if(!args[1].indexOf(".")) return message.channel.send(l.error.type_integer)
            args[1] = Math.round(args[1])
            if(payd.has(message.author.id)) return message.channel.send(k.pay.cool_down)
            Mongo.loadUser(clientDB,message.author.id).then((user2) => {
                let user = bot.users.cache.get(args[0])
                let member = null;
                if(message.mentions.users.size){
                    member=message.mentions.users.first()
                }else if(user) {
                    member=user
                }else{return message.channel.send(l.error.Not_found_User)}
                if(member){
                    Mongo.loadUser(clientDB,member.id).then((user) => {
                        if (user === false) {return message.channel.send(l.error.Not_found_User)}
                    if (user2 === false) {return message.channel.send(l.error.cant_load)}
                   else{
                    if(member.id === message.author.id) return message.channel.send(k.pay.cant_own)
                    if(user2.money < args[1] + Math.floor(parseInt(args[1])* 0.05)) return message.channel.send(l.error.No_enough_monery)
                    user.money = (user.money + parseInt(args[1]))
                    user2.money = (user2.money - Math.floor(parseInt(args[1])* 1.02) )
                    payd.add(message.author.id);
                    payto(bot, message, args);
                    let pay = new Discord.MessageEmbed().setTitle(k.pay.pay+user.name+" "+args[1]+"$")
                    .setDescription(k.pay.you_will+" `" + args[1] + "`$ "+k.pay.give+" **" + user.name + "**\n"+k.pay.now_you+" `" + user2.money + "`$ \n" + user.name + " "+k.pay.now_have+" `" + user.money + "` $")
                    .setFooter("[$] "+k.pay.handing_free+"\n"+k.pay.extra+ Math.floor(parseInt(args[1])* 0.02) +"$ "+k.pay.give_someone).setTimestamp()
                    message.channel.send({embeds: [pay]})
                    Mongo.writeUser(clientDB,member.id,user)
                    Mongo.writeUser(clientDB,message.author.id,user2)
                    return;
                }
                })}
        })}
    }},
    "marry": {
        description: {zh_TW:"與某人接婚",en_US:"Marry someone.",ja_JP:""},
        authority: "everyone",
        instructions: "marry [@mention/ID]",
        category: "user",
        vote: false,
        help: false,
        fun: function(bot, message2, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message2.guild) return message2.channel.send(l.error.No_DM)
        Mongo.loadUser(clientDB,message2.author.id).then((user2) => {
            if (user2 === false) {return message2.channel.send(l.error.cant_load)}
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
                    Mongo.loadUser(clientDB,member.id).then((user) => {
                        if (user === false) {return message.channel.send(k.word.not_fond_user)}else{
                        let mary2 = [user.marry]
                        if(mary2 == "[object Object]" || mary2 == "") {
                    let marry = new Discord.MessageEmbed()
                    .setTitle(k.marry.timer)
                    .setDescription(k.marry.answer)
                    message.edit("<@" + member.id + "> ")
                message.channel.send({embeds: [marry]}).then((message) => {
                        const filter = answer => {
                            return ['yes','no'].includes(answer.content) && answer.author.id === member.id;}
                message.channel.awaitMessages({filter, max: 1, time: 20000, errors: ['time'] })
                    .then((ms) => {
                        if(ms.first().content === "yes") {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                    message.edit({embeds: [marry2]});
                    let marry1 = new Discord.MessageEmbed().setTitle(k.marry.marry_complete).setDescription(user2.name + "💕" + user.name).setFooter(k.marry.marry_complete2).setTimestamp()
                    message.channel.send({embeds: [marry1]});
                    user.marry = message2.author.id
                    Mongo.writeUser(clientDB,member.id,user)
                    user2.marry = member.id
                    Mongo.writeUser(clientDB,message2.author.id,user2)
                    return;
                }else if(ms.first().content === "no") {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                    return message.edit({embeds: [marry2]})}
                    }).catch(() => {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                        message.edit({embeds: [marry2]})});
               })}else{return message.edit(k.marry.has_someone)}
            }}
        )}
    )}
}}else{
        return message2.channel.send(k.marry.you_have)
    }
})}},
    "divorce": {
        description: {zh_TW:"與某人離婚",en_US:"Divorce someone.",ja_JP:""},
        authority: "everyone",
        instructions: "divorce [@mention/ID]",
        category: "user",
        vote: false,
        help: false,
    fun: function(bot, message2, prefix ,clientDB, language, args ,...ag) {
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        Mongo.loadUser(clientDB,message2.author.id).then((user2) => {
            if (user2 === false) {return message2.channel.send(l.error.cant_load)}
        let mary = [user2.marry]
        if(mary != "[object Object]" || mary != "") {
            Mongo.loadUser(clientDB,mary[0]).then((user) => {
                if (user === false) {return message2.channel.send(k.word.not_fond_user)}else{
                var other = user2.marry
                let marry = new Discord.MessageEmbed()
                .setTitle(k.divorce.sure)
                .setDescription(k.divorce.answer)
                message2.channel.send({embeds:[marry]}).then((message) => {
                    const filter = answer => {
                        return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
            message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time'] })
                .then((ms) => {
                    if(ms.first().content === "yes") {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                message.edit({embeds: [marry2]});
                let marry1 = new Discord.MessageEmbed().setTitle(k.divorce.divorce).setDescription(user2.name + "💔" + user.name).setFooter(k.divorce.divorce2).setTimestamp()
                message.channel.send({embeds: [marry1]});
                user.marry = ""
                Mongo.writeUser(clientDB,other,user)
                user2.marry = ""
                Mongo.writeUser(clientDB,message2.author.id,user2)
                return;
            }else if(ms.first().content === "no") {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                return message.edit({embeds: [marry2]})}
                }).catch(() => {
                    let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                    return message.edit({embeds: [marry2]})});
                    })
                }})
            }
else{
    return message2.channel.send(k.divorce.hasnt)
}
})}},
"pet": {
    description: {zh_TW:"寵物指令",en_US:"Pet command.",ja_JP:""},
    authority: "everyone",
    instructions: "marry [to do] [@mention/ID]",
    category: "user",
    vote: false,
    help: false,
    fun: function(bot, message2, prefix ,clientDB, language, args ,...ag) {
        let l = lan.zh_TW,k = gameX.zh_TW
        if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
        }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
        if(!message2.guild) return message2.channel.send(l.error.No_DM)
        if(args[0] === "add") {
            Mongo.loadUser(clientDB,message2.author.id).then((user2) => {
                if (user2 === false) {return message2.channel.send(l.error.cant_load)}
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
                        Mongo.loadUser(clientDB,member.id).then((user) => {
                            if (user === false) {return message.channel.send(k.word.not_fond_user)}else{
                        let marry = new Discord.MessageEmbed()
                        .setTitle(k.pet.add.timer)
                        .setDescription(k.pet.add.answer)
                        message.edit("<@" + member.id + "> ")
                    message.channel.send({embeds: [marry]}).then((message) => {
                            const filter = answer => {
                                return ['yes','no'].includes(answer.content) && answer.author.id === member.id;}
                    message.channel.awaitMessages({filter, max: 1, time: 20000, errors: ['time'] })
                        .then((ms) => {
                            if(ms.first().content === "yes") {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                        message.edit({embeds: [marry2]});
                        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.add.complete_adot).setDescription(user2.name + "🔗" + user.name).setFooter(k.pet.add.complete_adot2).setTimestamp()
                        message.channel.send(marry1);
                        user.host.push(message2.author.id)
                        user.hostname = user.hostname + message2.author.username + "#" + message2.author.discriminator+"\n"
                        Mongo.writeUser(clientDB,member.id,user)
                        user2.pet.push(member.id)
                        user2.petname = user2.petname + member.username + "#" + member.discriminator+"\n"
                        Mongo.writeUser(clientDB,message2.author.id,user2)
                        return;
                        }else if(ms.first().content === "no") {
                                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                                return message.edit({embeds: [marry2]})
                            }
                        }).catch(() => {
                            let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                            return message.edit({embeds: [marry2]})});
                   })
                }})})}
        }})}else if(args[0] === "remove") {
            Mongo.loadUser(clientDB,message2.author.id).then((user2) => {
                if (user2 === false) {return message2.channel.send(l.error.cant_load)}
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
                            Mongo.loadUser(clientDB,member.id).then((user) => {
                                if (user === false){return message2.channel.send(k.word.not_fond_user)}else{
                            if(user2.pet.indexOf(member.id) != "-1") {
                                message2.channel.send("🔄處理中").then((message) => {
                                    fs.readFile('./users/'+ member.id +'.json',function (err,userInfo) {
                                        if(err) {return message.channel.send(k.word.not_fond_user)}else{
                                        var user = userInfo.toString();
                                        user = JSON.parse(user);
                        let marry = new Discord.MessageEmbed()
                        .setTitle(k.pet.remove.sure)
                        .setDescription(k.pet.remove.answer)
                        message2.channel.send({embeds: [marry]}).then((message) => {
                            const filter = answer => {
                                return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
                    message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time'] })
                        .then((ms) => {
                            if(ms.first().content === "yes") {
                        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
                        message.edit({embeds: [marry2]});
                        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.remove.remome_adot).setDescription(user2.name + "❌" + user.name).setFooter(k.pet.remove.remove_adot2).setTimestamp()
                        message.channel.send({embeds: [marry1]});
                        var array = user.host
                        var index = array.indexOf(message2.author.id)
                        if (index> -1) {array.splice(index, 1);}
                        var str2 = user.hostname
                        user.hostname = str2.replace(message2.author.username + "#" + message2.author.discriminator + "\n", '').replace(message2.author.username + "#" + message2.author.discriminator, '')
                        Mongo.writeUser(clientDB,member.id,user)
                        var array2 = user2.pet
                        var index2 = array2.indexOf(member.id)
                        if (index2> -1) {array2.splice(index2, 1);}
                        var str2 = user2.petname
                        user2.petname = str2.replace(member.username + "#" + member.discriminator + "\n", '').replace(member.username + "#" + member.discriminator, '')
                        Mongo.writeUser(clientDB,message2.author.id,user2)
                        return;
                        }else if(ms.first().content === "no")  {
                                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                                return message.edit({embeds: [marry2]})
                            }
                    }).catch(() => {
                            let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                            return message.edit({embeds: [marry2]})});
                            })}})})
                        }}})}
                        }})
        }else if(args[0] === "disconnect") {
            Mongo.loadUser(clientDB,message2.author.id).then((user2) => {
                if (user2 === false) return message2.channel.send(l.error.cant_load)
                let member = null;
                let user=bot.users.cache.get(args[1])
                if(message2.mentions.users.first()) {member = message2.mentions.users.first()}else if(user) {
                   member = user
                  }else{return message2.channel.send(k.pet.disconnect.not_host)}
                  let id = member.id
                  if(user2.host.indexOf(id) === -1) {return message2.channel.send(k.pet.disconnect.not_fond_host)}
                  message2.channel.send(k.word.processing).then((message) => {
                    Mongo.loadUser(clientDB,member.id).then((user) => {
                        if (user === false) {return message.channel.send(k.word.not_fond_user)}else{
        let marry = new Discord.MessageEmbed().setTitle(k.pet.disconnect.sure).setDescription(k.pet.disconnect.answer)
        message2.channel.send({embeds: [marry]}).then((message) => {
            const filter = answer => {
                return ['yes','no'].includes(answer.content) && answer.author.id === message2.author.id;}
    message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time'] })
        .then((ms) => {
            if(ms.first().content === "yes") {
        let marry2 = new Discord.MessageEmbed().setTitle(k.word.complete)
        message.edit({embeds: [marry2]});
        let marry1 = new Discord.MessageEmbed().setTitle(k.pet.disconnect.disconnect).setDescription(user2.name + "❌" + user.name).setFooter(k.pet.disconnect.disconnect2).setTimestamp()
        message.channel.send({embeds: [marry1]});
        var array = user2.host
        var index = array.indexOf(member.id)
        if (index> -1) {array.splice(index, 1);}
        let str2 = user2.hostname
        user2.hostname = str2.replace(member.username + "#" + member.discriminator + "\n", '').replace(member.username + "#" + member.discriminator, '').replace(user2.name+"#"+ member.discriminator, '')
        Mongo.writeUser(clientDB,message2.author.id,user2)
        var array2 = user.pet
        var index2 = array2.indexOf(message2.author.id)
        if (index2> -1) {array2.splice(index2, 1);}
        let str3 = user.petname
        user.petname = str3.replace(message2.author.username + "#" + message2.author.discriminator + "\n", '').replace(message2.author.username + "#" + message2.author.discriminator, '').replace(user2.name + "#" + message2.author.discriminator, '')
        Mongo.writeUser(clientDB,member.id,user)
        return;
            }else if(ms.first().content === "no")  {
                let marry2 = new Discord.MessageEmbed().setTitle(k.word.cancel)
                return message.edit({embeds: [marry2]});
            }
        })
        })}})})})
        }else if(args[0] === "feed") {

        }else if(args[0] === "pat") {

        }else{
            let pethelp = new Discord.MessageEmbed().setColor( message2.member.roles.highest.color).setTitle(k.pet.help.title).setDescription(k.pet.help.desc).setTimestamp()
            return message2.channel.send({embeds: [pethelp]});
        }
    }
},
"card": {
    description: {zh_TW:"用戶的咖啡廳資料",en_US:"User data of cafe.",ja_JP:""},
    authority: "everyone",
    instructions: "card [@mention/ID]",
    category: "user",
    vote: false,
    help: false,
    fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
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
        Mongo.loadUser(clientDB,member.id).then((user) => {
            if (user === false) {return message.channel.send(l.error.Not_found_Member)}
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
            let loves = ""
            user.picture.love.forEach(element => {
                loves = loves+element.file+"\n"
            });
            if(loves === "") loves = "(無)"
        let userdata = new Discord.MessageEmbed()
        .setColor( message.member.roles.highest.color)
        .setTitle("Rabbit House " + k.card.card)
        .setDescription(`${role} | **${member.username}** ${member.id}`)
        .setThumbnail(member.displayAvatarURL({format: "png", dynamic: true ,size: 512}))
        .addField(k.card.data, k.card.money + user.money + "\n"+k.card.exp + user.rank + " / " + user.exp)
        .addField(k.card.interactive,k.card.Chino+user.chino +`${k.card.times}\n${k.card.Cocoa}`+user.cocoa +`${k.card.times}\n${k.card.Tippy}`+user.tippy +`${k.card.times}\n${k.card.Other}`+user.other +`${k.card.times}`)
        .addField(k.card.stock+"\n"+k.card.loved, "◆"+loves)
        .addField(k.card.work_all + user.work + k.card.times+" \n"+k.card.work_last + user.worktoal.work + l.date.day,k.card.work_first + user.time)
        .setFooter(k.card.ID_card+" ▋▏▎▍▋▍▋▏▏▍▋▏▍▍▋▏▋▍▉▏▍")
        .setTimestamp()
        return message.channel.send({embeds: [userdata]});
})}
}},
    "permissions": {
        description: {zh_TW:"成員的伺服器權限",en_US:"Member permissions of server.",ja_JP:""},
        authority: "everyone",
        instructions: "permissions [@mention/ID＊]",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args) {
            return access(bot,message,args,clientDB,language)
       }
    },
    "permission": {
        description: {zh_TW:"成員的伺服器權限",en_US:"Member permissions of server.",ja_JP:""},
        authority: "everyone",
        instructions: "permission [@mention/ID＊]",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args) {
            return access(bot,message,args,clientDB,language)
       }
    },
    "banlist": {
        description: {zh_TW:"伺服器的封鎖名單",en_US:"Ban list of server.",ja_JP:""},
        authority: "everyone",
        instructions: "banlist",
        category: "guild",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let guild = null
            if(args[0] != null) {
                guild = bot.guilds.cache.get(args[0])
            }else{
                guild = message.guild;}
            guild.bans.fetch()
            .then(banned => {
                let list = banned.map(ban => ban.user.tag).join('\n');
                if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;
                return message.channel.send(`**${banned.size} users are banned:**\n${list}`);
            })
            .catch(console.error);
        }
    },
    "perm": {
        description: {zh_TW:"成員的伺服器權限",en_US:"Member permissions of server.",ja_JP:""},
        authority: "everyone",
        instructions: "perm [@mention/ID＊]",
        category: "guild",
        fun: function(bot, message, prefix ,clientDB, language, args) {
            return access(bot,message,args,clientDB,language)
       }
    },
    "adv": {
        description: {zh_TW:"用戶的成就",en_US:"user of adv",ja_JP:""},
        authority: "everyone",
        instructions: "adv",
        category: "user",
        vote: false,
        help: false,
        fun: function(bot, message, prefix ,clientDB, language, args ,...ag) {
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            Mongo.loadUser(clientDB,message.author.id).then((user) => {
                if (user === false) {return}else{
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
                    return message.channel.send({embeds: [advs]});
                }})
        }}
}
async function access(bot,message,args,clientDB,language) {
    let l = lan.zh_TW,k = gameX.zh_TW
    if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
    }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
    let guild2 = null
    if(!message.guild) return message.channel.send(l.error.server_cmd)
    let member = null,channel = null
    let user=bot.users.cache.get(args[0])
    if(args[2] != null) {
        if(bot.guilds.cache.has(args[2])) {
       guild2 = bot.guilds.cache.get(args[2])
        }else{guild2 = message.guild}
    }else{guild2 = message.guild}

    if (message.mentions.channels.size) {
        channel = message.mentions.channels.first()
    }else if(args[1] != null) {
        if(guild2.channels.cache.has(args[1])) {
       channel = guild2.channels.cache.get(args[1])
        }else{guild2 = message.guild}
    }else{guild2 = message.guild}

    if (message.mentions.users.size) {
        member = message.mentions.users.first()
        member = guild2.members.cache.get(member.id)
     } else if (args[0] != null) {
        if (user) { 
            member = guild2.members.cache.get(user.id)
         }else { member = message.member }
    } else { member = message.member }
    if(member){
    if(channel) {
        let admi,manage,kick,ban,role,hook,tag,emoji,msg,inv,send_msg,send_embed,send_file,
        add_reaction,use_emoji,use_sticker,use_cmd,read_history;
        if(member.permissionsIn(channel).has(['ADMINISTRATOR'])) { admi = "✅"}else{ admi = "❌"}
        if(member.permissionsIn(channel).has(['MANAGE_CHANNELS'])) { manage = "✅"}else{ manage = "❌"}
        if(member.permissionsIn(channel).has(['KICK_MEMBERS'])) { kick = "✅"}else{ kick = "❌"}
        if(member.permissionsIn(channel).has(['BAN_MEMBERS'])) { ban = "✅"}else{ ban = "❌"}
        if(member.permissionsIn(channel).has(['MANAGE_ROLES'])) { role = "✅"}else{ role = "❌"}
        if(member.permissionsIn(channel).has(['MANAGE_WEBHOOKS'])) { hook = "✅"}else{ hook = "❌"}
        if(member.permissionsIn(channel).has(['MENTION_EVERYONE'])) { tag = "✅"}else{ tag = "❌"}
        if(member.permissionsIn(channel).has(['MANAGE_EMOJIS_AND_STICKERS'])) { emoji = "✅"}else{ emoji = "❌"}
        if(member.permissionsIn(channel).has(['MANAGE_MESSAGES'])) { msg = "✅"}else{ msg = "❌"}
        if(member.permissionsIn(channel).has(['SEND_MESSAGES'])) { send_msg = "✅"}else{ send_msg = "❌"}
        if(member.permissionsIn(channel).has(['EMBED_LINKS'])) { send_embed = "✅"}else{ send_embed = "❌"}
        if(member.permissionsIn(channel).has(['ATTACH_FILES'])) { send_file = "✅"}else{ send_file = "❌"}
        if(member.permissionsIn(channel).has(['ADD_REACTIONS'])) { add_reaction = "✅"}else{ add_reaction = "❌"}
        if(member.permissionsIn(channel).has(['USE_EXTERNAL_EMOJIS'])) { use_emoji = "✅"}else{ use_emoji = "❌"}
        if(member.permissionsIn(channel).has(['USE_EXTERNAL_STICKERS'])) { use_sticker = "✅"}else{ use_sticker = "❌"}
        if(member.permissionsIn(channel).has(['USE_APPLICATION_COMMANDS'])) { use_cmd = "✅"}else{ use_cmd = "❌"}
        if(member.permissionsIn(channel).has(['READ_MESSAGE_HISTORY'])) { read_history = "✅"}else{ read_history = "❌"}
        if(member.permissionsIn(channel).has(['CREATE_INSTANT_INVITE'])) {inv = "✅"}else{ inv = "❌"}
        let owners = await guild2.fetchOwner(),owner = "❓"
        if(owners.user.id == member.id) {owner = "👑 是"}else{owner = "💂‍♂️ 否"}   
        let acc = new Discord.MessageEmbed()
        .setColor(member.roles.highest.color)
        .setTitle(member.user.username +k.prem.perm+k.prem.in+guild2.name+k.prem.in+`${channel.name}`)
        .setDescription(k.prem.hight + "<@&" + member.roles.highest + "> \n"+k.prem.owner+ owner)
        .addField(k.prem.prem2, 
            `${l.prem.ADMINISTRATOR} `+admi+
            `\n${l.prem.manage_channel} `+manage+
            `\n${l.prem.kick_members} `+kick+ 
            `\n${l.prem.ban_members} `+ban+
            `\n${l.prem.manage_roles} `+role+
            `\n${l.prem.manage_messages} `+msg+
            `\n${l.prem.manage_webhooks} `+hook+
            `\n${k.prem.emoji} `+emoji+
            `\n${l.prem.mention_everyone} `+tag+
            `\n${l.prem.read_message_history} `+read_history+
            `\n${l.prem.send_messages} `+send_msg+
            `\n${l.prem.embed_links} `+send_embed+
            `\n${l.prem.attach_files} `+send_file+
            `\n${l.prem.add_reactions} `+add_reaction+
            `\n${l.prem.use_external_emoji} `+use_emoji+
            `\n${l.prem.use_external_stickers} `+use_sticker+
            `\n${l.prem.use_commands} `+use_cmd+
            `\n${k.prem.ink} `+inv)
        return message.channel.send({embeds: [acc]});
    }else{
    let admi,manage,guild,log,kick,ban,role,hook,tag,emoji,msg,inv;
    if(member.permissions.has(['ADMINISTRATOR'])) { admi = "✅"}else{ admi = "❌"}
    if(member.permissions.has(['MANAGE_CHANNELS'])) { manage = "✅"}else{ manage = "❌"}
    if(member.permissions.has(['MANAGE_GUILD'])) { guild = "✅"}else{ guild = "❌"}
    if(member.permissions.has(['VIEW_AUDIT_LOG'])) { log = "✅"}else{ log = "❌"}
    if(member.permissions.has(['KICK_MEMBERS'])) { kick = "✅"}else{ kick = "❌"}
    if(member.permissions.has(['BAN_MEMBERS'])) { ban = "✅"}else{ ban = "❌"}
    if(member.permissions.has(['MANAGE_ROLES'])) { role = "✅"}else{ role = "❌"}
    if(member.permissions.has(['MANAGE_WEBHOOKS'])) { hook = "✅"}else{ hook = "❌"}
    if(member.permissions.has(['MENTION_EVERYONE'])) { tag = "✅"}else{ tag = "❌"}
    if(member.permissions.has(['MANAGE_EMOJIS_AND_STICKERS'])) { emoji = "✅"}else{ emoji = "❌"}
    if(member.permissions.has(['MANAGE_MESSAGES'])) { msg = "✅"}else{ msg = "❌"}
    if(member.permissions.has(['CREATE_INSTANT_INVITE'])) { inv = "✅"}else{ inv = "❌"}
    let owners = await guild2.fetchOwner(),owner = "❓"
    if(owners.user.id == member.id) {owner = "👑 是"}else{owner = "💂‍♂️ 否"}   
    let acc = new Discord.MessageEmbed()
    .setColor(member.roles.highest.color)
    .setTitle(member.user.username +k.prem.perm+k.prem.in+guild2.name)
    .setDescription(k.prem.hight + "<@&" + member.roles.highest + "> \n"+k.prem.owner+ owner)
    .addField(k.prem.prem2, `${l.prem.ADMINISTRATOR} `+admi+`\n${l.prem.manage_guild} `+guild+`\n${l.prem.manage_channel} `+manage+`\n${k.prem.log} `+log+`\n${l.prem.kick_members} `+kick+ `\n${l.prem.ban_members} `+ban+`\n${l.prem.manage_roles} `+role+`\n${l.prem.manage_messages} `+msg+`\n${l.prem.manage_webhooks} `+hook+`\n${l.prem.mention_everyone} `+tag+`\n${k.prem.emoji} `+emoji+`\n${k.prem.ink} `+inv)
    return message.channel.send({embeds: [acc]});
    }
    }
};

async function payto(bot, message ,args) {
    setTimeout(() => {
        return payd.delete(message.author.id);
    }, 20000);
};