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
    if(res) return true;
  });
};
module.exports.loadGuild = async (client, guildid) => {
  /*讀取公會檔案*/ let dbo = client.db("mydb"),
    id = guildid,
    query = { id: id };
  let user = await dbo.collection("guilds").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0][id];
  return user;
};
module.exports.writeGuild = function (client, id, data) {
  /*寫入公會檔案*/ let dbo = client.db("mydb"),
    query = { [id]: Object };
  let user = dbo.collection("guilds").find(query).toArray();
  var myquery = { id: id };
  user[id] = data;
  var newvalues = { $set: user };
  dbo.collection("guilds").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
    if(res) return true;
  });
};
module.exports.loadDaily = async (client) => {
  /*讀取用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "daily" };
  let user = await dbo.collection("daily").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0];
  return user;
};

module.exports.writeDaily = function (client, data) {
  /*寫入用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "daily" };
  let user = dbo.collection("daily").find(query).toArray();
  var myquery = { id: "daily" };
  user = data;
  var newvalues = { $set: user };
  dbo.collection("daily").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
};

module.exports.loaddata = async (client) => {
  /*讀取用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "data" };
  let user = await dbo.collection("status").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0];
  return user;
};

module.exports.writedata = function (client, data) {
  /*寫入用戶檔案*/ let dbo = client.db("mydb"),
    query = { id: "data" };
  let user = dbo.collection("status").find(query).toArray();
  var myquery = { id: "data" };
  user = data;
  var newvalues = { $set: user };
  dbo.collection("status").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
};
module.exports.loadPicture = async (client) => {
  /*讀取公會檔案*/ let dbo = client.db("mydb"),
    query = { type: "report" };
  let user = await dbo.collection("report").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0];
  return user;
};
module.exports.writePicture = function (client, data) {
  /*寫入公會檔案*/ let dbo = client.db("mydb"),
    query = { type: "report" };
  let user = dbo.collection("report").find(query).toArray();
  var myquery = { type: "report" };
  user = data;
  var newvalues = { $set: user };
  dbo.collection("report").updateOne(myquery, newvalues, function (err, res) {
    if (err) return err;
  });
};

module.exports.loadping = async (client) => {
  /*讀取公會檔案*/ let dbo = client.db("mydb"),
    query = { type: "ping" };
  let user = await dbo.collection("report").find(query).toArray();
  if (user[0] === undefined) return false;
  user = user[0];
  return user;
};
