const World = require("./World.class.js");
const Vec3 = require("vec3");
const SQLite = require("sqlite3");

class WorldManager {

  constructor(server) {
    this.server = server;
    this.worlds = [];
    this.db = new SQLite.Database("WorldManager.db");
  }

  defaultWorld() {
    this.createWorld("world");
  }

  createWorld(worldName) {
    console.log("Start create the world '" + worldName + "' ...");
    // Create Table in Database
    //console.log("CREATE TABLE " + worldName + " IF NOT EXISTS;");
    this.db.exec("CREATE TABLE IF NOT EXISTS world_" + worldName + "_chunks (name VARCHAR(32), chunkX INT, chunkZ INT, chunkDump TEXT);");

    let world = new World(this.server, worldName, this.db);

    world.createSpawnChunks();
    this.worlds[world.name] = world;

    console.log("The creation of world '" + worldName + "' finished!");
  }

  getWorld(worldName) {
    return this.worlds[worldName];
  }
};

module.exports = WorldManager;
