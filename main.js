const { Client, Intents } = require("discord.js");
const Discord = require("discord.js")
const fs = require('fs');
const {mongo} = require('./token.json');
function main() {
    const client = new Client({intents: [Intents.FLAGS.GUILDS,"GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES",/*"GUILD_PRESENCES","GUILD_MEMBERS",*/"GUILD_VOICE_STATES"] })
    const { DiscordTogether } = require('discord-together');
    client.discordTogether = new DiscordTogether(client);
    /////////////////////// Mongo /////////////////
    const MongoClient = require('mongodb').MongoClient;
    const clientDB = new MongoClient(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
    clientDB.connect(err => {
        console.log("[MangoDB] 連接成功")
    });
    /////////////// Mongo data //////////////////
    let Mongo = require("./function/MongoData")
    ////////////////////////////////////////////  版本: 6.1
    const { prefix, token, version} = require('./config.json');
    //////////////////////////////////////////////
    let onlineSET = require("./function/BotOnline")
    client.once('ready', async () => {
        onlineSET.main1(client,1,clientDB)
        return console.log(`苦力怕機器人讀取成功! 版本: ${version} Time: ` + new Date().toUTCString());
    });
    ///////////////////////////////////////////
    client.commands = new Discord.Collection()
    let event = []
    let eventfiles = fs.readdirSync("./events/bot1")
    console.log("events file:" + eventfiles)
    for (file of eventfiles) {
        let w = require(`./events/bot1/${file}`)
        for (sd of w) {
            event.push(sd)
        }
    };
    for (file of event) {
        try {
            w = function (fun) {
                return function (...a) {
                    try {
                        fun(client,clientDB,prefix, ...a)
                    } catch (error) {
                        throw error;
                    }
                }
            }
            client[file.type](file.name, w(file.fun))
        } catch (error) {
            console.log(`file:${file.name}\nError:\n`)
            throw error;
        }
    }
    /////////////// Language ////////////////////
    client.command = fs.readdirSync(`./commands/`)
    let languages = {}
    for (let i of fs.readdirSync("./language/")) {
        let filename = i.split(".")[0]
        languages[`${filename}`] = JSON.parse(fs.readFileSync(`./language/${i}`))
    }
    languages.lan = JSON.parse(fs.readFileSync("./commands/lang.json"))
    client.languages = languages
    ///////////////////////////////////////////
    let BotFun = require("./function/BotFunction")
    BotFun.forEach(element => {
        client[element.name] = element.fun
    });
    ///////////////////////////////////////////////////////////
    let top = require("./function/top.gg")
    top.main(client)
    //////////////////////////////////////////////////////////////
    clientDB.on('close', function() {
        clientDB.close(err => {
          clientDB.connect(err => {
            console.log("[MangoDB] 重新連接成功")
      });
      })});
    //////////////// Slash command /////////////////////////
    let slash = require("./function/slashCommand")
    slash.main(client,clientDB,prefix)/*
    client.on("interactionCreate",async interaction => {
        if(!interaction.isCommand()) return;

    })*/
    /////////////////////////////////////////////////////////////
    console.log(`該程序目前總共使用了${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100}MB的RAM`)
    client.login(token);

    let {clientId} = require("./token.json")
    let slashswitch = require("./function/addslash")
    //slashswitch(token,clientId)
}
main()