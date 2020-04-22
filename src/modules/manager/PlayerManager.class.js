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
     * @param {number} id the player entity id
     *
     * @return {type} Description
     */
    removePlayerById(id) {
      this.removeEntity(id);
    }


    /**
     * getPlayer - get a player by id
     *
     * @param {number} id The entity id
     *
     * @return {Player} the player from map
     */
    getPlayer(id) {
      this.getEntity(id);
    }


    /**
     * getAllPlayer - Get a list with all players
     *
     * @return {array} A list with all players
     */
    getAllPlayer() {
      return this.getAllEntitys();
    }
}
