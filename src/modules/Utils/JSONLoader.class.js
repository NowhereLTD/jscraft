const fs = require("fs");

/**
 * JSONLoader - Load JSON files from system
 */
class JSONLoader{
    /**
     * constructor - Init loader
     *
     */
    constructor(){
        this.data = {};
        this.path = "";
    }

    /**
     * load - Load a file
     *
     * @param {String} path The file to load
     *
     */
    load(path){
        this.path = path;
        if(this.path){
            this.data = JSON.parse(fs.readFileSync(path));
        }
        return this.data;
    }
};

module.exports = JSONLoader;
