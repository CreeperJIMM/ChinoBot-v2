const Discord = require("discord.js")
let fs = require("fs");
const lan = require('../commands/lang.json');
const rabbitX = require('../language/rabbit.json');
let Mongo = require("../function/MongoData")

let button1 = new Discord.MessageButton(),button2 = new Discord.MessageButton(),button3 = new Discord.MessageButton()
button1.setStyle('DANGER').setEmoji("💣").setCustomId("A")
button2.setStyle('PRIMARY').setEmoji("💟").setCustomId("B")
button3.setStyle('SUCCESS').setEmoji("🔃").setCustomId("C")
let row = new Discord.MessageActionRow().addComponents(button2,button3,button1)
module.exports = {
    "chino": {
        description: {zh_TW:"點一隻智乃",en_US:"Order a Chino.",ja_JP:""},
        authority: "everyone",
        instructions: "chino\n[money]\nnormal: 25$\nNsfw: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send();
            if (!msg.channel.nsfw) {
                Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                    if (user2 === false) { msg.channel.send(l.error.Try_again); } else {
                        if (user2.money < 25) {
                            msg.channel.send(h.word.No_money + h.role.chino +"...") 
                            nomoneychino(bot, msg,clientDB) 
                            return;
                    } else {
                            user2.chino++
                                user2.money = (user2.money - 25)
                            msg.channel.send("☕" + h.word.ordered + h.role.chino + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.Chino++   
                                var Chino = user.data.Chino
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/chino", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/chino/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + " " + h.word.ordered + h.role.chino)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.chino}${h.word.ordered2} ${Chino} ${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Chino", "No", rp) });
                                })
                            })
                            if (user2.chino > 10) {
                                chino10(bot, msg,clientDB);
                                chino(bot, msg,clientDB)
                            } else { chino(bot, msg,clientDB) }
                        }
                    }
                })
            } else {
                if(msg.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return msg.channel.send(Coppa)}
                    Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                        if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 35) {
                            msg.channel.send(h.word.No_money +h.role.mature+ h.role.chino +"...");
                            nomoneychino(bot, msg,clientDB)
                        } else {
                            user2.chino++
                                user2.money = (user2.money - 35)
                            msg.channel.send("☕" + h.word.ordered + h.role.mature + h.role.chino + "\n" + h.word.cost + "`30`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2)
                                Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.Chino++
                                var Chino = user.data.Chino
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/chino/Nsfw", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/chino/Nsfw/" + f, f);
                                    const chino18Embed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+ h.word.ordered+ h.role.mature + h.role.chino)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.chino}${h.word.ordered2}${Chino}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [chino18Embed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Chino", "Yes", rp) })
                                    if (user2.chino > 10) {
                                        chino10(bot, msg,clientDB);
                                        chino(bot, msg,clientDB);
                                        specaial(bot, msg,clientDB)
                                    } else {
                                        chino(bot, msg,clientDB);
                                        specaial(bot, msg,clientDB)
                                    }
                                })
                            })
                        }
                    }
                })
            }
        }
    },
    "cocoa": {
        description: {zh_TW:"點一隻心愛",en_US:"Order a Cocoa.",ja_JP:""},
        authority: "everyone",
        instructions: "cocoa\n[money]\nnormal: 25$\nNsfw: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            if (!msg.channel.nsfw) {
                Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                    if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.cocoa +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 25)
                            msg.channel.send("☕" + h.word.ordered + h.role.cocoa + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            fs.readFile('./data.json', function(err, userInfo) {
                                if (err) {
                                    console.log(l.error.Run_Command_error, err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.Cocoa++
                                var Cocoa = user.data.Cocoa
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/cocoa/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/cocoa/" + f, f);
                                    const cocoaEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + " "+h.word.ordered + h.role.cocoa)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.cocoa}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Cocoa", "No", rp) })
                                })
                            })
                        }
                    }
                })
            } else {
                if(msg.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return msg.channel.send(Coppa)}
                    Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                        if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 35) { return msg.channel.send(h.word.No_money+h.role.mature + h.role.cocoa +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 35)
                            msg.channel.send("☕" + h.word.ordered+ h.role.mature+ h.role.cocoa + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.Cocoa++
                                var Cocoa = user.data.Cocoa
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/cocoa/Nsfw/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/cocoa/Nsfw/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.cocoa)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.cocoa}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Cocoa", "Yes", rp) })
                                })
                            })
                        }
                    }
                })
            }
        }
    },
    "shark": {
        description: "鯊魚指令",
        vote: false,
        help: false,
        fun: function(bot, msg,p,clientDB,language) {
            shark0(bot, msg,clientDB,language)
        }
    },
    "gura": {
        description: {zh_TW:"點一隻鯊鯊(Gura)",en_US:"Order a Gawr Gura.",ja_JP:""},
        authority: "everyone",
        instructions: "gura\n[money]\nnormal: 25$\nNsfw: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function(bot, msg,p,clientDB,language) {
            shark0(bot, msg,clientDB,language)
        }
    },
    "tippy": {
        description: {zh_TW:"點一隻提比",en_US:"Order a Tippy.",ja_JP:""},
        authority: "everyone",
        instructions: "tippy\n[money]\nnormal: 15$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.tippy +"...") } else {
                        user2.tippy++
                            user2.money = (user2.money - 15)
                        msg.channel.send("☕" + h.word.ordered + h.role.tippy + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.Tippy++
                            var Tippy = user.data.Tippy
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/tippy/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/tippy/" + f, f);
                                const chinoEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.tippy)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.tippy}${h.word.ordered2}${Tippy}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Tippy", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "other": {
        description: {zh_TW:"點一盒綜合餐",en_US:"Order one comprehensive meal.",ja_JP:""},
        authority: "everyone",
        instructions: "other\n[money]\nnormal: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let lang = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {lang = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 35) { return msg.channel.send(h.word.No_money + h.role.other +"...")} else {
                        user2.other++
                            user2.money = (user2.money - 35)
                        msg.channel.send("☕" + h.word.ordereds + h.role.other + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.Other++
                            var Other = user.data.Other
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/other/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/other/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordereds+h.role.other)
                                    
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.other}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Other", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "fubuki": {
        description: {zh_TW:"點一隻狐狸(Fubuki)",en_US:"Order a Fubuki",ja_JP:""},
        authority: "everyone",
        instructions: "fubuki\n[money]\nnormal: 25$\nNsfw: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            if (!msg.channel.nsfw) {
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.fubuki +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.fubuki + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.Fubuki++
                            var Fubuki = user.data.Fubuki                            
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/fubuki/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/fubuki/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered + h.role.fubuki)
                                    
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.fubuki}${h.word.ordered2}${Fubuki}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Fubuki", "No", rp) })
                            })
                        })
                    }
                }
            })
            }else {
                if(msg.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return msg.channel.send(Coppa)}
                    Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                        if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 35) { return msg.channel.send(h.word.No_money+h.role.mature + h.role.fubuki +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 35)
                            msg.channel.send("☕" + h.word.ordered+ h.role.mature+ h.role.fubuki + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.Fubuki++
                                var Cocoa = user.data.Fubuki
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/fubuki/Nsfw/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/fubuki/Nsfw/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.fubuki)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.fubuki}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Fubuki", "Yes", rp) })
                                })
                            })
                        }
                    }
                })
            }
        }
    },
    "shota": {
        description: {zh_TW:"點一隻正太",en_US:"Order a Shota",ja_JP:""},
        authority: "everyone",
        instructions: "shota\n[money]\nnormal: 25$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money+h.role.shota) } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.shota + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.shota++
                            var Shota = user.data.shota                            
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/shota/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/shota/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.shota}${h.word.ordered2}${Shota}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Shota", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "loli": {
        description: {zh_TW:"點一隻蘿莉",en_US:"Order a loli",ja_JP:""},
        authority: "everyone",
        instructions: "loli\n[money]\nnormal: 25$\nNsfw: 35$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            if (!msg.channel.nsfw) {
                Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                    if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.loli +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 25)
                            msg.channel.send("☕" + h.word.ordered + h.role.loli + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.loli++
                                var Cocoa = user.data.loli                                
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/loli/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/loli/" + f, f);
                                    const cocoaEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + " "+h.word.ordered + h.role.loli)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.loli}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "loli", "No", rp) })
                                })
                            })
                        }
                    }
                })
            } else {
                if(msg.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return msg.channel.send(Coppa)}
                    Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                        if (user2 === false) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        if (user2.money < 35) { return msg.channel.send(h.word.No_money+h.role.mature + h.role.loli +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 35)
                            msg.channel.send("☕" + h.word.ordered+ h.role.mature+ h.role.loli + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                            Mongo.writeUser(clientDB,msg.author.id,user2) 
                            Mongo.loaddata(clientDB) .then((user) => {
                                if(user === false) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                user.data.loli++
                                var Cocoa = user.data.loli                                
                                Mongo.writedata(clientDB,user)
                                fs.readdir("./pitrue/loli/Nsfw/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/loli/Nsfw/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.loli)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.loli}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "loli", "Yes", rp) })
                                })
                            })
                        }
                    }
                })
            }
        }
    },
    "chen": {
        description: {zh_TW:"點一隻八雲橙(Chen)",en_US:"Order a Chen",ja_JP:""},
        authority: "everyone",
        instructions: "chen\n[money]\nnormal: 25$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.chen +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.chen + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.Chen++
                            var Other = user.data.Chen
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/chen/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/chen/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.chen)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.chen}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Chen", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "nakkar": {
        description: {zh_TW:"點一隻Nakkar",en_US:"Order a Nakkar",ja_JP:""},
        authority: "everyone",
        instructions: "nakkar\n[money]\nnormal: 25$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.Nakkar +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.Nakkar + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.Nakkar++
                            var Other = user.data.Nakkar
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/Nakkar/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/Nakkar/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.Nakkar)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.Nakkar}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Nakkar", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "vtuber": {
        description: {zh_TW:"點一隻VTuber",en_US:"Order a VTuber",ja_JP:""},
        authority: "everyone",
        instructions: "vtuber\n[money]\nnormal: 25$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.vtuber +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.vtuber + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.vtuber++
                            var Other = user.data.vtuber
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/vtuber/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/vtuber/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.vtuber)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.vtuber}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "vtuber", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "peko": {
        description: {zh_TW:"點一隻配摳拉(pekora)",en_US:"Order a pekora",ja_JP:""},
        authority: "everyone",
        instructions: "peko\n[money]\nnormal: 25$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.peko +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        msg.channel.send("☕" + h.word.ordered + h.role.peko + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.peko++
                            var Other = user.data.peko
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/peko/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/peko/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.peko)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.peko}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Pekora", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S1": {
        description: {zh_TW:"點一張第一季點兔",en_US:"Order a rabbit S1",ja_JP:""},
        authority: "everyone",
        instructions: "S1\n[money]\nnormal: 15$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S1 +"...") } else {
                        user2.money = (user2.money - 15)
                        msg.channel.send("☕" + h.word.ordered + h.role.S1 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.S1++
                                var S1 = user.data.S1
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/S1/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S1/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S1}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Rabbit_S1", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S2": {
        description: {zh_TW:"點一張第二季點兔",en_US:"Order a rabbit S2",ja_JP:""},
        authority: "everyone",
        instructions: "S2\n[money]\nnormal: 15$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S2 +"...") } else {
                        user2.money = (user2.money - 15)
                        msg.channel.send("☕" + h.word.ordered + h.role.S2 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            user.data.S2++
                            var S1 = user.data.S2
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/S2/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S2/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S2}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Rabbit_S2", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S3": {
        description: {zh_TW:"點一張第三季點兔",en_US:"Order a rabbit S3",ja_JP:""},
        authority: "everyone",
        instructions: "S3\n[money]\nnormal: 15$",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S3 +"...") } else {
                        user2.money = (user2.money - 15)
                        msg.channel.send("☕" + h.word.ordered + h.role.S3 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        Mongo.writeUser(clientDB,msg.author.id,user2) 
                        Mongo.loaddata(clientDB) .then((user) => {
                            if(user === false) {
                                console.log("錯誤!", err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            user.data.S3++
                            var S1 = user.data.S3
                            Mongo.writedata(clientDB,user)
                            fs.readdir("./pitrue/S3/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S3/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S3}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                S3_(bot,msg,clientDB)
                                    msg.channel.send({embeds: [cocoaEmbed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Rabbit_S2", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "data": {
        description: {zh_TW:"查看圖片資料",en_US:"View image data",ja_JP:""},
        authority: "everyone",
        instructions: "data",
        category: "image",
        vote: false,
        help: false,
        fun: function (bot, msg, p,clientDB,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            Mongo.loaddata(clientDB) .then((user) => {
                if(user === false) {
                    console.log("錯誤!", err);
                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                }
                var Chino = user.data.Chino
                var Cocoa = user.data.Cocoa
                var Tippy = user.data.Tippy
                var Other = user.data.Other
                var S1 = user.data.S1
                var S2 = user.data.S2
                var S3 = user.data.S3
                var shark = user.data.Shark
                var fubuki = user.data.Fubuki
                var chen = user.data.Chen
                var peko = user.data.peko
                let shota = user.data.shota
                const dataEmbed = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle(h.data.title)
                    .addField("<:Chino:744450248826683423> "+h.role.chino+h.word.ordered2, Chino + h.word.time)
                    .addField("<:Cocoa:744450249115828244> "+h.role.cocoa+h.word.ordered2, Cocoa + h.word.time)
                    .addField("<:Tippy:744450249384394842> "+h.role.tippy+h.word.ordered2, Tippy + h.word.time)
                    .addField("<a:hug:744450397892247572> "+h.role.other+h.word.ordered2, Other + h.word.time)
                    .addField("<a:cocoa_t:744450249917202453> "+h.role.S1+h.word.ordered2, S1 + h.word.time)
                    .addField("<a:chino_jump:744450251427151883> "+h.role.S2+h.word.ordered2, S2 + h.word.time)
                    .addField("<a:chino_jump:744450251427151883> "+h.role.S3+h.word.ordered2, S3 + h.word.time)
                    .addField("<:Gura:769464703281790976> "+h.role.gura+h.word.ordered2, shark + h.word.time)
                    .addField("<:Fubuki:779931176516452382> "+h.role.fubuki+h.word.ordered2, fubuki + h.word.time)
                    .addField("<:Chen:779931175451885568> "+h.role.chen+h.word.ordered2, chen + h.word.time)
                    .addField("<:peko:782496601355845642> "+h.role.peko+h.word.ordered2, peko + h.word.time)
                    .addField(""+h.role.shota+h.word.ordered2, shota + "次")
                    .setTimestamp()
                    .setFooter(h.data.footer + (Chino + Cocoa + Tippy + Other + S1 + S2 + S3) + h.data.footer2 + (shark + fubuki + peko) + h.word.time)
                msg.channel.send({embeds: [dataEmbed]});
            })
        }
    }
}
async function shark0(bot, msg,clientDB,language) {
    let l = lan.zh_TW,h = rabbitX.zh_TW
    if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
    }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
    if (!msg.guild) return msg.channel.send(l.error.No_DM);
    if (!msg.channel.nsfw) {
        Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
            if (user2 === false) {
                msg.channel.send(l.error.Try_again);
            } else {
                if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.gura +"...") } else {
                    user2.money = (user2.money - 25)
                    msg.channel.send("☕" + h.word.ordered + h.role.gura + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                    Mongo.writeUser(clientDB,msg.author.id,user2) 
                    Mongo.loaddata(clientDB) .then((user) => {
                        if(user === false) {
                            console.log("錯誤!", err);
                            bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                        }
                        user.data.Shark++ 
                        var Shark = user.data.Shark
                        Mongo.writedata(clientDB,user)
                        fs.readdir("./pitrue/Gawr", (err, r) => {
                            let f = r[Math.floor(Math.random() * r.length)]
                            const attachment = new Discord.MessageAttachment("./pitrue/Gawr/" + f, f);
                            const chinoEmbed = new Discord.MessageEmbed()
                                .setColor('#2d9af8')
                                .setTitle(msg.author.username + " "+h.word.ordered+h.role.gura)
                                .setImage('attachment://' + f)
                                .setTimestamp()
                                .setFooter(`◆${h.role.gura}${h.word.ordered2}${Shark}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send({embeds: [chinoEmbed],files:[attachment],components: [row]}).then((rp) => {
                                report(bot, msg,clientDB, f, "Shark", "No", rp)
                            })
                        })
                    })
                }
            }
        })
    } else {
        if(msg.channel) {
            let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
            .setColor("#E12323").setFooter("若有不便請見諒 > <");return msg.channel.send(Coppa)}
            Mongo.loadUser(clientDB,msg.author.id).then((user2) => {
                if (user2 === false) {
                msg.channel.send(l.error.Try_again);
            } else {
                if (user2.money < 35) {
                    msg.channel.send(h.word.No_money +h.role.mature+ h.role.gura +"...");
                } else {
                    user2.money = (user2.money - 25)
                    msg.channel.send("☕" + h.word.ordered+h.role.mature + h.role.gura + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                    Mongo.writeUser(clientDB,msg.author.id,user2) 
                    Mongo.loaddata(clientDB) .then((user) => {
                        if(user === false) {
                            console.log("錯誤!", err);
                            bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                        }
                        user.data.Shark++
                        var Shark = user.data.Shark
                        Mongo.writedata(clientDB,user)
                        fs.readdir("./pitrue/Gawr/Nsfw", (err, r) => {
                            let f = r[Math.floor(Math.random() * r.length)]
                            const attachment = new Discord.MessageAttachment("./pitrue/Gawr/Nsfw/" + f, f);
                            const chino18Embed = new Discord.MessageEmbed()
                                .setColor('#2d9af8')
                                .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.gura)
                                .setImage('attachment://' + f)
                                .setTimestamp()
                                .setFooter(`◆${h.role.gura}${h.word.ordered2}${Shark}${h.word.time}\n${h.word.copy}`);
                            msg.channel.send({embeds: [chino18Embed],files:[attachment],components: [row]}).then((rp) => { report(bot, msg,clientDB, f, "Shark", "Yes", rp) })
                        })
                    })
                }
            }
        })
    }
}
async function chino(bot, message,clientDB) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadUser(clientDB,message.author.id).then((user) => {
        if (user === false) { return } else {
            if (user.adv.indexOf("chino") == "-1") {
                user.adv.push("chino");
                message.author.send("🏅**獲得成就!!**  智乃初見面!");
                Mongo.writeUser(clientDB,message.author.id,user) 
            }
        }
    })
}
async function chino10(bot, message,clientDB) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadUser(clientDB,message.author.id).then((user) => {
        if (user === false) { return } else {
            if (user.adv.indexOf("chino10") == "-1") {
                user.adv.push("chino10");
                message.author.send("🏅**獲得成就!!**  智乃熟客!");
                Mongo.writeUser(clientDB,message.author.id,user)
            }
        }
    })
}
async function nomoneychino(bot, message,clientDB) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadUser(clientDB,message.author.id).then((user) => {
        if (user === false) { return } else {
            if (user.adv.indexOf("nomoneychino") == "-1") {
                user.adv.push("nomoneychino");
                message.author.send("🏅**獲得成就!!**  就算沒錢我也要買智乃!");
                Mongo.writeUser(clientDB,message.author.id,user)
            }
        }
    })
}
async function specaial(bot, message,clientDB) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadUser(clientDB,message.author.id).then((user) => {
        if (user === false) { return } else {
            if (user.adv.indexOf("specaial") == "-1") {
                user.adv.push("specaial");
                message.author.send("🏅**獲得成就!!**  特別服務>w<");
                Mongo.writeUser(clientDB,message.author.id,user)
            }
        }
    })
}
async function S3_(bot, message,clientDB) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadUser(clientDB,message.author.id).then((user) => {
        if (user === false) { return } else {
            if (user.adv.indexOf("S3get") == "-1") {
                user.adv.push("S3get");
                message.author.send("🏅**獲得成就!!**  2020新糧食!");
                Mongo.writeUser(clientDB,message.author.id,user)
            }
        }
    })
}
let api = require("../function/apiping")
async function report(bot, message,clientDB, number, spot, r18, draw) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    Mongo.loadPicture(clientDB).then((user) => {
        if (user === false)  return;
            Mongo.loadUser(clientDB,message.author.id).then((user2) => {
                if (user2 === false)  return;
                const filter = (button) => button.clicker.id === message.author.id
                draw.awaitMessageComponent(filter,{max: 1,time: 10000,errors:['time']})
                      .then(collected => {
                        api.ping(bot,collected)
                        if (collected.customId === 'A') {
                            let dr = new Discord.MessageEmbed().setColor("#d31b1b").setTitle(message.author.username + ` ${h.word.ordered} ` + spot).setDescription(h.report.delete).setFooter(h.report.report+ number).setTimestamp()
                            draw.delete();
                            draw.channel.send({embeds: [dr]})
                            if(r18 != "Yes") {
                            user.report.push(number)
                            Mongo.writePicture(clientDB,user)
                            }
                        } else if (collected.customId === 'B') {
                            message.reply(h.report.love)
                            var embed = draw.embeds[0];
                            let file = embed.image.url;
                            user2.picture.love.push({type:"Picture",name: spot,file: number,nsfw: r18,url: file})
                            Mongo.writeUser(clientDB,message.author.id,user2) 
                        } else if (collected.customId === 'C') {
                            var embed = draw.embeds[0];
                            let file = embed.image.url;
                            if (r18 == "Yes") { var r18Y = "R18" } else if (r18 == "No") { var r18Y = "Normal" } else { var r18Y = "Unknown" }
                            let share = new Discord.MessageEmbed().setTitle(h.report.share).setDescription(h.report.url).addField("[" + spot + "] [" + r18Y + "] [" + number + "]", `[[${number}]](${file})`).setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL())
                            message.channel.send({embeds: [share]})
                        }
                    }).catch(collected => { return; })
            })
        }
    )
}