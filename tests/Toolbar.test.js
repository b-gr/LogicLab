import test from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom"
import Toolbar from "../public/Toolbar.js";

let addedGate = null;


function beforeEachBuildTest() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
            <html>
                <body>
                    <p>Test Webpage</p>
                    <div id="toolbar"></div>
                </body>
            </html>
        `);

    global.window = dom.window;
    global.document = dom.window.document;

    let tempViewer = {
        addGate(gate) {
            addedGate = gate;
        }
    }

    let tempBuildLevel = {
        mode: "build",
        availableGates: {
            AND: 1,
            OR: 1,
            NOT: 1,
            NAND: 1,
            NOR: 1,
            XOR: 1,
            XNOR: 1
        }
    }
    const toolbar = new Toolbar(tempViewer, tempBuildLevel, false)

}

test("pen button created", () => {
    beforeEachBuildTest()
    const textFromPenButton = document.getElementById("penButton").textContent
    assert.equal(textFromPenButton, "✏️")
})

test("AND button is created", () => {
    beforeEachBuildTest()
    const textFromANDButton = document.getElementById("ANDButton").textContent
    assert.equal(textFromANDButton, "AND")
})

test("OR button is created", () => {
    beforeEachBuildTest()
    const textFromORButton = document.getElementById("ORButton").textContent
    assert.equal(textFromORButton, "OR")
})

test("NOT button is created", () => {
    beforeEachBuildTest()
    const textFromNOTButton = document.getElementById("NOTButton").textContent
    assert.equal(textFromNOTButton, "NOT")
})

test("NAND button is created", () => {
    beforeEachBuildTest()
    const textFromNANDButton = document.getElementById("NANDButton").textContent
    assert.equal(textFromNANDButton, "NAND")
})

test("NOR button is created", () => {
    beforeEachBuildTest()
    const textFromNORButton = document.getElementById("NORButton").textContent
    assert.equal(textFromNORButton, "NOR")
})

test("XOR button is created", () => {
    beforeEachBuildTest()
    const textFromXORButton = document.getElementById("XORButton").textContent
    assert.equal(textFromXORButton, "XOR")
})

test("XNOR button is created", () => {
    beforeEachBuildTest()
    const textFromXNORButton = document.getElementById("XNORButton").textContent
    assert.equal(textFromXNORButton, "XNOR")
})


test("ANDButtonWorks", () => {
    beforeEachBuildTest()

    document.getElementById("ANDButton").click();

    assert.strictEqual(addedGate, "AND")
})





function beforeEachPredictTest() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
            <html>
                <body>
                    <p>Test Webpage</p>
                    <di id="toolbar"></div>
                </body>
            </html>
        `);

    global.window = dom.window;
    global.document = dom.window.document;

    let tempViewer;

    let tempPredictLevel = {
        mode: "predict",
        options: ["TRUE", "FALSE"]
    }

    const toolbar = new Toolbar(tempViewer, tempPredictLevel, false)

}

test("predictLevelLoadsButtons", () => {
    beforeEachPredictTest()
    const trueButtonText = document.getElementById("TRUEButton").textContent
    assert.equal(trueButtonText, "TRUE")
    const FALSEButtonText = document.getElementById("FALSEButton").textContent
    assert.equal(FALSEButtonText, "FALSE")
})


