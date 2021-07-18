const fetch = require('node-fetch')
const cheerio = require("cheerio")
const Discord = require('discord.js');
const lan = require('../commands/lang.json');
const gameX = require('../language/bs.json');
const fs = require('fs')
const NanaAPI = require('nana-api');
const nana = new NanaAPI()
const FormData = require('form-data');
module.exports = {
    "bs": {
        description: "唬爛產生器",
        authority: "everyone",
        instructions: "bs [字數] [文字]",
        fun: function (bot, message, prefix,language,agrs, nubmer, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
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
    "loli": {
        description: "蘿莉產生器",
        authority: "everyone",
        instructions: "bs [字數] [文字]",
        fun: function (bot, message, prefix,language,agrs, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
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
    "loli2": {
        description: "蘿莉產生器",
        authority: "everyone",
        instructions: "bs [字數] [文字]",
        fun: function (bot, message, prefix,language,agrs, ...text) { // nubmer接指令後第一個參數  ...text的意思是接第一個以後的所有參數
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
    "nhentai": {
        description: "螞蟻文產生器",
        authority: "everyone",
        fun: function (bot, message, prefix,language,agrs, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(message.channel) {
                let Coppa = new Discord.MessageEmbed().setTitle("❌此功能無法使用!").setDescription("| 根據 __[兒童線上隱私權保護法](https://www.jdsupra.com/legalnews/no-discord-here-caru-determines-social-95054/)__`（Children's Online Privacy Protection Act，COPPA）`|\n**智乃小幫手** 將停止提供NSFW內容查詢/閱讀")
                .setColor("#E12323").setFooter("若有不便請見諒 > <");return message.channel.send(Coppa)}
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
                message.channel.send(imgembed).then((im) => {
                    let number = 1
                    im.react("✅");im.react("❌")
                    const filter = (reaction, user) => {
                        return ['✅','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };
                    im.awaitReactions(filter, { max: 1, time: 70000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();
                            if (reaction.emoji.name == "✅") {
                                number = 1
                                im.reactions.removeAll()
                                im.react("◀");
                                im.react("▶");
                                im.react("⏺");
                                im.react("🔎");
                                im.react("❌"); 
                                if(!im.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) {im.channel.send('⚠`提示: 請給予機器人 "管理訊息" 以獲取最佳閱讀體驗')} 
                                read(im)
                            }else if(reaction.emoji.name == "❌") {
                                im.delete()
                                message.channel.send("你取消閱讀:(")
                            }
                        }).catch(err => {
                            im.delete()
                            message.channel.send("你沒有回應是否閱讀:(")
                        })
                        function read(im) {
                            let imgs = null;
                            if(g.images.pages[number-1].t === "j") {imgs = "jpg"}else if(g.images.pages[number-1].t === "p") {imgs = "png"}
                            let reading = new Discord.MessageEmbed()
                            .setTitle(g.title.japanese).setURL("https://nhentai.net/g/"+agrs[0]+"/"+number).setDescription(`Number: **${agrs[0]}**\n[**${k.henti.the} ${number} ${k.henti.page}**] [**${k.henti.all} ${g.num_pages} ${k.henti.page}**]`).setColor("#e61c63")
                            .setFooter(`操作者: ${message.author.tag} \n[◀]上一頁  [▶]下一頁 \n[⏺]回到第一頁 [🔎]跳到指定頁數 \n[❌]結束閱讀`)
                            .setImage("https://i.nhentai.net/galleries/"+img+"/"+number+"."+imgs)
                            im.edit(reading)    
                        if(number === 1) {
                           var filter = (reaction, user) => {
                                return ['▶','⏺','🔎','❌'].includes(reaction.emoji.name) && user.id === message.author.id;};
                        }else if(number === g.num_pages) {
                           var filter = (reaction, user) => {
                                return ['◀','⏺','🔎','❌'].includes(reaction.emoji.name) && user.id === message.author.id;};
                        }else{
                           var filter = (reaction, user) => {
                                return ['◀','▶','⏺','🔎','❌'].includes(reaction.emoji.name) && user.id === message.author.id;};
                        }

                            im.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                        const reaction = collected.first();
                                        if (reaction.emoji.name == "◀") {
                                            number = number-1
                                            reaction.users.remove(message.author)
                                            read(im)
                                        }else if(reaction.emoji.name == "▶") {
                                            number++
                                            reaction.users.remove(message.author)
                                            read(im)
                                        }else if(reaction.emoji.name == "⏺") {
                                            number = 1
                                            reaction.users.remove(message.author)
                                            read(im)
                                        }else if(reaction.emoji.name == "🔎") {
                                        reaction.users.remove(message.author)
                                        let secrth = new Discord.MessageEmbed().setTitle("請輸入你要跳轉的頁數").setDescription("例如\n`2`\n`12`\n`32`").setFooter(`操作者: ${message.author.tag}`).setColor("#e61c63")
                                        im.edit(secrth)
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
                                       }else if(reaction.emoji.name == "❌") {
                                        im.delete()
                                        message.channel.send("🔰感謝你的閱讀!\n最後的頁數: "+number)
                                    }
                                    }).catch(err => {
                                        im.delete()    
                                        message.channel.send("已取消閱讀")
                                    })
                        }
                });
            })
        }
    },
    "ant": {
        description: "螞蟻文產生器",
        authority: "everyone",
        fun: function (bot, message, prefix,language,agrs, ...text) { 
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
        description: "選舉",
        authority: "everyone",
        fun: function (bot, message, prefix,language,agrs, ...text) { 
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
}