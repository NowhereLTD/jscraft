const Position = require("../Utils/Position.class.js");

class Entity {
  constructor(id, uuid, type) {
    this.id = id;
    this.uuid = uuid;
    this.type = type;
    this.position = new Position();
  }
}

module.exports = Entity;
