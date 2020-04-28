const Position = require("./Position.class.js");

/**
 * PlayerPosition - Representate a player position
 * @extends Position
 */
class PlayerPosition extends Position{
  /**
   * constructor - Init the player position
   *
   * @param {number}  [x=0]            x coordinate
   * @param {number}  [y=0]            y coordinate
   * @param {number}  [z=0]            z coordinate
   * @param {number}  [pitch=0]        pitch of player
   * @param {number}  [yaw=0]          yaw of player
   * @param {string}  [world=world]    players world
   * @param {boolean} [onGround=false] if player is on ground
   *
   * @return {type} Description
   */
  constructor(x = 0, y = 0, z = 0, pitch = 0, yaw = 0, world = "world", onGround = false) {
    super(x, y, z);
    this.pitch = pitch;
    this.yaw = yaw;
    this.world = world;
    this.onGround = onGround;
  }
}

module.exports = PlayerPosition;
