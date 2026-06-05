export default class ViewerObject {
    constructor(type) {
        this.coordinates = { x: 0, y: 0 };
        this.type = type;
        this.html = this.createHTML();
        this.state = false;
    }

    createHTML(newState) {
        this.state = newState;
        const container = document.createElement('div');
        if (this.type === 'start' && this.state) {
            container.innerHTML = this.startSVGtrue();
        } else if (this.type === 'start' && !this.state) {
            container.innerHTML = this.startSVGfalse();
        }
        return container;
    }

     
    startSVGtrue = () => {
        return 
        `<svg 
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
        </svg>`;
    }

    startSVGfalse = () => {
        return 
        `<svg 
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
        </svg>`;
    }




}