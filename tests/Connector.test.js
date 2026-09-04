import test, { beforeEach } from "node:test";
import assert from "node:assert";
import Connector from "../public/Connector.js";
import ViewerObject from "../public/ViewerObject.js";
import LogicGate from "../public/LogicGate.js";


let tempViewer;
let node1;
let gate1;
let gate2;
let node2;


beforeEach(() => {
    tempViewer = {}

    node1 = {
        coordinates: { x: 100, y: 100 },
        type: "start",
        state: true,
        id: "start1",
        creatingOutput: true,
        acceptingInput: false,
        maxInputs: 0,
        maxOutputs: 1,
        outputs: [],
        getState() {
            return this.state;
        },
        getOutputCoord() {
            return this.coordinates
        },
        getInputCoord() {
            return this.coordinates
        }
    }

    gate1 = {
        coordinates: { x: 200, y: 100 },
        type: "NOT",
        state: null,
        id: "not1",
        maxInputs: 1,
        maxOutputs: 1,

        inputs: [],
        outputs: [],
        acceptingInput: true,
        creatingOutput: true,
        getState() {
            return this.state;
        },
        getOutputCoord() {
            return this.coordinates
        },
        getInputCoord() {
            return this.coordinates
        }
    }

    gate2 = {
        coordinates: { x: 250, y: 100 },
        type: "NOT",
        state: null,
        id: "not1",
        maxInputs: 1,
        maxOutputs: 1,
        inputs: [],
        outputs: [],
        acceptingInput: true,
        creatingOutput: true,
        getState() {
            return this.state;
        },
        getOutputCoord() {
            return this.coordinates
        },
        getInputCoord() {
            return this.coordinates
        }
    }

    node2 = {
        coordinates: { x: 300, y: 100 },
        type: "end",
        state: "unknown",
        id: "end1",
        creatingOutput: false,
        maxInputs: 1,
        maxOutputs: 0,
        inputs: [],
        acceptingInput: true,
        getState() {
            return this.state;
        },
        getOutputCoord() {
            return this.coordinates
        },
        getInputCoord() {
            return this.coordinates
        }
    }
});

test("allows a valid connection", () => {
    const connector = new Connector(node1, gate1, tempViewer)
    assert.equal(connector.getState(), true);
    assert.equal(node1.outputs.length, 1);
    assert.equal(gate1.inputs.length, 1);
    assert.equal(node1.outputs[0], connector);
    assert.equal(gate1.inputs[0], connector);
})

test("rejects a connection when source is already outputting", () => {
    const connector = new Connector(node1, gate1, tempViewer)
    const connector2 = new Connector(node1, gate2, tempViewer) //should fail as node 1 already outputting once
    assert.equal(connector.valid, true)
    assert.equal(connector2.valid, false)
})

test("rejects a connection when gate/node has reached max input already", () => {
    const connector = new Connector(node1, gate2, tempViewer)
    const connector2 = new Connector(gate1, gate2, tempViewer) //should fail as node 1 already outputting once
    assert.equal(connector.valid, true)
    assert.equal(connector2.valid, false)
})

test("reject connection from right to left", () => {
    node1.coordinates.x = 300;
    gate1.coordinates.x = 200;
    const connector = new Connector(node1, gate1, tempViewer);
    assert.equal(connector.valid, false)
})

test("Failed connections don't chnage gates, or remain connected", () => {
    const connector = new Connector(node1, gate2, tempViewer)
    const connector2 = new Connector(gate1, gate2, tempViewer) //should fail as node 1 already outputting once
    assert.equal(connector.valid, true)
    assert.equal(connector2.valid, false)
    assert.equal(gate2.inputs.length, 1);
    assert.equal(node1.outputs.length, 1);
    assert.equal(gate1.outputs.length, 0)
})

test("setInputSlot works correctly", () => {
    const connector = new Connector(node1, gate1, tempViewer)
    assert.equal(connector.inputSlot, 0)
})

test("getState() works correctly", () => {
    node1.state = false;
    const connector = new Connector(node1, gate1, tempViewer)
    assert.equal(connector.getState(), false)
})

test("getState() works correctly", () => {
    node1.state = true;
    const connector = new Connector(node1, gate1, tempViewer)
    assert.equal(connector.getState(), true)
})

test("remove() works correctly", () => {
    const connector = new Connector(node1, gate1, tempViewer);
    const connector2 = new Connector(gate2, node2, tempViewer);
    assert.equal(gate1.inputs.length, 1);
    assert.equal(node1.outputs.length, 1);
    assert.equal(gate2.outputs.length, 1);
    assert.equal(node2.inputs.length, 1);
    connector.remove();
    assert.equal(gate1.inputs.length, 0);
    assert.equal(node1.outputs.length, 0);
    assert.equal(gate2.outputs.length, 1);
    assert.equal(node2.inputs.length, 1);
})