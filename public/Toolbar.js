import LogicGate from "./LogicGate.js";


export default class Toolbar {
    constructor(viewer, level, firstClickPen) {
        this.connectorOn = false;
        this.viewer = viewer;
        this.level = level;
        this.container = document.getElementById('toolbar');
        this.createButtons();
        this.firstClickPen = firstClickPen;
    }

    createButtons = () => {
        this.container.innerHTML = `<button class="toolbarButton" id="penButton">✏️</button>`
        for(let entry of Object.entries(this.level.availableGates)){
            const gateType = entry[0];
            this.container.innerHTML = this.container.innerHTML.concat(" ", `<button class = "toolbarButton" id = "${gateType}Button">${gateType}</button>`)
        }

        document.getElementById("penButton").addEventListener("click", () => {
            this.penClick()
        })

        for(let entry of Object.entries(this.level.availableGates)){
            const gateType = entry[0];
            document.getElementById(`${gateType}Button`).addEventListener("click", () => {
                this.addGate(`${gateType}`);
            });
        }

    }

    addGate(gateString) {
        const gate = new LogicGate(`${gateString}`)
        if (this.connectorOn) {
            window.alert("Please finish drawing your connection or unclick the draw button to add more gates.")
        } else {
            this.viewer.addGate(gate);
        }
    }

    penClick() {
        const penButton = document.getElementById("penButton");
        if (this.firstClickPen) {
            window.alert("To use the connector tool, first click the starting node, then the final node.")
            this.firstClickPen = false;
        }
        if (!this.connectorOn) {
            penButton.style.backgroundColor = "#ff8585";
            this.connectorOn = true;
            this.viewer.connectionModeOn(this.connectorOn);
            return;
        } else {
            penButton.style.backgroundColor = "#8c8c8c";
            this.connectorOn = false;
            this.viewer.clearGateSelection();
            this.viewer.connectionModeOn(this.connectorOn);
            return;
        }
    }


    destroy() {
        document.removeEventListener("click",this.addGate);
        this.connectorOn = false;
        this.viewer = null;
        this.container = document.getElementById('toolbar').remove;
    }

}