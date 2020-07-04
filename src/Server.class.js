const mc = require("minecraft-protocol");
const EventHandler = require("./modules/Events/EventHandler.class.js");
const PlayerManager = require("./modules/Manager/PlayerManager.class.js");
const Position = require("./modules/Utils/PlayerPosition.class.js");
const WorldManager = require("./modules/World/WorldManager.class.js");
const JSONLoader = require("./modules/Utils/JSONLoader.class.js");

/**
 * Server - The server class
 */
class Server {
  /**
   * constructor - Init a server
   *
   * @param {JSON} properties The server properties
   *
   */
  constructor(properties) {
    this.properties = properties;
    this.jsonLoader = new JSONLoader();
    this.nbt = require("nbt");
    this.packageStructure = this.jsonLoader.load("./etc/minecraft-data/structure/structure.json");
  }


  /**
   * startServer - Start the server
   *
   */
  startServer() {
    console.log("Init Server with Port: " + this.properties.serverPort);
    console.log("Server runs in" + this.properties.onlineMode ? "onlineMode" : "offlineMode");
    console.log("Default Gamemode: " + this.properties.gamemode);
    this.mc = mc.createServer({
      "online-mode": this.properties.onlineMode,
      host: this.properties.serverIp,
      port: this.properties.serverPort,
      version: false,
      motd: this.properties.motd
    });

    /*console.log(this.nbt.parse({
      "name": "Item",
      "value": {
        "EntityTag": {
          "type": "compound",
          "value": {
            "id": {
              "type": "integer",
              "value": 1
            }
          }
        }
      }
    }));*/

    this.eventHandler = new EventHandler(this);
    this.playerManager = new PlayerManager(this);
    this.spawnPosition = new Position(2, 60, 8);
    this.worldManager = new WorldManager(this);
    this.worldManager.defaultWorld();
    //this.worldManager.getWorld("world").createSpawnChunks();
  }


  /**
   * stopServer - Stop the server
   *
   */
  stopServer() {
    this.mc.close();
  }
};

module.exports = Server;
