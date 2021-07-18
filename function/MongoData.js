module.exports.loadUser = async (client, userid) => {
  /*讀取用戶檔案*/ let dbo = client.db("mydb"),
    id = userid,
    query = { id: id };
  let user = await dbo.collection("users").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0][id];
  return user;
};

module.exports.writeUser = function (client, id, data) {
  /*寫入用戶檔案*/ let dbo = client.db("mydb"),
    query = { [id]: Object };
  let user = dbo.collection("users").find(query).toArray();
  var myquery = { id: id };
  user[id] = data;
  var newvalues = { $set: user };
  dbo.collection("users").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
}
module.exports.loadGuild = async (client, guildid) => {
  /*讀取公會檔案*/ let dbo = client.db("mydb"),
    id = guildid,
    query = { id: id };
  let user = await dbo.collection("guilds").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0][id];
  return user;
};
module.exports.writeGuild = function(client, id, data) {
  /*寫入公會檔案*/ let dbo = client.db("mydb"),
    query = { [id]: Object };
  let user = dbo.collection("guilds").find(query).toArray();
  var myquery = { id: id };
  user[id] = data;
  var newvalues = { $set: user };
  dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
}
