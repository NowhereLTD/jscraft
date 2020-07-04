const Position = require("../Utils/PlayerPosition.class.js");
const EventHandler = require("events");

/**
 * Entity - Representate a Entity
 */
class Entity extends EventHandler {

  /**
   * constructor - Init Entity
   *
   * @param {number} id   The Entity id
   * @param {number} uuid The uuid from Entity
   * @param {number} type The Entity type
   *
   */
  constructor(id, uuid, type) {
    super();
    this.id = id;
    this.uuid = uuid;
    this.type = type;
    this.position = new Position();
  }
}

module.exports = Entity;
