const MobType = require("../../Enums/MobType.enum.js");
const GameMode = require("../../Enums/GameMode.enum.js");
const WindowType = require("../../Enums/WindowType.enum.js");
const LivingEntity = require("./LivingEntity.class.js");
const PlayerPackageHandler = require("../../Packages/PackageHandler/Player/PlayerPackageHandler.class.js");
const Position = require("../Utils/PlayerPosition.class.js");
const WindowManager = require("../Manager/WindowManager.class.js");

/**
 * Player - A Player object
 * @extends LivingEntity
 */
class Player extends LivingEntity {
  /**
   * constructor - Description
   *
   * @param {Client} client A ckient instance
   * @param {Server} server A server instance
   *
   * @return {type} Description
   */
  constructor(client, server) {
    super(client.id, client.uuid, MobType.PLAYER);
    this.client = client;
    this.server = server;
    this.packageHandler = new PlayerPackageHandler(this);
    this.windowManager = new WindowManager();
    this.inventory = this.windowManager.createWindow(this, 32, this, WindowType.CONTAINER);
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
    let chunkLocation = this.position.getChunk();
    let chunkData = this.world.chunkList[chunkLocation.x][chunkLocation.z].dump();
    this.packageHandler.sendChunk(chunkLocation, chunkData);
    this.packageHandler.setPosition(this.position);
  }

}

module.exports = Player;
