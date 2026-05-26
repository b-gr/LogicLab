


const mainContent = document.getElementById("mainContent");
const startButton = document.getElementById("startButton");
const levelTable = document.getElementById("levelTable");

startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    mainContent.innerHTML =
        `<h2>Please select a level</h2>
    <div>${createLevelTable()}</div>`;
});


function createLevelTable() {
    return `
    <div class = "scrollableX">
        <table id="levelTable" class="levelContainer">    
            <tr>
                <th class="levelButton">Introduction</th>
                <th class="levelButton">AND Gates</th>
                <th class="levelButton">OR Gates</th>
                <th class="levelButton">NAND Gates</th>
                <th class="levelButton">NOR Gates</th>
                <th class="levelButton">XOR Gates</th>
                <th class="levelButton">XNOR Gates</th>
                <th class="levelButton">OTHER</th>
            </tr>
        </table>
    </div>
    `;
}