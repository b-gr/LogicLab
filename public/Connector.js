

export default class Connector {
    constructor(pointA,pointB) {
        aCoord = {x: pointA.x, y:pointA.y};
        bCoord = {x: pointB.x, y:pointB.y};
        this.html = createHTML();
    }


    createHTML() {
        const container = document.createElement('div');
        container.innerHTML = drawSVGLine();
    }

    drawSVGLine() {
        difx = Math.abs(this.aCoord.x - this.bCoord.x);
        dify = Math.abs(this.aCoord.y - this.bCoord.y);
        return `
        <svg
            width="${difx}"
            height="${dify}"
            viewbox="${aCoord.x} ${aCoord.y} ${bCoord.x} ${bCoord.y}"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M${aCoord.x} ${aCoord.y}
                    L${((difx)/2)+aCoord.x} ${aCoord.y}
                    L${((difx)/2)+aCoord.x} ${bCoord.y}
                    L${bCoord.x} ${bCoord.y}    
                "
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"/>
        `
    }
}