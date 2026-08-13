import LogicGate from "./LogicGate.js";
import Toolbar from "./Toolbar.js";
import Viewer from "./Viewer.js";


const mainContent = document.getElementById("mainContent");
const startButton = document.getElementById("startButton");
const levelTable = document.getElementById("levelTable");
const backButton = document.getElementById("backButton");
const checkButton = document.getElementById("checkButton");

startButton.addEventListener("click", () => {
    mainContent.innerHTML =
        `<h2>Please select a level</h2>
    <div>${createLevelButtonRow()}</div>`;
    
    createLevelButtons()
});

//Define levels for the game v1
const levels = [
    { id:1, name: "Intro", description: "Learn the basics of logic gates." , unlocked: true, completed: false},
    { id:2, name: "AND Gates", description: "Master the AND gate and its applications." , unlocked: true, completed: false},
    { id:3, name: "OR Gates", description: "Explore the OR gate and its uses." , unlocked: false, completed: false},
    { id:4, name: "NAND Gates", description: "Understand the NAND gate and its significance." , unlocked: false, completed: false},
    { id:5, name: "NOR Gates", description: "Discover the NOR gate and its functions." , unlocked: false, completed: false},
    { id:6, name: "XOR Gates", description: "Delve into the XOR gate and its properties." , unlocked: false, completed: false},
    { id:7, name: "XNOR Gates", description: "Learn about the XNOR gate and its applications." , unlocked: false, completed: false},
    { id:8, name: "OTHER", description: "Explore other types of logic gates and circuits." , unlocked: false, completed: false}
];

//Function to create level buttons based on the levels array
function createLevelButtonRow() {
    let buttonsHTML = "";
    for (let level of levels) {
        buttonsHTML += `
            <button 
                class="levelButton ${!level.unlocked ? "levelButtonLocked": ""} ${level.completed ? "levelButtonCompleted": ""}"
                id="${level.id}">
                ${level.name}
            </button>`;
    }

    return `
        <div class="scrollableX">
            ${buttonsHTML}
        </div>`;
}

//Function to add event listeners to level buttons and handle level selection
function createLevelButtons() {
    backButton.style.display = "none";


    const levelButtons = document.getElementsByClassName("levelButton");
    
    for (let levelButton of document.getElementsByClassName("levelButton")) {
        levelButton.addEventListener("click", () => {
            const levelId = Number(levelButton.id);
            const level = levels.find(l => l.id === levelId);
            if (!level) {
                console.error(`No level found for id: ${levelId}`);
                return;
            }

            if (!level.unlocked) {
                alert("This level is locked. Please complete previous levels to unlock it.");
                return;
            }

            loadLevel(level);

            
        });
    }
}

function loadLevel(level) {
    backButton.style.display = "flex";
    
    mainContent.innerHTML =
        `<h2>${level.name} Level</h2>
    <p>${level.description}</p>`;

    if(level.id !== 999){
        checkButton.style.display = "flex";
    }

    const inPageViewer = new Viewer("inPageViewer");
    document.getElementById("inPageViewer").style.display = "flex";
    inPageViewer.init();
    
    const toolbar = new Toolbar(inPageViewer);

    document.getElementById("toolbar").style.display = "flex";

    backButton.addEventListener("click", () => {


        if(inPageViewer.levelComplete){
            markLevelCompleted(level.id);
        }

        mainContent.innerHTML =
            `<h2>Please select a level</h2>
        <div>${createLevelButtonRow()}</div>
    `;

        createLevelButtons();

        document.getElementById("toolbar").style.display = "none";
        document.getElementById("inPageViewer").style.display = "none";
    
        inPageViewer.resetViewer();
    });

    checkButton.addEventListener("click", () => {
        inPageViewer.evaluateCircuit();
    })
}

function markLevelCompleted(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (level) {
        level.completed = true;
        //Unlock the next level if it exists
        const nextLevel = levels.find(l => l.id === levelId + 1);
        if (nextLevel) {
            nextLevel.unlocked = true;
        }
    }
}

