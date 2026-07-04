import LogicGate from "./LogicGate.js";

export default class Toolbar {
    constructor(viewer) {
        this.connectorOn = false;
        this.viewer = viewer;
        this.container = document.getElementById('toolbar');
        this.createButtons();
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
                this.addGate('AND'); 
            });

            document.getElementById("ORButton").addEventListener("click", () => {
                this.addGate('OR');
            });

            document.getElementById("NOTButton").addEventListener("click", () => {
                this.addGate('NOT');
            });

            document.getElementById("NANDButton").addEventListener("click", () => {
                this.addGate('NAND');
            });

            document.getElementById("NORButton").addEventListener("click", () => {
                this.addGate('NOR');
            });

            document.getElementById("XORButton").addEventListener("click", () => {
                this.addGate('XOR');
            });

            document.getElementById("XNORButton").addEventListener("click", () => {
                this.addGate('XNOR');
            });
        
    }

    addGate(gateString) {
        const gate = new LogicGate(`${gateString}`)
        if (this.connectorOn) {
            window.alert("Please finish drawing your connection or unclick the draw button to add more gates.")
        } else {
            console.log(`adding ${gate.type}`);
            this.viewer.addGate(gate);

        }
    }

    penClick(){
            const penButton = document.getElementById("penButton");
            if (!this.connectorOn) {
                penButton.style.backgroundColor = "#ff8585";
                this.connectorOn = true;
                this.viewer.connectionModeOn(this.connectorOn);
                return;
            } else {
                penButton.style.backgroundColor = "#8c8c8c";
                this.connectorOn = false;
                this.viewer.connectionModeOn(this.connectorOn);                
                return;
            }
        }

        
}