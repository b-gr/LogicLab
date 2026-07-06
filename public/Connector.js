

export default class Connector {

    //todo: change the code in connector to pass points from clicked objects (gates or nodes) in the area and create a connection between them. 
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.html = this.createHTML();
        this.inputSlot = null;
    }


    createHTML() {
        const container = document.createElement('div');
        container.innerHTML = this.drawSVGLine();
        return container;
    }

    getInputCoords(){
        let bCoord;
        if(this.node2.inputMax === 1) {
            bCoord = {
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

            bCoord = {
                x: this.node2.coordinates.x,
                y: this.node2.coordinates.y + yAdd
            }
        }
        return bCoord
        
    }


    drawSVGLine() {
        
        //node 2 coordinates
        let bCoord;

        //node 1 coordinates
        let aCoord;
        if (this.node1.outputs.length < 1) {
            aCoord = {
                x: this.node1.coordinates.x + this.node1.size.width,
                y: this.node1.coordinates.y + this.node1.size.height / 2
            }
        } else {
            console.log("Cannot add. Output already in use")
            return;
        }

        //if the right hand node is clicked before left hand then retry
        if(this.node1.coordinates.x > this.node2.coordinates.x){
            console.log("Wrong way round");
            return;
        }

        //if node inputs are full then retry. 
        if (this.node2.inputs.length >= this.node2.inputMax) {
            console.log("Cannot add. Inputs already in use")
            return;
        }


        //find the closest node input when both nods are empty
        if (this.node2.inputs.length === 0 && this.node2.inputMax === 2) {
            this.inputSlot = 0
            bCoord = this.getInputCoords();
        }


        //partially filled (reasses the proximity and then nearby)
        if (this.node2.inputs.length === 1 && this.node2.inputMax === 2) {

            //the other node in the inputs
            existingConnector = this.node2.inputs[0]
            
            existingConnectorOutputCoordY = existingConnector.node1.coordinates.y + 30;

            if(existingConnectorOutputCoordY < aCoord.y){
                this.inputSlot = 1;
                existingConnector.inputSlot = 0;
            } else { 
                existingConnector.inputSlot = 1;
                this.inputSlot = 0
            }

            //redraw line for existing
            existingConnector.drawSVGLine();
            bCoord = this.getInputCoords();
        }



        if (this.node2.inputMax === 1) {
            this.inputSlot = 0;
            bCoord = this.getInputCoords();
        }
        



        console.log(`for first node, x: ${aCoord.x}, y: ${aCoord.y}`);

        console.log(`for second node, x: ${bCoord.x}, y: ${bCoord.y}`)
        

        
        //add to input and output arrays
        this.node1.outputs.push(this);
        this.node2.inputs.push(this);

        const difx = Math.abs(aCoord.x - bCoord.x);
        const dify = Math.abs(aCoord.y - bCoord.y);
        return `
        <svg
            width="${difx}"
            height="${dify}"
            viewBox="${aCoord.x} ${aCoord.y} ${bCoord.x} ${bCoord.y}"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M${aCoord.x} ${aCoord.y}
                    L${((difx) / 2) + aCoord.x} ${aCoord.y}
                    L${((difx) / 2) + aCoord.x} ${bCoord.y}
                    L${bCoord.x} ${bCoord.y}    
                "
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
        `
    }
}