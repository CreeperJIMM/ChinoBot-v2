const fetch = require('node-fetch')
const cheerio = require("cheerio")
const Discord = require('discord.js');
const lan = require('../commands/lang.json');
const gameX = require('../language/bs.json');
const fs = require('fs')
const NanaAPI = require('nana-api');
const nana = new NanaAPI()
const FormData = require('form-data');
const disbut = require('discord-buttons');
module.exports = {
    "bs": {
        description: {zh_TW:"唬爛產生器.",en_US:"Bluff generator.",ja_JP:""},
        category: "text",
        authority: "everyone",
        instructions: "bs [字數] [文字]",
        fun: function (bot, message, prefix,clientDB,language,agrs, nubmer, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (parseFloat(nubmer).toString() !== "NaN" && Number(nubmer) <= 1000) {
                if (text.join(" ") === "") {
                    message.channel.send(k.bs.type + k.bs.theme)
                    return
                }
                let jjson = JSON.stringify({ "Topic": text.join(" "), "MinLen": Number(nubmer) })
                fetch("https://api.howtobullshit.me/bullshit", { method: 'POST', body: jjson }).then(function (w) {
                    return w.text()
                }).then(function (w) {
                    e = w.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, "")
                    c = e.replace(/<br>/g, "\n")
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(k.bs.bluff)
                    embed.setDescription(`${k.bs.theme}:\`${text.join(" ")}\`\n${k.bs.text}:\n${c}\n`)
                    embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                    message.channel.send(embed)
                })
            } else {
                message.channel.send(l.error.type_number + l.error.less_then + "1000")
            }
        }
    },
    "fortune": {
        description: {zh_TW:"運勢",en_US:"Your fortune.",ja_JP:""},
        category: "fun",
        authority: "everyone",
        instructions: "fortune",
        fun: function (bot, message, prefix,clientDB,language,agrs, nubmer, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                let x= message.author.id
                x= "546144403958398988"
                x = parseInt(x)
                x=Math.floor(x*0.0000000000000001)
                if(x >= 10) x= x*0.1
                let day = new Date().getUTCHours()*0.12
                x=Math.floor(10/(x*day))
                let redom = Math.round(Math.random()*10)
                x= redom+x
                let fort = ""
                if(x === 0) {fort = "超凶"}
                else if(0< x && x <= 2) {fort="末凶"}
                else if(3<= x && x <= 4) {fort="凶"}
                else if(5<= x && x <= 7) {fort="小凶"}
                else if(8<= x && x <= 10) {fort="小吉"}
                else if(11<= x && x <= 14) {fort="吉"}
                else if(15<= x && x <= 17) {fort="大吉"}
                else if(x >18) {fort="超吉"}
                let embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.member.nickname} 的運勢`)
                embed.setDescription(`${fort}`)
                embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                message.channel.send(embed)
        }
    },
    "運勢": {
        description: "運勢",
        authority: "everyone",
        instructions: "運勢",
        fun: function (bot, message, prefix,clientDB,language,agrs, nubmer, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                let x= message.author.id
                x= "546144403958398988"
                x = parseInt(x)
                x=Math.floor(x*0.0000000000000001)
                if(x >= 10) x= x*0.1
                let day = new Date().getUTCHours()*0.12
                x=Math.floor(10/(x*day))
                let redom = Math.round(Math.random()*10)
                x= redom+x
                let fort = ""
                if(x === 0) {fort = "超凶"}
                else if(0< x && x <= 2) {fort="末凶"}
                else if(3<= x && x <= 4) {fort="凶"}
                else if(5<= x && x <= 7) {fort="小凶"}
                else if(8<= x && x <= 10) {fort="小吉"}
                else if(11<= x && x <= 14) {fort="吉"}
                else if(15<= x && x <= 17) {fort="大吉"}
                else if(x >18) {fort="超吉"}
                let embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.member.nickname} 的運勢`)
                embed.setDescription(`${fort}`)
                embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                message.channel.send(embed)
        }
    },
    "covid-19": {
        description: {zh_TW:"台灣新冠疫情狀態.",en_US:"Taiwan covid-19 status.",ja_JP:""},
        authority: "everyone",
        instructions: "covid-19",
        category: "other",
        fun: function (bot, message, prefix,clientDB,language,agrs, nubmer, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                fetch("https://covid19dashboard.cdc.gov.tw/dash3", { method: 'GET'}).then(function (w) {
                    return w.json()
                }).then(function (data) {
                fetch("https://covid19dashboard.cdc.gov.tw/dash7", { method: 'GET'}).then(function (w) {
                        return w.json()
                }).then(function (time) {

                    let embed = new Discord.MessageEmbed();
                    embed.setTitle("<:covid:843663053852639292> 台灣新冠肺炎(COVID-19) 統計")
                    embed.setDescription(`**國內通報總計**\n📣通報數: ${data[0].送驗}\n✅已排除: ${data[0].排除}\n😷確診: ${data[0].確診}\n💀死亡: ${data[0].死亡} \n🔓解除隔離: ${data[0].解除隔離}\n\n**昨日新增**\n📣通報數: ${data[0].昨日送驗}\n✅已排除: ${data[0].昨日排除}\n😷確診: ${data[0].昨日確診}`)
                    embed.setFooter(`總計檢驗件數: ${time[0].檢驗件數}\n總計檢驗人數: ${time[0].檢驗人數}\n資料更新時間: ${time[0].資料更新時間}`, message.author.avatarURL())
                    message.channel.send(embed)
                })
            })
        }
    },
    "loli1": {
        description: {zh_TW:"你的蘿莉控程度",en_US:"Your lolicon level.(only Chinese)",ja_JP:""},
        authority: "everyone",
        instructions: "loli1",
        category: "text",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                if (text.join(" ") === "") {
                    message.channel.send(k.bs.type + k.bs.theme)
                    return
                }
                if(text.join(' ').length > 20) {
                    return message.channel.send(l.error.less_then +"20")
                }
                const formdata = new FormData();
                formdata.append("username", text.join(' '))
                fetch.default("https://buzzpark.cc/fortune/show/Rn",{body: formdata, method:"POST"})
                .then(req => {
                    return req.text()
                })
                    .then(html => {
                        const $ = cheerio.load(html)
                        let c = $("#fortune-show > div > div.grid_9.alpha > div.show_block")
                        .text()
                        .replace(/((分享：)|(QQ空间)|(新浪微博)|(Facebook)|(噗浪)|( )|(\n))+/g,"") 
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle("你的蘿莉控程度為")
                    embed.setDescription(`${k.bs.theme}:\`${text.join(" ")}\`\n${k.bs.text}:\n${c}\n`)
                    embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                    message.channel.send(embed)
                })
        }
    },
    "shota1": {
        description: {zh_TW:"你的正太控程度.",en_US:"Your shotacon level.",ja_JP:""},
        authority: "everyone",
        instructions: "shota1",
        category: "text",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                if (text.join(" ") === "") {
                    message.channel.send(k.bs.type + k.bs.theme)
                    return
                }
                if(text.join(' ').length > 20) {
                    return message.channel.send(l.error.less_then +"20")
                }
                const formdata = new FormData();
                formdata.append("username", text.join(' '))
                fetch.default("https://buzzpark.cc/fortune/show/3zs",{body: formdata, method:"POST"})
                .then(req => {
                    return req.text()
                })
                    .then(html => {
                        const $ = cheerio.load(html)
                        let c = $("#fortune-show > div > div.grid_9.alpha > div.show_block")
                        .text()
                        .replace(/((分享：)|(QQ空间)|(新浪微博)|(Facebook)|(噗浪)|( )|(\n))+/g,"") 
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle("你的正太控程度為")
                    embed.setDescription(`${k.bs.theme}:\`${text.join(" ")}\`\n${k.bs.text}:\n${c}\n`)
                    embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                    message.channel.send(embed)
                })
        }
    },
    "lolis2": {
        description: "蘿莉產生器",
        authority: "everyone",
        instructions: "bs [字數] [文字]",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                if (text.join(" ") === "") {
                    message.channel.send(k.bs.type + k.bs.theme)
                    return
                }
                let formData = new FormData();
                formData.append('username', text.join(' '));
                fetch.default("https://wtf.hiigara.net/api/run/IIWh9k/"+text.join(' '), { method: 'POST',body: formData}).then(function (w) {
                    return w.text()
                }).then(function (w) {
                    e = w.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, "")
                    c = e.replace(/<br>/g, "\n")
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(k.bs.bluff)
                    embed.setDescription(`${k.bs.theme}:\`${text.join(" ")}\`\n${k.bs.text}:\`\`\`fix\n${c}\n\`\`\``)
                    embed.setFooter(text = message.author.tag, iconURL = message.author.avatarURL())
                    message.channel.send(embed)
                })
        }
    },
    "together": {
        description: {zh_TW:"語音遊戲.",en_US:"Voice games.",ja_JP:""},
        authority: "everyone",
        instructions: "together [game] \nYou must join voice channel.",
        category: "game",
        fun: function (client, message, prefix,clientDB,language,agrs) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                let content = message.content.split(" ")[1]
                if(content === "poker") {
                    if(message.member.voice.channel) {
                        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                            return message.channel.send(`♣一起遊玩德州撲克牌吧!\n ${invite.code}`);
                        });
                    }
                }else if(content === "yt" || content === "youtube") {
                    if(message.member.voice.channel) {
                        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                            return message.channel.send(`[YT]一起觀看Youtube吧!\n ${invite.code}`);
                        });
                    }
                } else if(content === "chess") {
                    if(message.member.voice.channel) {
                        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                            return message.channel.send(`♟️一起下棋吧!\n ${invite.code}`);
                        });
                    }
                } else if(content === "betrayal") {
                    if(message.member.voice.channel) {
                        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
                            return message.channel.send(`一起玩betrayal吧!\n ${invite.code}`);
                        });
                    }
                } else if(content === "fishing" || content === "fish") {
                    if(message.member.voice.channel) {
                        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                            return message.channel.send(`🎣一起釣魚吧!\n ${invite.code}`);
                        });
                    }
                }else{
                    let help = new Discord.MessageEmbed()
                    .setTitle("一起在語音遊玩!")
                    .setDescription("使用 `cr!together [遊戲]` 來一起玩!\n- `poker` 德州撲克\n- `youtube` 觀看Youtube \n- `chess` 下棋\n-`betrayal` betrayal.io\n- `fish` 釣魚")
                    message.channel.send(help)
                }
        }
    },
    "nhentai": {
        description: {zh_TW:"看本本指令.",en_US:"Watch nhentai.",ja_JP:""},
        authority: "everyone",
        instructions: "nhentai [number]",
        category: "other",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.channel) {
            /*    let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
            .setColor("#E12323").setFooter("若有不便請見諒 > <");return message.channel.send(Coppa)}*/
            if(!message.channel.nsfw) return message.channel.send("❌🔞請在限制級頻道使用此指令!")
            if(isNaN(agrs[0])) return message.channel.send(k.henti.No_number)
            nana.g(agrs[0]).then(async(g) => {
                if(!g) return message.channel.send("❌"+k.henti.No_number)
                let img = g.media_id                
         let cover = null;
         if(g.images.cover.t === "j") {cover = "jpg"}else if(g.images.cover.t === "p") {cover = "png"}
         const milliseconds = g.upload_date * 1000
         const dateObject = new Date(milliseconds)
         let ti = dateObject.toLocaleDateString()
        let parody = String(),character = String(),tags = String(),artist = String(),Languages = String()
        for(var i = 0; i < g.tags.length; i++) {
            let tg = g.tags[i]
            if(tg.type === "language") {
                Languages = Languages+ `[${tg.name}](https://nhentai.net/${tg.url}) \`(${tg.count})\` `
            }else if(tg.type === "character") {
                character = character+ `[${tg.name}](https://nhentai.net/${tg.url}) \`(${tg.count})\` `
            }else if(tg.type === "tag") {
                tags = tags+ `[${tg.name}](https://nhentai.net/${tg.url}) \`(${tg.count})\` `
            }else if(tg.type === "artist") {
                artist = artist+ `[${tg.name}](https://nhentai.net/${tg.url}) \`(${tg.count})\` `
            }else if(tg.type === "parody") {
                parody = parody+ `[${tg.name}](https://nhentai.net/${tg.url}) \`(${tg.count})\` `
            }
        }
                let imgembed = new Discord.MessageEmbed()
                .setTitle(g.title.japanese)
                .setURL("https://nhentai.net/g/"+agrs[0])
                .setDescription(`🔎出處: ${parody}\n👦主角: ${character}\n🌍語言: ${Languages}\n🖌作者: ${artist}\n🏷標籤: ${tags} \n`+`📒 `+g.num_pages+ ` ${k.henti.page}\n❤${g.num_favorites} 喜歡\n 📩[下載](https://nhentai.net/g/${agrs[0]}/download)`)
                .setColor("#e61c63")
                .setImage("https://t.nhentai.net/galleries/"+img+"/cover."+cover)
                .setFooter(k.henti.date +`: `+ ti+`\n請點擊✅開始閱讀\n`+message.author.tag,message.author.avatarURL())
                let buttonUP = new disbut.MessageButton(),buttonDOWN = new disbut.MessageButton()
                buttonUP.setStyle('green').setEmoji("✅").setID("read")
                buttonDOWN.setStyle('red').setEmoji("❌").setID("cancel")
                let row = new disbut.MessageActionRow().addComponents(buttonUP,buttonDOWN);
                message.channel.send(imgembed,row).then((im) => {
                    let number = 1
                    const filter= (button) => {
                        return ['read','cancel'].includes(button.id) && button.clicker.id === message.author.id
                    }
                    im.awaitButtons(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();
                            if (reaction.id == "read") {
                                number = 1
                                ping(reaction)
                                read(im)
                            }else if(reaction.id == "cancel") {
                                reaction.reply.send("你取消閱讀:(")                                
                                im.delete()
                            }
                        }).catch(err => {
                            im.delete()
                            message.channel.send("你沒有回應是否閱讀:(")
                        })
                        function ping(reply) {
                            bot.api.interactions(reply.discordID,reply.token).callback.post({
                                data: {
                                type: 6
                            }})
                        }
                        function read(im) {
                            let imgs = null;
                            if(g.images.pages[number-1].t === "j") {imgs = "jpg"}else if(g.images.pages[number-1].t === "p") {imgs = "png"}
                            let reading = new Discord.MessageEmbed()
                            .setTitle(g.title.japanese).setURL("https://nhentai.net/g/"+agrs[0]+"/"+number).setDescription(`Number: **${agrs[0]}**\n[**${k.henti.the} ${number} ${k.henti.page}**] [**${k.henti.all} ${g.num_pages} ${k.henti.page}**]`).setColor("#e61c63")
                            .setFooter(`操作者: ${message.author.tag} \n[◀]上一頁  [▶]下一頁 \n[⏺]回到第一頁 [🔎]跳到指定頁數 \n[❌]結束閱讀`)
                            .setImage("https://i.nhentai.net/galleries/"+img+"/"+number+"."+imgs)
                            let buttonUP = new disbut.MessageButton(),buttonDOWN = new disbut.MessageButton(),buttonHOME = new disbut.MessageButton(),buttonJUMP = new disbut.MessageButton(),buttonEND = new disbut.MessageButton()
                            buttonUP.setStyle('grey').setLabel("上一頁").setEmoji("◀").setID("last")
                            buttonDOWN.setStyle('grey').setLabel("下一頁").setEmoji("▶").setID("next")
                            buttonHOME.setStyle('blurple').setLabel("首頁").setEmoji("⏺").setID("first")
                            buttonJUMP.setStyle('green').setLabel("跳到指定頁數").setEmoji("🔎").setID("jump")
                            buttonEND.setStyle('red').setLabel("結束").setEmoji("❌").setID("end")  
                        if(number === 1) {
                            buttonUP.setDisabled(true)
                        }else if(number === g.num_pages) {
                            buttonDOWN.set
                            Disabled(true)
                        }
                        let row = new disbut.MessageActionRow().addComponents([[buttonUP,buttonDOWN],[buttonHOME,buttonJUMP,buttonEND]])
                        im.edit(reading,row)
                        const filter= (button) => {
                            return ['last','next','first','jump','end'].includes(button.id) && button.clicker.id === message.author.id
                        }
                            im.awaitButtons(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                        const reaction = collected.first();
                                        if (reaction.id == "last") {
                                            number = number-1
                                            ping(reaction)
                                            read(im)
                                        }else if(reaction.id == "next") {
                                            number++
                                            ping(reaction)
                                            read(im)
                                        }else if(reaction.id == "first") {
                                            number = 1
                                            ping(reaction)
                                            read(im)
                                        }else if(reaction.id == "jump") {
                                        let secrth = new Discord.MessageEmbed().setTitle("請輸入你要跳轉的頁數").setDescription("例如\n`2`\n`12`\n`32`").setFooter(`操作者: ${message.author.tag}`).setColor("#e61c63")
                                        im.edit(secrth)
                                        ping(reaction)
                                        const filter2 = m => m.author.id == message.author.id;
                                        im.channel.awaitMessages(filter2,{max: 1, time: 15000})
                                        .then(collected => {
                                            let num = collected.first().content
                                            if(!isNaN(num) && num > 0) {
                                                if(num >= g.num_pages) {
                                                number = g.num_pages-1
                                                }else{
                                                number = collected.first().content}                                                
                                                collected.first().delete()
                                                read(im)
                                            }else{
                                                im.delete()
                                                message.channel.send("❌你填入了不是數字的數值\n重打一次指令吧:(")
                                            }
                                        }).catch((err) => {
                                            im.delete()
                                            message.channel.send("❌你太慢輸入了\n重打一次指令吧:(")
                                        })
                                       }else if(reaction.id == "end") {
                                        im.delete()
                                        reaction.reply.send("🔰感謝你的閱讀!\n最後的頁數: "+number)
                                    }
                                    }).catch(err => {
                                        im.delete()
                                    
                                        message.channel.send("已取消閱讀")
                                    })
                        }
                });
            })
        }}
    },
    "ant": {
        description: {zh_TW:"螞蟻文指令.",en_US:"Ant text.",ja_JP:""},
        authority: "everyone",
        instructions: "ant [text]",
        category: "text",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (text.join(" ") === "") {
                message.channel.send(l.error.type_text)
                return}
            if (text.join(" ").length > 100) {
                message.channel.send(l.error.less_then+"100")
                return;}
            var ant = "\u0489";
            let str = text.join(" ")
            var snd = str.replace(/(.{0})/g, '$1' + ant);
            message.channel.send(snd)
        }
    },
    "election": {
        description: {zh_TW:"2020美國選舉.",en_US:"2020 America election.",ja_JP:""},
        authority: "everyone",
        instructions: "election",
        category: "other",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let date = new Date().getUTCDate()-1
            fetch("https://interactives.ap.org/elections/live-data/production/2020-11-03/president/summary.json").then(function (w) {
                return w.text()
            }).then(function (w) {
                var user = w.toString();
                try{user = JSON.parse(user);}catch(e){return message.channel.send("❌ " + e)}
                let embed = new Discord.MessageEmbed()
                embed.setTitle(k.election.title)
                embed.setColor("#243ce0")
                embed.setDescription(k.election.all+ user.results.US[0].summary.electTotal+ k.election.vote)
                embed.addField("<:biden:773532245943517204> 拜登 Biden - "+user.results.US[0].summary.results[0].electWon +k.election.vote ,k.election.allvote+user.results.US[0].summary.results[0].voteCount+k.election.vote+"\n"+k.election.ratevote+user.results.US[0].summary.results[0].votePct+" %")
                embed.addField("<:trump:773532247017128016> 川普 Trump - "+user.results.US[0].summary.results[1].electWon +k.election.vote ,k.election.allvote+user.results.US[0].summary.results[1].voteCount+k.election.vote+"\n"+k.election.ratevote+user.results.US[0].summary.results[1].votePct+" %" )
                let wod = "<:Transparent:751597051963506698>"
                let l1 = Math.abs((user.results.US[0].summary.results[0].electWon)/270*10)
                let l2 = Math.abs((user.results.US[0].summary.results[1].electWon)/270*10)
                let q1 = "";let q2 = "";let q3 = "";let q4 = ""
                for(i=0;i< l1 ;i++){q1 = "🟦" + q1};for(i=0;i< l2 ;i++){q2 = "🟥" + q2}
                let e1 = 10 - l1;let e2 = 10 - l2;
                for(i=0;i< e1 ;i++){q3 = wod + q3}for(i=0;i< e2 ;i++){q4 = wod + q4};let e5 = q3+"|"+q4
                embed.addField("長條圖:","<:biden:773532245943517204> 拜登 Biden - "+user.results.US[0].summary.results[0].electWon+wod+wod+"勝選門檻270"+wod+wod+user.results.US[0].summary.results[1].electWon+" - <:trump:773532247017128016> 川普 Trump\n"+wod+wod+wod+wod+wod+wod+wod+wod+wod+wod+wod+"|"+wod+wod+wod+"\n"+q1+e5+q2)
                let time = new Date(user.timestamp)
                if(time.getHours() > 12) {var h = (time.getHours())-12;var h2 = "PM"}else{var h = time.getHours();var h2 = "AM"}
                embed.setFooter("更新日期: "+ (time.getUTCMonth()+1)+"月"+time.getUTCDate()+"日 "+h+":"+time.getMinutes()+h2+"\n")
                embed.setTimestamp()
                message.channel.send(embed)
                
            })

        }
    },
    "emoji": {
        description: {zh_TW:"或取表情圖片",en_US:"Get emoji picture.",ja_JP:""},
        authority: "everyone",
        instructions: "emoji [emoji]",
        category: "normal",
        fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            const hasEmoteRegex = /<a?:.+:\d+>/gm
            const emoteRegex = /<:.+:(\d+)>/gm
            const nameRegex = /:.+:/gm
            const animatedEmoteRegex = /<a:.+:(\d+)>/gm
            if(!message.content.match(hasEmoteRegex)) return message.channel.send("未找到表情符號.")
          
            if (emoji = emoteRegex.exec(message)) {
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
            message.channel.send(url)
            }
            else if (emoji = animatedEmoteRegex.exec(message)) {
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
            message.channel.send(url)
            }
            else {
            message.channel.send("Couldn't find an emoji to paste!")
            }
            }
        },
        "emojiadd": {
            description: {zh_TW:"將外部表情變成此伺服器的表情.",en_US:"Let external emoji become the emoji of this server.",ja_JP:""},
            authority: "admin",
            instructions: "emojiadd [emoji]",
            category: "admin",
            fun: function (bot, message, prefix,clientDB,language,agrs, ...text) { 
                let l = lan.zh_TW,k = gameX.zh_TW
                if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
                }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
                const hasEmoteRegex = /<a?:.+:\d+>/gm
                const emoteRegex = /<:.+:(\d+)>/gm
                const nameRegex = /:.+:/gm
                const animatedEmoteRegex = /<a:.+:(\d+)>/gm
                if(!message.content.match(hasEmoteRegex)) return message.channel.send("未找到表情符號.")

                if (emoji = emoteRegex.exec(message)) {
                const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
                let name = nameRegex.exec(message)[0]
                name = name.substring(1,name.length-1)
                message.guild.emojis.create(url,name)
                message.channel.send(url)
                }
                else if (emoji = animatedEmoteRegex.exec(message)) {
                const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
                let name = nameRegex.exec(message)[0]
                name = name.substring(1,name.length-1)
                message.guild.emojis.create(url,name)
                message.channel.send(url)
                }
                else {
                message.channel.send("Couldn't find an emoji to paste!")
                }
                }
            }
}
