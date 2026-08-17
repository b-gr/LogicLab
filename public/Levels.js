import Level from "./Level.js"

export default class Levels {
    constructor() { 
        this.levels = []
    }

    addLevel(level) {
        this.levels.push(level);
    }

    getLevels(){
        return this.levels;
    }

}