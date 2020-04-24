const FS = require("fs");

class EventHandler {
  constructor(server) {
    this.server = server;
    this.loadEventHandler();
  }

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
