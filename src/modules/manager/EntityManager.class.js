const Manager = require("Manager.class.js");


/**
 * EntityManager - Manage all Entitys
 * @extends Manager
 */
class EntityManager extends Manager {
  constructor() {

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
   * @return {The object from map} Description
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


}