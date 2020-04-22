const MobType = require("../../Enums/MobType.enum.js");
const LivingEntity = require("LivingEntity.class.js");
const PlayerPackageHandler = require("../../Packages/PackageHandler/Player/PlayerPackageHandler.class.js");


/**
 * Player - A Player object
 * @extends LivingEntity
 */
class Player extends LivingEntity {
  constructor(client) {
    super(client.id, client.uuid, MobType.PLAYER);
    this.client = client;
    this.packageHandler = new PlayerPackageHandler(this);
  }


}

module.exports = Player;
