const ItemStructure = require("../../Model/NBT/ItemStructure.class.js");

/**
 * Slot - A slot in inventory
 */
class Slot {

  /**
   * constructor - Init slot
   *
   * @param {type}   type      The slot type
   * @param {number} [count=1] The number of stack
   *
   * @return {type} null
   */
  constructor(type, count = 1) {
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
      data["meta"] = {"metadata": 0, "displayName": "test"};
      let structure = new ItemStructure();
      structure.display.display.name = "Hallo";
      //structure.display.display.lore.push("Line 1");
      //structure.display.display.lore.push("Line 2");
      structure.createEnchantment(0, 1);
      this.nbt = structure.getNBT();

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
