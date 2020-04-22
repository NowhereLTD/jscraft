const fs = require("fs");

class JSONLoader{
    constructor(){
        this.data = {};
        this.path = "";
    }
    load(path){
        this.path = path;
        if(this.path){
            this.data = JSON.parse(fs.readFileSync(path));
        }
        return this.data;
    }
};

module.exports = JSONLoader;
