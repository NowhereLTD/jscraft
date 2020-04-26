const MobType = require("../../Enums/MobType.enum.js");
const GameMode = require("../../Enums/GameMode.enum.js");
const LivingEntity = require("./LivingEntity.class.js");
const PlayerPackageHandler = require("../../Packages/PackageHandler/Player/PlayerPackageHandler.class.js");
const Position = require("../Utils/Position.class.js");
const EventHandler = require("events");


class Controller {

  constructor(client, server, entity) {
    this.client = client;
    this.server = server;
    this.entity = entity;
    this.packageHandler = new PlayerPackageHandler(this);
    this.gameMode = GameMode.CREATIVE;
    this.events = new EventHandler.EventEmitter();
  }


  /**
   * login - Handle player login
   *
   * @return {type} Description
   */
  login() {
    this.position = this.server.spawnPosition;
    this.world = this.server.worldManager.getWorld(this.position.world);
    this.packageHandler.login(this.world, this.server.properties.maxPlayers);
    let chunkLocation = this.entity.position.getChunk();
    let chunkData = this.world.chunkList[chunkLocation.x][chunkLocation.z].dump();
    this.packageHandler.sendChunk(chunkLocation, chunkData);
    this.packageHandler.setPosition(this.position);
  }

}

module.exports = Controller;
