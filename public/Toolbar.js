export default class Toolbar {
    constructor() {
        this.container = document.getElementById('toolbar');
    }

    setContent = (html) => {
        this.container.innerHTML = html;
    }

    addButton = (id, label, onClick) => {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = label;
        button.addEventListener('click', onClick);
        this.container.appendChild(button);
    }
}

    
function createToolBar() {
    const buttonsHTML = `
    <button id="ANDButton">AND</button>
    <button id="ORButton">OR</button>
    <button id="NOTButton">NOT</button>
    <button id="NANDButton">NAND</button>
    <button id="NORButton">NOR</button>
    <button id="XORButton">XOR</button>
    <button id="XNORButton">XNOR</button>
    `;
    toolbarHTML.innerHTML = buttonsHTML;
}


function addNewANDGateTEST() {
    inPageViewer.innerHTML =
        `<button id="newANDButton">Create New AND Gate</button>`;
        const newANDButton = document.getElementById("newANDButton");
        newANDButton.addEventListener("click", () => {
            const andGate = new LogicGate('AND');
            inPageViewer.appendChild(andGate.createHTML());
        });
}