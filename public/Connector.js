

export default class Connector {

    //todo: change the code in connector to pass points from clicked objects (gates or nodes) in the area and create a connection between them. 
    constructor(node1, node2, viewer) {
        this.node1 = node1;
        this.node2 = node2;
        this.viewer = viewer;
        this.inputSlot = null;
        this.aCoord = null;
        this.bCoord = null;
        this.valid = false;
        this.html = null;

        if(this.checkLinePossible()){
            this.valid = true;
        } else {
            return;
        }

        this.setUpLine();
        this.html = this.createHTML();

    }


    createHTML() {
        const container = document.createElement('div');
        container.classList.add("connector");
        container.innerHTML = this.drawSVGLine();
        return container;
    }


    checkLinePossible(){
        if(this.node1.outputs.length >= 1){
            console.log("Cannot add. Output already in use");
            return false;
        }
        
        //if the right hand node is clicked before left hand then retry
        if (this.node1.coordinates.x > this.node2.coordinates.x) {
            console.log("Wrong way round");
            return false;
        }

        //if node inputs are full then retry. 
        if (this.node2.inputs.length >= this.node2.inputMax) {
            console.log("Cannot add. Inputs already in use")
            return false;
        }
        
        return true;
    }

    getbCoord(){
        if(this.node2.inputMax === 1) {
            return {
                x: this.node2.coordinates.x,
                y: this.node2.coordinates.y +30
            };
        } else {
            let yAdd = 0;
            if (this.inputSlot === 0){
                yAdd = 15;
            } else {
                yAdd = 45;
            }

            return {
                x: this.node2.coordinates.x,
                y: this.node2.coordinates.y + yAdd
            }
        }        
    }

    setUpLine(){
        this.aCoord = {
            x: this.node1.coordinates.x + this.node1.size.width,
            y: this.node1.coordinates.y + this.node1.size.height / 2
        }

        //find the closest node input when both nods are empty
        if (this.node2.inputs.length === 0 && this.node2.inputMax === 2) {
            this.inputSlot = 0
            this.bCoord = this.getbCoord();
        }

        //partially filled (reasses the proximity and then nearby)
        if (this.node2.inputs.length === 1 && this.node2.inputMax === 2) {

            //the other node in the inputs
            const existingConnector = this.node2.inputs[0]
            
            const existingConnectorOutputCoordY = existingConnector.node1.coordinates.y + (existingConnector.node1.size.height / 2);

            if(existingConnectorOutputCoordY < this.aCoord.y){
                this.inputSlot = 1;
                existingConnector.inputSlot = 0;
            } else { 
                existingConnector.inputSlot = 1;
                this.inputSlot = 0
            }

            //redraw line for existing
            //todo: extract as method existingConnector.redraw() ? or something similar
            existingConnector.bCoord = existingConnector.getbCoord();
            existingConnector.html.innerHTML = existingConnector.drawSVGLine();
            this.bCoord = this.getbCoord();
        }



        if (this.node2.inputMax === 1) {
            this.inputSlot = 0;
            this.bCoord = this.getbCoord();
        }
        



        console.log(`for first node, x: ${this.aCoord.x}, y: ${this.aCoord.y}`);

        console.log(`for second node, x: ${this.bCoord.x}, y: ${this.bCoord.y}`)
        

        
        //add to input and output arrays
        this.node1.outputs.push(this);
        this.node2.inputs.push(this);
    }


    drawSVGLine() {

        const difx = Math.abs(this.aCoord.x - this.bCoord.x);
        const dify = Math.abs(this.aCoord.y - this.bCoord.y);
        return `
        <svg
            width="${this.viewer.width}"
            height="${this.viewer.height}"
            viewBox="0 0 ${this.viewer.width} ${this.viewer.height}"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M${this.aCoord.x} ${this.aCoord.y}
                    L${((difx) / 2) + this.aCoord.x} ${this.aCoord.y}
                    L${((difx) / 2) + this.aCoord.x} ${this.bCoord.y}
                    L${this.bCoord.x} ${this.bCoord.y}    
                "
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
        </svg>
        `
    }

    remove() {
        this.html.remove();
        this.html = null;
        this.node1.outputs = this.node1.outputs.filter(connector => connector !== this);
        this.node2.inputs = this.node2.inputs.filter(connector => connector !== this);
    }





}