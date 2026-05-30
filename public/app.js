import LogicGate from "./logicGate.js";
import Toolbar from "./Toolbar.js";


const mainContent = document.getElementById("mainContent");
const inPageViewer = document.getElementById("inPageViewer");
const startButton = document.getElementById("startButton");
const levelTable = document.getElementById("levelTable");

startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    mainContent.innerHTML =
        `<h2>Please select a level</h2>
    <div>${createLevelButtonRow()}</div>`;
    
    createLevelButtons()
//    evaluateBooleanLogicTest();
});

/*
function evaluateBooleanLogicTest() {
    const andGate = new LogicGate('AND');
    andGate.inputs = [true, false];
    console.log('AND Gate Output (true AND false):', andGate.booleanOperation());

    const orGate = new LogicGate('OR');
    orGate.inputs = [true, false];
    console.log('OR Gate Output (true OR false):', orGate.booleanOperation());

    const notGate = new LogicGate('NOT');
    notGate.inputs = [true];
    console.log('NOT Gate Output (NOT true):', notGate.booleanOperation());

    const nandGate = new LogicGate('NAND');
    nandGate.inputs = [true, true];
    console.log('NAND Gate Output (true NAND true):', nandGate.booleanOperation());

    const norGate = new LogicGate('NOR');
    norGate.inputs = [false, false];
    console.log('NOR Gate Output (false NOR false):', norGate.booleanOperation());

    const xorGate = new LogicGate('XOR');
    xorGate.inputs = [true, false];
    console.log('XOR Gate Output (true XOR false):', xorGate.booleanOperation());

    const xnorGate = new LogicGate('XNOR');
    xnorGate.inputs = [true, true];
    console.log('XNOR Gate Output (true XNOR true):', xnorGate.booleanOperation());
}
*/


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

            mainContent.innerHTML =
                `<h2>${level.name} Level</h2>
                <p>${level.description}</p>
                <button id="backButton">Back to Levels</button>`;
            
            console.log(`Starting: ${level.name}`);
            
            const toolbar = new Toolbar();

            document.getElementById("toolbar").style.display = "flex";

            const backButton = document.getElementById("backButton");
            backButton.addEventListener("click", () => {
                
                markLevelCompleted(levelId);
                
                mainContent.innerHTML =
                    `<h2>Please select a level</h2>
                    <div>${createLevelButtonRow()}</div>
                `;
                        
                createLevelButtons();
                
                document.getElementById("toolbar").style.display = "none";
                document.getElementById("inPageViewer").innerHTML = "";
            });
        });
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

