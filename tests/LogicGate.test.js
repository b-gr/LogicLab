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