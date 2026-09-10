import test, { before, beforeEach } from "node:test";
import assert, { strictEqual } from "node:assert";
import Viewer from "../public/Viewer.js";
import { JSDOM } from "jsdom";

let viewer;

function beforeEachNonDOM() {
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
}

function beforeEachDOM() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
            <html>
                <body>
                    <p>Test Webpage</p>
                    <div id="toolbar"></div>
                    <div id="viewer"><div>
                </body>
            </html>
        `);

    global.window = dom.window;
    global.document = dom.window.document;

    viewer = new Viewer("viewer")


}



test("setUp new Viewer", () => {
    beforeEachDOM()
    assert.equal(viewer.container, document.getElementById("viewer"))
})

test("create start points method works", () => {
    beforeEachDOM()
    viewer.createStartPoint(true, 50, 100, "start1");
    assert.strictEqual(viewer.viewerObjects.length, 1)

    const tempStartPoint = viewer.viewerObjects[0]

    assert.strictEqual(tempStartPoint.id, "start1")

    assert.equal(tempStartPoint.html.style.left, "50px")
    assert.equal(tempStartPoint.html.style.top, "100px")
})


test("clicking start node selects it and changes classlist", () => {
    beforeEachDOM()
    viewer.connectionMode = false;
    viewer.level = {
        id: 1

    }
    const startNode = {
        creatingOutput: true,
        html: document.createElement("div")
    }

    viewer.clickNode(startNode);
    assert.equal(viewer.selectedOutputNode, null)
    assert.equal(startNode.html.classList.contains("node-selected"), false)

    viewer.connectionMode = true;
    viewer.clickNode(startNode);
    assert.equal(viewer.selectedOutputNode, startNode)
    assert.equal(startNode.html.classList.contains("node-selected"), true)
})

test("updateGateCoordinates updates HTML", () => {
    beforeEachDOM()
    const gate = { coordinates: { x: 20, y: 700 }, html: document.createElement("div") }
    viewer.updateGatePosition(gate)

    assert.equal(gate.html.style.left, "20px")

    assert.equal(gate.html.style.top, "700px")

})

test("updateGateCoordinates updates gate objects", () => {
    beforeEachNonDOM()
    const gate = { coordinates: { x: 20, y: 700 }, size: { width: 120, height: 60 } }
    viewer.updateGateCoordinates(gate, 200, 400)
    assert.deepEqual(gate.coordinates, { x: 200, y: 400 })
})


test("mouse to coords works", () => {
    beforeEachNonDOM()
    const event = { clientX: 450, clientY: 230 }
    const result = viewer.mouseToViewerCoordinates(event)
    assert.deepEqual(result, { x: 450 - 10, y: 230 - 10 })
})

test("prevents gates from leaving area", () => {
    beforeEachNonDOM()
    const gate = { coordinates: { x: 20, y: 700 }, size: { width: 120, height: 60 } }
    viewer.updateGateCoordinates(gate, -20, -40)
    assert.deepEqual(gate.coordinates, { x: 0, y: 0 })
    viewer.updateGateCoordinates(gate, 2000, 4000)
    assert.deepEqual(gate.coordinates, { x: 880, y: 940 })
})

test("evaluate level", () => {
    beforeEachNonDOM()
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