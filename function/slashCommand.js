let slashcommand = {};
const fs = require("fs");
let slashfiles = fs.readdirSync("./slashs");
let Mongo = require("./MongoData");
console.log("slash commands file:" + slashfiles);
for (file of slashfiles) {
  let q = require(`../slashs/${file}`);
  Object.assign(slashcommand, q);
}
let GuildCache = new Map();
setInterval(() => {
  GuildCache.clear();
}, 60000);

module.exports.main = function (client, clientDB, prefix) {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    let ser = GuildCache.get(interaction.guildId);
    if (!ser) {
      ser = await Mongo.loadGuild(clientDB, interaction.guildId)
      GuildCache.set(interaction.guildId, ser);
    }
    if(!interaction) return;
    if (!ser) return; 
    if (ser.language) {
      if (ser.language.setting) {
        if (ser.language.setting.slash === false) return;
      }
    }
    const slashname = interaction.commandName
    const args = interaction.options.data;
    if (Object.keys(slashcommand).includes(slashname)) {
      try {
        let ag = [];
        let userlang = "zh_TW";
        if (args) {
          ag = args;
        }
        if((new Date().getTime() - interaction.createdAt.getTime()) > 5500) return;
        let cmd = await slashcommand[slashname]["fun"](
          client,
          interaction,
          prefix,
          clientDB,
          userlang,
          args,
          ag
        )
        return cmd;
      } catch (error) {
        throw error;
      }
    }
  });
};
//const interactions = require("discord-slash-commands-client");
// TypeScript: import interactions from "discord-slash-commands-client";
//const bot = new interactions.Client(token, '731408794948730961');
