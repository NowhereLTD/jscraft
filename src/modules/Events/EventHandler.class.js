const FS = require("fs");


/**
 * EventHandler - Load and Handle Events
 */
class EventHandler {
  /**
   * constructor - Init EventHandler
   *
   * @param {Server} server The server
   *
   */
  constructor(server) {
    this.server = server;
    this.loadEventHandler();
  }


  /**
   * loadEventHandler - Load all EventHandlers
   *
   */
  loadEventHandler() {
    FS.readdir("./src/modules/Events", function (err, files) {
      if(err) {
        console.error(err);
        return false;
      }
      files.forEach((file, i) => {
        if(file == "EventHandler.class.js") {
          return false;
        }
        let Handler = require("./" + file);
        let event = new Handler(this.server);
      });

    }.bind(this));
  }
}

module.exports = EventHandler;
