export default class Viewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
        this.updateViewerDimensions();
        window.addEventListener('resize', () => {this.updateViewerDimensions()});
        this.startPoints = [];
        this.endPoints = [];
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
        console.log(`Added ${gate.type} gate to viewer at position (${gate.coordinates.x}, ${gate.coordinates.y})`);
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

        }

        this.container.addEventListener('mousemove', onmousemove);

        gate.html.onmouseup = (event) => {
            
            const position = this.mouseToViewerCoordinates(event);

            //console.log(`Moved gate to position (${position.x}, ${position.y})`);
            this.container.removeEventListener('mousemove', onmousemove);
            
            this.updateGateCoordinates(
                gate, 
                position.x - offsetX,
                position.y - offsetY
            );            
            
            this.updateGatePosition(gate);
            gate.html.classList.remove('gate-dragged');
            gate.onMouseUp = null;

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

    //build start points

    //build end points

    //clearViewer
    resetViewer(){
        for (let gate of this.gates) {
            this.container.removeChild(gate.html);
        }
        this.gates = [];
        this.connections = [];
        this.startPoints = [];
        this.endPoints = [];
    }

    //removeGate

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
        //console.log(`Updated ${gate.type} gate position to (${gate.coordinates.x}, ${gate.coordinates.y})`);
    }


}

