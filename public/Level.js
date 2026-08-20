export default class Level{
    constructor({
        id, 
        chapter,
        level,
        name, 
        description,
        mode,
        startNodes = [],
        endNodes = [],
        expectedEndStates,
        availableGates = {},
        requiredGates = {},
        maxConnections = Infinity,
        startingGates = [],
        startingConnections = [],
        updateEndPointsAutomatically = true,
        commentCorrect,
        commentWrong,
        commentHint,
        question,
        answer,
        unlocked,
        completed = false
    }){
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
        this.updateEndPointsAutomatically = updateEndPointsAutomatically;
        this.commentCorrect = commentCorrect;
        this.commentWrong = commentWrong;
        this.commentHint = commentHint;
        this.question = question;
        this.answer = answer;
    }
}