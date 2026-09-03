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
        if (this.level.mode === "predict") {

            for (let option of this.level.options) {
                this.container.innerHTML = this.container.innerHTML.concat(" ", `<button class = "toolbarButton" id = "${option}Button">${option}</button>`);
            }

            for (let option of this.level.options) {
                document.getElementById(`${option}Button`).addEventListener("click", () => {
                    this.selectOption(option);
                });
            }

        } else {
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

    selectOption(option){
        const optionButton = document.getElementById(`${option}Button`);
        if (option === this.viewer.answerSelected){
            optionButton.style.backgroundColor = "#8c8c8c";
            this.viewer.answerSelected = null;
            return;
        }
        if (option !== this.viewer.answerSelected){
            if(this.viewer.answerSelected !== null){
                const oldAnswerSelected = document.getElementById(`${this.viewer.answerSelected}Button`);
                oldAnswerSelected.style.backgroundColor = "#8c8c8c";
            }
            this.viewer.answerSelected = option;
            optionButton.style.backgroundColor = "#ff8585";
            return;
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

    updateToolbar() {
        if(this.viewer.highlightCorrectAnswer){
            const oldAnswerSelected = document.getElementById(`${this.viewer.answerSelected}Button`);
            oldAnswerSelected.style.backgroundColor = "#56d15a";
            this.disableButtons()
        }
    }

    disableButtons(){
        const buttons = this.container.querySelectorAll("button");

        for (let button of buttons){
            button.disabled = true
        }
    }

    destroy() {
        this.connectorOn = false;
        this.viewer = null;
        this.container.innerHTML = "";
        this.gatesAvailable = [];
    }

}