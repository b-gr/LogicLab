import test, { describe } from "node:test";
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
    test(`Level ${level.id} is a ${level.mode} type level and has required properties`, () => {
        if (level.mode === "build") {
            for (let property of buildRequiredProperties) {
                assert.ok(property in level, `Missing "${property}" in level ${level.id}`);
            }

            assert.equal(typeof level.maxConnections, "number");
            assert.ok(!Array.isArray(level.availableGates))
            assert.equal(typeof level.availableGates, "object");
            assert.ok(!Array.isArray(level.requiredGates))
            assert.equal(typeof level.requiredGates, "object");
        }

        if (level.mode === "predict") {
            for (let property of predictRequiredProperties) {
                assert.ok(property in level, `Missing "${property}" in level ${level.id}`)
            }

            assert.ok(Array.isArray(level.startingGates));
            assert.ok(Array.isArray(level.startingConnections));
            assert.ok(Array.isArray(level.options))
        }

        if (level.mode === "sandbox") {
            for (let property of sandboxRequiredProperties) {
                assert.ok(property in level, `Missing "${property}" in level ${level.id}`)
            }
        }

        if (level.mode !== "sandbox") {
            assert.equal(typeof level.id, "number");
            assert.equal(typeof level.chapter, "number");
            assert.equal(typeof level.level, "number");
            assert.equal(typeof level.name, "string");
            assert.equal(typeof level.description, "string");
            assert.equal(typeof level.mode, "string");
            assert.ok(Array.isArray(level.startNodes));
            assert.ok(Array.isArray(level.endNodes));
            assert.ok(Array.isArray(level.expectedEndStates));
            assert.equal(typeof level.commentCorrect, "string");
            assert.equal(typeof level.commentWrong, "string");
            assert.equal(typeof level.commentHint, "string");
        }

    })
}