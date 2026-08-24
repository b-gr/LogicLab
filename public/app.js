import LogicGate from "./LogicGate.js";
import Toolbar from "./Toolbar.js";
import Viewer from "./Viewer.js";
import Level from "./Level.js";

const adminMode = true;
const mainContent = document.getElementById("mainContent");
const startButton = document.getElementById("startButton");
const levelTable = document.getElementById("levelTable");
const backButton = document.getElementById("backButton");
const checkButton = document.getElementById("checkButton");
const nextButton = document.getElementById("nextButton");
let inPageViewer = null;

startButton.addEventListener("click", async () => {
    await importLevels();
    levelMenuViewLoad();
});

/*
//Define levels for the game v1
const levels = [
    { id:1, name: "Intro", description: "Learn the basics of logic gates." , unlocked: true, completed: false},
    { id:2, name: "AND Gates", description: "Master the AND gate and its applications." , unlocked: true, completed: false},
    { id:3, name: "OR Gates", description: "Explore the OR gate and its uses." , unlocked: false, completed: false},
    { id:4, name: "NAND Gates", description: "Understand the NAND gate and its significance." , unlocked: false, completed: false},
    { id:5, name: "NOR Gates", description: "Discover the NOR gate and its functions." , unlocked: false, completed: false},
    { id:6, name: "XOR Gates", description: "Delve into the XOR gate and its properties." , unlocked: false, completed: false},
    { id:7, name: "XNOR Gates", description: "Learn about the XNOR gate and its applications." , unlocked: false, completed: false},
    { id:8, name: "OTHER", description: "Explore other types of logic gates and circuits." , unlocked: false, completed: false},
    { id:999, name: "Sandbox", description: "Play around and see what you can do without any limits.", unlocked: true, completed: false}
];
*/

let levels = []

async function importLevels(){
    const response = await fetch("./levelData.json");
    const levelData = await response.json();
    levels = levelData.map(data => new Level(data));
}


function levelMenuViewLoad(){
        mainContent.innerHTML =
        `<h2>Please select a level</h2>
        <div>${createLevelButtonRow()}</div>
    `;
    
    createLevelButtons();

}


//Function to create level buttons based on the levels array
function createLevelButtonRow() {
    backButton.style.display = "none";
    document.getElementById("toolbar").style.display = "none";
    document.getElementById("inPageViewer").style.display = "none";
    
    let buttonsHTML = "";
    for (let level of levels) {
        if(level.id === 1 || level.id === 999 || adminMode) {
            level.unlocked = true;
        }
        buttonsHTML += `
            <button 
                class="levelButton ${!level.unlocked ? "levelButtonLocked": ""} ${level.completed ? "levelButtonCompleted": ""}"
                id="${level.id}">
                ${level.chapter}.${level.level} <br>
                ${level.name}
            </button>`;
    }

    return `
        <div class="scrollableX">
            ${buttonsHTML}
        </div>`;

    createLevelButtons();
}

//Function to add event listeners to level buttons and handle level selection
function createLevelButtons() {
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
    //checks if the viewer exists already. if yes delete
    if (inPageViewer !== null) {
        inPageViewer.destroy();
        inPageViewer = null;
    }

    //set header buttons: 
    if(level.id !== 999){
        checkButton.style.display = "flex";
    } else {
        checkButton.style.display = "none";
    }

    backButton.style.display = "flex";


    //set main content (name + viewer)
    mainContent.innerHTML =
        `<h2>${level.name} Level</h2>
    <p>${level.description}</p>`;

    inPageViewer = new Viewer("inPageViewer");
    
    document.getElementById("inPageViewer").style.display = "flex";

    inPageViewer.init(level);

    let firstPenUsage = true;

    if (level.id === 1 || level.id === 999 || adminMode){
        firstPenUsage = true;
    } else {
        firstPenUsage = false;
    }

    //set toolbar to on
    let toolbar = new Toolbar(inPageViewer, level, firstPenUsage);

    document.getElementById("toolbar").style.display = "flex";


    //add listeners to back button and 
    backButton.onclick = () => {
        inPageViewer.destroy();
        inPageViewer = null;
        checkButton.style.display = "none";
        levelMenuViewLoad();
    };

    checkButton.onclick = () => {
        inPageViewer.evaluateCircuit();
        if(inPageViewer.levelComplete && inPageViewer.level.mode === "build"){
            checkButton.style.display = "none";
            nextButton.style.display = "flex";
            document.getElementById("toolbar").style.display = "none";
            markLevelCompleted(level.id);

        }
        if(inPageViewer.levelComplete && inPageViewer.level.mode === "predict"){
            checkButton.style.display = "none";
            nextButton.style.display = "flex";
            toolbar.updateToolbar();
            markLevelCompleted(level.id);
        }

    }


    nextButton.onclick = () => {
        document.getElementById("toolbar").style.display = "none";
        toolbar.destroy();
        toolbar = null;
        inPageViewer.destroy();
        inPageViewer = null;
        const nextLevel = levels.find(l => l.id === level.id + 1);
        nextButton.style.display = "none";
        if (nextLevel) {
            loadLevel(nextLevel)
        } else{
            levelMenuViewLoad();
        }
    }
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

