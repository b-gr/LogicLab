import ViewerObject from './ViewerObject.js';

export default class Viewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
        window.addEventListener('resize', () => {this.updateViewerDimensions()});
        this.viewerObjects = [];
        }

    init() {
        this.updateViewerDimensions();
        this.createBin();
        this.createStartPoint(true, 50, this.height/2);
        this.createEndPoint(false, this.width - 100, this.height/2);
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
        this.container.removeChild(gate.html);
        this.gates = this.gates.filter(g => g !== gate);
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
        this.updateViewerDimensions();     
        gate.html.style.zIndex = 1000;
        this.container.appendChild(gate.html);


        const mousePosition = this.mouseToViewerCoordinates(event);

        const offsetX = mousePosition.x - gate.coordinates.x;
        const offsetY = mousePosition.y - gate.coordinates.y;

        const moveAt = (x, y) => {
            gate.html.style.left = x - offsetX + 'px';
            gate.html.style.top = y - offsetY + 'px';
        }

        const onmousemove = (event) => {
            moveAt(
                this.mouseToViewerCoordinates(event).x, 
                this.mouseToViewerCoordinates(event).y
            );

            gate.html.classList.add('gate-dragged');
            const bin = this.viewerObjects.find(obj => obj.type === 'bin');
            
            if (
                this.mouseToViewerCoordinates(event).x < this.width/2 + 50
                &&
                this.mouseToViewerCoordinates(event).x > this.width/2 - 50
                &&
                this.mouseToViewerCoordinates(event).y < 100
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
            gate.html.classList.remove('gate-dragged');
            gate.onMouseUp = null;

            if (
                position.x < this.width/2 + 50
                &&
                position.x > this.width/2 - 50
                &&
                position.y < 100
            ) {
                this.removeGate(gate)
                this.viewerObjects.find(obj => obj.type === 'bin').closeBin();

            }

        }

        gate.html.onDragStart = () => {
            return false;
        }
        



    }

    addEventListenersToGate(gate) {
        gate.html.addEventListener('mousedown', (event) => {
            this.dragGate(event, gate);
        });
    
    }

    //evaluateCircuit

    //createBin
    createBin(){
        console.log(`creating bin`)
        const bin = new ViewerObject('bin', true);
        bin.coordinates = {x: (this.width/2)-50, y: 0};
        bin.html.style.position = 'absolute';
        bin.html.style.left = `${bin.coordinates.x}px`;
        bin.html.style.top = `${bin.coordinates.y}px`;
        this.container.appendChild(bin.html);
        this.viewerObjects.push(bin);
    }

    //build start points
    createStartPoint(state, x, y) {
        const startPoint = new ViewerObject('start',state);
        startPoint.coordinates = {x: x, y: y};
        startPoint.html.style.position = 'absolute';
        startPoint.html.style.left = `${x}px`;
        startPoint.html.style.top = `${y}px`;
        this.container.appendChild(startPoint.html);
        this.viewerObjects.push(startPoint);
    }


    //build end points
    createEndPoint(state, x, y) {
        const endPoint = new ViewerObject('end',state);
        endPoint.coordinates = {x: x, y: y};
        endPoint.html.style.position = 'absolute';
        endPoint.html.style.left = `${x}px`;
        endPoint.html.style.top = `${y}px`;
        this.container.appendChild(endPoint.html);
        this.viewerObjects.push(endPoint);
    }
    
    //connector
    


    resetViewer(){
        for (let gate of this.gates) {
            this.container.removeChild(gate.html);
        }
        for (let object of this.viewerObjects) {
            this.container.removeChild(object.html)
        }
        this.gates = [];
        this.connections = [];
        this.viewerObjects = [];
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
        gateElement.style.zIndex = 2;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${gate.coordinates.x}px`;
        gateElement.style.top = `${gate.coordinates.y}px`;
    }


}

