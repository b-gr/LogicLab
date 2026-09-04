import test, { beforeEach } from "node:test";
import assert from "node:assert";
import Viewer from "../public/Viewer.js";

let viewer;

beforeEach(() => {
    viewer = Object.create(Viewer.prototype)

    viewer.container = {
        getBoundingClientRect() {
            return {
                width: 1000,
                height: 1000,
                left: 10,
                right: 1010,
                top: 10,
                bottom: 1010
            }
        }
    }

    viewer.gates = [];
    viewer.connections = [];
    viewer.viewerObjects = [];
    viewer.connectionMode = false;
    viewer.selectedOutputNode = null;
    viewer.levelComplete = false;
    viewer.initialised = true;
    viewer.answerSelected = null;
    viewer.highlightCorrectAnswer = false;


})



test("updateGateCoordinates works", () => {
    const gate = { coordinates: { x: 20, y: 700 }, size: { width: 120, height: 60 } }
    viewer.updateGateCoordinates(gate, 200, 400)
    assert.deepEqual(gate.coordinates, { x: 200, y: 400 })
})


test("mouse to coords works", () => {
    const event = { clientX: 450, clientY: 230 }
    const result = viewer.mouseToViewerCoordinates(event)
    assert.deepEqual(result, { x: 450 - 10, y: 230 - 10 })
})

test("prevents gates from leaving area", () => {
    const gate = { coordinates: { x: 20, y: 700 }, size: { width: 120, height: 60 } }
    viewer.updateGateCoordinates(gate, -20, -40)
    assert.deepEqual(gate.coordinates, { x: 0, y: 0 })
    viewer.updateGateCoordinates(gate, 2000, 4000)
    assert.deepEqual(gate.coordinates, { x: 880, y: 940 })
})

test("evaluate level", () => {
    viewer.level = {
        mode: "predict", expectedEndStates: [true]
    }

    viewer.answerSelected = null;
    viewer.evaluateCircuit();
    assert.equal(viewer.levelComplete, false)

    viewer.level = {
        mode: "predict", expectedEndStates: [true]
    }

    viewer.answerSelected = "TRUE";
    viewer.evaluateCircuit();
    assert.equal(viewer.levelComplete, true)
})