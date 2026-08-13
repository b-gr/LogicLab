import Connector from './Connector.js';
import Toolbar from './Toolbar.js';
import ViewerObject from './ViewerObject.js';

export default class Viewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
        this.viewerObjects = [];
        this.connectionMode = false;
        this.selectedOutputNode = null;
        this.levelComplete = false;

        this.resize = () => {
            this.resizeHelper();
        }
        window.addEventListener('resize', this.resize);
    }

    init(level) {
        this.updateViewerDimensions();
        this.createBin();
        this.createMultipleStartPoints(2);
        this.createMultipleEndPoints(1)
    }

    resizeHelper(){
        this.updateViewerDimensions();
        this.repositionBin();
        this.repositionEndPoints();
        this.repositionStartPoints();
        //this.repositionGates();
    }

    repositionEndPoints() {
        const x = this.width - 100;
        const endPoints = this.viewerObjects.filter(node => node.type === 'end');
        const count = endPoints.length;
        const heightDivision = this.height / (count + 1);
        let i = 1;
        for (let node of endPoints) {
            const y = heightDivision * (i);
            node.coordinates = { x: x, y: y };
            node.html.style.left = `${x}px`;
            node.html.style.top = `${y}px`;
            i++;
        }
    }

    repositionStartPoints(){
        const startPoints = this.viewerObjects.filter(node => node.type === 'start');
        const count = startPoints.length;
        const heightDivision = this.height / (count + 1);
        let i = 1;
        for (let node of startPoints) {
            const y = heightDivision * i;
            node.coordinates.y = y;
            node.html.style.top = `${y}px`;
            i++;
        }
    }




    repositionBin(){
        const bin = this.viewerObjects.find(node => node.type === 'bin');
        
        bin.coordinates = { x: (this.width / 2) - 50, y: 0 };
        bin.html.style.left = `${bin.coordinates.x}px`;
        bin.html.style.top = `${bin.coordinates.y}px`;
    }

    updateViewerDimensions() {
        const viewerRectangle = this.container.getBoundingClientRect();
        this.width = viewerRectangle.width;
        this.height = viewerRectangle.height;
        this.startX = viewerRectangle.left;
        this.endX = viewerRectangle.right;
        this.startY = viewerRectangle.top;
        this.endY = viewerRectangle.bottom;
    }


    removeGate(gate) {
        this.removeConnections(gate);
        this.container.removeChild(gate.html);
        this.gates = this.gates.filter(g => g !== gate);
    }

    removeConnections(gate) {
        const lines = this.connections.filter(connector => connector.node1 === gate || connector.node2 === gate);
        for (let connector of lines) {
            this.removeOneConnection(connector);
        }
    }

    removeOneConnection(connector) {
        connector.remove();
        this.connections = this.connections.filter(connection => connection !== connector);
    }


    addGate(gate) {
        this.container.appendChild(gate.html);
        this.updateGatePosition(gate);
        this.addEventListenersToGate(gate);
        this.gates.push(gate);
        this.updateViewerDimensions();
    }

    mouseToViewerCoordinates(event) {
        const viewerRectangle = this.container.getBoundingClientRect();
        const x = event.clientX - viewerRectangle.left;
        const y = event.clientY - viewerRectangle.top;
        return { x, y };
    }

    dragGate(event, gate) {
        if (this.connectionMode) {
            return;
        }

        gate.html.style.zIndex = 1000;
        this.container.appendChild(gate.html);


        const mousePosition = this.mouseToViewerCoordinates(event);

        const offsetX = mousePosition.x - gate.coordinates.x;
        const offsetY = mousePosition.y - gate.coordinates.y;

        const moveAt = (x, y) => {
            this.updateGateCoordinates(gate, x - offsetX, y - offsetY);
            this.updateGatePosition(gate);
            this.reDrawConnectors(gate);
        }

        const onmousemove = (event) => {
            const position = this.mouseToViewerCoordinates(event);
            
            moveAt(
                position.x,
                position.y
            );

            gate.html.classList.add('gate-dragged');

            const bin = this.viewerObjects.find(obj => obj.type === 'bin');

            if (
                position.x < this.width / 2 + bin.size.width/2
                &&
                position.x > this.width / 2 - bin.size.width/2
                &&
                position.y < bin.size.height
            ) {
                bin.openBin();
            } else {
                bin.closeBin();
            }

        }

        this.container.addEventListener('mousemove', onmousemove);

        gate.html.onmouseup = (event) => {

            const position = this.mouseToViewerCoordinates(event);

            this.container.removeEventListener('mousemove', onmousemove);

            this.updateGateCoordinates(
                gate,
                position.x - offsetX,
                position.y - offsetY
            );

            this.updateGatePosition(gate);

            this.reDrawConnectors(gate);

            gate.html.classList.remove('gate-dragged');

            gate.html.onmouseup = null;

            const bin = this.viewerObjects.find(obj => obj.type === 'bin');

            if (
                position.x < this.width / 2 + bin.size.width/2
                &&
                position.x > this.width / 2 - bin.size.width/2
                &&
                position.y < bin.size.height
            ) {
                this.removeGate(gate)
                this.viewerObjects.find(obj => obj.type === 'bin').closeBin();

            }


            gate.html.style.zIndex = 1;

            this.redoAllLines();
        }

        gate.html.ondragstart = () => {
            return false;
        }

    }

    addEventListenersToGate(gate) {
        gate.html.addEventListener('mousedown', (event) => {
            this.dragGate(event, gate);
        });

        this.addConnectionListener(gate);
    }


    addConnectionListener(node) {
        node.html.addEventListener('click', () => {
            this.clickNode(node)
        });

    }


    clickNode(node) {
        if (!this.connectionMode) {
            return;
        }

        if (this.selectedOutputNode != null) {
            
            if(!node.acceptingInput){
                console.log("Cannot accept input");
                return;
            }
            
            this.linkNodes(node);

        } else {
            if(node.creatingOutput){
                node.html.classList.add('node-selected');
                this.selectedOutputNode = node;
            }
        }

        return;
    }


    linkNodes(node) {
        const node1 = this.selectedOutputNode;
        const node2 = node;

        
        //deselects current node
        if (node1 === node2) {
            this.selectedOutputNode = null;
            node1.html.classList.remove('node-selected');
            return;
        }

        //if already connected then not possible
        if (node1.outputs.length >= node1.maxOutputs) {
            console.log("Not possible: node already connected to another node")
            node1.html.classList.remove('node-selected');
            this.selectedOutputNode = null;
            return;
        }

        //if node2 is already connected then not allowed
        if (node2.inputs.length >= node2.maxInputs) {
            console.log("not possible: no available inputs check 2")
            return;
        }

        //passed checks - continue to create connection
        const connector = new Connector(node1, node2, this);
        if (connector.valid) {
            this.container.appendChild(connector.html);
            this.connections.push(connector);
        }

        node1.html.classList.remove('node-selected');
        this.selectedOutputNode = null;

    }

    //when user moves the gate - redraw wires  
    reDrawConnectors(gate) {
        const connectors = this.connections.filter( connector => connector.node1 === gate || connector.node2 === gate);
        //this.redoInputSlots(gate)
        for(let connector of connectors) {
            connector.redrawLine();
        }
    }

    //for all
    redoAllLines(){
        for(let gate of this.gates){
            this.redoInputSlots(gate)
        }
    }

    //on gate drop, recalculate/check which input is closest
    redoInputSlots(node) {
        if (!node.acceptingInput || node.inputs.length === 0 || node.maxInputs === 1) {
            return;
        }

        if(node.inputs.length === 1) {
            const input = node.inputs[0];
            let inputCoords = input.node1.getInputCoord(input.inputSlot);
            if (inputCoords == null) {
                inputCoords = input.node2.getInputCoord(input.inputSlot);
            }
            const inputY = inputCoords.y;
            const diffY = node.coordinates.y + (node.size.height / 2) - inputY;
            if (diffY > 0) {
                input.inputSlot = 0;
            } else {
                input.inputSlot = 1;
            }
            input.redrawLine();
            return;
        }

        if(node.inputs.length === 2) {
            const input1 = node.inputs[0];
            const input2 = node.inputs[1];
            const y1 = input1.node1.getOutputCoord().y;
            const y2 = input2.node1.getOutputCoord().y;

            if (y1>=y2) {
                input1.inputSlot = 1;
                input2.inputSlot = 0;
            } else {
                input1.inputSlot = 0;
                input2.inputSlot = 1;
            }

            input1.redrawLine();
            input2.redrawLine();

        }


    }


    clearGateSelection() {
        for (let i = 0; i < this.gates.length; i++) {
            this.gates[i].html.classList.remove('gate-selected');
        }
    }

    evaluateCircuit(){
        const endPoints = [];
        for (let node of this.viewerObjects) {
            if (node.type === 'end'){
                endPoints.push(node)
            }
        }

        if (endPoints.length === 0) {
            console.log("No end points")
        }

        for (let endPoint of endPoints) {

            if (endPoint.inputs.length === 0) {
                endPoint.setState(false);
                return;
            }
                
            if(endPoint.inputs[0].getState() === true) {
                endPoint.setState(true);
            } else {
                endPoint.setState(false);
            }

            if(!endPoint.inputs[0].getState()){
                return;
            }
        }



        this.levelComplete = true;
        
    }

    //createBin
    createBin() {
        const bin = new ViewerObject('bin', true);
        bin.coordinates = { x: (this.width / 2) - (bin.size.width/2), y: 0 };
        bin.html.style.position = 'absolute';
        bin.html.style.left = `${bin.coordinates.x}px`;
        bin.html.style.top = `${bin.coordinates.y}px`;
        this.container.appendChild(bin.html);
        this.viewerObjects.push(bin);
    }

    //todo
    increaseStartPoints(){
        //when run the number of start points increases
        //automatically adjusts so that the current start point shifts upwards
    }

    //todo
    increaseEndPoints(){
        //when run the number of end points increases
        //automatically adjusts so that the current end point shifts upwards
    }

    //todo
    decreaseStartPoints(){
        //when run the number of start points decrease
        //automatically adjusts so that the bottom start point is removed and 
        //the remaining start points shifts downwards
    }

    //todo
    decreaseEndPoints(){
        //when run the number of end points decrease
        //automatically adjusts so that the bottom end point is removed and 
        //the remaining end points shifts downwards
    }

    createMultipleStartPoints(integer){
        //for use in level mode
        const heightDivision = this.height/(integer+1)
        for(let i = 0; i < integer; i++) {
            const y = heightDivision * (i+1);
            this.createStartPoint(true, 50, y);
        }
    }


    //build start points
    createStartPoint(state, x, y) {
        const startPoint = new ViewerObject('start', state);
        startPoint.coordinates = { x: x, y: y };
        startPoint.html.style.position = 'absolute';
        startPoint.html.style.left = `${x}px`;
        startPoint.html.style.top = `${y}px`;
        this.container.appendChild(startPoint.html);
        this.viewerObjects.push(startPoint);
        this.addConnectionListener(startPoint);
    }

    createMultipleEndPoints(integer){
        const xCoord = this.width-50;
        const heightDivision = this.height/(integer+1)
        for(let i = 0; i < integer; i++) {
            const y = heightDivision * (i+1);
            this.createEndPoint(false, xCoord, y);
        }
    }


    //build end points
    createEndPoint(state, x, y) {
        const endPoint = new ViewerObject('end', state);
        endPoint.coordinates = { x: x, y: y };
        endPoint.html.style.position = 'absolute';
        endPoint.html.style.left = `${x}px`;
        endPoint.html.style.top = `${y}px`;
        this.container.appendChild(endPoint.html);
        this.viewerObjects.push(endPoint);
        this.addConnectionListener(endPoint);
    }


    //is the pen clicked? 
    connectionModeOn(boolean) {
        this.connectionMode = boolean;
        if (!boolean) {
            if (this.selectedOutputNode !== null) {
                this.selectedOutputNode.html.classList.remove('node-selected');
            }

            this.selectedOutputNode = null;

            return;
        }
    }


    destroy() {

        window.removeEventListener('resize', this.resize);

        for (let gate of this.gates) {
            this.container.removeChild(gate.html);
        }
        for (let object of this.viewerObjects) {
            this.container.removeChild(object.html);
        }

        for (let connector of this.connections) {
            connector.remove();
        }

        this.gates = [];
        this.connections = [];
        this.viewerObjects = [];

        this.selectedOutputNode = null;
        this.connectionMode = false;
    }


    updateGateCoordinates(gate, x, y) {
        const viewerRectangle = this.container.getBoundingClientRect();
        if (x < 0) {
            gate.coordinates.x = 0;
        } else if (x > viewerRectangle.width - gate.size.width) {
            gate.coordinates.x = viewerRectangle.width - gate.size.width;
        } else {
            gate.coordinates.x = x;
        }

        if (y < 0) {
            gate.coordinates.y = 0;
        } else if (y > viewerRectangle.height - gate.size.height) {
            gate.coordinates.y = viewerRectangle.height - gate.size.height;
        } else {
            gate.coordinates.y = y;
        }
    }

    updateGatePosition(gate) {
        const gateElement = gate.html;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${gate.coordinates.x}px`;
        gateElement.style.top = `${gate.coordinates.y}px`;
    }


}

