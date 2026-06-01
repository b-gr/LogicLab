import LogicGate from "./LogicGate.js";
import Viewer from "./Viewer.js";


export default class Toolbar {
    constructor(viewer) {
        this.viewer = viewer;
        this.container = document.getElementById('toolbar');
        this.createButtons();
    }

    createButtons = () => {
        const buttonsHTML = 
            `
            <button class="toolbarButton" id="ANDButton">AND</button>
            <button class="toolbarButton" id="ORButton">OR</button>
            <button class="toolbarButton" id="NOTButton">NOT</button>
            <button class="toolbarButton" id="NANDButton">NAND</button>
            <button class="toolbarButton" id="NORButton">NOR</button>
            <button class="toolbarButton" id="XORButton">XOR</button>
            <button class="toolbarButton" id="XNORButton">XNOR</button>
            `;
        this.container.innerHTML = buttonsHTML;

        // Add event listeners for each button
        document.getElementById("ANDButton").addEventListener("click", () => {
            console.log("AND button clicked");
            const andGate = new LogicGate('AND');
            this.viewer.addGate(andGate);
        });    
        
        document.getElementById("ORButton").addEventListener("click", () => {
            console.log("OR button clicked");
            const orGate = new LogicGate('OR');
            this.viewer.addGate(orGate);
        });
        
        document.getElementById("NOTButton").addEventListener("click", () => {
            console.log("NOT button clicked");
            const notGate = new LogicGate('NOT');
            this.viewer.addGate(notGate);
        });

        document.getElementById("NANDButton").addEventListener("click", () => {
            console.log("NAND button clicked");
            const nandGate = new LogicGate('NAND');
            this.viewer.addGate(nandGate);
        });
        
        document.getElementById("NORButton").addEventListener("click", () => {
            console.log("NOR button clicked");
            const norGate = new LogicGate('NOR');
            this.viewer.addGate(norGate);
        });
        
        document.getElementById("XORButton").addEventListener("click", () => {
            console.log("XOR button clicked");
            const xorGate = new LogicGate('XOR');
            this.viewer.addGate(xorGate);
        });
        
        document.getElementById("XNORButton").addEventListener("click", () => {
            console.log("XNOR button clicked");
            const xnorGate = new LogicGate('XNOR');
            this.viewer.addGate(xnorGate);
        });
    }
}