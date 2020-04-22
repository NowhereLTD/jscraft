const mc = require("minecraft-protocol");

class Server {

  constructor(properties) {
    this.properties = properties;
  }

  startServer() {
    console.log("Init Server with Port: " + this.properties.serverPort);
    console.log("Server runs in" + this.properties.onlineMode ? "onlineMode" : "offlineMode");
    console.log("Default Gamemode: " + this.properties.gamemode);
    this.mc = mc.createServer({
      "online-mode": this.properties.onlineMode,
      host: this.properties.serverIp,
      port: this.properties.serverPort,
      version: this.properties.version,
      motd: this.properties.motd
    });
  }


  stopServer() {
    this.mc.close();
  }
};

module.exports = Server;
