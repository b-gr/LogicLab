export default class ViewerObject {
    constructor(type, state, id) {
        this.coordinates = { x: 0, y: 0 };
        this.type = type;
        this.state = state;
        this.id = id;

        this.acceptingInput = false;
        this.creatingOutput = false;
        
        this.maxOutputs = 0;
        this.maxInputs = 0;

        const scale = 0.7;
        this.size = { width: 50*scale, height: 50*scale }

        if(type === "start") {
            this.creatingOutput = true;
            this.maxOutputs = 1;
            this.outputs = [];
        }

        if(type === "end") {
            this.acceptingInput = true;
            this.inputs = [];
            this.maxInputs = 1;
        }

        if(type === "bin") {
            this.size = { width: 100*scale, height: 100*scale }
            this.id = "bin";
        }

        this.html = this.createHTML();

    }


    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;

        if (this.type === 'end') {
            if (this.state === true) {
                this.html.innerHTML = this.endSVGtrue();
            } else if (this.state === false) {
                this.html.innerHTML = this.endSVGfalse();
            } else { 
                this.html.innerHTML = this.endSVGUnknown();
            }
        }
    }

    getOutputCoord(){
        if (!this.creatingOutput) {
            return null;
        } else {
            return {
                x: this.coordinates.x + this.size.width,
                y: this.coordinates.y + this.size.height/2
            };
        }
    }

    getInputCoord() {
        if (!this.acceptingInput){
            return null;
        } else {
            return {
                x: this.coordinates.x,
                y: this.coordinates.y + this.size.height/2
            };
        }
    }


    removeHTML(){
        if (this.html !== null) {
            this.html.remove();
            this.html = null;
        }
    }

    createHTML() {
        const container = document.createElement('div');
        
        //start
        if (this.type === 'start' && this.state) {
            this.creatingOutput = true;
            container.innerHTML = this.startSVGtrue();
        } else if (this.type === 'start' && !this.state) {
            this.creatingOutput = true;
            container.innerHTML = this.startSVGfalse();
        }
        
        //end
        else if (this.type === 'end' && this.state === true) {
            this.acceptingInput = true;
            container.innerHTML = this.endSVGtrue();
        } else if (this.type === 'end' && this.state === false) {
            this.acceptingInput = true;
            container.innerHTML = this.endSVGfalse();
        } else if (this.type === 'end') {
            this.acceptingInput = true;
            container.innerHTML = this.endSVGUnknown();
        }
        
        //bin
        else if (this.type === 'bin' && this.state) {
            container.innerHTML = this.binClosedSVG();
        } else if (this.type === 'bin' && !this.state) {
            container.innerHTML = this.binOpenSVG();
        }


        return container;
    }

    openBin() {
        this.html.innerHTML = this.binOpenSVG();
    }

    closeBin() {
        this.html.innerHTML = this.binClosedSVG();
    }

    binOpenSVG = () => {
        return `
        <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg">
            fill="white"
            <path 
                d="
                    M22.5 30
                    L77.5 30
                    L72.5 90
                    L27.5 90
                    Z

                    M25 10
                    L80 30
                    L80 23
                    L32 5
                    Z        
                " 
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
            <path 
                d="
                    M35 40
                    L37.5 80
                    M50 40
                    L50 80
                    M65 40
                    L62.5 80
                "
            stroke="white"
            stroke-width="5"
            stroke-linecap="round"/>
        </svg>
        `;
    }



    binClosedSVG = () => {
        return `
        <svg 
            width="${this.size.width}" 
            height="${this.size.height}"        
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg">
            fill="white"
            <path 
                d="
                    M22.5 30
                    L77.5 30
                    L72.5 90
                    L27.5 90
                    Z

                    M20 30
                    L80 30
                    L75 25
                    L25 25
                    Z        
                " 
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
            <path 
                d="
                M35 40
                L37.5 80
                M50 40
                L50 80
                M65 40
                L62.5 80
                "
            stroke="white"
            stroke-width="5"
            stroke-linecap="round"/>
        </svg>
        `;
    }

    //endUnknown
    endSVGUnknown = () => {
        return `
            <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
                fill="orange"
                viewBox="0 0 50 50" 
                xmlns="http://www.w3.org/2000/svg">
                <rect 
                    width="50" 
                    height="50">
                </rect>
                <text 
                    font-size="45" 
                    fill="white"
                    font-family="serif"
                    x="50%" y="80%" 
                    text-anchor="middle"
                    dominant-baseline="inherit">
                        ?
                </text>
            </svg>
        `;
    }

    //endTrue
    endSVGtrue = () => {
        return `
            <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
                fill="blue"
                viewBox="0 0 50 50" 
                xmlns="http://www.w3.org/2000/svg">
                <rect 
                    width="50" 
                    height="50">
                </rect>
                <text 
                    font-size="45" 
                    fill="white"
                    font-family="serif"
                    x="50%" y="80%" 
                    text-anchor="middle"
                    dominant-baseline="inherit">
                        1
                </text>
            </svg>
        `;
    }

    endSVGfalse = () => {
        return `
            <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
                fill="red"
                viewBox="0 0 50 50" 
                xmlns="http://www.w3.org/2000/svg">
                <rect 
                    width="50" 
                    height="50">
                </rect>
                <text 
                    font-size="45" 
                    fill="white"
                    font-family="serif"
                    x="50%" y="80%" 
                    text-anchor="middle"
                    dominant-baseline="inherit">
                        0
                </text>
            </svg>
        `;
    }


    startSVGtrue = () => {
        return `
            <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
                fill="blue"
                viewBox="0 0 50 50" 
                xmlns="http://www.w3.org/2000/svg">
                <circle 
                    r="25" cx="25" cy="25">
                </circle>
                <text 
                    font-size="45" 
                    fill="white"
                    font-family="serif"
                    x="50%" y="80%" 
                    text-anchor="middle"
                    dominant-baseline="inherit">
                        1
                </text>
            </svg>
        `;
    }

    startSVGfalse = () => {
        return `
            <svg 
            width="${this.size.width}" 
            height="${this.size.height}"    
                fill="red"
                viewBox="0 0 50 50" 
                xmlns="http://www.w3.org/2000/svg">
                <circle 
                    r="25" cx="25" cy="25">
                </circle>
                <text 
                    font-size="45" 
                    fill="white"
                    font-family="serif"
                    x="50%" y="80%" 
                    text-anchor="middle"
                    dominant-baseline="inherit">
                        0
                </text>
            </svg>
        `;
    }




}