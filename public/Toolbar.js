import Connector from "./Connector.js";
import LogicGate from "./LogicGate.js";
import Viewer from "./Viewer.js";


export default class Toolbar {
    constructor(viewer) {
        this.viewer = viewer;
        this.container = document.getElementById('toolbar');
        this.createButtons();
        this.connectorOn = false;
    }

    createButtons = () => {
        const buttonsHTML = 
            `
            <button class="toolbarButton" id="penButton">✏️</button>
            <button class="toolbarButton" id="ANDButton">AND</button>
            <button class="toolbarButton" id="ORButton">OR</button>
            <button class="toolbarButton" id="NOTButton">NOT</button>
            <button class="toolbarButton" id="NANDButton">NAND</button>
            <button class="toolbarButton" id="NORButton">NOR</button>
            <button class="toolbarButton" id="XORButton">XOR</button>
            <button class="toolbarButton" id="XNORButton">XNOR</button>
            `;
        this.container.innerHTML = buttonsHTML;

        document.getElementById("penButton").addEventListener("click", () => {
            this.penClick()
        })

        // Add event listeners for each button
        document.getElementById("ANDButton").addEventListener("click", () => {
            const andGate = new LogicGate('AND');
            this.viewer.addGate(andGate);
        });    
        
        document.getElementById("ORButton").addEventListener("click", () => {
            const orGate = new LogicGate('OR');
            this.viewer.addGate(orGate);
        });
        
        document.getElementById("NOTButton").addEventListener("click", () => {
            const notGate = new LogicGate('NOT');
            this.viewer.addGate(notGate);
        });

        document.getElementById("NANDButton").addEventListener("click", () => {
            const nandGate = new LogicGate('NAND');
            this.viewer.addGate(nandGate);
        });
        
        document.getElementById("NORButton").addEventListener("click", () => {
            const norGate = new LogicGate('NOR');
            this.viewer.addGate(norGate);
        });
        
        document.getElementById("XORButton").addEventListener("click", () => {
            const xorGate = new LogicGate('XOR');
            this.viewer.addGate(xorGate);
        });
        
        document.getElementById("XNORButton").addEventListener("click", () => {
            const xnorGate = new LogicGate('XNOR');
            this.viewer.addGate(xnorGate);
        });
    }



    disableOtherButtons(){
        
    }

    penClick(){
            const penButton = document.getElementById("penButton");
            if (!this.connectorOn) {
                penButton.style.backgroundColor = "#ff8585";
                this.connectorOn = true;
                return;
            } else {
                penButton.style.backgroundColor = "#8c8c8c";
                this.connectorOn = false;
                return;
            }
        }
}