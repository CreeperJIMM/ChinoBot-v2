let Mongo = require("./MongoData");
module.exports.main = function (message, clientDB, user) {
  let time = message.createdAt.toUTCString();
  if (message.author.bot) return;
  if (message.content.startsWith("cr!")) return;
  if (message.content.startsWith("cr?")) return;
  if (message.content.startsWith("cr*")) return;
  if (user.snipeid) {
    delete user.snipeid;
    delete user.snipefile;
    delete user.snipetime;
    user.snipe = [];
    user.edit = [];
  }
  let snipe = {
    message: "(無)",
    file: [],
    user: {},
    time: time,
    id: message.id,
  };
  if (message.content) {
    snipe.message = message.content;
  }
  snipe.user = {
    avatar: message.author.avatar,
    name: message.author.username,
    tag: message.author.discriminator,
    id: message.author.id,
  };
  if (message.attachments.size > 0) {
    var Attachment = message.attachments;
    Attachment.forEach(function (attachment) {
      var file = attachment.proxyURL;
      var filename = attachment.name;
      snipe.file.push({ file: file, name: filename });
    });
  } else {
    snipe.file.push({ file: "無", name: "" });
  }
  if (user.snipe) {
    if (user.snipe.length > 16) user.snipe.pop();
  }
  user.snipe.unshift(snipe);
  return Mongo.writeGuild(clientDB, message.guild.id, user);
};
