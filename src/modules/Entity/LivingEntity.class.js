const Entity = require("./Entity.class.js");


/**
 * LivingEntity - Representate a LivingEntity
 * @extends Entity
 */
class LivingEntity extends Entity {
  constructor(id, uuid, type) {
    super(id, uuid, type);
  }
}

module.exports = LivingEntity;
