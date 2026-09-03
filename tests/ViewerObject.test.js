import test, { beforeEach } from "node:test";
import assert from "node:assert";
import ViewerObject from "../public/ViewerObject.js";




test("start node is set up correctly", () => {
    const node = new ViewerObject("start", true, "start1");
    assert.equal(node.creatingOutput, true);
    assert.equal(node.acceptingInput, false);
    assert.equal(node.maxOutputs, 1);
    assert.equal(node.maxInputs, 0);
    assert.deepStrictEqual(node.outputs, []);
})

test("end node is set up correctly", () => {
    const node = new ViewerObject("end", true, "start1");
    assert.equal(node.creatingOutput, false);
    assert.equal(node.acceptingInput, true);
    assert.equal(node.maxInputs, 1);
    assert.equal(node.maxOutputs, 0);
    assert.deepStrictEqual(node.inputs, []);
})

test("bin is set up correctly", () => {
    const node = new ViewerObject("bin", true, "start1");
    assert.equal(node.creatingOutput, false);
    assert.equal(node.acceptingInput, false);
    assert.equal(node.maxInputs, 0);
    assert.equal(node.maxOutputs, 0);
    assert.equal(node.id, "bin")
})

test("getState() works", () => {
    const node = new ViewerObject("start", true, "start1");
    assert.equal(node.getState(), true)
})

test("setState() works", () => {
    const node = new ViewerObject("start", true, "start1");
    assert.equal(node.getState(), true)
    node.setState(false)
    assert.equal(node.getState(), false)
})

test("getOutputCoord works as intended", () => {
    const node = new ViewerObject("start", true, "start1");
    node.coordinates = {x: 100, y: 200}
    const xAdjustment = node.size.width;
    const yAdjustment = node.size.height / 2;
    const expectedOutputCoords = {x: node.coordinates.x + xAdjustment, y: node.coordinates.y + yAdjustment}
    assert.deepEqual(node.getOutputCoord(), expectedOutputCoords)
})

test("getInputCoord works as intended", () => {
    const node = new ViewerObject("end", false, "end1");
    node.coordinates = {x: 100, y: 200}
    const xAdjustment = 0;
    const yAdjustment = node.size.height / 2;
    const expectedOutputCoords = {x: node.coordinates.x + xAdjustment, y: node.coordinates.y + yAdjustment}
    assert.deepEqual(node.getInputCoord(), expectedOutputCoords)
})