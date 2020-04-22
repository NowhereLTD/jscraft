const MobType = require("../../Enums/MobType.enum.js");
const LivingEntity = require("LivingEntity.class.js");
const PlayerPackageHandler = require("../../Packages/PackageHandler/Player/PlayerPackageHandler.class.js");


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
    this.position = new Position();
    this.world = null;
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
    this.packageHandler.setPosition(this.position);
    let chunkLocation = this.position.getChunk();
    this.packetHandler.sendChunk(chunkLocation, this.world.chunkList[chunkLocation.x][chunkLocation.z].dump())
  }

}

module.exports = Player;
