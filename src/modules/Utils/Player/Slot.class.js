

/**
 * Slot - A slot in inventory
 */
class Slot {
  /**
   * constructor - Init slot
   *
   * @param {number} id          The id of slot
   * @param {String} displayName The slot display name
   * @param {number} stackSize   the maximal stack size of slot
   * @param {String} name        the slot name
   * @param {type} variations  Description
   *
   * @return {type} Description
   */
  constructor(id, type, count) {
    this.id = id;
    this.type = type;
    this.count = count;
    this.displayName = "";
    this.stackSize = 64;
    this.name = "";
    this.nbt = null;
    this.meta = null;
    this.variations = [];
  }


  /**
   * getJSON - get the slot as json data
   *
   * @return {JSON} the raw json data
   */
  getJSON(player) {
    let structure = player.server.packageStructure;
    let slotPackageStructure = null;
    let data = {};

    if(structure[player.client.version]){
      slotPackageStructure = structure[player.client.version]["player"]["inventory"]["slot"];
    }
    if(slotPackageStructure == null){
      slotPackageStructure = structure["default"]["player"]["inventory"]["slot"];
    }

    if(slotPackageStructure != null) {
      // Return default on data not present
      if(this.type == null || this.count == null) {
        return slotPackageStructure["null"];
      }

      // Set the base data
      data[slotPackageStructure["type"]] = this.type;
      data[slotPackageStructure["count"]] = this.count;

      if(slotPackageStructure["meta"] != null && this.meta != null) {
        data[slotPackageStructure["meta"]] = this.meta;
      }
      if(slotPackageStructure["nbt"] != null && this.nbt != null) {
        data[slotPackageStructure["nbt"]] = this.nbt;
      }
      if(slotPackageStructure["present"] != null) {
        data["present"] = slotPackageStructure["present"];
      }
    }else {
      console.error("Please check your configuration [/etc/minecraft-data/structure/structure.json]");
      return {};
    }
    return data;
  }
}

module.exports = Slot;
