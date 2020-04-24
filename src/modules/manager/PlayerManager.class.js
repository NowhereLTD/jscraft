const EntityManager = require("./EntityManager.class.js");
const Player = require("../Entity/Player.class.js");

class PlayerManager extends EntityManager {
  constructor(server) {
    super(server);
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
   * @param {number} id The player id
   *
   * @return {type} Description
   */
  removePlayerById(id) {
    this.removeEntity(id);
  }


  /**
   * getPlayer - get a player by id
   *
   * @param {number} id The player id
   *
   * @return {Player} the player from map
   */
  getPlayer(id) {
    this.getEntity(id);
  }


  /**
   * getAllPlayers - Get a list with all players
   *
   * @return {array} A list with all players
   */
  getAllPlayers() {
    return this.getAllEntitys();
  }


  /**
   * createPlayer - Create a new player
   *
   * @param {MCClient} client A minecraft client
   *
   * @return {Player} return the created player
   */
  createPlayer(client) {
    let player = new Player(client, this.server);
    this.addPlayer(player);
    player.login();
    return player;
  }


  /**
   * deletePlayer - Delete a player
   *
   * @param {Player} player the player
   *
   * @return {type} Description
   */
  deletePlayer(player) {
    this.removePlayer(player);
  }
}

module.exports = PlayerManager;
