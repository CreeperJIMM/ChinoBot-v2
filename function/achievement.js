let Mongo = require('./MongoData')
module.exports.notfound = async function (bot, message ,lang) {
  Mongo.loadUser(clientDB, message.author.id).then((user) => {
    if (user === false) {
      return;
    } else {
    let l = languageAdv.zh_TW.notfound
    if(lang) l = languageAdv[lang].notfound
      if (user.adv.indexOf("notfound") == "-1") {
        user.adv.push("notfound");
        message.author.send(lang);

        Mongo.writeUser(clientDB, message.author.id, user);
      }
    }
  });
};
module.exports.speed = async function (bot, message ,lang) {
  Mongo.loadUser(clientDB, message.author.id).then((user) => {
    if (user === false) {
      return;
    } else {
    let l = languageAdv.zh_TW.speed
    if(lang) l = languageAdv[lang].speed
      if (user.adv.indexOf("speed") == "-1") {
        user.adv.push("speed");
        message.author.send(l);
        Mongo.writeUser(clientDB, message.author.id, user);
      }
    }
  });
};
let languageAdv = {
    "zh_TW":{
        notfound:"🏅**獲得成就!!**  好像打錯了...(˘•ω•˘)",
        speed:"🏅**獲得成就!!**  打太快惹>_<"
    },
    "zh_CN":{
        notfound:"🏅**获得成就!!** 好像打错了...(˘•ω•˘)",
        speed:"🏅**获得成就!!** 打太快惹>_<"
    },
    "en_US":{
        notfound:"🏅**Achievement!!** Something is wong...(˘•ω•˘)",
        speed:"🏅**Achievement!!** Typeing too fast. >_<"
    },
    "ja_JP":{
        notfound:"🏅**実績!! **入力が間違っているようです...（˘•ω•˘）",
        speed:"🏅**達成！ ！ **入力が速すぎます> _ <"
    }
} 