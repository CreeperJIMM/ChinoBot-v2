const Discord = require("discord.js")
let fs = require("fs");
const lan = require('../commands/lang.json');
const rabbitX = require('../language/rabbit.json');
module.exports = {
    "chino": {
        description: "智乃指令",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send();
            if (!msg.channel.nsfw) {
                fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                    if (err) { msg.channel.send(l.error.Try_again); } else {
                        var user2 = userInfo2.toString();
                        user2 = JSON.parse(user2);
                        if (user2.money < 25) {
                            msg.channel.send(h.word.No_money + h.role.chino +"...") 
                            nomoneychino(bot, msg) 
                            return;
                    } else {
                            user2.chino++
                                user2.money = (user2.money - 25)
                            var str = JSON.stringify(user2);
                            msg.channel.send("☕" + h.word.ordered + h.role.chino + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                            fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                            fs.readFile('./data.json', function(err, userInfo) {
                                if (err) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                var user = userInfo.toString();
                                user = JSON.parse(user);
                                if (user.command === "true") return;
                                user.Chino++
                                    user.command = "true"
                                var Chino = user.Chino
                                var str = JSON.stringify(user);
                                fs.writeFileSync('./data.json', str)
                                fs.readdir("./pitrue/chino", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/chino/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + " " + h.word.ordered + h.role.chino)
                                        .attachFiles(attachment)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.chino}${h.word.ordered2} ${Chino} ${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send(chinoEmbed).then((rp) => { report(bot, msg, f, "Chino", "No", rp) });
                                })
                            })
                            if (user2.chino > 10) {
                                chino10(bot, msg);
                                chino(bot, msg)
                            } else { chino(bot, msg) }
                        }
                    }
                })
            } else {
                if(message.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return message.channel.send(Coppa)}
                fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                    if (err) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        var user2 = userInfo2.toString();
                        user2 = JSON.parse(user2);
                        if (user2.money < 40) {
                            msg.channel.send(h.word.No_money +h.role.mature+ h.role.chino +"...");
                            nomoneychino(bot, msg)
                        } else {
                            user2.chino++
                                user2.money = (user2.money - 35)
                            var str = JSON.stringify(user2);
                            msg.channel.send("☕" + h.word.ordered + h.role.mature + h.role.chino + "\n" + h.word.cost + "`30`$  " + h.word.last + " `" + user2.money + "`$")
                            fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                            fs.readFile('./data.json', function(err, userInfo) {
                                if (err) {
                                    console.log("錯誤!", err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                var user = userInfo.toString();
                                user = JSON.parse(user);
                                if (user.command === "true") return;
                                user.command = "true"
                                user.Chino++
                                    var Chino = user.Chino
                                var str = JSON.stringify(user);
                                fs.writeFileSync('./data.json', str)
                                fs.readdir("./pitrue/chino/Nsfw", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/chino/Nsfw/" + f, f);
                                    const chino18Embed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+ h.word.ordered+ h.role.mature + h.role.chino)
                                        .attachFiles(attachment)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.chino}${h.word.ordered2}${Chino}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send(chino18Embed).then((rp) => { report(bot, msg, f, "Chino", "Yes", rp) })
                                    if (user2.chino > 10) {
                                        chino10(bot, msg);
                                        chino(bot, msg);
                                        specaial(bot, msg)
                                    } else {
                                        chino(bot, msg);
                                        specaial(bot, msg)
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
        description: "心愛指令",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            if (!msg.channel.nsfw) {
                fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                    if (err) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        var user2 = userInfo2.toString();
                        user2 = JSON.parse(user2);
                        if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.cocoa +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 25)
                            var str = JSON.stringify(user2);
                            msg.channel.send("☕" + h.word.ordered + h.role.cocoa + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                            fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                            fs.readFile('./data.json', function(err, userInfo) {
                                if (err) {
                                    console.log(l.error.Run_Command_error, err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                var user = userInfo.toString();
                                user = JSON.parse(user);
                                if (user.command === "true") return;
                                user.command = "true"
                                user.Cocoa++
                                    var Cocoa = user.Cocoa
                                var str = JSON.stringify(user);
                                fs.writeFileSync('./data.json', str)
                                fs.readdir("./pitrue/cocoa/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/cocoa/" + f, f);
                                    const cocoaEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + " "+h.word.ordered + h.role.cocoa)
                                        .attachFiles(attachment)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.cocoa}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Cocoa", "No", rp) })
                                })
                            })
                        }
                    }
                })
            } else {
                if(message.channel) {
                    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                    .setColor("#E12323").setFooter("若有不便請見諒 > <");return message.channel.send(Coppa)}
                fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                    if (err) {
                        msg.channel.send(l.error.Try_again);
                    } else {
                        var user2 = userInfo2.toString();
                        user2 = JSON.parse(user2);
                        if (user2.money < 35) { return msg.channel.send(h.word.No_money+h.role.mature + h.role.cocoa +"...") } else {
                            user2.cocoa++
                                user2.money = (user2.money - 35)
                            var str = JSON.stringify(user2);
                            msg.channel.send("☕" + h.word.ordered+ h.role.mature+ h.role.cocoa + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                            fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                            fs.readFile('./data.json', function(err, userInfo) {
                                if (err) {
                                    console.log(l.error.Run_Command_error, err);
                                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                                }
                                var user = userInfo.toString();
                                user = JSON.parse(user);
                                if (user.command === "true") return;
                                user.command = "true"
                                user.Cocoa++
                                    var Cocoa = user.Cocoa
                                var str = JSON.stringify(user);
                                fs.writeFileSync('./data.json', str)
                                fs.readdir("./pitrue/cocoa/Nsfw/", (err, r) => {
                                    let f = r[Math.floor(Math.random() * r.length)]
                                    const attachment = new Discord.MessageAttachment("./pitrue/cocoa/Nsfw/" + f, f);
                                    const chinoEmbed = new Discord.MessageEmbed()
                                        .setColor('#2d9af8')
                                        .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.cocoa)
                                        .attachFiles(attachment)
                                        .setImage('attachment://' + f)
                                        .setTimestamp()
                                        .setFooter(`◆${h.role.cocoa}${h.word.ordered2}${Cocoa}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                    msg.channel.send(chinoEmbed).then((rp) => { report(bot, msg, f, "Cocoa", "Yes", rp) })
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
        fun: function(bot, msg,p,language) {
            shark0(bot, msg,language)
        }
    },
    "gura": {
        description: "鯊魚指令",
        fun: function(bot, msg,p,language) {
            shark0(bot, msg,language)
        }
    },
    "tippy": {
        description: "提比指令",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.tippy +"...") } else {
                        user2.tippy++
                            user2.money = (user2.money - 15)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.tippy + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.Tippy++
                                var Tippy = user.Tippy
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/tippy/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/tippy/" + f, f);
                                const chinoEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.tippy)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.tippy}${h.word.ordered2}${Tippy}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send(chinoEmbed).then((rp) => { report(bot, msg, f, "Tippy", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "other": {
        description: "分享餐!",
        fun: function (bot, msg, p,language) { 
            let lang = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {lang = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 35) { return msg.channel.send(h.word.No_money + h.role.other +"...")} else {
                        user2.other++
                            user2.money = (user2.money - 35)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordereds + h.role.other + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.Other++
                                var Other = user.Other
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/other/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/other/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordereds+h.role.other)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.other}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Other", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "fubuki": {
        description: "狐狸",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.fubuki +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.fubuki + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Try_again, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.Fubuki++
                                var Fubuki = user.Fubuki
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/fubuki/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/fubuki/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered + h.role.fubuki)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.fubuki}${h.word.ordered2}${Fubuki}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Fubuki", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "shota": {
        description: "正太",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 25) { return msg.channel.send("💸看來你沒有足夠的錢點一隻正太...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.shota + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.shota++
                                var Shota = user.shota
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/shota/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/shota/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.shota}${h.word.ordered2}${Shota}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Shota", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "chen": {
        description: "八雲橙!",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.chen +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.chen + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Try_again, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.Chen++
                                var Other = user.Chen
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/chen/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/chen/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.chen)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.chen}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Chen", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "peko": {
        description: "兔子!",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.peko +"...") } else {
                        user2.other++
                            user2.money = (user2.money - 25)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.peko + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Try_again, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.peko++
                                var Other = user.peko
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/peko/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/peko/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.peko)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.peko}${h.word.ordered2}${Other}${h.word.time}\n${h.word.copy}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Pekora", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S1": {
        description: "點兔第一季",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S1 +"...") } else {
                        user2.money = (user2.money - 15)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.S1 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.S1++
                                var S1 = user.S1
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/S1/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S1/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S1}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Rabbit_S1", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S2": {
        description: "點兔第二季",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S2 +"...") } else {
                        user2.money = (user2.money - 15)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.S2 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.S2++
                                var S1 = user.S2
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/S2/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S2/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S2}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Rabbit_S2", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "S3": {
        description: "點兔第三季",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
                if (err) {
                    msg.channel.send(l.error.Try_again);
                } else {
                    var user2 = userInfo2.toString();
                    user2 = JSON.parse(user2);
                    if (user2.money < 15) { return msg.channel.send(h.word.No_money + h.role.S3 +"...") } else {
                        user2.money = (user2.money - 15)
                        var str = JSON.stringify(user2);
                        msg.channel.send("☕" + h.word.ordered + h.role.S3 + "\n" + h.word.cost + "`15`$  " + h.word.last + " `" + user2.money + "`$")
                        fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                        fs.readFile('./data.json', function(err, userInfo) {
                            if (err) {
                                console.log(l.error.Run_Command_error, err);
                                bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                            }
                            var user = userInfo.toString();
                            user = JSON.parse(user);
                            if (user.command === "true") return;
                            user.command = "true"
                            user.S3++
                                var S1 = user.S3
                            var str = JSON.stringify(user);
                            fs.writeFileSync('./data.json', str)
                            fs.readdir("./pitrue/S3/", (err, r) => {
                                let f = r[Math.floor(Math.random() * r.length)]
                                const attachment = new Discord.MessageAttachment("./pitrue/S3/" + f, f);
                                const cocoaEmbed = new Discord.MessageEmbed()
                                    .setColor('#2d9af8')
                                    .setTitle(msg.author.username + " "+h.word.ordered+h.role.S1)
                                    .attachFiles(attachment)
                                    .setImage('attachment://' + f)
                                    .setTimestamp()
                                    .setFooter(`◆${h.role.S3}${h.word.ordered2}${S1}${h.word.time}\n${h.word.copy}\n${h.word.copy_rabbit}`);
                                S3_(bot,msg)
                                    msg.channel.send(cocoaEmbed).then((rp) => { report(bot, msg, f, "Rabbit_S2", "No", rp) })
                            })
                        })
                    }
                }
            })
        }
    },
    "data": {
        description: "點兔資料",
        fun: function (bot, msg, p,language) { 
            let l = lan.zh_TW,h = rabbitX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
            if (!msg.guild) return msg.channel.send(l.error.No_DM);
            fs.readFile('./data.json', function(err, userInfo) {
                if (err) {
                    console.log(l.error.Try_again, err);
                    bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                }
                var user = userInfo.toString();
                user = JSON.parse(user);
                if (user.command === "true") return;
                user.command = "true"
                var Chino = user.Chino
                var Cocoa = user.Cocoa
                var Tippy = user.Tippy
                var Other = user.Other
                var S1 = user.S1
                var S2 = user.S2
                var S3 = user.S3
                var shark = user.Shark
                var fubuki = user.Fubuki
                var chen = user.Chen
                var peko = user.peko
                let shota = user.shota
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
                msg.channel.send(dataEmbed);
            })
        }
    }
}
async function shark0(bot, msg,language) {
    let l = lan.zh_TW,h = rabbitX.zh_TW
    if(language === "zh_TW") {l = lan.zh_TW;h = rabbitX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = rabbitX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = rabbitX.ja_JP
    }else if(language === "en_US") {l = lan.en_US;h = rabbitX.en_US}
    if (!msg.guild) return msg.channel.send(l.error.No_DM);
    if (!msg.channel.nsfw) {
        fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
            if (err) {
                msg.channel.send(l.error.Try_again);
            } else {
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
                if (user2.money < 25) { return msg.channel.send(h.word.No_money + h.role.gura +"...") } else {
                    user2.money = (user2.money - 25)
                    var str = JSON.stringify(user2);
                    msg.channel.send("☕" + h.word.ordered + h.role.gura + "\n" + h.word.cost + "`25`$  " + h.word.last + " `" + user2.money + "`$")
                    fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                    fs.readFile('./data.json', function(err, userInfo) {
                        if (err) {
                            console.log(l.error.Run_Command_error, err);
                            bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                        }
                        var user = userInfo.toString();
                        user = JSON.parse(user);
                        if (user.command === "true") return;
                        user.Shark++
                            user.command = "true"
                        var Shark = user.Shark
                        var str = JSON.stringify(user);
                        fs.writeFileSync('./data.json', str)
                        fs.readdir("./pitrue/Gawr", (err, r) => {
                            let f = r[Math.floor(Math.random() * r.length)]
                            const attachment = new Discord.MessageAttachment("./pitrue/Gawr/" + f, f);
                            const chinoEmbed = new Discord.MessageEmbed()
                                .setColor('#2d9af8')
                                .setTitle(msg.author.username + " "+h.word.ordered+h.role.gura)
                                .attachFiles(attachment)
                                .setImage('attachment://' + f)
                                .setTimestamp()
                                .setFooter(`◆${h.role.gura}${h.word.ordered2}${Shark}${h.word.time}\n${h.word.copy}`);
                            msg.channel.send(chinoEmbed).then((rp) => {
                                report(bot, msg, f, "Shark", "No", rp)
                            })
                        })
                    })
                }
            }
        })
    } else {
        if(message.channel) {
            let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
            .setColor("#E12323").setFooter("若有不便請見諒 > <");return message.channel.send(Coppa)}
        fs.readFile('./users/' + msg.author.id + '.json', function(err, userInfo2) {
            if (err) {
                msg.channel.send(l.error.Try_again);
            } else {
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
                if (user2.money < 35) {
                    msg.channel.send(h.word.No_money +h.role.mature+ h.role.gura +"...");
                } else {
                    user2.money = (user2.money - 25)
                    var str = JSON.stringify(user2);
                    msg.channel.send("☕" + h.word.ordered+h.role.mature + h.role.gura + "\n" + h.word.cost + "`35`$  " + h.word.last + " `" + user2.money + "`$")
                    fs.writeFileSync('./users/' + msg.author.id + '.json', str)
                    fs.readFile('./data.json', function(err, userInfo) {
                        if (err) {
                            console.log(l.error.Run_Command_error, err);
                            bot.channels.cache.get(`746185201675141241`).send(`錯誤!` + err);
                        }
                        var user = userInfo.toString();
                        user = JSON.parse(user);
                        if (user.command === "true") return;
                        user.Shark++
                            user.command = "true"
                        var Shark = user.Shark
                        var str = JSON.stringify(user);
                        fs.writeFileSync('./data.json', str)
                        fs.readdir("./pitrue/Gawr/Nsfw", (err, r) => {
                            let f = r[Math.floor(Math.random() * r.length)]
                            const attachment = new Discord.MessageAttachment("./pitrue/Gawr/Nsfw/" + f, f);
                            const chino18Embed = new Discord.MessageEmbed()
                                .setColor('#2d9af8')
                                .setTitle(msg.author.username + "  🔞"+h.word.ordered+h.role.mature+h.role.gura)
                                .attachFiles(attachment)
                                .setImage('attachment://' + f)
                                .setTimestamp()
                                .setFooter(`◆${h.role.gura}${h.word.ordered2}${Shark}${h.word.time}\n${h.word.copy}`);
                            msg.channel.send(chino18Embed).then((rp) => { report(bot, msg, f, "Shark", "Yes", rp) })
                        })
                    })
                }
            }
        })
    }
}
async function chino(bot, message) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            if (user.adv.indexOf("chino") == "-1") {
                user.adv.push("chino");
                message.author.send("🏅**獲得成就!!**  智乃初見面!");
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/' + message.author.id + '.json', str)
            }
        }
    })
}
async function chino10(bot, message) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            if (user.adv.indexOf("chino10") == "-1") {
                user.adv.push("chino10");
                message.author.send("🏅**獲得成就!!**  智乃熟客!");
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/' + message.author.id + '.json', str)
            }
        }
    })
}
async function nomoneychino(bot, message) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            if (user.adv.indexOf("nomoneychino") == "-1") {
                user.adv.push("nomoneychino");
                message.author.send("🏅**獲得成就!!**  就算沒錢我也要買智乃!");
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/' + message.author.id + '.json', str)
            }
        }
    })
}
async function specaial(bot, message) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            if (user.adv.indexOf("specaial") == "-1") {
                user.adv.push("specaial");
                message.author.send("🏅**獲得成就!!**  特別服務>w<");
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/' + message.author.id + '.json', str)
            }
        }
    })
}
async function S3_(bot, message) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            if (user.adv.indexOf("S3get") == "-1") {
                user.adv.push("S3get");
                message.author.send("🏅**獲得成就!!**  2020新糧食!");
                var str = JSON.stringify(user);
                fs.writeFileSync('./users/' + message.author.id + '.json', str)
            }
        }
    })
}
async function report(bot, message, number, spot, r18, draw) {
    let l = lan.zh_TW;
    let h = rabbitX.zh_TW
    draw.react("💣").then(() => { draw.react("💟") }).then(() => { draw.react("🔃") }).catch((error) => { message.channel.send(h.report.error+"`" + error + "`") })
    fs.readFile('report.json', function(err, userInfo) {
        if (err) { return } else {
            var user = userInfo.toString();
            user = JSON.parse(user);
            fs.readFile('./users/' + message.author.id + '.json', function(err, userInfo2) {
                if (err) return;
                var user2 = userInfo2.toString();
                user2 = JSON.parse(user2);
                const filter = (reaction, user) => {
                    return ['💣', '💟', '🔃'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                draw.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '💣') {
                            let dr = new Discord.MessageEmbed().setColor("#d31b1b").setTitle(message.author.username + ` ${h.word.ordered} ` + spot).setDescription(h.report.delete).setFooter(h.report.report+ number).setTimestamp()
                            draw.delete();
                            draw.channel.send(dr)
                            user.report.push(number)
                            var str = JSON.stringify(user);
                            fs.writeFileSync('report.json', str)
                            user2.picture.report.push(number)
                            var str2 = JSON.stringify(user2);
                            fs.writeFileSync('./users/' + message.author.id + '.json', str2)
                        } else if (reaction.emoji.name === '💟') {
                            message.reply(h.report.love)
                            user.love.push(number)
                            var str = JSON.stringify(user);
                            fs.writeFileSync('report.json', str)
                            user2.picture.love.push(number)
                            var str2 = JSON.stringify(user2);
                            fs.writeFileSync('./users/' + message.author.id + '.json', str2)
                        } else if (reaction.emoji.name === '🔃') {
                            var embed = draw.embeds[0];
                            let file = embed.image.url;
                            if (r18 == "Yes") { var r18Y = "R18" } else if (r18 == "No") { var r18Y = "Normal" } else { var r18Y = "Unknown" }
                            let share = new Discord.MessageEmbed().setTitle(h.report.share).setDescription(h.report.url).addField("[" + spot + "] [" + r18Y + "] [" + number + "]", `[[${number}]](${file})`).setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL())
                            message.channel.send(share)
                            user2.picture.share.push(number)
                            var str2 = JSON.stringify(user2);
                            fs.writeFileSync('./users/' + message.author.id + '.json', str2)
                        }
                    }).catch(collected => { return; })
            })
        }
    })
}