const mc = require("minecraft-protocol");
const EventHandler = require("./modules/Events/EventHandler.class.js");
const PlayerManager = require("./modules/manager/PlayerManager.class.js");
const Position = require("./modules/Utils/Position.class.js");
const WorldManager = require("./modules/World/WorldManager.class.js");

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

    this.eventHandler = new EventHandler(this);
    this.playerManager = new PlayerManager(this);
    this.spawnPosition = new Position();
    this.worldManager = new WorldManager(this);
    this.worldManager.defaultWorld();
    //this.worldManager.getWorld("world").createSpawnChunks();
  }


  stopServer() {
    this.mc.close();
  }
};

module.exports = Server;
