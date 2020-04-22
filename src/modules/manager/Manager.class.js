
/**
 * Manager - A base manager class
 */
class Manager {

  constructor() {
    this.map = [];
  }

  /**
   * addObject - Add a new object
   *
   * @param {String} key    A key value
   * @param {Object} object The object to save
   *
   * @return {type} Description
   */
  addObject(key, object) {
    this.map[key] = object;
  }


  /**
   * removeObject - Remove an object
   *
   * @param  {type} key Object index
   *
   * @return {type}     description
   */
  removeObject(key) {
    delete(this.map[key]);
  }

  /**
   * getObject - Get a object by key
   *
   * @param {String} key Object index
   *
   * @return {Object} Return the object or null
   */
  getObject(key) {
    return this.map[key] ? this.map[key] : null;
  }


  /**
   * getAllObjects - Return a Array with all objects
   *
   * @return {array} all objects
   */
  getAllObjects() {
    return this.map;
  }


  /**
   * containsObject - Check if key exists
   *
   * @param  {String} key Object index
   *
   * @return {boolean} Boolean if key exists
   */
  containsObject(key) {
    return this.map.includes(key);
  }


  /**
   * clear - Clear the list
   *
   * @return {type} Description
   */
  clear() {
    this.map = [];
  }
}

module.exports = Manager;
