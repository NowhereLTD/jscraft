const EntityManager = require("./EntityManager.class.js");
const Player = require("../Entity/Player.class.js");
const Position = require("../Utils/Position.class.js");

/**
 * PlayerManager - Manage player
 * @extends EntityManager
 */
class PlayerManager extends EntityManager {
  /**
   * constructor - Init the player manager
   *
   * @param {Server} server the base server
   *
   */
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
   * getPlayersInRadius - get a list with all players in a specific radius from position
   *
   * @param {Position} position the middlepoint
   * @param {number}   distance the maximal distance between middlepoint and player
   *
   * @return {array} A list with all players in radius
   */
  getPlayersInRadius(position, distance) {
    let players = [];
    this.getAllPlayers().forEach((player, i) => {
      if(this.distanceBetweenPosition(player.position, position) < distance) {
        players.push(player);
      }
    });
    return players;
  }


  /**
   * distanceBetweenPosition - Get the distance between two positions
   *
   * @param {Position} position1 The first position
   * @param {Position} position2 The second position
   *
   * @return {number} Distance between positions
   */
  distanceBetweenPosition(position1, position2) {
    let deltaX = position1.x - position2.x;
    let deltaY = position1.y - position2.y;
    let deltaZ = position1.z - position2.z;
    return Math.sqrt(deltaX ^ 2 + deltaY ^ 2 + deltaZ ^ 2);
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
