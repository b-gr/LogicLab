export default class Level {
    constructor({
        id,
        chapter,
        level,
        name,
        description,
        mode,
        startNodes = [],
        endNodes = [],
        expectedEndStates = [],
        availableGates = {},
        requiredGates = {},
        maxConnections = Infinity,
        startingGates = [],
        startingConnections = [],
        commentCorrect,
        commentWrong,
        commentHint,
        unlocked,
        completed = false,
        options = []
    }) {
        this.id = id;
        this.chapter = chapter;
        this.level = level;
        this.name = name;
        this.description = description;
        this.mode = mode;
        this.startNodes = startNodes;
        this.endNodes = endNodes;
        this.expectedEndStates = expectedEndStates;
        this.availableGates = availableGates;
        this.requiredGates = requiredGates;
        this.maxConnections = maxConnections;
        this.startingGates = startingGates;
        this.startingConnections = startingConnections;
        this.commentCorrect = commentCorrect;
        this.commentWrong = commentWrong;
        this.commentHint = commentHint;
        this.unlocked = unlocked;
        this.completed = completed;
        this.options = options;
        for (let gateType in this.availableGates) {
            if (this.availableGates[gateType] === "Infinity") {
                this.availableGates[gateType] = Infinity
            }
        }
    }
}