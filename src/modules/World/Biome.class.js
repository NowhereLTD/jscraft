const Material = require("../../Enums/Material.enum.js");


class Biome {
  constructor(smooth = 0, flatness = 0, treeDensity = 0, treeDistance = 0, treeType = "LITLE_OAK", worldLayer = {"sand1": {"start": 0, "size": 1, "block": Material.SAND}, "sand": {"start": 1, "size": 3, "block": Material.SAND}, "stone": {"start": 4, "size": 50, "block": Material.STONE}}) {
    this.smooth = smooth;
    this.flatness = flatness;
    this.treeDensity = treeDensity;
    this.treeDistance = treeDistance;
    this.treeType = treeType;
    this.worldLayer = worldLayer;
  }
}

module.exports = Biome;
