// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var labelScore;
var player;
var pipes = [];
var pipesInvisible = [];
var gapSize = 150;
var gapMargin = 10;
var blockHeight = 50;
var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 200;
var jumpPower = 200;
var pipeEndExtraWidth = 10;
var gapStart;
var pipeEndHeight = 25;

var visiBalionai = [];

//$("#score").val(score.toString());
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
//
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting + name;
    alert(greeting_message);
    event_details.preventDefault();
    jQuery("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + "</p>");

});

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "../assets/YellowDuck.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe.png");
    game.load.image("pipe-end", "../assets/pipe-end.png");
    game.load.image("pipe-blue", "../assets/pipe-end.png");
    game.load.image("pipeInvisible", "../assets/pipe_transparent.png");

    game.load.image("backgroundflappy", "../assets/backgroundflappy.png");
    game.load.image("balloons", "../assets/balloons.png");
    game.load.image("weight", "../assets/weight.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var backG = game.add.sprite(0, 0, "backgroundflappy");
    backG.scale.setTo(0.45,0.45);
    //game.stage.setBackgroundColor("#E68A2E");
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
    //player.scale.setTo(0.07, 0.07);
    game.physics.arcade.enable(player);
    //player.body.velocity.x = 100;
    player.body.velocity.y = -100;
    player.body.gravity.y = 150;


    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);

    game.time.events
        .loop(2.75 * Phaser.Timer.SECOND,
        balloons);
function generate (){
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeight();
    } else {
        generatePipe();
    }


}
}

function playerJump() {
    player.body.velocity.y = -100;
}

function clickHandler(event) {
    //alert("click");
    //alert("The position: " + event.x + "," + event.y);
    //var duck = game.add.sprite(event.x, event.y, "playerImg");
    //duck.scale.setTo(0.15, 0.15);

}

function spaceHandler() {
    game.sound.play("score");

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    for(var vamzdzioNumeris=0; vamzdzioNumeris<pipes.length; vamzdzioNumeris = vamzdzioNumeris + 1){
        game.physics.arcade
            .overlap(player, pipes[vamzdzioNumeris], gameOver);
    }

    for(var vamzdzioNumeris=0; vamzdzioNumeris<pipesInvisible.length; vamzdzioNumeris = vamzdzioNumeris + 1){
        game.physics.arcade
            .overlap(player, pipesInvisible[vamzdzioNumeris], changeScore);
    }

    for(var balionoNumeris=0; balionoNumeris<visiBalionai.length; balionoNumeris = balionoNumeris + 1){
        game.physics.arcade
            .overlap(player,visiBalionai[balionoNumeris], changeScore2);
    }

    if(player.body.y < 0) {
        gameOver();
    }
    if(player.body.y > 400){
        gameOver();
    }
    player.anchor.setTo(0, 0);
    player.anchor.setTo(0.3, 0.3);
    player.rotation = Math.atan(player.body.velocity.y / 200);
}

function changeScore2 (player, balloon){
    balloon.kill();
    score = score + 5;
    LabeLScore.setText(score.toString());
}

function changeScore(player, pipe){
    pipe.kill();
    score = score + 1;
    LabeLScore.setText(score.toString());
}

function gameOver(){
    //game.destroy();
    //location.reload();
    player.kill();
    //game.state.restart()
    //gameGravity = 200;
    overlap(player, pipes, gameOver);
    score = 0;
    game.paused = true;
    $("#greeting-form").show();
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
    // this is where the gap starts
    gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart-pipeEndHeight);
    for(var y=gapStart-pipeEndHeight; y>0 ; y-=blockHeight) {
        addPipeBlock(width,y - blockHeight);
    }
    for(var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart+gapSize);

    for(var y = gapStart; y < gapStart+gapSize; y += blockHeight) {
        addPipeBlockInvisible(width, y);
    }

    //changeScore();
}

//function generatePipe() {
//    var gapStart = game.rnd.integerInRange(50, height - 50 - gapSize);
//
//    addPipeEnd(width-5,gapStart - 25);
//    for(var y=gapStart - 75; y>-50; y -= 50){
//        addPipeBlock(width,y);
//    }
//    addPipeEnd(width-5,gapStart+gapSize);
//    for(var y=gapStart + gapSize + 25; y<height; y += 50){
//        addPipeBlock(width,y);
//    }
//    changeScore();
//}

function addPipeBlockInvisible(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipeInvisible");
    pipesInvisible.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;

}


function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;

}

function addPipeEnd(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe-blue");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;

}
function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}
function balloons (){
    var positionY = game.rnd.integerInRange(50, 400);
    var balloons = game.add.sprite(800, positionY, "balloons");
    game.physics.arcade.enable(balloons);
    balloons.body.velocity.x = -200;
    visiBalionai.push(balloons);

}
function generateBalloons (){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60,100);

}
function nameOfTheFunction(parameterOne, parameterTwo) {
    //do stuff here
    nameOfTheFunction(argumentOne, argumentTwo)
    game.physics.arcade.overlap(player, pipes, gameOver);

}
