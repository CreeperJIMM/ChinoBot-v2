const fs = require('fs');
module.exports.main1 = function (client,num,clientDB) {
  let a = Math.floor(Math.random()*20)
  setInterval(() => {
    this.Mongoload(clientDB).then((user) => {
      if (user === false) {
        return;
      } else {
        if(num == 1) {
          user.chino.guild = client.guilds.cache.size;
        }else if(num == 2) {
          user.chino2.member = client.users.cache.size;
          user.chino2.guild = client.guilds.cache.size;
        }else if(num == 3) {
          user.chinoc.member = client.users.cache.size;
          user.chinoc.guild = client.guilds.cache.size;
        }
        this.Mongowrite(clientDB,user)
      }
    });
  }, 42000+a);
};
module.exports.Mongoload = async (client) => {
  /*讀取用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "status" };
  let user = await dbo.collection("status").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0];
  return user;
};

module.exports.Mongowrite = function (client, data) {
  /*寫入用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "status" };
  let user = dbo.collection("status").find(query).toArray();
  var myquery = { id: "status" };
  user = data;
  var newvalues = { $set: user };
  dbo.collection("status").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
}