let {owner} = require("../config.json")

function Reboot() {
  main()
}

module.exports = [
    load = {
        "name":"load",
        fun: function (filename) {
    let file1 = require(`./commands/${filename}.js`) //讀取
    Object.assign(command, file1) //加入
  }
},
{
    "name":"unload",
    fun: function (filename) {
    let file1 = require(`./commands/${filename}.js`)
    for (command1 of Object.keys(file1)) {
        delete command[`${command1}`]
    }
    delete require.cache[require.resolve(`./commands/${filename}.js`)] //刪除緩存內檔案
  }
},
{
    "name":"is_owner",
    fun: function (message) { //是不是作者
    if (Number(message.author.id) != owner) {
      return false;
    }
  }
},
{
    "name":"has_any_role",
    fun: function (message, ...a) { //是否有指定的身分組
    for (eqw of message.member.roles.cache) {
        if (a.includes(Number(eqw[0])) || a.includes(eqw[1].name)) {
            return
        }
    }
    return false;
  },
},
{
    "name":"is_guild_owner",
    fun: function (message) { //是否為伺服器持有者
    if (message.guild.owner !== message.member.id) {
      return false;
    }
  }
},
{
    "name":"l",
    fun: {
    "reboot": {
        description: "重啟機器人",
        authority: "owner",
        instructions: "reboot",
        fun: function (bot, message) {
            client.is_owner(message)
            client.destroy()
            Reboot()
        }
    }
  }
}
]