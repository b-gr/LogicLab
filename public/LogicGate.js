export default class LogicGate {
    constructor(type) {
        this.type = type;
        this.inputs = [];
        this.svg = this.getSVG(type);
        this.html = this.createHTML();
        this.coordinates = { x: 0, y: 0 };
        this.size = { width: 110, height: 60 };
    }

    createHTML = () => {
        const container = document.createElement('div');
        container.classList.add('logic-gate');
        container.innerHTML = this.svg;
        return container;
    }

    booleanOperation = () => {
        switch (this.type) {
            case 'AND':
                return this.inputs[0] && this.inputs[1];
            case 'OR':
                return this.inputs[0] || this.inputs[1];
            case 'NOT':
                return !this.inputs[0];
            case 'NAND':
                return !(this.inputs[0] && this.inputs[1]);
            case 'NOR':
                return !(this.inputs[0] || this.inputs[1]);
            case 'XOR':
                return (this.inputs[0] && !this.inputs[1]) || (!this.inputs[0] && this.inputs[1]);
            case 'XNOR':
                return (this.inputs[0] && this.inputs[1]) || (!this.inputs[0] && !this.inputs[1]);
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
                throw new Error('Invalid logic gate type');
        }
    }

    andSVG = () => {
        return `
            <svg 
                width="110" 
                height="60" 
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
        <svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        stroke-linecap="round"/>
    <circle 
        cx="93" 
        cy="30" 
        r="3" 
        stroke="white" 
        stroke-linecap="round"
        />
</svg>`;
    }

    orSVG = () => {
        return `<svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        stroke-linecap="round"/>
</svg>`;
    }

    norSVG = () => {
        return `<svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        stroke-linecap="round"/>
    <circle 
        cx="93.5" 
        cy="30" 
        r="3" 
        stroke="white" 
        stroke-linecap="round"
        />
</svg>`;
    }

    notSVG = () => {
        return `
        <svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        stroke-linecap="round"/>
    <circle 
        cx="60.5" 
        cy="30" 
        r="3" 
        stroke="white" 
        stroke-linecap="round"
        />
</svg>`;
    }

    xnorSVG = () => {
        return `<svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        stroke-linecap="round"/>
    <circle 
        cx="93.5" 
        cy="30" 
        r="3" 
        stroke="white" 
        stroke-linecap="round"
        />
        </svg>`;
    }

    xorSVG = () => {
        return `<svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>`;
    }
}

