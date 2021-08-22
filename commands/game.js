const Discord = require("discord.js")
const util = require('minecraft-server-util')
const osu = require('node-osu');
const image = require('image-data-uri')
const fs = require("fs");
const {osuToken,hypixelToken} = require('../token.json');
const fetch = require("node-fetch")
const osuApi = new osu.Api(osuToken, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
const lan = require('../commands/lang.json');
const gameX = require('../language/game.json');
let time = new Set();
let server = new Set();
const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}
async function getId(playername) {
    return fetch.default(`https://api.mojang.com/users/profiles/minecraft/${playername}`)
      .then(data => data.json())
      .then(player => {
          if(player.id) return player.id
          if(player.error) return player.error
    }).catch(error => {
        return "Not Found"
});}
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(hypixelToken);
var loadUser = async (client,userid) => {/*讀取用戶檔案*/let dbo =client.db("mydb"),id = userid,query = { "id": id };let user = await dbo.collection("users").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeUser(client,id,data) {/*寫入用戶檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("users").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("users").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}
var loadGuild = async(client,guildid) => {/*讀取公會檔案*/let dbo =client.db("mydb"),id = guildid,query = { "id": id };let user = await dbo.collection("guilds").find(query).toArray();if(user[0] === undefined) return false;user = user[0][id];return user}
function writeGuild(client,id,data) {/*寫入公會檔案*/let dbo =client.db("mydb"),query = { [id]: Object };let user = dbo.collection("guilds").find(query).toArray();var myquery = { "id": id };user[id] = data;var newvalues = {$set: user};dbo.collection("guilds").updateOne(myquery, newvalues, function(err,res) {;if(err) return err;})}

const disbut = require('discord-buttons');

module.exports = {
    "mc": {
        fun: async function (bot, message, p,clientDB,language,ag, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(!ag[0]) return message.channel.send("❌請填入ID")
            const id = await getId(ag[0])
            if(id === "Not Found") return message.channel.send("❌找不到該玩家")
            if(!id) return message.channel.send("❌找不到該玩家")
            let mc_user = new Discord.MessageEmbed()
            .setTitle(ag[0]+" 資訊")
            .addField("UUID",id)
            .setThumbnail(`https://visage.surgeplay.com/bust/${id}`)
            message.channel.send(mc_user)
        }
    },
    "mc-user": {
        fun: async function (bot, message, p,clientDB,language,ag, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(!ag[0]) return message.channel.send("❌請填入ID")
            const id = await getId(ag[0])
            if(id === "Not Found") return message.channel.send("❌找不到該玩家")
            if(!id) return message.channel.send("❌找不到該玩家")
            let mc_user = new Discord.MessageEmbed()
            .setTitle(ag[0]+" 資訊")
            .addField("UUID",id)
            .setThumbnail(`https://visage.surgeplay.com/bust/${id}`)
            message.channel.send(mc_user)
        }
    },
    "mc-hypixel": {
        fun: async function (bot, message, p,clientDB,language,ag, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(!ag[0]) return message.channel.send("❌請填入ID")
            const id = await getId(ag[0])
            if(id === "Not Found") return message.channel.send("❌找不到該玩家")
            if(!id) return message.channel.send("❌找不到該玩家")
            hypixel.getPlayer(id).then(user => {
                let club = "឵ "
                if(user.socialMedia.length === 0) {club = "無"}
                for(let i = 0; i < user.socialMedia.length ; i++) {
                    let media = user.socialMedia
                    if(media.id) {
                       club = `${club} ${media[i].name}: ${media[i].id}\n`
                    }else{
                        club = `${club} ${media[i].name}: [[Link]](${media[i].link})\n`
                    }
                }
                let onl = "",gui ="",langes=""
                if(user.userLanguage) {
                    langes = user.userLanguage
                    switch (langes) {
                        case "ENGLISH":
                            langes = "🇺🇸 英文"
                            break;
                        case "CHINESE_TRADITIONAL":
                            langes = "🇹🇼 繁體中文"
                            break;
                        case "CHINESE_SIMPLIFIED":
                            langes = "🇨🇳 簡體中文"
                            break;
                    }
                }
                if(user.guild) {
                   gui = `[${guild.level}] ${guild.name}`
                }else{gui = "無"}
                if(user.isOnline) {
                    onl = "<a:online:772101451463393330:>"
                }else{onl = "<a:offline:772101451266129920>"}
                /*let str= JSON.stringify(user);
                fs.writeFileSync("./mcuser.json",str)*/
                let Hyp = new Discord.MessageEmbed()
                .setTitle("Hypixel 玩家狀態")
                .setDescription(`${onl} [${user.rank}] ${user.nickname}\n${user.uuid}`)
                .setThumbnail(`https://visage.surgeplay.com/bust/${id}`)
                .addField("等級",user.level,true)
                .addField("成就點數",user.achievementPoints,true)
                .addField("人品值",user.karma,true)
                .addField("常用版本",user.mcVersion,true)
                .addField("個人社群", club ,true)
                .addField("所屬公會", gui ,true)
                .setFooter(`語言: ${langes} \n首次上線: ${new Date(user.firstLogin).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei',hour12: false})}\n最後上線: ${new Date(user.lastLogout).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei',hour12: false})}`)
                message.channel.send(Hyp)
            }).catch(error => {
                message.channel.send("❌發生錯誤!" +error)
            })
        }
    },
    "mc-server": {
        description: "麥塊指令",
        fun: async function (bot, message, p,clientDB,language,ag, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (!message.guild) return message.channel.send(l.error.No_DM);
            if (!ag[0]) return message.channel.send(k.mc.typeIP)
            if (!ag[1]) { var part = 25565} else {
                var part = parseInt(ag[1]);
                }
            message.channel.send("🔄Loading... Please wait.").then((ms) => {
            util.status(ag[0] ,{enableSRV: true,port: part,pingTimeout: 6000}) // port is optional, defaults to 25565
                .then((reponse) => {
                    ms.edit("`Java Server`")
                    let word = reponse.description.descriptionText.replace("§0","").replace("§1","").replace("§2","").replace("§3","").replace("§4","").replace("§5","").replace("§6","").replace("§7","").replace("§8","").replace("§9","").replace("§a","").replace("§b","".replace("§c","")).replace("§d","").replace("§e","").replace("§f","").replace("§k","").replace("§l","").replace("§m","").replace("§n","").replace("§o","").replace("§f","").replace("§7","").replace("§8","")
                    const mcEmbed = new Discord.MessageEmbed()
                    .setTitle(k.mc.title +"\n"+reponse.srvRecord.host+":"+reponse.srvRecord.port)
                    .setDescription(word)
                    .addField('IP: ', reponse.host,true)
                    .addField(k.mc.version, reponse.version,true)
                    .addField(k.mc.online + " / "+k.mc.maxplayer,`[ ${reponse.onlinePlayers} / ${reponse.maxPlayers} ]`,false)
                    let im = null
                    if(reponse.modInfo != null) {
                        if(reponse.modInfo.modList.length != 0) {
                            let modes =reponse.modInfo.modList.map(p=> p).sort((a,b) => b.name = a.name)    
                        mcEmbed.addField(k.mc.mod, modes)
                    }}
                    if(reponse.samplePlayers != null) {
                    if(reponse.samplePlayers.length != 0) {
                        let plays =reponse.samplePlayers.map(p=> p.name).sort((a,b) => b.name = a.name).join("\n")
                        let plas = plays.toString().replace("§0","").replace("§1","").replace("§2","").replace("§3","").replace("§4","").replace("§5","").replace("§6","").replace("§7","").replace("§8","").replace("§9","").replace("§a","").replace("§b","".replace("§c","")).replace("§d","").replace("§e","").replace("§f","").replace("§k","").replace("§l","").replace("§m","").replace("§n","").replace("§o","").replace("§f","").replace("§7","").replace("§8","")
                        mcEmbed.addField("玩家", plas)
                    }}
                    if(reponse.favicon) {image.outputFile(reponse.favicon,'./cache/mc.png').then((im2) => {
                        im = im2
                    const attachment = new Discord.MessageAttachment(im , "mc.png");    
                    mcEmbed.attachFiles(attachment)
                    mcEmbed.setThumbnail('attachment://' + "mc.png")
                    })}
                setTimeout(() => {
                  ms.edit(mcEmbed)}, 100);
                }).catch((error) => {
                    ms.edit(k.mc.notfound+"\n🔄Try loading BE server... Please wait!"+"\n⚠Loaded Java server error: `"+ error+"`")
                    if (!ag[1]) { var part = 19132} else {
                        var part = parseInt(ag[1]);
                    }
                    let er = "\n⚠Loaded Java server error: `"+ error+"`"
                    util.statusBedrock(ag[0] , {enableSRV: true,port: part,pingTimeout: 40000})
                    .then((reponse) => {
                        ms.edit("`Bedrock Server`")
                        const mcEmbed = new Discord.MessageEmbed()
                        .setTitle(k.mc.title +"\n"+reponse.host+":"+reponse.port)
                        .addField('IP:', reponse.host,true)
                        .addField(k.mc.version, reponse.edition ,true)
                        .addField(k.mc.online + " / "+k.mc.maxplayer,`[ ${reponse.onlinePlayers} / ${reponse.maxPlayers} ]`,false)
                        let word2 = null;
                        if(reponse.motdLine1 != null) {word2 = reponse.motdLine1.descriptionText.replace("§0","").replace("§1","").replace("§2","").replace("§3","").replace("§4","").replace("§5","").replace("§6","").replace("§7","").replace("§8","").replace("§9","").replace("§a","").replace("§b","".replace("§c","")).replace("§d","").replace("§e","").replace("§f","").replace("§k","").replace("§l","").replace("§m","").replace("§n","").replace("§o","").replace("§f","").replace("§7","").replace("§8","")}
                        if(reponse.motdLine2 != null) {word2 = word2 +"\n"+ reponse.motdLine2.descriptionText.replace("§0","").replace("§1","").replace("§2","").replace("§3","").replace("§4","").replace("§5","").replace("§6","").replace("§7","").replace("§8","").replace("§9","").replace("§a","").replace("§b","".replace("§c","")).replace("§d","").replace("§e","").replace("§f","").replace("§k","").replace("§l","").replace("§m","").replace("§n","").replace("§o","").replace("§f","").replace("§7","").replace("§8","")}
                        mcEmbed.setDescription(word2)
                    setTimeout(() => {
                      ms.edit(mcEmbed)}, 1000);
                    }).catch((error) => {
                    ms.edit(k.mc.notfound +er+"\n⚠Loaded BE server error: `"+ error +"`")
                    }
                )})
            })
            }
    },
    "rps": {
        description: "猜拳",
        fun: function (bot, message, p,clientDB,language,ag, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            message.channel.send("⚠注意! 此指令即將被遺棄.\n請使用 `rps2 [$]` 來玩新版猜拳指令.")
            if (ag[0] == "r") {
                rock(bot, message, ag ,language)
            } else if (ag[0] == "石頭") {
                rock(bot, message, ag ,language)
            } else if (ag[0] == "p") {
                paper(bot, message, ag ,language)
            } else if (ag[0] == "布") {
                paper(bot, message, ag ,language)
            } else if (ag[0] == "s") {
                seasen(bot, message, ag, language)
            } else if (ag[0] == "剪刀") {
                seasen(bot, message, ag ,language)
            } else {
                rps(bot, message, ag ,language)
            }
        }
    },
    "rps2": {
        description: "猜拳",
        fun: function (bot, message, p,clientDB,language,args, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let help = new Discord.MessageEmbed().setTitle(k.rps2.title).setDescription(k.word.typemoney + "\n`" + p + "rps2 [money]`").addField(k.rps2.rule.a, k.rps2.rule.f)
            if (args[0] == null || args[0] == "") return message.channel.send(help)
            if (isNaN(args[0])) return message.channel.send(help)
            if (args[0] < 1) return message.channel.send(l.error.type_positive)
            if (args[0] > 2000) return message.channel.send(l.error.less_then + "2000!")
            if (Math.round(args[0]) != args[0]) return message.channel.send(l.error.type_integer)
            loadUser(clientDB,message.author.id).then((user) => {
                if (user === false) { return message.channel.send(l.error.Try_again) }
                if (time.has(message.author.id)) return message.channel.send(k.word.hasgame)
                if (user.money < args[0]) return message.channel.send(l.error.No_enough_monery)
                let win = 0;
                let wincount = 0;
                let wintop = 0;
                let money = 0;
                let scissors = "https://cdn.discordapp.com/attachments/611040945495998464/736802353298276402/289100043sq324qp55p7.gif";
                let paper = "https://cdn.discordapp.com/attachments/611040945495998464/736802363691499570/D8WgK8I.png";
                let rock = "https://cdn.discordapp.com/attachments/611040945495998464/736802360583651338/1485575148_1459752220_2015-11-14-16-43-56-21364000.gif";
                let guess = new Discord.MessageEmbed().setTitle(k.rps2.rps).setDescription("✌✊🖐").setFooter(k.rps2.choose + message.author.username).setTimestamp().setImage('https://cdn.discordapp.com/attachments/611040945495998464/736510734988476416/ezgif.com-gif-maker.gif')
                time.add(message.author.id);
                let buttonS = new disbut.MessageButton(),buttonR = new disbut.MessageButton(),buttonP = new disbut.MessageButton()
                buttonS.setStyle('grey').setEmoji("✌").setID("S")
                buttonR.setStyle('grey').setEmoji("✊").setID("R")
                buttonP.setStyle('grey').setEmoji("🖐").setID("P")
                let row = new disbut.MessageActionRow().addComponents(buttonS,buttonR,buttonP)
                message.channel.send(guess,row).then((ms) => {
                        rps_main(ms)
                    })
                    ///////////////////////////////////
                    function ping(reply) {
                        bot.api.interactions(reply.discordID,reply.token).callback.post({
                            data: {
                            type: 6
                        }})
                    }
                    //////////////////////////////////
                function rps_main(ms) {
                        const filter= (button) => {
                            return ["S","R","P"].includes(button.id) && button.clicker.id === message.author.id
                        }
                    ms.awaitButtons(filter, { max: 1, time: 20000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();
                            ping(reaction)
                            if (reaction.id == "S") { ////////////////////////////////////////////////////
                                let rond = Math.floor(Math.random() * 3) + 1
                                if (rond == "1") { //剪刀
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.seasen + k.rps2.state.tie).setDescription(message.author.username + ` ✌ vs ✌ ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(scissors).setFooter("[Tie] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "2") { //石頭
                                    win = 0;
                                    money = money + args[0] * 1.5 * -1
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.seasen + k.rps2.state.lose + k.rps2.inte.lose).setDescription(message.author.username + ` ✌ vs ✊ ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(rock).setFooter("[Lose] [" + win + " | " + wincount + "] [" + money + "$]  " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "3") { //布
                                    win++
                                    wincount++
                                    if (win > wintop) wintop++
                                        if (win <= 3) { money = money + args[0] * win } else { money = money + args[0] * 3 }
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.seasen + k.rps2.state.win + ' [ ' + win + k.rps2.inte.win).setDescription(message.author.username + ` ✌ vs 🖐  ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(paper).setFooter("[Win] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                }
                            } else if (reaction.id == "R") { //////////////////////////////////////////////
                                let rond = Math.floor(Math.random() * 3) + 1
                                if (rond == "1") { //剪刀
                                    win++
                                    wincount++
                                    if (win > wintop) wintop++
                                        if (win <= 3) { money = money + args[0] * win } else { money = money + args[0] * 3 }
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.rock + k.rps2.state.win + ' [ ' + win + k.rps2.inte.win).setDescription(message.author.username + ` ✊ vs ✌ ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(scissors).setFooter("[Win] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "2") { //石頭
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.rock + k.rps2.state.tie).setDescription(message.author.username + ` ✊ vs ✊  ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(rock).setFooter("[Tie] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "3") { //布
                                    win = 0;
                                    money = money + args[0] * 1.5 * -1
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.rock + k.rps2.state.lose + k.rps2.inte.lose).setDescription(message.author.username + ` ✊ vs 🖐 ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(paper).setFooter("[Lose] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                }
                            } else if (reaction.id == "P") { ///////////////////////////////////////////////
                                let rond = Math.floor(Math.random() * 3) + 1
                                if (rond == "1") { //剪刀
                                    win = 0;
                                    money = money + args[0] * 1.5 * -1
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.paper + k.rps2.state.lose + k.rps2.inte.lose).setDescription(message.author.username + ` 🖐 vs ✌ ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(scissors).setFooter("[Lose] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "2") { //石頭
                                    win++
                                    wincount++
                                    if (win > wintop) wintop++
                                        if (win <= 3) { money = money + args[0] * win } else { money = money + args[0] * 3 }
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.paper + k.rps2.state.win + ' [ ' + win + k.rps2.inte.win).setDescription(message.author.username + `🖐 vs ✊ ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(rock).setFooter("[Win] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                } else if (rond == "3") { //布
                                    let rpsEmbed = new Discord.MessageEmbed().setColor('#2d9af8').setTitle(message.author.username + k.rps2.out.paper + k.rps2.state.tie).setDescription(message.author.username + ` 🖐 vs 🖐  ${l.word.chino}\n\n` + k.rps2.keepplay).setImage(paper).setFooter("[Tie] [" + win + " | " + wincount + "] [" + money + "$] " + k.rps2.player + message.author.username).setTimestamp()
                                    let buttonT = new disbut.MessageButton(),buttonF = new disbut.MessageButton()
                                    buttonT.setStyle('green').setEmoji("✔").setID("S")
                                    buttonF.setStyle('red').setEmoji("❌").setID("R")
                                    let row2 = new disbut.MessageActionRow().addComponents(buttonT,buttonF)
                                    ms.edit(rpsEmbed,row2);                                    
                                    playagain(ms)
                                }
                            }
                        }).catch(() => {
                            let guess = new Discord.MessageEmbed().setTitle(k.rps2.rps).setDescription(k.word.slowchoose).setFooter("🔰 " + k.rps2.player + message.author.username).setTimestamp()
                            ms.edit(guess)
                            setTimeout(() => { rps_over(ms) }, 2000);
                            if (ms.guild.me.hasPermission(['MANAGE_MESSAGES'])) ms.reactions.removeAll()
                        })
                }

                function playagain(ms) {
                    const filter= (button) => {
                        return ['S','R'].includes(button.id) && button.clicker.id === message.author.id
                    }
                    ms.awaitButtons(filter, { max: 1, time: 11000, errors: ['time'] })
                        .then((ms2) => {
                            const reaction = ms2.first()
                            ping(reaction)
                            if (reaction.id === "S") {
                                let guess = new Discord.MessageEmbed().setTitle(k.rps2.rps).setDescription("✌✊🖐").setFooter(k.rps2.choose + message.author.username).setTimestamp().setImage('https://cdn.discordapp.com/attachments/611040945495998464/736510734988476416/ezgif.com-gif-maker.gif')
                                let buttonS = new disbut.MessageButton(),buttonR = new disbut.MessageButton(),buttonP = new disbut.MessageButton()
                                buttonS.setStyle('grey').setEmoji("✌").setID("S")
                                buttonR.setStyle('grey').setEmoji("✊").setID("R")
                                buttonP.setStyle('grey').setEmoji("🖐").setID("P")
                                let row = new disbut.MessageActionRow().addComponents(buttonS,buttonR,buttonP)
                                ms.edit(guess,row)
                                setTimeout(() => { rps_main(ms) }, 100);
                            } else if (reaction.id === "R") {
                                setTimeout(() => { rps_over(ms) }, 100);
                            }
                        }).catch(() => {
                            setTimeout(() => { rps_over(ms) }, 500);
                        })
                }

                function rps_over(ms) {
                    let how = null;
                    if (money < 0) { how = k.rps2.gameover.lose + money + "$" } else if (money == 0) { how = k.rps2.gameover.happyPlay } else { how = k.rps2.gameover.win + money + "$" }
                    let over = new Discord.MessageEmbed().setTitle(k.rps2.gameover.gameover).setDescription(how + "\n\n" + k.rps2.gameover.allwin + wincount + "\n" + k.rps2.gameover.wincount + wintop + "\n" + k.rps2.gameover.lastwin + win).setImage('https://cdn.discordapp.com/attachments/611040945495998464/789798895218720778/82021809_p0_master1200.jpg').setFooter(k.rps2.gameover.HP.happy + message.author.username + k.rps2.gameover.HP.play).setTimestamp()
                    ms.edit(over,null)
                    time.delete(message.author.id);
                    user.money = parseInt(user.money) + money;
                    writeUser(clientDB,message.author.id,user)
                }
            })
        }
    },
    "guess": {
        description: "猜拳",
        fun: function (bot, message, p,clientDB,language,args, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (args[0] == null || args[0] == "") return message.channel.send(k.word.typemoney)
            if (isNaN(args[0])) return message.channel.send(k.word.typemoney)
            if (args[0] < 1) return message.channel.send(l.error.type_positive)
            if (args[0] > 8000) return message.channel.send(l.error.less_then + "8000!")
            if (Math.round(args[0]) != args[0]) return message.channel.send(l.error.type_integer)
            loadUser(clientDB,message.author.id).then((user) => {
                if (user === false) { return message.channel.send(l.error.Try_again) }
                if (user.money < args[0]) return message.channel.send(l.error.No_enough_monery)
                let guess = new Discord.MessageEmbed().setTitle(k.door.game).setDescription("🚪🚪🚪").setFooter(k.door.choose).setTimestamp()
                let button1 = new disbut.MessageButton(),button2 = new disbut.MessageButton(),button3 = new disbut.MessageButton()
                button1.setStyle('grey').setEmoji("1️⃣").setID("A")
                button2.setStyle('grey').setEmoji("2️⃣").setID("B")
                button3.setStyle('grey').setEmoji("3️⃣").setID("C")
                let row = new disbut.MessageActionRow().addComponents(button1,button2,button3)
                message.channel.send(guess,row).then((ms) => {
                    function ping(reply) {
                        bot.api.interactions(reply.discordID,reply.token).callback.post({
                            data: {
                            type: 6
                        }})
                    }
                    const filter= (button) => {
                        return ['A','B','C'].includes(button.id) && button.clicker.id === message.author.id
                    }
                    ms.awaitButtons(filter, { max: 1, time: 10000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first()
                            ping(reaction)
                            let math = Math.floor(Math.random() * 5) + 1
                            if (math == "1" || math == "2") {
                                let gu1 = new Discord.MessageEmbed().setTitle(k.door.game + " [Nothing]").setDescription(k.door.open + " \n...\n" + k.door.event.nothing).setTimestamp().setFooter("🚪[" + k.door.give + "]")
                                return ms.edit(gu1,null)
                            } else if (math == "3") {
                                let gu1 = new Discord.MessageEmbed().setTitle(k.door.game + " [x1.2]").setDescription(k.door.open + " \n" + k.door.event.bydoor).setTimestamp().setFooter("🚪[" + k.door.give + " " + args[0] * 1 + " $]")
                                ms.edit(gu1,null)
                                user.money = parseInt(user.money) + parseInt(args[0] * 1);
                                writeUser(clientDB,message.author.id,user)
                            } else if (math == "4") {
                                let gu1 = new Discord.MessageEmbed().setTitle(k.door.game + " [x1.5]").setDescription(k.door.open + " \n" + k.door.event.cashbox).setTimestamp().setFooter("🚪[" + k.door.give + " " + args[0] * 1.5 + " $]")
                                ms.edit(gu1,null)
                                user.money = parseInt(user.money) + parseInt(args[0] * 1.5);
                                writeUser(clientDB,message.author.id,user)
                            } else if (math == "5" || math == "6") {
                                let gu1 = new Discord.MessageEmbed().setTitle(k.door.game + " [Monster -x2]").setDescription(k.door.open + "\n...\n" + k.door.event.monster).setTimestamp().setFooter("🚪[" + k.door.lose + args[0] * 2 * -1 + " $]")
                                ms.edit(gu1,null)
                                user.money = parseInt(user.money) + parseInt(args[0] * 3 * -1);
                                writeUser(clientDB,message.author.id,user)
                            }
                        }).catch(() => {
                            let guess = new Discord.MessageEmbed().setTitle(k.door.game).setDescription(k.word.slowchoose).setFooter("🚪").setTimestamp()
                            return ms.edit(guess,null);
                        })
                })
            })
        }
    },
    "math": {
        description: "隨機數字",
        fun: function (bot, message, p,clientDB,language,args,number, ...text) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if(isNaN(number)) {
                message.channel.send(k.math.type + Math.round(Math.random() * 7) + k.math.dot)
            }else{
                if(number > 1000000) {number = 1000000}
                if(number < 0 && number < -1000000) {number = -1000000}
            message.channel.send(k.math.type + Math.round(Math.random() * number) + k.math.dot)
            }
        }
    },
    "count": {
        description: "隨機數字",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            setTimeout(() => {
                if (/[a-z]+/.test(ag.toString())) { return message.channel.send(k.math.hastext) }
                try { eval(ag.join(' ')) } catch (error) { return message.channel.send(k.math.cantcount) }
                setTimeout(() => { message.channel.send("📝 " + eval(ag.join(' '))) }, 300);
            }, 100);
        }
    },
    "slot": {
        description: "拉霸機",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (args[0] == null || args[0] == "") return message.channel.send(l.error.type_number)
            if (isNaN(args[0])) return message.channel.send(k.slot.help)
            if (args[0] < 1) return message.channel.send(l.error.type_positive)
            if (args[0] > 8000) return message.channel.send(l.error.less_then+"8000!")
            if (Math.round(args[0]) != args[0]) return message.channel.send(l.error.type_integer)
            let spin = "<a:spin:787592087809687554>";
            let spin2 = "<a:spin2:787592097619509268>";
            let sarray = [":coffee:", ":tropical_drink:", ":custard:", ":cake:", ":pancakes:"];
            let rarray = []
            for (let i = 0; i < 3; i++) {
                rarray[i] = Math.floor(Math.random() * 5)
            }

            let rrarray = [];
            let text = [spin, spin, spin]
            if (time.has(message.author.id)) return message.channel.send(k.slot.speed)
            if (server.has(message.guild.id)) return message.channel.send(k.slot.to_maney)
            loadUser(clientDB,message.author.id).then((user) => {
                if (user === false) {
               return message.channel.send(l.error.Run_Command_error)}
            if (user.money <  parseInt(args[0])) return message.channel.send(l.error.No_enough_monery)
            time.add(message.author.id);
            server.add(message.guild.id);
            for (let i = 0; i < 3; i++) {
                rrarray[i] = sarray[rarray[i]]
            }
            let slot = new Discord.MessageEmbed().setTitle(" ==🎰==").setDescription(text.join("")).setColor("#ff53d0").setFooter(message.author.username, message.author.avatarURL()).setTimestamp()
            message.channel.send(slot).then(async(ms) => {
                for (let i = 0; i < 3; i++) {
                    await sleep(1000).then(() => {
                    text[i] = rrarray[i]
                    slot2 = new Discord.MessageEmbed().setTitle(" ==🎰==").setDescription(text.join("")).setColor("#ff53d0").setFooter(message.author.username + k.slot.beat + parseInt(args[0]) + "$]", message.author.avatarURL()).setTimestamp();
                    ms.edit(slot2)
                    });
                }
                let money = 0;
                let side = "";
                let how = "";
                if (rarray[0] === rarray[1] && rarray[1] === rarray[2]) {
                    money = parseInt(args[0]) * 3;
                    side = "win"
                } else if (rarray[0] === rarray[1] || rarray[1] === rarray[2] || rarray[0] === rarray[2] || rarray[1] === rarray[0]) {
                    money = parseInt(args[0]) * 1.5;
                    side = "win"
                } else {
                    money = parseInt(args[0]) * 2 * -1;
                    side = "lose"
                }
                if (side === "win") { how = k.slot.win } else { how = k.slot.lose }
                user.money = user.money + money;
                writeUser(clientDB,message.author.id,user)
                slot2 = new Discord.MessageEmbed().setTitle(" ==🎰== [" + side + "]").setDescription(text.join("")).setColor("#ff53d0").setFooter(message.author.username + k.slot.beat + args[0] + "$] [" + how + " " + money + "$] ", message.author.avatarURL()).setTimestamp();
                ms.edit(slot2).then(() => {
                    time.delete(message.author.id);
                    server.delete(message.guild.id);
                });
            })})
        }
    },
    "love": {
        description: "比率",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let member = null,member2 = null
            let owo = null;
            let owo2 = null,owo3 = null
            let user=bot.users.cache.get(args[0])
            let user2=bot.users.cache.get(args[1])
            if (message.mentions.users.size) { 
                member = message.mentions.users.first()
                if(message.mentions.users.array()[1]) {
                    member2 = message.mentions.users.array()[1]
                }
             } else if (args[0] != null) {
                 if(!isNaN(args[0])) {
                if (user) { member = user }else { member = message.author }
                 }else{
                     if(message.guild.members.cache.find(m => m.displayName.includes(args[0]))) {
                     member = message.guild.members.cache.find(m => m.displayName.includes(args[0])).user}}
                 if(!isNaN(args[1])) {
                    if (user2) { member2 = user2 }
                     }else{
                        if(message.guild.members.cache.find(m => m.displayName.includes(args[1]))) {
                            member2 = message.guild.members.cache.find(m => m.displayName.includes(args[1])).user}}
            } else { member = message.author }
            if (member.id != message.author.id) {
                owo = member.username;
                owo2 = k.love.love
            } else {
                if(member2) {
                    owo = member.username;
                    owo2 = k.love.love   
                }else{
                owo = l.word.chino;
                owo2 = k.love.fbi}
            }
            if(member2) {
                owo3 = member2.username;
            }else{owo3 = message.author.username}
            let f = Math.floor(Math.random() * 100)
            let good1 = (Math.floor(f / 10));
            let bad1 = 10 - good1;
            let good = "💖";
            let bad = "💔";
            let good2 = "";
            let bad2 = "";
            for (i = 0; i < good1; i++) {
                good2 = good + good2
            }
            for (i = 0; i < bad1; i++) {
                bad2 = bad + bad2
            }
            let loveEmbed1 = new Discord.MessageEmbed()
                .setColor('#2d9af8').setTitle(owo + ` ${k.love.like} ` + owo3 + ` ${k.love.degree} ` + f + "%").setDescription((good2) + (bad2)).setDescription((good2) + (bad2)).setFooter(owo2).setTimestamp()
            return message.channel.send(loveEmbed1);

        }
    },
    "gay": {
        description: "比率",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let member = null;
            let user=bot.users.cache.get(args[0])
            if (message.mentions.users.size) { member = message.mentions.users.first() } else if (args[0] != null) {
                if(!isNaN(args[0])) {
                    if (user) { member = user }else { member = message.author }
                     }else{
                        if(message.guild.members.cache.find(m => m.displayName.includes(args[0]))) {
                            member = message.guild.members.cache.find(m => m.displayName.includes(args[0])).user}}
            } else { member = message.author }
            if (member) {
                let f = Math.floor(Math.random() * 100)
                let good1 = (Math.floor(f / 10));
                let bad1 = 10 - good1;
                let good = "🏳️‍🌈";
                let bad = "⬛";
                let good2 = "";
                let bad2 = "";
                for (i = 0; i < good1; i++) {
                    good2 = good + good2
                }
                for (i = 0; i < bad1; i++) {
                    bad2 = bad + bad2
                }
                let loveEmbed1 = new Discord.MessageEmbed()
                    .setColor('#2d9af8').setTitle(member.username + ` ${k.gay.degree} ` + f + "%").setDescription((good2) + (bad2)).setDescription((good2) + (bad2)).setFooter("🏳️‍🌈🟥🟧🟨🟩🟦🟪").setTimestamp()
                return message.channel.send(loveEmbed1);
            }
        }
    },
    "pick": {
        description: "是否",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            let f = Math.floor(Math.random() * 6)
            let re = Math.floor(Math.random() * 100)
            if (f == 1 || f == 2 || f == 0) {
                let pickEmbed = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle(ag)
                    .setDescription(`${re}% `+k.pick.yes)
                message.channel.send(pickEmbed);
            } else if (f == 5 || f == 6) {
                let pickEmbed2 = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle(ag)
                    .setDescription(`${re}% `+k.pick.no)
                message.channel.send(pickEmbed2);
            } else if (f == 3) {
                let pickEmbed2 = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle(ag)
                    .setDescription(k.pick.maybe_yes)
                message.channel.send(pickEmbed2);
            } else if (f == 4) {
                let pickEmbed2 = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle(ag)
                    .setDescription(k.pick.maybe_no)
                message.channel.send(pickEmbed2);
            }
        }
    },
    "osucard": {
        description: "OSU!",
        fun: function(bot, message, p, ag) {
            let l = lan.zh_TW;
            let k = gameX.zh_TW
            if (ag == "" || ag == null) return message.channel.send(k.osu.typename)
            let pickEmbed = new Discord.MessageEmbed()
                .setTitle(ag + k.osu.grade)
                .setImage("https://lemmmy.pw/osusig/sig.php?colour=hexf16ea9&uname=" + ag + "&mode=0&pp=2&removeavmargin&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar&xpbarhex")
            message.channel.send(pickEmbed);

        }
    },
    "osu": {
        description: "OSU!",
        fun: function (bot, message, p,clientDB,language,args, ...ag) { 
            let l = lan.zh_TW,k = gameX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;k = gameX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;k = gameX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;k = gameX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;k = gameX.en_US}
            if (ag == "" || ag == null) return message.channel.send(k.osu.typename)
            osuApi.getUser({ u: ag }).then(user => {
                let y = Math.round((user.secondsPlayed) / 3600 / 24)
                let h = Math.round((user.secondsPlayed - y * 24 * 3600) / 3600)
                let m = Math.round((user.secondsPlayed - y * 24 * 3600 - h * 3600) / 60)
                let s = Math.round((user.secondsPlayed - y * 24 * 3600 - h * 3600 - m * 60))
                let pickEmbed = new Discord.MessageEmbed()
                    .setTitle(user.name + " | " + user.id + " | Level " + Math.floor(user.level * 10) / 10)
                    .setDescription("SSH - " + user.counts.SSH + " | " + "SS - " + user.counts.SS + " | " + "SH - " + user.counts.SH + " | " + "S - " + user.counts.S + " | " + "A - " + user.counts.A)
                    .setURL("https://osu.ppy.sh/users/" + user.id)
                    .setColor("#ff53d0")
                    .addField(k.osu.score.country, user.country)
                    .addField(k.osu.score.scores, user.scores.ranked + " | " + user.scores.total)
                    .addField(k.osu.score.playtime, y + `${l.date.day} ` + h + `${l.time.hour} ` + m + `${l.time.minute}` + s + `${l.time.second}`)
                    .addField(k.osu.score.playtimes, user.counts.plays)
                    .addField(k.osu.score.rank, k.osu.score.global + user.pp.rank + " | " + k.osu.score.domestic + user.pp.countryRank + " | " + Math.round(user.pp.raw) + "pp")
                    .addField(k.osu.score.acc, Math.floor(user.accuracy * 100) / 100 + " %")
                    .setFooter(k.osu.score.joinTime + user.joinDate.getUTCFullYear(8) + "/" + user.joinDate.getUTCMonth(8) + "/" + user.joinDate.getUTCDate(8) + " • " + user.joinDate.getUTCHours(8) + l.time.hour + user.joinDate.getUTCMinutes(8) + l.time.minute + user.joinDate.getUTCSeconds(8) + l.time.minute)
                    .setTimestamp()
                    .setImage("https://lemmmy.pw/osusig/sig.php?colour=hexf16ea9&uname=" + ag + "&mode=0&pp=2&removeavmargin&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar&xpbarhex")
                message.channel.send(pickEmbed);
            }).catch((err) => { message.channel.send(k.osu.not_found + " ||`" + err + "`||") })
        }
    }
}

async function rock(bot, message) {
    let rpsEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setTitle(message.author.username + '  你出了石頭!')
        .setDescription('剪刀 石頭 布!!')
        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736510734988476416/ezgif.com-gif-maker.gif')
    message.channel.send(rpsEmbed).then((msg) => {
        setTimeout(function() {
            switch (Math.floor(Math.random() * 3 + 1)) {
                case 1: //剪刀
                    let rpsEmbed21 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802353298276402/289100043sq324qp55p7.gif')
                        .setTitle(message.author.username + '你贏了!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed21);
                case 2: //石頭
                    let rpsEmbed22 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802360583651338/1485575148_1459752220_2015-11-14-16-43-56-21364000.gif')
                        .setTitle(message.author.username + '平手!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed22);
                case 3: //布
                    let rpsEmbed23 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802363691499570/D8WgK8I.png')
                        .setTitle(message.author.username + '你輸了:((')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed23);
            }
        }, 2500)
    })
}
async function paper(bot, message) {
    let rpsEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setTitle(message.author.username + '  你出了布!')
        .setDescription('剪刀 石頭 布!!')
        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736510734988476416/ezgif.com-gif-maker.gif')
    message.channel.send(rpsEmbed).then((msg) => {
        setTimeout(function() {
            switch (Math.floor(Math.random() * 3 + 1)) {
                case 1: //剪刀
                    let rpsEmbed31 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802353298276402/289100043sq324qp55p7.gif')
                        .setTitle(message.author.username + '你輸了:((')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed31);
                case 2: //石頭
                    let rpsEmbed32 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802360583651338/1485575148_1459752220_2015-11-14-16-43-56-21364000.gif')
                        .setTitle(message.author.username + '你贏了!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed32);
                case 3: //布
                    let rpsEmbed33 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802363691499570/D8WgK8I.png')
                        .setTitle(message.author.username + '平手!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed33);
            }
        }, 2500)
    })
}
async function seasen(bot, message) {
    let rpsEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setTitle(message.author.username + '  你出了剪刀!')
        .setDescription('剪刀 石頭 布!!')
        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736510734988476416/ezgif.com-gif-maker.gif')
    message.channel.send(rpsEmbed).then((msg) => {
        setTimeout(function() {
            switch (Math.floor(Math.random() * 3 + 1)) {
                case 1: //剪刀
                    let rpsEmbed11 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802353298276402/289100043sq324qp55p7.gif')
                        .setTitle(message.author.username + '平手!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed11);
                case 2: //石頭
                    let rpsEmbed12 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802360583651338/1485575148_1459752220_2015-11-14-16-43-56-21364000.gif')
                        .setTitle(message.author.username + '你輸了:((')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed12);
                case 3: //布
                    let rpsEmbed13 = new Discord.MessageEmbed()
                        .setColor('#2d9af8')
                        .setImage('https://cdn.discordapp.com/attachments/611040945495998464/736802363691499570/D8WgK8I.png')
                        .setTitle(message.author.username + '你贏了!!')
                        .setDescription('再玩一次?請再打一次指令!')
                    return msg.edit(rpsEmbed13);
            }
        }, 2500)
    })
}
async function rps(bot, message) {
    message.channel.send("請打 `cr!rps [剪刀/石頭/布]`")
}