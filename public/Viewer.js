export default class Viewer {
    constructor(viewerId) {
        this.container = document.getElementById(viewerId);
        this.gates = [];
        this.connections = [];
        this.updateViewerDimensions();
        window.addEventListener('resize', this.updateViewerDimensions);
    }



    updateViewerDimensions(event) {
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

    //connections


    dragGate(event, gate) {       
        gate.html.style.zIndex = 1000;
        this.container.appendChild(gate.html);

        const moveAt = (pageX, pageY) => {
            gate.html.style.left = pageX - gate.size.width / 2 + 'px';
            gate.html.style.top = pageY - gate.size.height / 2 + 'px';
        }

        moveAt(
            this.mouseToViewerCoordinates(event).x,
            this.mouseToViewerCoordinates(event).y
        );

        const onmousemove = (event) => {
            moveAt(
                this.mouseToViewerCoordinates(event).x, 
                this.mouseToViewerCoordinates(event).y
            );
        }

        this.container.addEventListener('mousemove', onmousemove);

        gate.html.onmouseup = () => {
            
            const position = this.mouseToViewerCoordinates(onmousemove);

            console.log(`Moved gate to position (${gate.coordinates.x}, ${gate.coordinates.y})`);
            
            this.container.removeEventListener('mousemove', onmousemove);
            
            this.updateGateCoordinates(
                gate, 
                position.x - gate.size.width / 2,
                position.y - gate.size.height / 2
            );            
            
            this.updateGatePosition(gate);
            gate.onMouseUp = null;

        }

        gate.onDragStart = () => {
            return false;
        }
        

    }

    addEventListenersToGate(gate) {
        gate.html.addEventListener('mousedown', (event) => {
            this.dragGate(event, gate);
        });
    
    }
    //evaluateCircuit

    //clearViewer

    //removeGate

    updateGateCoordinates(gate, x, y) {
        if (x < 0) {
                gate.coordinates.x = 0;
            } else {
                gate.coordinates.x = x;
            }
        if (x > this.width) {
                gate.coordinates.x = this.width - gate.size.width/2;
            } else {
                gate.coordinates.x = x;
            }

        if (y < 0) {
                gate.coordinates.y = 0;
            } else { 
                gate.coordinates.y = y;
            }
        if (y > this.height) {
                gate.coordinates.y = this.height - gate.size.height/2;
            } else {
                gate.coordinates.y = y;
            }
        }

    updateGatePosition(gate) {
        const gateElement = gate.html;
        gateElement.zIndex = 2;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${gate.coordinates.x}px`;
        gateElement.style.top = `${gate.coordinates.y}px`;
        console.log(`Updated ${gate.type} gate position to (${gate.coordinates.x}, ${gate.coordinates.y})`);
    }


}

