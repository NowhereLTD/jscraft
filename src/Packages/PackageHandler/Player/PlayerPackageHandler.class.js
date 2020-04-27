

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
   * kick - Kick the player from server
   *
   * @param {String} message The reason message
   *
   * @return {type} Description
   */
  kick(message) {
    return this.sendPackage("kick_disconnect", {
      reason: message
    });
  }


  /**
   * openWindow - Open a new inventory window on player
   *
   * @param {Window} window the window object
   *
   * @return {type} Description
   */
  openWindow(window) {
    if(inventoryType == "EntityHorse") {
      return this.sendPackage("open_window", {
        windowId: window.id,
        inventoryType: window.type,
        windowTitle: window.name,
        slotCount: window.slots.length,
        entityId: window.entity.id
      });
    }else {
      return this.sendPackage("open_window", {
        windowId: window.id,
        inventoryType: window.type,
        windowTitle: window.name,
        slotCount: window.slots.length
      });
    }
  }


  /**
   * closeWindow - Close the window
   *
   * @param {Window} window the window object
   *
   * @return {type} Description
   */
  closeWindow(window) {
    return this.closeWindowById(window.id);
  }


  /**
   * closeWindowById - Close the window by window id
   *
   * @param {number} id The window number
   *
   * @return {type} Description
   */
  closeWindowById(id) {
    return this.sendPackage("close_window", {
      windowId: id
    });
  }

  /**
   * setWindowSlot - Set the window slot
   *
   * @param {Window} window The window to set slot
   * @param {number} slotId The slot to set
   * @param {Slot}   item   The slot object set as item
   *
   * @return {type} Description
   */
  setWindowSlot(window, slotId, item) {
    return this.sendPackage("set_slot", {
      windowId: window.id,
      slot: slot.id,
      item: item
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
  sendChunk(position, chunk, bitMap = 0xffff, blockEntities = [], groundUp = true) {
    this.sendPackage("map_chunk", {
      x: position.x,
      z: position.z,
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
   * ---------------------------------------------------------------------------
   * Send player move packages
   * ---------------------------------------------------------------------------
   */

  /**
   * sendRelativeEntityMove - send a relative entity move package
   *
   * @param {LivingEntity} entity the entity instance
   *
   * @return {type} Description
   */
  sendRelativeEntityMove(entity) {
    return this.sendPackage("rel_entity_move", {
      entityId: entity.id,
      dX: entity.packagePosition.x,
      dY: entity.packagePosition.y,
      dZ: entity.packagePosition.z,
      onGround: entity.position.onGround
    });
  }


  /**
   * sendEntityLook - send entity look package
   *
   * @param {LivingEntity} entity the entity instance
   *
   * @return {type} Description
   */
  sendEntityLook(entity) {
    return this.sendPackage("entity_look", {
      entityId: entity.id,
      yaw: entity.packagePosition.yaw,
      pitch: entity.packagePosition.pitch,
      onGround: entity.position.Ground
    });
  }


  /**
   * sendEntityMoveLook - send a entity look and move package
   *
   * @param {LivingEntity} entity the entity instance
   *
   * @return {type} Description
   */
  sendEntityMoveLook(entity) {
    return this.sendPackage("entity_move_look", {
      entityId: entity.id,
      dX: entity.packagePosition.x,
      dY: entity.packagePosition.y,
      dZ: entity.packagePosition.z,
      yaw: entity.packagePosition.yaw,
      pitch: entity.packagePosition.pitch,
      onGround: entity.position.Ground
    });
  }


  /**
   * sendEntityHeadLocation - set the entity head location
   *
   * @param {LivingEntity} entity th entity instance
   *
   * @return {type} Description
   */
  sendEntityHeadLocation(entity) {
    return this.sendPackage("entity_head_rotation", {
      entityId: entity.id,
      headYaw: entity.packagePosition.yaw
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
