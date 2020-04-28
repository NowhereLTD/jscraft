const Window = require("../../../modules/Utils/Player/Window.class.js");

class WindowPackageHandler extends Window {
  constructor(player, id, size, entity, type, title) {
    super(id, size, entity, type, title);
    this.player = player;
  }

  update() {
    this.player.packageHandler.openWindow(this);
    for(let i=0; i<this.slots.length; i++) {
      this.player.packageHandler.setWindowSlot(this, i, this.slots[i].getJSON(this.player));
    }
  }
}

module.exports = WindowPackageHandler;
