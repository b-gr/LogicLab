import test from "node:test";
import assert from "node:assert";
import LogicGate from "../public/LogicGate.js";

test("AND gate: true AND true", () => {
    const gate = new LogicGate('AND');
    gate.type = "AND";
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("AND gate: true AND false", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [true, false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})


test("AND gate: false AND false", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("AND gate: false AND true", () => {
    const gate = new LogicGate('AND');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("OR gate: true OR true", () => {
    const gate = new LogicGate('OR');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("OR gate: false OR true", () => {
    const gate = new LogicGate('OR');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("OR gate: true OR false", () => {
    const gate = new LogicGate('OR');
    gate.getInputValues = () => [true, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("OR gate: false OR false", () => {
    const gate = new LogicGate('OR');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NOT gate: NOT true", () => {
    const gate = new LogicGate('NOT');
    gate.getInputValues = () => [true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NOT gate: NOT false", () => {
    const gate = new LogicGate('NOT');
    gate.getInputValues = () => [false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("NAND gate: true NAND true", () => {
    const gate = new LogicGate('NAND');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NAND gate: true NAND false", () => {
    const gate = new LogicGate('NAND');
    gate.getInputValues = () => [true, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("NAND gate: false NAND true", () => {
    const gate = new LogicGate('NAND');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("NAND gate: false NAND false", () => {
    const gate = new LogicGate('NAND');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("NOR gate: true NOR true", () => {
    const gate = new LogicGate('NOR');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NOR gate: true NOR false", () => {
    const gate = new LogicGate('NOR');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NOR gate: false NOR true", () => {
    const gate = new LogicGate('NOR');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("NOR gate: false NOR false", () => {
    const gate = new LogicGate('NOR');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("XOR gate: true XOR true", () => {
    const gate = new LogicGate('XOR');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("XOR gate: false XOR true", () => {
    const gate = new LogicGate('XOR');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("XOR gate: true XOR false", () => {
    const gate = new LogicGate('XOR');
    gate.getInputValues = () => [true, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("XOR gate: false XOR false", () => {
    const gate = new LogicGate('XOR');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("XNOR gate: true XNOR true", () => {
    const gate = new LogicGate('XNOR');
    gate.getInputValues = () => [true, true];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})

test("XNOR gate: false XNOR true", () => {
    const gate = new LogicGate('XNOR');
    gate.getInputValues = () => [false, true];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("XNOR gate: true XNOR false", () => {
    const gate = new LogicGate('XNOR');
    gate.getInputValues = () => [true, false];
    const result = gate.booleanOperation();
    assert.equal(result, false)
})

test("XNOR gate: false XNOR false", () => {
    const gate = new LogicGate('XNOR');
    gate.getInputValues = () => [false, false];
    const result = gate.booleanOperation();
    assert.equal(result, true)
})