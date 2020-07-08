
/**
 *
 */
class Color {

  /**
   * constructor - Init Color
   */
  constructor() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
  }


  /**
   * getColorCode - Return a color code for NBT data
   *
   * @return integer
   */
  getColorCode() {
    return (this.red << 16) + (this.green << 8) + this.blue;
  }
}
