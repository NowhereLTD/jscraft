
/**
 * PlayerEventHandler - The PlayerEventHandler
 */
class PlayerEventHandler {
  /**
   * constructor - Init the PlayerEventHandler
   *
   * @param {Server} server The base server
   *
   */
  constructor(server) {
    this.server = server;
    this.server.mc.on("login", (client) => {
      let player = this.server.playerManager.createPlayer(client);

      client.on("packet", (data, meta) => {
        player.events.emit("packet_" + meta.name, data, meta);
      });

      client.on("end", () => {
        this.server.playerManager.deletePlayer(player);
      });

      this.registerPlayerEvents(player);
    });
  }


  /**
   * registerPlayerEvents - Register all player events
   *
   * @param {Player} player The player to register events
   *
   */
  registerPlayerEvents(player) {
    player.events.on("", function(data){
      player.position.x = data.x;
      player.position.y = data.y;
      player.position.z = data.z;
      player.packageHandler.setPosition(player.position);
    });
    player.events.on("packet_position", (data) => {
      this.receiveMovement(player, data, true, false);
    });
    player.events.on("packet_look", (data) => {
      this.receiveMovement(player, data, false, true);
    });
    player.events.on("packet_position_look", (data) => {
      this.receiveMovement(player, data, true, true);
    });
    player.events.on("packet_flying", (data) => {
      this.receiveMovement(player, data, false, false);
    });
  }


  /**
   * receiveMovement - Handle the player Movement
   *
   * @param {Player}  player  The player witch is move
   * @param {JSON}    data    A data object
   * @param {boolean} hasPos  Has the player change his position
   * @param {boolean} hasLook has the player look
   *
   * @return {type} Description
   */
  receiveMovement(player, data, hasPos, hasLook) {
    let packetName = undefined;
    let packetData = {};
    if(hasLook && hasPos) {
      let deltaX = data.x * 32 - player.position.x * 32;
      let deltaY = data.y * 32 - player.position.y * 32;
      let deltaZ = data.z * 32 - player.position.z * 32;

      player.position.x = data.x;
      player.position.y = data.y;
      player.position.z = data.z;
      player.position.yaw = data.yaw;
      player.position.pitch = data.pitch;
      player.onGround = data.onGround;

      packetName = "entity_move_look";
      packetData = {
        entityId: player.id,
        dX: deltaX,
        dY: deltaY,
        dZ: deltaZ,
        yaw: this.convAngle(data.yaw),
        pitch: this.convAngle(data.pitch),
        onGround: data.onGround
      };
    } else if(hasLook && !hasPos) {

      player.position.yaw = data.yaw;
      player.position.pitch = data.pitch;
      player.onGround = data.onGround;

      packetName = "entity_look";
      packetData = {
        entityId: player.id,
        yaw: this.convAngle(data.yaw),
        pitch: this.convAngle(data.pitch),
        onGround: data.onGround
      };
    } else if(hasPos && !hasLook) {
      let deltaX = data.x * 32 - player.position.x * 32;
      let deltaY = data.y * 32 - player.position.y * 32;
      let deltaZ = data.z * 32 - player.position.z * 32;
      player.position.x = data.x;
      player.position.y = data.y;
      player.position.z = data.z;
      player.onGround = data.onGround;
      packetName = "rel_entity_move";
      packetData = {
        entityId: player.id,
        dX: deltaX,
        dY: deltaY,
        dZ: deltaZ,
        onGround: data.onGround
      };
    } else {
      player.position.x = data.x;
      player.position.y = data.y;
      player.position.z = data.z;
      player.position.yaw = data.yaw;
      player.position.pitch = data.pitch;
      player.onGround = data.onGround;
    }

    if(packetName !== undefined) {
      if(packetName === "entity_look" || packetName === "entity_move_look") {
        let rotData = {
          entityId: player.id,
          headYaw: this.convAngle(data.yaw)
        };
        this.server.playerManager.getPlayersInRadius(player.position, 16).forEach((p, i) => {
          if(p !== player) {
            console.log("send");
            p.client.sendPacket(packetName, packetData);
            p.client.sendPacket("entity_head_rotation", rotData);
          }
        });
      } else {
        this.server.playerManager.getPlayersInRadius(player.position, 16).forEach((p, i) => {
          if(p !== player) {
            p.client.sendPacket(packetName, packetData);
          }
        });
      }
    }
  }

  /**
   * convAngle - Mathj function to convert yaw and pitch coordinates
   *
   * @param {number} f The number to calculate
   *
   * @return {number} The calculated number
   */
  convAngle(f) {
    let b = Math.floor((f % 360) * 256 / 360);
    if(b < -128) b += 256;
    else if(b > 127) b -= 256;
    return b;
  }
}

module.exports = PlayerEventHandler;
