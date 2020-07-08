const Manager = require("./Manager.class.js");
const WindowPackageHandler = require("../../Packages/PackageHandler/Player/WindowPackageHandler.class.js");

class WindowManager extends Manager {
  constructor() {
      super();
  }

  /**
   * addWindow - add a new window to manager
   *
   * @param {Window} window The window
   *
   * @return {type} Description
   */
  addWindow(window) {
    this.addObject(window.id, window);
  }


  /**
   * removeWindow - remove a window from list
   *
   * @param {Window} window The window to remove
   *
   * @return {type} Description
   */
  removeWindow(window) {
    this.removeObject(window.id);
  }


  /**
   * removeWindowById - Remove a specific window by id
   *
   * @param {number} id the window id
   *
   * @return {type} Description
   */
  removeWindowById(id) {
    this.removeObject(id);
  }


  /**
   * getWindow - get a window by id
   *
   * @param {number} id The window id
   *
   * @return {Window} return the window
   */
  getWindow(id) {
    this.getObject(id);
  }


  /**
   * getAllWindows - Get a list with all windows
   *
   * @return {array} A list with all windows
   */
  getAllWindows() {
    return this.getAllObjects();
  }


  /**
   * createWindow - create a new window
   *
   * @param {Player}     player   The owner player
   * @param {number}     size     The count of window slots
   * @param {Entity}     entity   the entity
   * @param {WindowType} type     the window type
   * @param {string}     [title=] custom window title
   * @param {number}     [id]     The window id
   *
   * @return {type} Description
   */
  createWindow(player, size, entity, type, title = "", id = this.getAllWindows().length) {
    let window = new WindowPackageHandler(player, id, size, entity, type, title);
    this.addWindow(window);
    return window;
  }
}

module.exports = WindowManager;
