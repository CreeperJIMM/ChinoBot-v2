let slashcommand = {};
const fs = require('fs');
let slashfiles = fs.readdirSync("./slashs");
let Mongo = require("./MongoData");
console.log("slash commands file:" + slashfiles);
for (file of slashfiles) {
  let q = require(`../slashs/${file}`);
  Object.assign(slashcommand, q);
}
module.exports.main = function (client, clientDB,prefix) {
  client.ws.on("INTERACTION_CREATE", (interaction) => {
    const slashes = interaction.data.name;
    const args = interaction.data.options;
    Mongo.loadGuild(clientDB, interaction.guild_id).then((ser) => {
      if (ser) {
        if (ser.language) {
          if (ser.language.setting) {
            if (ser.language.setting.slash === false) return;
          }
        }
      }
      if (Object.keys(slashcommand).includes(slashes)) {
        try {
          let ag = [];
          let userlang = "zh_TW";
          if (args) {
            ag = args;
          }
          slashcommand[slashes]["fun"](
            client,
            interaction,
            prefix,
            userlang,
            args,
            ag
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
};
//const interactions = require("discord-slash-commands-client");
// TypeScript: import interactions from "discord-slash-commands-client";
//const bot = new interactions.Client(token, '731408794948730961');