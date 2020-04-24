const WorldGenerator = require("./WorldGenerator.class.js");
const Chunk = require("prismarine-chunk")("1.8");
const Vec3 = require("vec3");
const Biome = require("./Biome.class.js");

class World {

    constructor(server, name = "", db, worldProperties = {
        "seed": 4098687348687834,
        "seedMultiplier": 1000000000,
        "smooth": 0.3,
        "flatness": 1.2,
        "treeDestiny": 5,
        "treeDistance": 5,
        "baseHeight": 50,
        "waterHeight": 53
    }) {
        this.worldProperties = worldProperties;
        this.worldGenerator = new WorldGenerator(this, this.worldProperties.seed, this.worldProperties.seedMultiplier, this.worldProperties.smooth, this.worldProperties.flatness, this.worldProperties.treeDestiny, this.worldProperties.treeDistance);
        this.spawnChunk = {
            "x": 0,
            "z": 0
        };
        this.data = [];
        this.chunkList = [];
        this.worldObjecs = [];
        this.name = name;
        this.db = db;

        this.server = server;
        this.levelType = this.server.properties.levelType;
        this.dimension = 0;
        this.difficulty = this.server.properties.difficulty;
    }

    createSpawnChunks() {
        for(let x = (this.spawnChunk.x - 8); x <= (this.spawnChunk.x + 8); x++) {
            for(let z = (this.spawnChunk.z - 8); z <= (this.spawnChunk.z + 8); z++) {
                this.createChunk(x, z);
            }
        }
    }

    createChunk(chunkX, chunkZ) {
        this.worldGenerator.generateChunk(chunkX, chunkZ);
    }

    setBlock(vec, block){
        let endVec = this.getAbsoluteToRelativePosition(vec);
        if(this.chunkList[endVec.chunkVec.x] && this.chunkList[endVec.chunkVec.x][endVec.chunkVec.z]){
            let chunk = this.chunkList[endVec.chunkVec.x][endVec.chunkVec.z];
            chunk.setBlockType(new Vec3(endVec.relativeChunkVec.x, endVec.relativeChunkVec.y, endVec.relativeChunkVec.z), block.type);
        }else{
            //throw new Exception("ChunkNotFoundException", "Cannot found Chunk X: " + endVec.chunkVec.x + ", Z: " + endVec.chunkVec.z);
        }
    }

    getBlock(vec){
        let endVec = this.getAbsoluteToRelativePosition(vec);
        if(this.chunkList[endVec.chunkVec.x] && this.chunkList[endVec.chunkVec.x][endVec.chunkVec.z]){
            let chunk = this.chunkList[endVec.chunkVec.x][endVec.chunkVec.z];
            return chunk.getBlockType(new Vec3(endVec.relativeChunkVec.x, endVec.relativeChunkVec.y, endVec.relativeChunkVec.z));
        }else{
            //throw new Exception("ChunkNotFoundException", "Cannot found Chunk X: " + endVec.chunkVec.x + ", Z: " + endVec.chunkVec.z);
        }
    }

    getAbsoluteToRelativePosition(vec){
        let x = vec.x;
        let y = vec.y;
        let z = vec.z;
        let chunkX = Math.floor(x/16);
        let chunkZ = Math.floor(z/16);
        x = x%16;
        z = z%16;
        let relativeChunkVec = new Vec3(x, y, z);
        let chunkVec = new Vec3(chunkX, y, chunkZ);
        return {"chunkVec": chunkVec, "relativeChunkVec": relativeChunkVec};
    }

    saveChunkInDatabase(chunk, chunkX, chunkZ){
        this.db.exec("INSERT INTO world_" + this.name +  "_chunks (name, chunkX, chunkZ, chunkDump) VALUES ('" + this.name + "', " + chunkX + ", " + chunkZ + ", '" + JSON.stringify(chunk.dump().toJSON()) + "');");
        return true;
    }

    loadChunkFromDatabase(chunkX, chunkZ){
        return new Promise(resolve => {

            this.db.get("SELECT chunkDump FROM world_" + this.name +  "_chunks WHERE chunkX=" +chunkX+ " AND chunkZ=" + chunkZ + ";", (error, data) => {
                if(error){
                    resolve(false);
                    return;
                }
                if(!data){
                    resolve(false);
                    return;
                }

                if(!this.chunkList[chunkX]){
                    this.chunkList[chunkX] = [];
                }

                this.chunkList[chunkX][chunkZ] =  new Chunk();

                let buffer = Buffer.from(JSON.parse(data.chunkDump));
                this.chunkList[chunkX][chunkZ].load(buffer);

                for (let x = 0; x < 16; x++) {
                    for (let z = 0; z < 16; z++){
                        for (let y = 0; y < 256; y++) {
                            this.chunkList[chunkX][chunkZ].setSkyLight(new Vec3(x, y, z), 15)
                        }
                    }
                }
                resolve(true);
            });

        });
    }


    async buildChunk(chunkX, chunkZ, biome = new Biome()) {
        if(await this.loadChunkFromDatabase(chunkX, chunkZ)){
            //console.log("Load chunk "+chunkX + " - " + chunkZ);
            return true;
        }

        //console.log("Generate chunk "+chunkX + " - " + chunkZ);

        if(!this.chunkList[chunkX])
            this.chunkList[chunkX] = [];

        let chunk = new Chunk();
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++){
                for(let y = 0; y <= this.data[chunkX][chunkZ][x][z]; y++) {
                    for(let layerID in biome.worldLayer){
                        let layer = biome.worldLayer[layerID];
                        if(y <= this.data[chunkX][chunkZ][x][z] - layer.start){
                            if(y >= this.data[chunkX][chunkZ][x][z] - layer.start - layer.size){
                                chunk.setBlockType(new Vec3(x, y, z), layer.block);
                            }
                        }
                    }
                }

                for(let y = this.worldProperties.waterHeight; y > this.data[chunkX][chunkZ][x][z]; y--) {
                    if(chunk.getBlockType(new Vec3(x, y, z)) === 0){

                        if(y - 1 >= 0) {
                            if(chunk.getBlockType(new Vec3(x, y - 1, z)) !== 9 && chunk.getBlockType(new Vec3(x, y - 1, z)) !== 0) {
                                chunk.setBlockType(new Vec3(x, y - 1, z), 13);
                                chunk.setBlockType(new Vec3(x, y - 2, z), 13);
                                chunk.setBlockType(new Vec3(x, y - 3, z), 13);
                                chunk.setBlockType(new Vec3(x, y - 4, z), 13);
                            }
                        }

                        chunk.setBlockType(new Vec3(x, y, z), 9);
                    }
                }



                chunk.setBlockType(new Vec3(x, 0, z), 7);
                for (let y = 0; y < 256; y++) {
                    chunk.setSkyLight(new Vec3(x, y, z), 15)
                }
            }
        }


        // Add Chunk to Chunk List
        this.chunkList[chunkX][chunkZ] = chunk;
        console.log(this.chunkList);
        this.saveChunkInDatabase(chunk, chunkX, chunkZ);
    }
};

module.exports = World;
