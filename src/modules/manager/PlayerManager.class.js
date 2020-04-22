const EntityManager = require("EntityManager.class.js");

class PlayerManager extends EntityManager {
  constructor() {

  }

  /**
   * addEntity - add a new player to manager
   *
   * @param {Player} player The player to add
   *
   * @return {type} Description
   */
  addPlayer(player) {
    this.addEntity(player);
  }


  /**
   * removePlayer - remove a player from list
   *
   * @param {Player} player The player to remove
   *
   * @return {type} Description
   */
  removePlayer(player) {
    this.removeEntity(player);
  }


  /**
   * removePlayerById - Remove a specific player by id
   *
   * @param {String} id Description
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
