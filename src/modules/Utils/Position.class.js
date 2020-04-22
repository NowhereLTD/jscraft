
class Position {

  /**
   * constructor - Description
   *
   * @param {number} [x=0]     x coordinate
   * @param {number} [y=0]     y coordinate
   * @param {number} [z=0]     z coordinate
   * @param {number} [pitch=0] pitch direction
   * @param {number} [yaw=0]   yaw direction
   *
   * @return {type} Description
   */
  constructor(x = 0, y = 0, z = 0, pitch = 0, yaw = 0, world = "world") {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pitch = pitch;
    this.yaw = yaw;
    this.world = world;
  }


  getChunk() {
    return {
      x: this.x * 32,
      z: this.z * 32
    }
  }
}

module.exports = Position;
