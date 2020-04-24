const SimplexNoise = require("simplex-noise");
const Biome = require("./Biome.class.js");

class WorldGenerator {
  constructor(world, seed = Math.floor(Math.random() * 100000), seedMultipler = 1000000000, smooth = 0.3, flatness = 1, treeDensity = 10, treeDistance = 0) {
    this.world = world;
    this.seed = seed;
    this.seedMultipler = seedMultipler;
    this.buildingSeed = this.seed;
    this.simplex = new SimplexNoise(Math.floor(Math.sin(this.seed) * this.seedMultipler));
    this.smooth = smooth;
    this.flatness = flatness;
    this.treeDensity = treeDensity;
    this.treeDistance = treeDistance;
  }

  generateChunk(chunkX, chunkZ) {
    if (!this.world.data[chunkX]) {
      this.world.data[chunkX] = [];
    }

    if (!this.world.data[chunkX][chunkZ]) {
      this.world.data[chunkX][chunkZ] = [];
    }
    for (let x = 0; x < 16; x++) {
      let absX = chunkX * 16 + x;
      this.world.data[chunkX][chunkZ][x] = [];
      for (let z = 0; z < 16; z++) {
        let absZ = chunkZ * 16 + z;
        let simplexData = this.simplex.noise2D(this.smooth * (absX / 16 - 0.5), this.smooth * (absZ / 16 - 0.5)); +
        0.5 * this.simplex.noise2D((this.smooth * 2) * (absX / 16 - 0.5), (this.smooth * 2) * (absZ / 16 - 0.5)); +
        0.25 * this.simplex.noise2D((this.smooth * 4) * (absX / 16 - 0.5), (this.smooth * 4) * (absZ / 16 - 0.5));

        if (simplexData < 0) {
          simplexData = -1 * Math.pow(-simplexData, this.flatness);
        } else {
          simplexData = Math.pow(simplexData, this.flatness);
        }
        this.world.data[chunkX][chunkZ][x][z] = Math.round(simplexData * 10) + 50;
      }
    }
    this.generateTrees(chunkX, chunkZ);


    this.world.buildChunk(chunkX, chunkZ, new Biome(0, 0, 0, 0, "LITLE_OAK", {
      "sand": {
        "start": 0,
        "size": 4,
        "block": 12
      },
      "stone": {
        "start": 4,
        "size": 50,
        "block": 1
      }
    }));
  }

  generateTrees(chunkX, chunkZ) {

    if (!this.world.worldObjecs[chunkX]) {
      this.world.worldObjecs[chunkX] = [];
    }
    if (!this.world.worldObjecs[chunkX][chunkZ]) {
      this.world.worldObjecs[chunkX][chunkZ] = [];
    }

    for (let treeCount = 0; treeCount <= this.treeDensity; treeCount++) {
      let treePosX = Math.floor(Math.sin(this.buildingSeed) * 8);
      this.buildingSeed++;
      let treePosZ = Math.floor(Math.sin(this.buildingSeed) * 8);
      if (treePosX < 0) {
        treePosX = Math.abs(treePosX);
      }
      if (treePosZ < 0) {
        treePosZ = Math.abs(treePosZ);
      }

      let checkDis = true;

      for (let i = 0; i < this.world.worldObjecs[chunkX][chunkZ].length; i++) {
        if (Math.sqrt(Math.pow(treePosX - this.world.worldObjecs[chunkX][chunkZ][i].x, 2) + Math.pow(treePosZ - this.world.worldObjecs[chunkX][chunkZ][i].z, 2)) < this.treeDistance) {
          checkDis = false;
        }
      }
      if (checkDis) {
        this.world.worldObjecs[chunkX][chunkZ].push({
          "x": treePosX,
          "z": treePosZ,
          "type": "tree",
          "chunkX": chunkX,
          "chunkZ": chunkZ
        });
      }

      this.buildingSeed++;
    }
  }
}

module.exports = WorldGenerator;
