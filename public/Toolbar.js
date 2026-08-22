import LogicGate from "./LogicGate.js";


export default class Toolbar {
    constructor(viewer, level, firstClickPen) {
        this.connectorOn = false;
        this.viewer = viewer;
        this.level = level;
        this.container = document.getElementById('toolbar');
        this.createButtons();
        this.firstClickPen = firstClickPen;
        this.gatesAvailable = [];
    }

    createButtons = () => {
        if (this.level.mode === "build") {


            this.container.innerHTML = `<button class="toolbarButton" id="penButton">✏️</button>`
            for (let entry of Object.entries(this.level.availableGates)) {
                const gateType = entry[0];
                this.container.innerHTML = this.container.innerHTML.concat(" ", `<button class = "toolbarButton" id = "${gateType}Button">${gateType}</button>`)
            }

            document.getElementById("penButton").addEventListener("click", () => {
                this.penClick()
            })

            for (let entry of Object.entries(this.level.availableGates)) {
                const gateType = entry[0];
                document.getElementById(`${gateType}Button`).addEventListener("click", () => {
                    this.viewer.addGate(`${gateType}`);
                });
            }
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


    blankButton(gateType){


    }

    destroy() {
        document.removeEventListener("click",this.viewer.addGate);
        this.connectorOn = false;
        this.viewer = null;
        this.container = document.getElementById('toolbar').remove;
    }

}