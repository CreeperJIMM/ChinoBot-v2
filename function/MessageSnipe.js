let Mongo = require('./MongoData')
module.exports.main = function (message,clientDB,user) {
    let args = message.createdAt.toUTCString([8]).split(" ")
    if (args[2] == "Jan") { var mon = "1月" } else if (args[2] == "Feb") { var mon = "2月" } else if (args[2] == "Mar") { var mon = "3月" } else if (args[2] == "Apr") { var mon = "4月" } else if (args[2] == "May") { var mon = "5月" } else if (args[2] == "Jun") { var mon = "6月" } else if (args[2] == "Jul") { var mon = "7月" } else if (args[2] == "Aug") { var mon = "8月" } else if (args[2] == "Sep") { var mon = "9月" } else if (args[2] == "Oct") { var mon = "10月" } else if (args[2] == "Nov") { var mon = "11月" } else if (args[2] == "Dec") { var mon = "12月" }
    if (args[0] == "Mon,") { var week = "星期一" } else if (args[0] == "Tue,") { var week = "星期二" } else if (args[0] == "Wed,") { var week = "星期三" } else if (args[0] == "Thu,") { var week = "星期四" } else if (args[0] == "Fri,") { var week = "星期五" } else if (args[0] == "Sat,") { var week = "星期六" } else if (args[0] == "Sun,") { var week = "星期日" }
    let hor = message.createdAt.getUTCHours(8)
    let H = (hor + 8) + args[4].substring(2)
    let time = args[3] + " " + H + " " + mon + " " + args[1] + "日 " + week + " UTC+8"
    var text = JSON.stringify(user.snipe); var text2 = text.toString(); text2 = JSON.parse(text2);
    if (message.content === "" || message.content === null) { user.snipe = { "t1": "(無)", "t2": text2.t1, "t3": text2.t2, "t4": text2.t3, "t5": text2.t4, "t6": text2.t5, "t7": text2.t6, "t8": text2.t7, "t9": text2.t8, "t10": text2.t9 } } else {
        user.snipe = { "t1": message.content, "t2": text2.t1, "t3": text2.t2, "t4": text2.t3, "t5": text2.t4, "t6": text2.t5, "t7": text2.t6, "t8": text2.t7, "t9": text2.t8, "t10": text2.t9 }
    }
    var textid = JSON.stringify(user.snipeid); var textid2 = textid.toString(); textid2 = JSON.parse(textid2);
    var texttime = JSON.stringify(user.snipetime); var texttime2 = texttime.toString(); texttime2 = JSON.parse(texttime2);
    var textfile = JSON.stringify(user.snipefile); var textfile2 = textfile.toString(); textfile2 = JSON.parse(textfile2);
    if (message.attachments.size > 0) {
        var Attachment = (message.attachments);
        Attachment.forEach(function (attachment) {
            var file = attachment.proxyURL
            var filename = attachment.name
            user.snipefile = { "t1": { "file": file, "name": filename }, "t2": textfile2.t1, "t3": textfile2.t2, "t4": textfile2.t3, "t5": textfile2.t4, "t6": textfile2.t5, "t7": textfile2.t6, "t8": textfile2.t7, "t9": textfile2.t8, "t10": textfile2.t9 }
            user.snipeid = { "t1": message.author.id, "t2": textid2.t1, "t3": textid2.t2, "t4": textid2.t3, "t5": textid2.t4, "t6": textid2.t5, "t7": textid2.t6, "t8": textid2.t7, "t9": textid2.t8, "t10": textid2.t9 }
            user.snipetime = { "t1": time, "t2": texttime2.t1, "t3": texttime2.t2, "t4": texttime2.t3, "t5": texttime2.t4, "t6": texttime2.t5, "t7": texttime2.t6, "t8": texttime2.t7, "t9": texttime2.t8, "t10": texttime2.t9 }
            Mongo.writeGuild(clientDB, message.guild.id, user)
        })
    } else {
        user.snipefile = { "t1": { "file": "無", "name": "" }, "t2": textfile2.t1, "t3": textfile2.t2, "t4": textfile2.t3, "t5": textfile2.t4, "t6": textfile2.t5, "t7": textfile2.t6, "t8": textfile2.t7, "t9": textfile2.t8, "t10": textfile2.t9 }
        user.snipeid = { "t1": message.author.id, "t2": textid2.t1, "t3": textid2.t2, "t4": textid2.t3, "t5": textid2.t4, "t6": textid2.t5, "t7": textid2.t6, "t8": textid2.t7, "t9": textid2.t8, "t10": textid2.t9 }
        user.snipetime = { "t1": time, "t2": texttime2.t1, "t3": texttime2.t2, "t4": texttime2.t3, "t5": texttime2.t4, "t6": texttime2.t5, "t7": texttime2.t6, "t8": texttime2.t7, "t9": texttime2.t8, "t10": texttime2.t9 }
        Mongo.writeGuild(clientDB, message.guild.id, user)
    }
}