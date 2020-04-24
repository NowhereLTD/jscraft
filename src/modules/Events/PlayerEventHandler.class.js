
class PlayerEventHandler {
  constructor(server) {
    this.server = server;
    this.server.mc.on("login", (client) => {
      this.server.playerManager.createPlayer(client);
    });
  }
}

module.exports = PlayerEventHandler;
