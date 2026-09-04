export default class LogicGate {
    constructor(type) {
        this.coordinates = { x: 0, y: 0 };
        this.type = type;
        this.state = null;
        this.id = null;

        this.inputs = [];
        this.outputs = [];

        this.draggable = true;

        this.acceptingInput = true;
        this.creatingOutput = true;

        if (type === "NOT") {
            this.maxInputs = 1;
        } else {
            this.maxInputs = 2;
        }
        this.maxOutputs = 1;
        const scale = 0.7;
        this.size = { width: 110 * scale, height: 60 * scale };
        this.svg = this.getSVG(type);
        this.html = null;

    }

    createHTML = () => {
        const container = document.createElement('div');
        container.classList.add('logic-gate');
        container.innerHTML = this.svg;
        this.html = container;
        return container;
    }

    getInputValues() {
        return this.inputs.map(connector => connector.getState());
    }

    getState() {
        if (this.inputs.length !== this.maxInputs) {
            return null;
        }
        return this.booleanOperation();
    }

    getInputCoord(inputSlot) {
        if (this.maxInputs === 1) {
            return {
                x: this.coordinates.x,
                y: this.coordinates.y + (this.size.height / 2)
            };
        }

        if (inputSlot === 0) {
            return {
                x: this.coordinates.x,
                y: this.coordinates.y + (this.size.height * 0.25)
            }
        }

        if (inputSlot === 1) {
            return {
                x: this.coordinates.x,
                y: this.coordinates.y + (this.size.height * 0.75)
            }
        }
    }

    getOutputCoord() {
        return {
            x: this.coordinates.x + this.size.width,
            y: this.coordinates.y + (this.size.height / 2)
        };
    }


    booleanOperation = () => {
        const inputValues = this.getInputValues();

        switch (this.type) {
            case 'AND':
                return inputValues[0] && inputValues[1];
            case 'OR':
                return inputValues[0] || inputValues[1];
            case 'NOT':
                return !inputValues[0];
            case 'NAND':
                return !(inputValues[0] && inputValues[1]);
            case 'NOR':
                return !(inputValues[0] || inputValues[1]);
            case 'XOR':
                return (inputValues[0] && !inputValues[1]) || (!inputValues[0] && inputValues[1]);
            case 'XNOR':
                return (inputValues[0] && inputValues[1]) || (!inputValues[0] && !inputValues[1]);
            default:
                throw new Error('Invalid logic gate type');
        }
    }

    // SVGs for different logic gates
    getSVG = (type) => {
        switch (type) {
            case 'AND':
                return this.andSVG();
            case 'OR':
                return this.orSVG();
            case 'NOT':
                return this.notSVG();
            case 'NAND':
                return this.nandSVG();
            case 'NOR':
                return this.norSVG();
            case 'XOR':
                return this.xorSVG();
            case 'XNOR':
                return this.xnorSVG();
            default:
                throw new Error(`Invalid logic gate type: "${type}"`);
        }
    }

    andSVG = () => {
        return `
            <svg 
                width="${this.size.width}" 
                height="${this.size.height}" 
                viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="

                        M90 30 
                        C90 15 80 0.5 60 0.5 
                        L6 0.5 
                        V59.5 
                        H59.5 
                        C80 60 90 50 90 30 
                        Z 

                        M90 30 
                        H110

                        M0 15 
                        H6
                        
                        M0 45 
                        H6
                    " 
                stroke="white" 
                stroke-linecap="round"/>
            </svg>
        `;
    }

    nandSVG = () => {
        return `
            <svg
                width="${this.size.width}" 
                height="${this.size.height}" 
                    viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="
                        M90 30 
                        C90 15 80 0.5 60 0.5 
                        L6 0.5 
                        V59.5 
                        H59.5 
                        C80 60 90 50 90 30 
                        Z 

                        M96 30 
                        H110

                        M0 15 
                        H6

                        M0 45 
                        H6
                    " 
                    stroke="white" 
                    stroke-linecap="round"
                />
                <circle 
                    cx="93" 
                    cy="30" 
                    r="3" 
                    stroke="white" 
                    stroke-linecap="round"
                />
            </svg>
        `;
    }

    orSVG = () => {
        return `
            <svg
                width="${this.size.width}" 
                height="${this.size.height}" 
                    viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="
                        M6 0.5 
                        C64 2 82 10 90 30
                        C82 50 64 58 6 59.5
                        C25 40 25 19.5 6 0.5
                        Z

                        M90 30 
                        H110

                        M0 15 
                        H16

                        M0 45 
                        H16
                    " 
                    stroke="white" 
                    stroke-linecap="round"
                />
            </svg>
        `;
    }

    norSVG = () => {
        return `
            <svg
                width="${this.size.width}" 
                height="${this.size.height}" 
                    viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="
                        M6 0.5 
                        C64 2 82 10 90 30
                        C82 50 64 58 6 59.5
                        C25 40 25 19.5 6 0.5
                        Z

                        M96.5 30 
                        H110

                        M0 15 
                        H16

                        M0 45 
                        H16
                    " 
                    stroke="white" 
                    stroke-linecap="round"
                />
                <circle 
                    cx="93.5" 
                    cy="30" 
                    r="3" 
                    stroke="white" 
                    stroke-linecap="round"
                />
            </svg>
        `;
    }

    notSVG = () => {
        return `
            <svg
                width="${this.size.width}" 
                height="${this.size.height}" 
                    viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="
                        M6 0.5 
                        L57 30
                        L6 59.5
                        Z

                        M63.5 30 
                        H110

                        M0 30 
                        H6
                    " 
                    stroke="white" 
                    stroke-linecap="round"
                />
                <circle 
                    cx="60.5" 
                    cy="30" 
                    r="3" 
                    stroke="white" 
                    stroke-linecap="round"
                />
            </svg>
        `;
    }

    xnorSVG = () => {
        return `
            <svg
                width="${this.size.width}" 
                height="${this.size.height}" 
                viewBox="0 0 110 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="
                        M6 0.5 
                        C64 2 82 10 90 30
                        C82 50 64 58 6 59.5
                        C25 40 25 19.5 6 0.5
                        Z

                        M0 59.5 
                        C19 40 19 19.5 0 0.5

                        M96.5 30 
                        H110

                        M0 15 
                        H16

                        M0 45 
                        H16
                    " 
                    stroke="white" 
                    stroke-linecap="round"
                />
                <circle 
                    cx="93.5" 
                    cy="30" 
                    r="3" 
                    stroke="white" 
                    stroke-linecap="round"
                />
            </svg>
        `;
    }

    xorSVG = () => {
        return `
            <svg
                    width="${this.size.width}" 
                    height="${this.size.height}" 
                        viewBox="0 0 110 60" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path 
                d="
                    M6 0.5 
                    C64 2 82 10 90 30
                    C82 50 64 58 6 59.5
                    C25 40 25 19.5 6 0.5
                    Z

                    M0 59.5 
                    C19 40 19 19.5 0 0.5

                    M90 30 
                    H110

                    M0 15 
                    H16

                    M0 45 
                    H16
                " 
                stroke="white" 
                stroke-linecap="round"/>
            </svg>
        `;
    }
}

