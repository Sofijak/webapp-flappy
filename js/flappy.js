// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var labelScore;
var player;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
//
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "../assets/YellowDuck.jpg");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#E68A2E");
    game.add.text(80, 20, "Welcome to my game",
        {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    //var duck = game.add.sprite(10, 270, "playerImg");
    //duck.scale.setTo(0.15, 0.15);

    game.input
        .onDown
        .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    LabeLScore = game.add.text(80, 60, "0");

    player = game.add.sprite(20, 300, "playerImg");
    player.scale.setTo(0.15, 0.15);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);

    generatePipe();
}

function clickHandler(event) {
    //alert("click");
    //alert("The position: " + event.x + "," + event.y);
    var duck = game.add.sprite(event.x, event.y, "playerImg");
    duck.scale.setTo(0.15, 0.15);

}

function spaceHandler() {
    game.sound.play("score");

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}
function changeScore(){
    score = score + 1;
    LabeLScore.setText(score.toString());

}

function moveRight() {
    player.x += 10;

}

function moveLeft() {
    player.x -= 10;
}

function moveUp () {
    player.y -= 5;
}

function moveDown() {
    player.y += 5;
}

function generatePipe() {
    for(var count=0; count<8; count+=3.2){
        game.add.sprite(20, 50*count, "pipe");
        game.add.sprite(170, 50*count, "pipe");
    }
    for(var count=0; count<8; count++)
        if(count != 4){
          game.add.sprite(280, 50 * count, "pipe");
          game.add.sprite(390, 50 * count, "pipe");
    }
}
