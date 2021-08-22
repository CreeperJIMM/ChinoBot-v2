let Mongo = require('./MongoData')
const UserCache = new Map()
setInterval(() => {
  UserCache.clear()
}, 600000);
const GuildCache = new Map()
setInterval(() => {
  GuildCache.clear()
}, 600000);

let cooldown = new Set(),channelcooldown = new Set();
function deleteCooldown(message) {
    setTimeout(() => {
      cooldown.delete(message.author.id)}, 1 * 900)
    setTimeout(() => {
      channelcooldown.delete(message.channel.id)}, 1 * 700)
  }
let times = 1
module.exports.send = function(text1, text2, text3, text4,text5,text6, author = null) {
    return function (rand, msg) {
        if (cooldown.has(msg.author.id)) {
            return;
        } else {
            let sendtext = [text1, text2, text3, text4, text5,text6]
            if (author === null) {
                if(!sendtext[rand]) return;
                msg.channel.send(sendtext[rand])
                cooldown.add(msg.author.id)
                deleteCooldown(msg)
            } else {
                if (msg.author.id === author) {
                    msg.channel.send("指令已使用 " + times + "次。");
                    cooldown.add(msg.author.id)
                    deleteCooldown(msg)
                }
            }
        }
    }
}

module.exports.data = {
    "早安": this.send("早安w", "早安!", "早安030", "早安! >w<","早安壓","你睡好久-W-...."),
    "午安": this.send("午安w", "午安!", "午安! 吃飽沒", "午安uwu","午安壓","想要我幫你煮午餐嗎?"),
    "cr!times": this.send(null, null, null, null,null,null,'546144403958398988'),
    "晚安": this.send("晚安!", "祝你有美好的夜晚!", "睡前需要一杯咖啡ㄇ?", "晚安啦~","晚安! UwU","一起睡要不要=w=(x"),
    "運勢": this.send("吉", "凶", "小吉", "小凶","你不要知道比較好姆-w-","大凶"),
    "風神" : this.send("可愛蘿莉", "傲嬌", "總受", "蘿莉控", "百合","獵奇愛好者"),
    "三月" : this.send("身高154的可愛~~小矮子~~蘿莉", "Osu 大老", "Apex電神", "聽說很喜歡找人釘孤枝","Hentai","~~可愛小蘿莉~~"),
    "小喵": this.send("貓咪?", "是個可愛的貓娘小蘿莉", "聽說會咬人", "想摸摸牠(x","口愛","超級變態ㄉ貓咪"),
    "蘿莉": this.send("變態!", "死宅!", "蘿莉控!", "不可以有壞壞的想法喔","變態!","不要看著我..."),
    "女裝": this.send("不要女裝", "服主可以試試看阿", "你先穿我再考慮", "不要女裝","女裝大佬","你穿阿"),
    "智乃壞壞": this.send("對不起> <", "我什麼都沒做啊QWQ", "QAQ", ".w.","QwQ","我怎麼惹QAQ"),
    "(´・ω・)": this.send("(´・ω・)", "(´・ω・)", "(´・ω・)", "(´・ω・)","(´・ω・)","(´・ω・ )"),
    "智乃抱抱": this.send("既然你這樣說了那我就抱吧\n只能一次喔( ˘•ω•˘ ) (抱", "不要( ˘•ω•˘ )", "姆...( ˘•ω•˘ )", "你...想對我做甚麼( ˘•ω•˘ )","( ˘•ω•˘ ) (咬","(´・ω・) (抱"),
    "智乃摸摸頭": this.send("( ˘•ω•˘ ) (被摸頭", "( ˘•ω•˘ ) (跑走", "( ˘•ω•˘ ) (閃躲", "( ˘•ω•˘ ) (咬"," (´,,•ω•,,)","(´・ω・)不要((反向摸摸你的頭"),
    "智乃摸摸": this.send("( ˘•ω•˘ ) (被摸摸", "( ˘•ω•˘ ) (跑走", "( ˘•ω•˘ ) (閃躲", "( ˘•ω•˘ ) (咬"," (´,,•ω•,,)","(´,,•ω•,,)不要亂摸拉...."),
    "智乃坐下": this.send("不要!", "( ˘•ω•˘ ) (跑走", "( ˘•ω•˘ ) (站著", "( ˘•ω•˘ )....."," ((坐下","(´,,•ω•,,)((~~坐在你的腿上~~"),
    "智乃不乖": this.send("(つд⊂).....", "我做錯了什麼(つд⊂)...", "去怪我主人拉(つд⊂)...", "對不起(つд⊂)...","我怎麼了啦(つд⊂)...","qwq"),
    "智乃飛高高": this.send("ヽ(ﾟ∀。)ﾉ (飛高~", "好高我會怕怕! (つД`)", "我不要>w<!!", "( ˘•ω•˘ ) (不甘情願地飛高","(・∀・)  (愣住","(´,,•ω•,,)(飛高"),
    "我要一杯咖啡": this.send("來惹~!\n 你的咖啡完成了☕ヽ(・×・´)ゞ", "請先付錢( ˘•ω•˘ )", "咖啡都沒了( ˘•ω•˘ )", "請等我一下( ˘•ω•˘ )","就說咖啡賣完了咩( ˘•ω•˘ )","( ˘•ω•˘ )"),
    "安安": this.send("安安呀>w<!", "安安>w<!", ">W<安!", ">W<!!!!安安","安!","安安UWU"),
    "智乃沒穿": this.send("姆....被看到惹(´,,•ω•,,)", "(´,,•ω•,,) 變態...", "(´,,•ω•,,) 請 請不要這樣...", "(´,,•ω•,,)","既然你都發現了...那就只好那樣了(´,,•ω•,,)....","( ˘•ω•˘ )你好瑟"),
    "智乃": this.send("好像有人在說我...?", "姆?( ˘•ω•˘ )", "伊姆! >w<", "姆! >w<","(´,,•ω•,,)?","( ˘•ω•˘ )?"),
    "ㄌㄌ": this.send("蘿莉?( ˘•ω•˘ )", "ㄌㄌ?( ˘•ω•˘ )", "是什麼意思?( ˘•ω•˘ )", "姆! >w<","ㄌㄌ?(´,,•ω•,,)","應該可以拿來抱( ˘•ω•˘ )?"),
    "ù w ú": this.send("ù w ú","ù w ú","ù w ú","ù w ú","ù w ú","uwu"),
    "ㄓㄊ": this.send("正太?( ˘•ω•˘ )", "ㄓㄊ?( ˘•ω•˘ )", "是什麼意思?( ˘•ω•˘ )", "聽說很可愛! >w<","好像很好吃(´・ω・)  ","阿姆>w<"),
    "智乃乃": this.send("~~喜歡蘿莉的變態~~", "作弊者( ˘•ω•˘ )", "好瑟喔", "聽說蘿莉都怕他","~~女生身體構造研究者~~")
}

module.exports.detectsay = async function (msg,num,clientDB) {
    if (!msg.guild) return;
    if (msg.author.bot) return;
    let ser= UserCache.get(msg.author.id)
    if(!ser) {
      await Mongo.loadGuild(clientDB,msg.guild.id).then((user) => {
        ser = user
        GuildCache.set(msg.guild.id,user)
    })}
    if (ser === false) { return }
    Mongo.loadGuild(clientDB,msg.guild.id).then((ser) => {
        if (ser === false) { return }
        if (ser.language) { if (ser.language.run != num) return;}
        if(ser.language.setting) {if(ser.language.setting.react === false) return;}
        let a = Math.round(Math.random() * 6)
        if (Object.keys(this.data).includes(msg.content))
            this.data[`${msg.content}`](a, msg)
        });
};