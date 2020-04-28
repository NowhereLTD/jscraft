
/**
 * Window - Representate a window
 */
class Window {
  /**
   * constructor - Init the window object
   *
   * @param {number}     id     the window id
   * @param {number}     size   the number of slots
   * @param {Entity}     entity player or horse entity
   * @param {WindowType} type   the window type
   * @param {String}     title  the window title
   *
   * @return {type} Description
   */
  constructor(id, size, entity, type, title) {
    this.id = id;
    this.size = size;
    this.entity = entity;
    this.type = type;
    this.title = title;
    this.slots = [];
  }

  /**
   * addSlot - Add an slot to inventory
   *
   * @param {Slot} slot the slot who add
   *
   * @return {type} Description
   */
  addSlot(slot) {
    this.slots.push(slot);
  }

  /**
   * setSlot - Set a specific slot
   *
   * @param {number} id   the number to set slot
   * @param {Slot}   slot the slot to set
   *
   * @return {type} Description
   */
  setSlot(id, slot) {
    this.slots[id] = slot;
  }

  /**
   * removeSlot - remove a slot with an specific id
   *
   * @param {number} id the slot id
   *
   * @return {type} Description
   */
  removeSlot(id) {
    delete(this.slots[id]);
  }


  /**
   * clear - Clear the window
   *
   * @return {type} Description
   */
  clear() {
    this.slots = [];
  }
}

module.exports = Window;
