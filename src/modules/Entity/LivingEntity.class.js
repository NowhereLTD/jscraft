const Entity = require("Entity.class.js");

class LivingEntity extends Entity {
  constructor(id, uuid, type) {
    super(id, uuid, type);
  }
}

module.exports = LivingEntity;
