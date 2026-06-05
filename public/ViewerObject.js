export default class ViewerObject {
    constructor(type, state) {
        this.coordinates = { x: 0, y: 0 };
        this.type = type;
        this.html = this.createHTML(state);
        this.state = state;
    }

    createHTML(newState) {
        this.state = newState;
        const container = document.createElement('div');
        if (this.type === 'start' && this.state) {
            container.innerHTML = this.startSVGtrue();
        } else if (this.type === 'start' && !this.state) {
            container.innerHTML = this.startSVGfalse();
        } else if (this.type === 'end' && this.state) {
            container.innerHTML = this.endSVGtrue();
        } else if (this.type === 'end' && !this.state) {
            container.innerHTML = this.endSVGfalse();
        } else if (this.type === 'bin' && this.state) {
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
            width="100" 
            height="100"    
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
            width="100" 
            height="100"             
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

    //endTrue
    endSVGtrue = () => {
        return `
            <svg 
                width="50" 
                height="50" 
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
                width="50" 
                height="50" 
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
                width="50" 
                height="50" 
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
                width="50" 
                height="50" 
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