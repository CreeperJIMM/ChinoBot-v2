const fs = require('fs');
module.exports.main1 = function (client,num) {
  setInterval(() => {
    fs.readFile("./server.json", function (err, userInfo) {
      if (err) {
        return;
      } else {
        var user = userInfo.toString();
        user = JSON.parse(user);
        if(num == 1) {
          user.chino.guild = client.guilds.cache.size;
        }else if(num == 2) {
          user.chino2.member = client.users.cache.size;
          user.chino2.guild = client.guilds.cache.size;
        }else if(num == 3) {
          user.chinoc.member = client.users.cache.size;
          user.chinoc.guild = client.guilds.cache.size;
        }
        var str = JSON.stringify(user);
        fs.writeFileSync("./server.json", str);
      }
    });
  }, 42000);
};
