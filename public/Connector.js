

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
        if(this.node1.outputs.length >= this.node1.maxOutputs){
            console.log("Cannot add. Output already in use");
            return false;
        }
        
        //if the right hand node is clicked before left hand then retry
        if (this.node1.coordinates.x > this.node2.coordinates.x) {
            console.log("Wrong way round");
            return false;
        }

        //if node inputs are full then retry. 
        if (this.node2.inputs.length >= this.node2.maxInputs) {
            console.log("Cannot add. Inputs already in use")
            return false;
        }
        
        if(!this.node1.creatingOutput) {
            return false;
        }

        if(!this.node2.acceptingInput) {
            return false;
        }


        return true;
    }



    setInputSlot(){
        if(this.node2.maxInputs === 1){
            this.inputSlot = 0;
            return;
        }

        if(this.node2.inputs.length === 0){
            const top = this.node2.getInputCoord(0);
            const bottom = this.node2.getInputCoord(1);
            if (Math.abs(top.y - this.aCoord.y) >= Math.abs(bottom.y - this.aCoord.y)) {
                this.inputSlot = 1;
            } else {
                this.inputSlot = 0;
            }
            return;
        }

        if(this.node2.inputs.length === 1){
            const existingConnector = this.node2.inputs[0]
            const existingConnectorOutputCoordY = existingConnector.node1.coordinates.y + (existingConnector.node1.getOutputCoord().y);

            if(existingConnectorOutputCoordY < this.aCoord.y){
                this.inputSlot = 1;
                existingConnector.inputSlot = 0;
            } else { 
                existingConnector.inputSlot = 1;
                this.inputSlot = 0
            }
            
            existingConnector.redrawLine();
            return;
        }
    }


    setUpLine(){
        this.aCoord = this.node1.getOutputCoord();
        this.setInputSlot();
        this.bCoord = this.node2.getInputCoord(this.inputSlot);
        
        this.node1.outputs.push(this);
        this.node2.inputs.push(this);
    }

    redrawLine() {
        this.aCoord = this.node1.getOutputCoord();
        this.bCoord = this.node2.getInputCoord(this.inputSlot);
        this.html.innerHTML = this.drawSVGLine();
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
        if (this.html !== null) {
            this.html.remove();
            this.html = null;
        }
        this.node1.outputs = this.node1.outputs.filter(connector => connector !== this);
        this.node2.inputs = this.node2.inputs.filter(connector => connector !== this);
    }





}