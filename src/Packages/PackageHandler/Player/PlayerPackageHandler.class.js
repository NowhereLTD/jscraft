

/**
 * PlayerPackageHandler - Handle Player Connection Package
 */
class PlayerPackageHandler {


  /**
   * constructor - Description
   *
   * @param {Player} player Representate a player
   *
   * @return {type} Description
   */
  constructor(player) {
    this.player = player;
  }


  /**
   * login - send player login package
   *
   * @param {World}   world         The default world to spawn
   * @param {number}  maxPlayers    Max Players on server or world
   * @param {boolean} [debug=false] Reduce the debug information
   *
   * @return {type} Description
   */
  login(world, maxPlayers, debug = false) {
    this.sendPackage("login", {
      entityId: this.player.id,
      gameMode: this.player.gameMode,
      levelType: world.levelType,
      dimension: world.dimension,
      difficulty: world.difficulty,
      maxPlayers: maxPlayers,
      reducedDebugInfo: false
    });
  }


  /**
   * setPosition - Set the Player Position
   *
   * @param {Position} position     The new Player Position
   * @param {Hex}      [flags=0x00] Position flag
   *
   * @return {type} Description
   */
  setPosition(position, flags = 0x00) {
    this.sendPackage("position", {
      x: position.x,
      y: position.y,
      z: position.z,
      yaw: position.yaw,
      pitch: position.pitch,
      flags: flags
    });
  }


  /**
   * sendChunk - Send a chunk
   *
   * @param {JSON}    position           Chunk X and Z coordinate
   * @param {Chunk}   chunk              Chunk data
   * @param {Array}   [blockEntities=[]] All Block Entitys
   * @param {Hex}     [bitMap=0xffff]    The default bitMap
   * @param {boolean} [groundUp=true]    The default groundUp
   *
   * @return {type} Description
   */
  sendChunk(position, chunk, blockEntities = [], bitMap = 0xffff, groundUp = true) {
    this.sendPackage("map_chunk", {
      x: location.x,
      z: location.z,
      groundUp: groundUp,
      bitMap: bitMap,
      chunkData: chunk,
      blockEntities: blockEntities
    });
  }


  /**
   * sendPlayerInfo - send player information data
   *
   * @param {number} action The player info action
   * @param {JSON}   data   The info data
   *
   * @return {type} Description
   */
  sendPlayerInfo(action, data) {
    this.sendPackage("player_info", {
      action: action,
      data: data
    });
  }


  /**
   * spawnLivingEntity - Spawn a living Entity
   *
   * @param {Entity} entity        The entity to spawn
   * @param {array}  [metadata=[]] Metadata
   *
   * @return {boolean}
   */
  spawnLivingEntity(entity, metadata = [{ type: 0, value: 0, key: 0 }]) {
    if(!entity instanceof LivingEntity) {
      return false;
    }
    if(entity instanceof Player) {
      metadata = [{ type: 0, value: 127, key: 10 }];
      return this.sendPackage("named_entity_spawn", {
        entityId: entity.id,
        playerUUID: entity.uuid,
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z,
        yaw: entity.position.yaw,
        pitch: entity.position.pitch,
        metadata: metadata
      });
    }else {
      metadata = [{ type: 0, value: 127, key: 10 }];
      return this.sendPackage("named_entity_spawn", {
        entityId: entity.id,
        playerUUID: entity.uuid,
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z,
        yaw: entity.position.yaw,
        pitch: entity.position.pitch,
        metadata: metadata
      });
    }
  }


  /**
   * destroyEntities - Destroy entitys
   *
   * @param {Array} entityIds A list with entity ids
   *
   * @return {type} Description
   */
  destroyEntities(entityIds) {
    this.sendPacket("entity_destroy", {
      "entityIds": entityIds
    });
  }


  /**
   * sendPackage - send a package to client
   *
   * @param {String} name Name of package
   * @param {JSON}   data Package data to send
   *
   * @return {type} Description
   */
  sendPackage(name, data) {
    return this.player.client.write(name, data);
  }
}


module.exports = PlayerPackageHandler;
