const Discord = require("discord.js")
const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMTQwODc5NDk0ODczMDk2MSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAyOTg3NjE1fQ.x0l6rjH6HivY0g39ibccJTh6r3knw5JCV-LZARnfg9U", { webhookAuth: 'ChinoBot' });
const lan = require('../commands/lang.json');
const adminX = require('../language/admin.json');
module.exports = {
    "clear": {
        description: "測試",
        fun: function(bot, message, prefix , language, args) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP}else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            if (!message.guild) return message.channel.send(l.error.No_DM);
            if (args[0] == null) { message.channel.send(l.error.type_number) } else {
                if(args[0] < 0) return message.channel.send(l.error.type_positive)
                if(args[0] > 100) return message.channel.send(l.error.less_then+ "100")
                if(isNaN(args[0])) return message.channel.send(l.error.type_number)
                if(!args[0].indexOf("-")) return message.channel.send(l.error.type_positive)
                if(!args[0].indexOf(".")) return message.channel.send(l.error.type_positive)
                if(Math.floor(Math.floor(args[0]).toFixed(2)) <= 0) return message.channel.send(l.error.type_positive)
                if(Math.floor(Math.floor(args[0]).toFixed(2)) > 100) return message.channel.send(l.error.less_then+"100")
                let clear = Math.floor(Math.floor(args[0]).toFixed(2))
                if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
                    if (!message.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) { return message.channel.send(h.clear.No_perm) }
                    if (args > 19) {
                        message.channel.send(h.clear["20more"]).then((draw) => {
                            draw.react("✅").then(() => { draw.react("❌") })
                            const filter = (reaction, user) => {
                                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                            };
                            draw.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === '✅') {
                                        message.channel.bulkDelete(clear)
                                        message.channel.send(h.clear.moreDelete + clear + h.clear.messages);
                                    } else if (reaction.emoji.name === '❌') {
                                        draw.edit(h.clear.cancelDelete)
                                    }
                                }).catch(() => { draw.edit(h.clear.cancelDelete); })
                        })
                    } else {
                        message.delete()
                        message.channel.bulkDelete(clear)
                        message.channel.send(h.clear.Delete + clear + h.clear.messages);
                    }
                } else {
                    message.channel.send(l.error.No_Prem + l.prem.manage_messages + l.error.No_Prem2)
                }
            }
        }
    },
    "kick": {
        description: "測試",
        fun: function(bot, message, prefix , language, args) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP}else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            if (!message.guild) return message.channel.send(l.error.No_DM);
            if (message.member.hasPermission(['KICK_MEMBERS'])) {
                const user = message.mentions.users.first()
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.kick(`${h.kick.ByAdmin} ${member} ${h.kick.kick}`).then(() => {
                            message.channel.send(` ${user.tag} ${h.kick.kick} ${message.guild.name}!`);
                        }).catch(err => {
                            message.reply(`${h.kick.error.kick_error} ${message.guild.name} :(`)
                            console.log(err);
                        })
                    } else {
                        message.channel.send(l.error.Not_found_Member)
                    }
                } else {
                    message.channel.send(h.kick.error.mention)
                }
            } else {
                message.channel.send(`${l.error.No_Prem} ${l.prem.kick_members} ${l.error.No_Prem2}`)
            }
        }
    },
    "ban": {
        description: "測試",
        fun: function(bot, message, prefix , language, args) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP}else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            if (!message.guild) return message.channel.send(l.error.No_DM);
            if (message.member.hasPermission(['BAN_MEMBERS'])) {
                const user = message.mentions.users.first()
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.ban(`${h.ban.ByAdmin} ${member} ${h.ban.ban}!`).then(() => {
                            message.channel.send(`${h.ban.success} ${user.tag} ${h.ban.from} ${message.guild.name} ${h.ban.in}${h.ban.ban}!`);
                        }).catch(err => {
                            message.reply(h.ban.error.kick_error)
                            console.log(err);
                        })
                    } else {
                        message.channel.send(l.error.Not_found_Member)
                    }
                } else {
                    message.channel.send(h.ban.error.mention)
                }
            } else {
                message.channel.send(l.error.No_Prem + l.prem.ban_members + l.error.No_Prem2)
            }
        }
    },
    "vote": {
        description: "測試",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            if (!message.guild) return;
            let mention = []
            if(message.mentions.users.first()) {
                mention.push("<@"+message.mentions.users.first().id+"> ")
                ag= ag.join(" ").replace("<@!"+message.mentions.users.first().id+">","")
            }else if(message.mentions.roles.first()) {
                mention.push("<@&" + message.mentions.roles.first().id + "> ")
                ag= ag.join(" ").replace("<@&"+message.mentions.roles.first().id+">","")
            }else{
                ag = ag.join(" ")
            }
            setTimeout(() => {
                if(mention.length !== 0) {
                if (message.member.hasPermission(['MENTION_EVERYONE'])) {
                    message.channel.send(mention)
                }else{
                    return message.channel.send(l.error.No_Prem + l.prem.mention_everyone+l.error.No_Prem2)
                }}
                        let voteEmbed = new Discord.MessageEmbed()
                            .setColor('#2d9af8').setTitle(h.vote.vote).setDescription(ag).setFooter(h.vote.snd + message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 }), true)
                        message.channel.send(voteEmbed).then((msg) => {
                            msg.react("✅");
                            msg.react("❌");
                        }, 400);
            })
        }
    },
    "invites": {
        description: "測試",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            if (!message.guild) return message.channel.send(l.error.No_DM)
            var user = null;
            let member = bot.users.cache.get(args[0])
            if (message.mentions.users.first()) { user = message.mentions.users.first() } else if (args[0] != null) {
                if (member) {
                    user = member
                }
            } else { user = message.author }

            message.guild.fetchInvites().then(invites => {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for (var i = 0; i < userInvites.length; i++) {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                message.reply(user.username + ` ${h.invites.inv} ${userInviteCount} ${h.invites.inv2} ${message.guild.name}`);
            })
        }
    },
    "hasvote": {
        description: "測試",
        fun: function(bot, message, prefix , language, args ,...ag) {
            let l = lan.zh_TW,h = adminX.zh_TW
            if(language === "zh_TW") {l = lan.zh_TW;h = adminX.zh_TW}else if(language === "zh_CN") {l = lan.zh_CN;h = adminX.zh_CN}else if(language === "ja_JP") {l = lan.ja_JP;h = adminX.ja_JP
            }else if(language === "en_US") {l = lan.en_US;h = adminX.en_US}
            let user = null;
            if (message.mentions.users.first()) { user = message.mentions.users.first() } else if (args[0] != null) {
                if (member) {
                    user = member
                }
            } else { user = message.author }
            if (user) {
                dbl.hasVoted(user.id).then(voted => {
                    if (voted) { return message.channel.send("🗳" + user.username + h.hasvote.hasvote) } else { message.channel.send("❌" + user.username + h.hasvote.novote) }
                });
            } else { return message.channel.send(h.hasvote.user_error) }
        }
    }
}