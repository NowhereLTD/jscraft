const Entity = require("./Entity.class.js");
const Position = require("../Utils/Position.class.js");

/**
 * LivingEntity - Representate a LivingEntity
 * @extends Entity
 */
class LivingEntity extends Entity {
  constructor(id, uuid, type) {
    super(id, uuid, type);
    this.packagePosition = new Position();
  }
}

module.exports = LivingEntity;
