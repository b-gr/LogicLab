import test from "node:test";
import assert from "node:assert";
import levelData from "../public/levelData.json" with {type: 'json'};


let levels = levelData;


const buildRequiredProperties = [
    "id",
    "chapter",
    "level",
    "name",
    "description",
    "mode",
    "startNodes",
    "endNodes",
    "expectedEndStates",
    "availableGates", 
    "requiredGates",
    "maxConnections",
    "commentCorrect",
    "commentWrong",
    "commentHint"
]


const predictRequiredProperties = [
    "id",
    "chapter",
    "level",
    "name",
    "description",
    "mode",
    "startNodes",
    "endNodes",
    "expectedEndStates",
    "availableGates", 
    "startingGates",
    "startingConnections",
    "maxConnections",
    "commentCorrect",
    "commentWrong",
    "commentHint",
    "options"
]



const sandboxRequiredProperties = [
    "id",
    "chapter",
    "level",
    "name",
    "description",
    "mode",
    "startNodes",
    "endNodes",
    "availableGates", 
]


for (let level of levels) {
    test (`Level ${level.id} is a ${level.mode} type level and has required properties`, () => {
        if (level.mode === "build"){

            for (let property of buildRequiredProperties) {
                assert.match(`"${property}"`, level, "No string found")
            }

        }

        if (level.mode === "predict") {
            //some test

        }

        if (level.mode === "sandbox"){
            //some code

        }
    })
}