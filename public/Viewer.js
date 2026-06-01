export default class Viewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
        this.width = this.container.getBoundingClientRect().width;
        this.height = this.container.getBoundingClientRect().height;
        this.startX = this.container.getBoundingClientRect().left;
        this.endX = this.container.getBoundingClientRect().right;
        this.startY = this.container.getBoundingClientRect().top;
        this.endY = this.container.getBoundingClientRect().bottom;
    }



    addGate(gate) {
        this.container.appendChild(gate.html);
        this.updateGatePosition(gate);
        this.gates.push(gate);
        console.log(`Added ${gate.type} gate to viewer at position (${gate.coordinates.x}, ${gate.coordinates.y})`);
    }

    //connections

    makeDraggable() {
        

    }

    //moveGate

    //evaluateCircuit

    //clearViewer

    //removeGate

    updateGatePosition(gate) {
        const gateElement = gate.html;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${gate.coordinates.x}px`;
        gateElement.style.top = `${gate.coordinates.y}px`;
    }


}
