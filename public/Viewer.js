import Connector from './Connector.js';
import Toolbar from './Toolbar.js';
import ViewerObject from './ViewerObject.js';
import LogicGate from './LogicGate.js'

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

        this.sizeBefore = { x: 0, y: 0 }
        this.level
        this.initialised = false;
        this.answerSelected = null;
        this.highlightCorrectAnswer = false;
    }

    //sets the starting points on the viewer 
    init(level) {
        this.level = level;
        this.updateViewerDimensions();
        this.createBin();
        this.createStartPointsFromSchema();
        this.createEndPointsFromSchema();
        this.sizeBefore = { x: this.width, y: this.height };
        this.addStartingGates();
        //this.printAllIDs();
        this.createStartingConnections();
        this.initialised = true;
    }


    //used when changing the window size 
    updateViewerDimensions() {
        const viewerRectangle = this.container.getBoundingClientRect();
        this.width = viewerRectangle.width;
        this.height = viewerRectangle.height;
        this.startX = viewerRectangle.left;
        this.endX = viewerRectangle.right;
        this.startY = viewerRectangle.top;
        this.endY = viewerRectangle.bottom;
    }

    createEndPointsFromSchema() {
        const endNodes = this.level.endNodes;
        const integer = endNodes.length;
        const xCoord = this.width - 100;
        const heightDivision = this.height / (integer + 1)
        let i = 0;
        for (let endNode of endNodes) {
            const y = heightDivision * (i + 1);
            this.createEndPoint(endNode.state, xCoord, y, endNode.id)
            i++;
        }
    }

    //build end points
    createEndPoint(state, x, y, id) {
        const endPoint = new ViewerObject('end', state, id);
        endPoint.createHTML();
        endPoint.coordinates = { x: x, y: y };
        endPoint.html.style.position = 'absolute';
        endPoint.html.style.left = `${x}px`;
        endPoint.html.style.top = `${y}px`;
        this.container.appendChild(endPoint.html);
        this.viewerObjects.push(endPoint);
        this.addConnectionListener(endPoint);
    }

    createStartPointsFromSchema() {
        const startNodes = this.level.startNodes;
        const integer = startNodes.length;
        const xCoord = 50;
        const heightDivision = this.height / (integer + 1)
        let i = 0;
        for (let startNode of startNodes) {
            const y = heightDivision * (i + 1);
            this.createStartPoint(startNode.state, 50, y, startNode.id);
            i++;
        }
    }

    //build start points
    createStartPoint(state, x, y, id) {
        const startPoint = new ViewerObject('start', state, id);
        startPoint.createHTML();
        startPoint.coordinates = { x: x, y: y };
        startPoint.html.style.position = 'absolute';
        startPoint.html.style.left = `${x}px`;
        startPoint.html.style.top = `${y}px`;
        this.container.appendChild(startPoint.html);
        this.viewerObjects.push(startPoint);
        this.addConnectionListener(startPoint);
    }








    //on view resize, carry out the following
    resizeHelper() {
        this.updateViewerDimensions();
        this.repositionBin();
        this.repositionEndPoints();
        this.repositionStartPoints();
        this.repositionGates();
        this.redoAllLines();
    }

    //used when changing the window size 
    repositionGates() {
        const margin = 100;
        const usableWidthBefore = this.sizeBefore.x - (margin * 2);
        const usableWidthNow = this.width - (margin * 2)
        const usableHeightBefore = this.sizeBefore.y - (margin * 2);
        const usableHeightNow = this.height - (margin * 2)

        for (let gate of this.gates) {
            const oldPositionX = (gate.coordinates.x + (gate.size.width / 2) - margin) / usableWidthBefore;
            const newX = margin + (oldPositionX * usableWidthNow)
            gate.coordinates.x = newX - (gate.size.width / 2);

            const oldPositionY = (gate.coordinates.y + (gate.size.height / 2) - margin) / usableHeightBefore;
            const newY = margin + (oldPositionY * usableHeightNow)
            gate.coordinates.y = newY - (gate.size.height / 2);

            this.updateGatePosition(gate)

        }
        this.sizeBefore = { x: this.width, y: this.height };
    }


    //used when changing the window size 
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

    //used when changing the window size 
    repositionStartPoints() {
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



    //used when changing the window size 
    repositionBin() {
        const bin = this.viewerObjects.find(node => node.type === 'bin');

        bin.coordinates = { x: (this.width / 2) - 50, y: 0 };
        bin.html.style.left = `${bin.coordinates.x}px`;
        bin.html.style.top = `${bin.coordinates.y}px`;
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

    addStartingGates() {
        if (this.level.startingGates.length === 0) {
            return;
        }
        for (let gate of this.level.startingGates) {
            const position = { x: gate.x * this.width, y: gate.y * this.height }

            this.addGate(gate.type);


            this.gates.at(-1).coordinates = { x: position.x, y: position.y };

            this.updateGatePosition(this.gates.at(-1));
            this.gates.at(-1).draggable = gate.draggable;
            this.gates.at(-1).id = gate.id;
        }
    }

    addGate(gateString) {
        if (this.initialised) {
            for (let entry of Object.entries(this.level.availableGates)) {
                const gateType = entry[0]
                if (gateType !== gateString) {
                    continue;
                }
                const maxQuantity = entry[1]
                const alreadyPlaced = this.gates.filter(gate => gate.type === gateType).length

                const numberRemaining = maxQuantity - alreadyPlaced
                if (numberRemaining === 0) {
                    return
                }
            }
        }

        const gate = new LogicGate(`${gateString}`)
        if (this.connectionMode) {
            window.alert("Please finish drawing your connection or unclick the draw button to add more gates.")
        } else {
            gate.createHTML();
            this.container.appendChild(gate.html);
            this.updateGatePosition(gate);
            this.addEventListenersToGate(gate);
            this.gates.push(gate);
        }
    }

    mouseToViewerCoordinates(event) {
        const viewerRectangle = this.container.getBoundingClientRect();
        const x = event.clientX - viewerRectangle.left;
        const y = event.clientY - viewerRectangle.top;
        return { x, y };
    }

    dragGate(event, gate) {
        if (this.connectionMode || !gate.draggable) {
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
                position.x < this.width / 2 + bin.size.width / 2
                &&
                position.x > this.width / 2 - bin.size.width / 2
                &&
                position.y < bin.size.height
            ) {
                bin.openBin();
            } else {
                bin.closeBin();
            }

        }

        const onmouseup = (event) => {
            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);

            const position = this.mouseToViewerCoordinates(event);

            this.updateGateCoordinates(
                gate,
                position.x - offsetX,
                position.y - offsetY
            );

            this.updateGatePosition(gate);

            this.reDrawConnectors(gate);

            gate.html.classList.remove('gate-dragged');

            const bin = this.viewerObjects.find(obj => obj.type === 'bin');

            if (
                position.x < this.width / 2 + bin.size.width / 2
                &&
                position.x > this.width / 2 - bin.size.width / 2
                &&
                position.y < bin.size.height
            ) {
                this.removeGate(gate)
                this.viewerObjects.find(obj => obj.type === 'bin').closeBin();

            }


            gate.html.style.zIndex = 1;

            this.redoAllLines();
            if (this.level.id === 999) {
                this.evaluateCircuit();
            }
        }

        document.addEventListener('mousemove', onmousemove);
        document.addEventListener('mouseup', onmouseup);


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
            this.linkNodes(node);
        } else {
            if (node.creatingOutput) {
                node.html.classList.add('node-selected');
                this.selectedOutputNode = node;
            }
        }
        if (this.level.id === 999) {
            this.evaluateCircuit();
        }
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

        if (this.viewerObjects.includes(node1) && this.viewerObjects.includes(node2) && this.level.id !== 999) {
            this.selectedOutputNode = null;
            node1.html.classList.remove('node-selected');
            console.log("Not possible: start and end nodes cannot be connected directly to each other")
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
            console.log("not possible: no available inputs")
            return;
        }

        this.makeConnection(node1, node2);

        node1.html.classList.remove('node-selected');
        this.selectedOutputNode = null;

    }

    createStartingConnections() {
        const nodesAndGates = this.viewerObjects.concat(this.gates);
        for (const connections of this.level.startingConnections) {
            const node1 = nodesAndGates.find(nodeOrGate => nodeOrGate.id === connections.from)
            const node2 = nodesAndGates.find(nodeOrGate => nodeOrGate.id === connections.to)
            this.makeConnection(node1, node2)
        }
    }

    makeConnection(node1, node2) {
        if (this.level.maxConnections !== Infinity) {
            const connectorsRemaining = this.level.maxConnections - this.connections.length
            if (connectorsRemaining <= 0) {
                return;
            }
        }

        const connector = new Connector(node1, node2, this);

        if (connector.valid) {
            connector.createHTML();
            this.container.appendChild(connector.html);
            this.connections.push(connector);
        }
    }

    //when user moves the gate - redraw wires  
    reDrawConnectors(gate) {
        const connectors = this.connections.filter(connector => connector.node1 === gate || connector.node2 === gate);
        for (let connector of connectors) {
            connector.redrawLine();
        }
    }

    //for all
    redoAllLines() {
        for (let gate of this.gates) {
            this.redoInputSlots(gate)
        }
        const endPoints = this.viewerObjects.filter(node => node.type === 'end')
        for (let endPoint of endPoints) {
            this.reDrawConnectors(endPoint)
        }
    }

    //on gate drop, recalculate/check which input is closest
    redoInputSlots(node) {
        if (!node.acceptingInput || node.inputs.length === 0 || node.maxInputs === 1) {
            return;
        }

        if (node.inputs.length === 1) {
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

        if (node.inputs.length === 2) {
            const input1 = node.inputs[0];
            const input2 = node.inputs[1];
            const y1 = input1.node1.getOutputCoord().y;
            const y2 = input2.node1.getOutputCoord().y;

            if (y1 >= y2) {
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

    evaluateCircuit() {

        if (this.level.mode === "predict") {
            if (this.answerSelected === null) {
                return;
            }

            const answerGiven = [];
            const expectedEndStates = this.level.expectedEndStates;

            answerGiven.push(this.answerSelected.toString().toLowerCase());


            if (answerGiven.filter(state => state === "true").length === expectedEndStates.filter(state => state === true).length
                &&
                answerGiven.filter(state => state === "false").length === expectedEndStates.filter(state => state === false).length
            ) {
                this.highlightCorrectAnswer = true;
                this.levelComplete = true;
            }


        } else if (this.level.mode === "build") {
            const endPoints = [];
            for (let node of this.viewerObjects) {
                if (node.type === 'end') {
                    endPoints.push(node)
                }
            }

            if (endPoints.length === 0) {
                console.log("Error: No end points specified in level")
            }

            for (let endPoint of endPoints) {

                if (endPoint.inputs.length === 0) {
                    endPoint.setState("unknown");
                    continue;
                }

                const state = endPoint.inputs[0].getState();
                if (state === true) {
                    endPoint.setState(true);
                } else if (state === false) {
                    endPoint.setState(false);
                } else {
                    endPoint.setState("unknown");
                }
            }

            if (!this.checkRequiredGatesUsed()) {
                return
            }

            const actualEndStates = endPoints.map(node => node.state);
            const expectedEndStates = this.level.expectedEndStates;


            if (actualEndStates.filter(state => state === true).length === expectedEndStates.filter(state => state === true).length
                &&
                actualEndStates.filter(state => state === false).length === expectedEndStates.filter(state => state === false).length
            ) {
                this.levelComplete = true;
            }
        } else {
            const endPoints = [];
            for (let node of this.viewerObjects) {
                if (node.type === 'end') {
                    endPoints.push(node)
                }
            }

            if (endPoints.length === 0) {
                console.log("Error: No end points specified")
            }

            for (let endPoint of endPoints) {

                if (endPoint.inputs.length === 0) {
                    endPoint.setState("unknown");
                    continue;
                }

                if (endPoint.inputs[0].getState() === true) {
                    endPoint.setState(true);
                } else {
                    endPoint.setState(false);
                }
            }
        }

    }

    recurseBack(node, gatesInPath) {
        if (node.inputs.length === 0) {
            return;
        }

        for (let connector of node.inputs) {
            const previousNode = connector.node1;
            if (this.gates.includes(previousNode)) {
                gatesInPath.add(previousNode);
            }
            if (!this.viewerObjects.includes(previousNode)) {
                this.recurseBack(previousNode, gatesInPath)
            }
        }
    }


    checkRequiredGatesUsed() {
        let gatesUsed = new Set();
        const endPoints = this.viewerObjects.filter(node => node.type === 'end')
        for (let endPoint of endPoints) {
            this.recurseBack(endPoint, gatesUsed);
        }
        const requiredGates = this.level.requiredGates

        const countGates = {
            AND: 0,
            OR: 0,
            NOT: 0,
            NAND: 0,
            NOR: 0,
            XOR: 0,
            XNOR: 0
        };

        for (let gate of gatesUsed) {
            if (gate.type === "AND") {
                countGates.AND = countGates.AND + 1
            }

            if (gate.type === "OR") {
                countGates.OR = countGates.OR + 1
            }

            if (gate.type === "NOT") {
                countGates.NOT = countGates.NOT + 1
            }

            if (gate.type === "NOR") {
                countGates.NOR = countGates.NOR + 1
            }

            if (gate.type === "NAND") {
                countGates.NAND = countGates.NAND + 1
            }

            if (gate.type === "XOR") {
                countGates.XOR = countGates.XOR + 1
            }

            if (gate.type === "XNOR") {
                countGates.XNOR = countGates.XNOR + 1
            }
        }


        for (let gateType in this.level.requiredGates) {
            const requiredQuantity = this.level.requiredGates[gateType];
            const usedQuantity = countGates[gateType]

            if (usedQuantity < requiredQuantity) {
                return false
            }
        }

        return true;



    }

    //createBin
    createBin() {
        const bin = new ViewerObject('bin', true);
        bin.createHTML();
        bin.coordinates = { x: (this.width / 2) - (bin.size.width / 2), y: 0 };
        bin.html.style.position = 'absolute';
        bin.html.style.left = `${bin.coordinates.x}px`;
        bin.html.style.top = `${bin.coordinates.y}px`;
        this.container.appendChild(bin.html);
        this.viewerObjects.push(bin);
    }

    //todo
    increaseStartPoints() {
        //when run the number of start points increases
        //automatically adjusts so that the current start point shifts upwards
    }

    //todo
    increaseEndPoints() {
        //when run the number of end points increases
        //automatically adjusts so that the current end point shifts upwards
    }

    //todo
    decreaseStartPoints() {
        //when run the number of start points decrease
        //automatically adjusts so that the bottom start point is removed and 
        //the remaining start points shifts downwards
    }

    //todo
    decreaseEndPoints() {
        //when run the number of end points decrease
        //automatically adjusts so that the bottom end point is removed and 
        //the remaining end points shifts downwards
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




}