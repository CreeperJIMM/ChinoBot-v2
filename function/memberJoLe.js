let Mongo = require('./MongoData')
module.exports.join = function(ser,member,clientDB,client,num) {
    if (ser === false) { return }
    if (ser.language.run) { if (ser.language.run != num) return; }
    try {
        Mongo.loadGuild(clientDB, member.guild.id).then((user) => {
            if (user === false) { return } else {
                if (user.join != null) {
                    if (user.join2 === null) return;
                    try { client.channels.cache.get(user.join) } catch (error) { return; }
                    var str = user.join2.join(" ")
                    var send1 = str.replace(`{member}`, + member.guild.memberCount + "").replace(`{user}`, " " + " <@" + member.id + "> " + "").replace(`{server}`, " " + member.guild.name + "").replace(`["`, "").replace(`"]`, "")
                    if (!send1) return;
                    try { client.channels.cache.get(user.join).send(send1) } catch (error) { return; }
                }
            }
        })
    } catch (error) {
        client.channels.cache.get("746185201675141241").send("錯誤! ! \n```js\n" + error + "\n```")
        console.log(error)
    }
}

module.exports.leave = function(ser,member,clientDB,client,num) {
    if (ser === false) { return }
    if (ser.language.run) { if (ser.language.run != num) return; }
    try {
        Mongo.loadGuild(clientDB, member.guild.id).then((user) => {
            if (user === false) { return } else {
                if (user.leave != null) {
                    if (user.leave2 === null) return;
                    let Leave = user.leave
                    try { client.channels.cache.get(Leave) } catch (error) { return; }
                    var str = user.leave2.join(" ")
                    var send1 = str.replace(`{member}`, + member.guild.memberCount + "").replace(`{user}`, " " + " <@" + member.id + "> " + "").replace(`{server}`, " " + member.guild.name + "").replace(`["`, "").replace(`"]`, "")
                    if (!send1) return;
                    try { client.channels.cache.get(Leave).send(send1) } catch (error) { return; }
                }
            }
        })
    } catch (error) {
        client.channels.cache.get("746185201675141241").send("錯誤!! \n```js\n" + error + "\n```")
        console.log(error)
    }
}