const Position = require("../Utils/Position.class.js");


/**
 * Entity - Representate a Entity
 */
class Entity {

  /**
   * constructor - Init Entity
   *
   * @param {number} id   The Entity id
   * @param {number} uuid The uuid from Entity
   * @param {number} type The Entity type
   *
   */
  constructor(id, uuid, type) {
    this.id = id;
    this.uuid = uuid;
    this.type = type;
    this.position = new Position();
  }
}

module.exports = Entity;
