var PlayerMoveEvent = require("./Player/PlayerMoveEvent.class.js")

/**
 * PlayerEventHandler - The PlayerEventHandler
 */
class PlayerEventHandler {
  /**
   * constructor - Init the PlayerEventHandler
   *
   * @param {Server} server The base server
   *
   */
  constructor(server) {
    this.server = server;
    this.server.mc.on("login", (client) => {
      let player = this.server.playerManager.createPlayer(client);

      client.on("packet", (data, meta) => {
        player.events.emit("packet_" + meta.name, data, meta);
      });

      client.on("end", () => {
        this.server.playerManager.deletePlayer(player);
      });

      this.registerPlayerEvents(player);
    });
  }


  /**
   * registerPlayerEvents - Register all player events
   *
   * @param {Player} player The player to register events
   *
   */
  registerPlayerEvents(player) {
    let playerMoveEvent = new PlayerMoveEvent(this.server, player);
  }
}

module.exports = PlayerEventHandler;
