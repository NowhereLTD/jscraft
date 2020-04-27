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
    this.viewRadius = 8;
    this.loadedChunks = [];
  }


  /**
   * login - Handle player login
   *
   * @return {type} Description
   */
  login() {
    this.world = this.server.worldManager.getWorld(this.entity.position.world);
    this.packageHandler.login(this.world, this.server.properties.maxPlayers);
    let chunkLocation = this.entity.position.getChunk();
    if(this.world.chunkList[chunkLocation.x] && this.world.chunkList[chunkLocation.x][chunkLocation.z]) {
      let chunkData = this.world.chunkList[chunkLocation.x][chunkLocation.z].dump();
      this.packageHandler.sendChunk(chunkLocation, chunkData);
    }
    this.packageHandler.setPosition(this.entity.position);
  }


  sendRadiusChunks(radius = this.viewRadius) {
    for(let x=-radius; x<radius; x++) {
      for(let z=-radius; z<radius; z++) {
        let chunkPosition = this.entity.position.getChunk();
        chunkPosition.x = chunkPosition.x + x;
        chunkPosition.z = chunkPosition.z + z;

        if(!this.loadedChunks[chunkPosition.x]) {
          this.loadedChunks[chunkPosition.x]  = [];
        }

        if(!this.loadedChunks[chunkPosition.x][chunkPosition.z]) {
          if(this.world.chunkList[chunkPosition.x] && this.world.chunkList[chunkPosition.x][chunkPosition.z]) {
            let chunkData = this.world.chunkList[chunkPosition.x][chunkPosition.z].dump();
            this.packageHandler.sendChunk(chunkPosition, chunkData);
            this.loadedChunks[chunkPosition.x][chunkPosition.z] = true;
          }
        }
      }
    }
  }

}

module.exports = Controller;
