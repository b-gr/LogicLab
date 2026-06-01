export default class InPageViewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
    }

    addGate(gate) {
        this.gates.push(gate);
        this.container.appendChild(gate.html);
    }

    //connections

    //makeDraggable

    //moveGate

    //evaluateCircuit

    //clearViewer

    //removeGate



}
