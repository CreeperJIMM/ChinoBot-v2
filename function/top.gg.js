const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const {topToken} = require("../token.json")
///////// TOP.gg //////////////////////
const DBL = require("dblapi.js");
module.exports.main = function(client) {
    const dbl = new DBL(topToken, { webhookPort: 5000, webhookAuth: 'ChinoBot', webhookServer: server }, client);
    try {
        dbl.on('posted', () => {
            dbl.postStats(client.guilds.size)
        })
    } catch (error) { return; }
    
    dbl.on('error', e => {
        console.log(`錯誤! ${e}`);
    })
    dbl.webhook.on('ready', hook => {
        console.log(`Webhook in http://${hook.hostname}:${hook.port}${hook.path}`);
    });
    dbl.webhook.on('vote', vote => {
        console.log(`感謝 ${vote.user} 的投票!`);
        let vote2 = new Discord.MessageEmbed().setColor("#2d9af8").setTitle("感謝投票!").setDescription("感謝 <@" + vote.user + "> 為智乃機器人增加了一票!")
        client.channels.cache.get(`767216526125957170`).send(vote2)
    });
}

/*
server.listen(5000, () => {
    console.log('Listening');
});
*/