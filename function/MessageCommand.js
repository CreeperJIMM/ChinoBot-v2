let Mongo = require('./MongoData')
module.exports.ifban = function (banlist,why, msg) {
  if (banlist.indexOf(msg.author.id) != -1) {
    msg.channel.send(`❌此用戶 ${msg.author.username} 被封禁\n原因: ${why[msg.author.id]}`);
    return false;
  }else{
      return true;
  }
};

module.exports.usercache = async function (msg,cache,clientDB) {
  let user = await Mongo.loadUser(clientDB, msg.author.id)
      return user;
};

module.exports.guildcache = async function (msg,cache,clientDB) {
    let user = await Mongo.loadGuild(clientDB, msg.guild.id)
    return user;
};

module.exports.ifpicture = function (msg,uwu,prefix) {
  let safecommand = [
    "chino",
    "cocoa",
    "tippy",
    "other",
    "shark",
    "gura",
    "fubuki",
    "peko",
    "chen",
    "shota",
    "loli",
    "vtuber",
    "nakkar",
  ];
  if (uwu) {
    if (uwu.language) {
      if (uwu.language.setting) {
        if (uwu.language.setting.safe === false) {
          if (safecommand.indexOf(msg.content.replace(prefix, "").split(" ")[0]) != -1)
            msg.channel.send("⛔此指令被本群管理員禁止.\nThis command has been disabled by server admin.");
            return true;
        }
      }
    }
  }
};
