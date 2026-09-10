import LogicGate from "./LogicGate.js";
import Toolbar from "./Toolbar.js";
import Viewer from "./Viewer.js";
import Level from "./Level.js";

const adminMode = false;
const mainContent = document.getElementById("mainContent");
const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const checkButton = document.getElementById("checkButton");
const hintButton = document.getElementById("hintButton");
const nextButton = document.getElementById("nextButton");
const popup = document.getElementById("popup");
const increaseStartPointsButtonTrue = document.getElementById("increaseStartPointsButtonTrue");
const decreaseStartPointsButtonTrue = document.getElementById("decreaseStartPointsButtonTrue");
const increaseStartPointsButtonFalse = document.getElementById("increaseStartPointsButtonFalse");
const decreaseStartPointsButtonFalse = document.getElementById("decreaseStartPointsButtonFalse");
const increaseEndPointsButton = document.getElementById("increaseEndPointsButton");
const decreaseEndPointsButton = document.getElementById("decreaseEndPointsButton");
let inPageViewer = null;
let toolbar = null;

startButton.addEventListener("click", async () => {
    await importLevels();
    levelMenuViewLoad();
});


window.addEventListener('click', function (event) {
    if (popup.style.display === "flex" && !popup.contains(event.target)) {
        popup.style.display = "none"
        checkButton.style.display = "flex"
        this.document.getElementById("popupText").textContent = "";
    }
});


let levels = []

async function importLevels() {
    const response = await fetch("./levelData.json");
    const levelData = await response.json();
    levels = levelData.map(data => new Level(data));
}


function levelMenuViewLoad() {
    mainContent.innerHTML =
        `<h2>Please select a level</h2>
        <div>${createLevelButtonRows()}</div>
    `;

    createLevelButtons();
}


//Function to create level buttons based on the levels array
function createLevelButtonRows() {
    backButton.style.display = "none";
    document.getElementById("toolbar").style.display = "none";
    document.getElementById("inPageViewer").style.display = "none";


    const chapters = new Set();

    for (let level of levels) {
        chapters.add(level.chapter)
    }

    let rowOfButtonsHTML = "";
    for (let chapter of chapters) {
        let buttonsHTML = "";
        for (let level of levels) {
            let levelDisplayID = `${level.chapter}.${level.level}`

            if (level.chapter === chapter) {
                if (level.id === 1 || level.id === 999 || adminMode) {
                    level.unlocked = true;
                }
                if (level.id === 999) {
                    levelDisplayID = "";
                }
                buttonsHTML += `
                <button 
                    class="levelButton ${!level.unlocked ? "levelButtonLocked" : ""} ${level.completed ? "levelButtonCompleted" : ""}"
                    id="${level.id}">
                    ${levelDisplayID} <br>
                    ${level.name}
                </button>`;
            }
        }
        rowOfButtonsHTML += `
            <div class="chapterRow" id="chapter${chapter}">
                    ${buttonsHTML}
            </div>
        `;
    }

    return rowOfButtonsHTML;
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

    if (toolbar !== null) {
        toolbar.destroy();
        toolbar = null;
    }

    //set header buttons: 
    if (level.id !== 999) {
        checkButton.style.display = "flex";

    } else {
        increaseEndPointsButton.style.display = "flex"
        decreaseEndPointsButton.style.display = "flex"
        increaseStartPointsButtonTrue.style.display = "flex"
        decreaseStartPointsButtonTrue.style.display = "flex"
        increaseStartPointsButtonFalse.style.display = "flex"
        decreaseStartPointsButtonFalse.style.display = "flex"
        document.getElementById("span1").style.display = "inline"
        document.getElementById("span2").style.display = "inline"
        document.getElementById("span3").style.display = "inline"
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

    if (level.id === 1 || level.id === 999) {
        firstPenUsage = true;
    } else if (adminMode) {
        firstPenUsage = false;
    } else {
        firstPenUsage = false;
    }

    //set toolbar to on
    toolbar = new Toolbar(inPageViewer, level, firstPenUsage);

    document.getElementById("toolbar").style.display = "flex";



    increaseEndPointsButton.onclick = () => {
        inPageViewer.increaseEndPoints()
    }

    decreaseEndPointsButton.onclick = () => {
        inPageViewer.decreaseEndPoints()
    }

    increaseStartPointsButtonTrue.onclick = () => {
        inPageViewer.increaseStartPoints(true)
    }

    decreaseStartPointsButtonTrue.onclick = () => {
        inPageViewer.decreaseStartPoints(true)
    }

    increaseStartPointsButtonFalse.onclick = () => {
        inPageViewer.increaseStartPoints(false)
    }

    decreaseStartPointsButtonFalse.onclick = () => {
        inPageViewer.decreaseStartPoints(false)
    }


    //add listeners to back button and 
    backButton.onclick = () => {
        document.getElementById("popupTitle").textContent = "";
        document.getElementById("popupText").textContent = "";
        popup.style.display = "none"

        toolbar.destroy();
        toolbar = null;

        inPageViewer.destroy();
        inPageViewer = null;
        checkButton.style.display = "none";
        increaseEndPointsButton.style.display = "none"
        decreaseEndPointsButton.style.display = "none"
        increaseStartPointsButtonTrue.style.display = "none"
        decreaseStartPointsButtonTrue.style.display = "none"
        increaseStartPointsButtonFalse.style.display = "none"
        decreaseStartPointsButtonFalse.style.display = "none"
        document.getElementById("span1").style.display = "none"
        document.getElementById("span2").style.display = "none"
        document.getElementById("span3").style.display = "none"
        levelMenuViewLoad();
    };

    hintButton.onclick = () => {
        document.getElementById("popupTitle").textContent = "";
        document.getElementById("popupText").textContent = `${level.commentHint}`
        hintButton.style.display = "none";
    }

    checkButton.onclick = (event) => {
        event.stopPropagation();
        inPageViewer.evaluateCircuit();

        if (!inPageViewer.levelComplete) {
            document.getElementById("popupTitle").textContent = `${level.commentWrong}`;
            popup.style.display = "flex";
            checkButton.style.display = "none"
            hintButton.style.display = "flex"

        }
        if (inPageViewer.levelComplete && inPageViewer.level.mode === "build") {
            checkButton.style.display = "none";
            popup.style.display = "flex";
            document.getElementById("popupTitle").textContent = `${level.commentCorrect}`;
            hintButton.style.display = "none"
            nextButton.style.display = "flex";
            document.getElementById("toolbar").style.display = "none";
            markLevelCompleted(level.id);

        }
        if (inPageViewer.levelComplete && inPageViewer.level.mode === "predict") {
            popup.style.display = "flex";
            document.getElementById("popupTitle").textContent = `${level.commentCorrect}`;
            hintButton.style.display = "none"
            checkButton.style.display = "none";
            nextButton.style.display = "flex";
            toolbar.updateToolbar();
            markLevelCompleted(level.id);

        }

    }


    nextButton.onclick = () => {
        document.getElementById("popupTitle").textContent = "";
        document.getElementById("popupText").textContent = "";
        popup.style.display = "none"

        document.getElementById("toolbar").style.display = "none";
        toolbar.destroy();
        toolbar = null;
        inPageViewer.destroy();
        inPageViewer = null;
        const nextLevel = levels.find(l => l.id === level.id + 1);
        nextButton.style.display = "none";
        if (nextLevel) {
            loadLevel(nextLevel)
        } else {
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

