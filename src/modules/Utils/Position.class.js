
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
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * getChunk - Get the chunk from location
   *
   * @return {JSON} x and z coordinate in json ({x: <value>, z: <value>})
   */
  getChunk() {
    return {
      x: Math.floor(this.x / 16),
      z: Math.floor(this.z / 16)
    }
  }


  /**
   * distanceTo - calculate the distance between this and another position
   *
   * @param {Position} position the other position to calculate the distance
   *
   * @return {number} the distance
   */
  distanceTo(position) {
    let deltaX = position.x - this.x;
    let deltaY = position.y - this.y;
    let deltaZ = position.z - this.z;

    return Math.sqrt(deltaX ^ 2 + deltaY ^ 2 + deltaZ ^ 2);
  }
}

module.exports = Position;
