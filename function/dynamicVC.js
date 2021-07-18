let Mongo = require('./MongoData')

const UserCache = new Map()
setInterval(() => {
  UserCache.clear()
}, 600000);
const GuildCache = new Map()
setInterval(() => {
  GuildCache.clear()
}, 600000);

module.exports.main = async function (oldMember, newMember, num, clientDB,client) {
  try {
    const newUserChannel = newMember.channelID;
    const oldUserChannel = oldMember.channelID;
    if (
      oldMember.channel &&
      newMember.channel &&
      oldUserChannel != newUserChannel
    ) {
      let gid = oldMember.guild.id;
      let ser = UserCache.get(gid);
      if (!ser) {
        await Mongo.loadGuild(clientDB, gid).then((user) => {
          ser = user;
          GuildCache.set(gid, user);
        });
      }
      if (ser === false) {
        return;
      }
      if (ser.language.run) {
        if (ser.language.run != num) return;
      }
      try {
        setTimeout(() => {
          if (
            newMember.guild.channels.cache.find(
              (channel2) =>
                channel2.name === newMember.member.displayName + " 的頻道"
            )
          ) {
            return newMember.guild.channels.cache.find(
              (channel2) =>
                channel2.name === newMember.member.displayName + " 的頻道" &&
                newMember.setChannel(channel2.id)
            );
          }
        }, 2000);
      } catch (error) {
        throw error;
      }
    } else if (newUserChannel) {
      //Join
      let gid = newMember.guild.id;
      let ser = UserCache.get(gid);
      if (!ser) {
        await Mongo.loadGuild(clientDB, gid).then((user) => {
          ser = user;
          GuildCache.set(gid, user);
        });
      }
      if (ser === false) {
        return;
      }
      if (ser.language.run) {
        if (ser.language.run != num) return;
      }
      Mongo.loadGuild(clientDB, newMember.guild.id).then((user) => {
        if (user === false) {
          return;
        } else {
          try {
            if (
              newMember.guild.channels.cache.find(
                (channel2) =>
                  channel2.name === newMember.member.displayName + " 的頻道"
              )
            )
              return;
          } catch {
            return;
          }
          if (user.voice2.indexOf(newUserChannel) != "-1") {
            let gid = newMember.channel.parentID;
            newMember.channel
              .clone(
                { name: newMember.member.displayName + " 的頻道" },
                { type: "voice" },
                { userLimit: 0 }
              )
              .then((Channel) => {
                Channel.setParent(gid, { lockPermissions: false });
                Channel.edit({ userLimit: 0 });
                newMember.setChannel(Channel.id);
                user.voice.push(Channel.id);
                Mongo.writeGuild(clientDB, newMember.guild.id, user);
              });
          }
        }
      });
    } else if (oldUserChannel) {
      //Leave
      let gid = oldMember.guild.id;
      let ser = UserCache.get(gid);
      if (!ser) {
        await Mongo.loadGuild(clientDB, gid).then((user) => {
          ser = user;
          GuildCache.set(gid, user);
        });
      }
      if (ser === false) {
        return;
      }
      if (ser.language.run) {
        if (ser.language.run != num) return;
      }
      Mongo.loadGuild(clientDB, oldMember.guild.id).then((user) => {
        if (user === false) {
          return;
        } else {
          try {
            if (user.voice.indexOf(oldUserChannel) != "-1") {
              if (oldMember.channel.members.size === 0) {
                oldMember.channel.delete();
                var array = user.voice;
                var index = array.indexOf(oldUserChannel);
                if (index > -1) {
                  array.splice(index, 1);
                }
                Mongo.writeGuild(clientDB, oldMember.guild.id, user);
              }
            }
          } catch (error) {
            return;
          }
        }
      });
    }
  } catch (error) {
    client.channels.cache.get("746185201675141241").send("錯誤! \n```js\n" + error + "\n```");
    console.log(error);
    throw error;
  }
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
