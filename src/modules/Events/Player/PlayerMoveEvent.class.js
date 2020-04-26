
class PlayerMoveEvent {
  constructor(server, player) {
    this.server = server;
    this.player = player;
    this.player.events.on("packet_position", (data) => {
      this.receivePacketPosition(data);
    });
    this.player.events.on("packet_look", (data) => {
      this.receivePacketLook(data);
    });
    this.player.events.on("packet_position_look", (data) => {
      this.receivePacketMove(data);
    });
    this.player.events.on("packet_flying", (data) => {
      this.receivePacketFlying(data);
    });
  }

  /**
   * receivePacketPosition - If player change position
   *
   * @param {JSON} data     The packet data
   *
   * @return {type} Description
   */
  receivePacketPosition(data) {
    this.player.packagePosition.x = data.x * 32 - this.player.position.x * 32;
    this.player.packagePosition.y = data.y * 32 - this.player.position.y * 32;
    this.player.packagePosition.z = data.z * 32 - this.player.position.z * 32;

    this.player.position.x = data.x;
    this.player.position.y = data.y;
    this.player.position.z = data.z;
    this.player.onGround = data.onGround;

    this.player.events.emit("player_walk", this.player);

    this.server.playerManager.getPlayersInRadius(this.player.position, 16).forEach((p, i) => {
      if(p !== this.player) {
        p.packageHandler.sendEntityMoveLook(this.player);
      }
    });
  }


  /**
   * receivePacketLook - If player look change
   *
   * @param {JSON} data     The packet data
   *
   * @return {type} Description
   */
  receivePacketLook(data) {
    this.player.packagePosition.yaw = this.convAngle(data.yaw);
    this.player.packagePosition.pitch = this.convAngle(data.pitch);

    this.player.position.yaw = data.yaw;
    this.player.position.pitch = data.pitch;
    this.player.onGround = data.onGround;

    this.player.events.emit("player_spin", this.player);

    this.server.playerManager.getPlayersInRadius(this.player.position, 16).forEach((p, i) => {
      if(p !== this.player) {
        p.packageHandler.sendEntityMoveLook(this.player);
        p.packageHandler.sendEntityHeadLocation(this.player);
      }
    });
  }


  /**
   * receivePacketMove - If player move
   *
   * @param {JSON} data     The packet data
   *
   * @return {type} Description
   */
  receivePacketMove(data) {
    this.player.packagePosition.x = data.x * 32 - this.player.position.x * 32;
    this.player.packagePosition.y = data.y * 32 - this.player.position.y * 32;
    this.player.packagePosition.z = data.z * 32 - this.player.position.z * 32;
    this.player.packagePosition.yaw = this.convAngle(data.yaw);
    this.player.packagePosition.pitch = this.convAngle(data.pitch);

    this.player.position.x = data.x;
    this.player.position.y = data.y;
    this.player.position.z = data.z;
    this.player.position.yaw = data.yaw;
    this.player.position.pitch = data.pitch;
    this.player.onGround = data.onGround;

    this.player.events.emit("player_move", this.player);

    this.server.playerManager.getPlayersInRadius(this.player.position, 16).forEach((p, i) => {
      if(p !== this.player) {
        p.packageHandler.sendEntityMoveLook(this.player);
        p.packageHandler.sendEntityHeadLocation(this.player);
      }
    });
  }


  /**
   * receivePacketFlying - Handle player flying event
   *
   * @param {JSON} data     The packet data
   *
   * @return {type} Description
   */
  receivePacketFlying(data) {
    this.player.position.x = data.x;
    this.player.position.y = data.y;
    this.player.position.z = data.z;
    this.player.position.yaw = data.yaw;
    this.player.position.pitch = data.pitch;
    this.player.onGround = data.onGround;
    this.player.events.emit("player_flight", this.player);
  }

  /**
   * convAngle - Math function to convert yaw and pitch coordinates
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


module.exports = PlayerMoveEvent;
