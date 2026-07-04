

export default class Connector {

    //todo: change the code in connector to pass points from clicked objects (gates or nodes) in the area and create a connection between them. 
    constructor(pointA,pointB) {
        const aCoord = this.aCoord;
        const bCoord = {x: pointB.x, y:pointB.y};
        this.html = this.createHTML();
    }


    createHTML() {
        const container = document.createElement('div');
        container.innerHTML = this.drawSVGLine();
        return container;
    }

    drawSVGLine() {
        const difx = Math.abs(this.aCoord.x - this.bCoord.x);
        const dify = Math.abs(this.aCoord.y - this.bCoord.y);
        return `
        <svg
            width="${difx}"
            height="${dify}"
            viewBox="${aCoord.x} ${aCoord.y} ${bCoord.x} ${bCoord.y}"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M${aCoord.x} ${aCoord.y}
                    L${((difx)/2)+aCoord.x} ${aCoord.y}
                    L${((difx)/2)+aCoord.x} ${bCoord.y}
                    L${bCoord.x} ${bCoord.y}    
                "
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
        `
    }
}