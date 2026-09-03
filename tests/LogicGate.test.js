import test from "node:test";
import assert from "node:assert";
import LogicGate from "../public/LogicGate.js";

test("AND gate: true AND true", () => {
    const gate = new LogicGate('AND');
    gate.type = "AND";
    gate.getInputValues = () => [true,true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("AND gate: true AND false", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [true,false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})


test("AND gate: false AND false", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [false,false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("AND gate: false AND true", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [false,true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})