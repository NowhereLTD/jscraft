const Manager = require("./Manager.class.js");
const { UUID } = require("uuidv1");

/**
 * EntityManager - Manage all Entitys
 * @extends Manager
 */
class EntityManager extends Manager {
  constructor(server) {
    super(server);
  }

  /**
   * addEntity - add a new Entity to manager
   *
   * @param {Entity} entity The entity
   *
   * @return {type} Description
   */
  addEntity(entity) {
    this.addObject(entity.id, entity);
  }


  /**
   * removeEntity - remove a entity from list
   *
   * @param {Entity} entity The entity to remove
   *
   * @return {type} Description
   */
  removeEntity(entity) {
    this.removeObject(entity.id);
  }


  /**
   * removeEntityById - Remove a specific entity by id
   *
   * @param {number} id the entity id
   *
   * @return {type} Description
   */
  removeEntityById(id) {
    this.removeObject(id);
  }


  /**
   * getEntity - get a entity by id
   *
   * @param {number} id The entity id
   *
   * @return {Entity} return the entity
   */
  getEntity(id) {
    this.getObject(id);
  }


  /**
   * getAllEntitys - Get a list with all entitys
   *
   * @return {array} A list with all entitys
   */
  getAllEntitys() {
    return this.getAllObjects();
  }


  /**
   * createEntity - Create a new entity
   *
   * @param {MobType} type The entity type
   * @param {number} [id=] the entity id
   *
   * @return {Entity} the created entity
   */
  createEntity(type, id = this.getAllEntitys().length, uuid = UUID()) {
    let entity = new Entity(id, uuid, type);
    this.addEntity(entity);
    return entity;
  }


  /**
   * createLivingEntity - Create a living entity
   *
   * @param {MobType} type The entity type
   * @param {number} [id=] Description
   *
   * @return {LivingEntity} the created living entity
   */
  createLivingEntity(type, id = this.getAllEntitys().length, uuid = UUID()) {
    let entity = new LivingEntity(id, uuid, type);
    this.addEntity(entity);
    return entity;
  }


}

module.exports = EntityManager;
