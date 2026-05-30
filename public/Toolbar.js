import LogicGate from "./logicGate.js";


export default class Toolbar {
    constructor() {
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
            inPageViewer.appendChild(andGate.createHTML());
        });    
        
        document.getElementById("ORButton").addEventListener("click", () => {
            console.log("OR button clicked");
            const orGate = new LogicGate('OR');
            inPageViewer.appendChild(orGate.createHTML());
        });
        
        document.getElementById("NOTButton").addEventListener("click", () => {
            console.log("NOT button clicked");
            const notGate = new LogicGate('NOT');
            inPageViewer.appendChild(notGate.createHTML());
        });

        document.getElementById("NANDButton").addEventListener("click", () => {
            console.log("NAND button clicked");
            const nandGate = new LogicGate('NAND');
            inPageViewer.appendChild(nandGate.createHTML());
        });
        
        document.getElementById("NORButton").addEventListener("click", () => {
            console.log("NOR button clicked");
            const norGate = new LogicGate('NOR');
            inPageViewer.appendChild(norGate.createHTML());
        });
        
        document.getElementById("XORButton").addEventListener("click", () => {
            console.log("XOR button clicked");
            const xorGate = new LogicGate('XOR');
            inPageViewer.appendChild(xorGate.createHTML());
        });
        
        document.getElementById("XNORButton").addEventListener("click", () => {
            console.log("XNOR button clicked");
            const xnorGate = new LogicGate('XNOR');
            inPageViewer.appendChild(xnorGate.createHTML());
        });
    }
}