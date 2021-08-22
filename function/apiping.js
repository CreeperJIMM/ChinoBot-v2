module.exports.ping = function(bot,reply) {
    bot.api.interactions(reply.id,reply.token).callback.post({
        data: {
        type: 6
    }})
}