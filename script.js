// create Phaser.Game object assigned to global variable named game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'my-game', { preload: preload, create: create, update: update });

// declare other global variables (for sprites, etc.)
//hello1 = object
var hello1;
var hello2;
var hello3;
var spacebar;
var spinSound, match2Sound, match3Sound;
var matchTxt
var score = 100;
// preload game assets - runs one time when webpage first loads
//def preload()
function preload() {
  //gameObject.load.typesofasset('nameoftheasset','filename',h,w);
  game.load.spritesheet('hello', 'assets/hello-sprite.png', 64, 64);
  game.load.audio('spin', 'assets/spinner.mp3');
  game.load.audio('2sound', 'assets/coin.wav')
  game.load.audio('3sound', 'assets/power-up.wav')

}

// create game world - runs one time after preload finishes
function create() {
  game.stage.backgroundColor = '#35FF14';
  hello1 = game.add.sprite(game.world.centerX, game.world.centerY, 'hello')
  hello1.anchor.set(0.5, 0.5);
  hello2 = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'hello')
  hello2.anchor.set(0.5, 0.5);
  hello3 = game.add.sprite(game.world.centerX + 100, game.world.centerY, 'hello')
  hello3.anchor.set(0.5, 0.5);

  spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  //audio section
  //objecy = gameObj's add audio (audio asset, volume)
  spinSound = game.add.audio('spin', 0.3);
  spinSound.loop = true;
  match2Sound = game.add.audio('2sound', 0.5);
  match3Sound = game.add.audio('3sound', 0.7);


  matchTxt = game.add.text(game.world.centerX, game.world.centerY + 80,
    '', { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#0F0F0F' })
  matchTxt.setShadow(1, 1, '#000', 2);
  scoreText = game.add.text(game.world.centerX, game.world.centerY + 120,
    'Use Spacebar to Spin!', { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#0F0F0F' })
  scoreText.setShadow(1, 1, '#000', 2);
}

// update game - runs repeatedly in loop after create finishes
function update() {
  if (spacebar.justDown) {
    spinSound.play()
  }
  else if (spacebar.isDown) {
    //math.random() create a decimal from 0-,99999999
    hello1.frame = Math.floor(Math.random() * 6);
    hello2.frame = Math.floor(Math.random() * 6);
    hello3.frame = Math.floor(Math.random() * 6);
  }
  else if (spacebar.justUp) {
    spinSound.stop()
    checkForMatch();
  }
}


// add custom functions (for collisions, etc.) - only run when called
function checkForMatch() {
  if (hello1.frame == hello2.frame && hello2.frame == hello3.frame) {
    match3Sound.play();
    matchTxt.text = '3 of a kind! +$100'
    score -= 100;
    game.stage.backgroundColor = '#00FF00';
  }
  else if (hello1.frame == hello2.frame || hello2.frame == hello3.frame || hello1.frame == hello3.frame) {
    match2Sound.play();
    matchTxt.text = '2 of a kind! +$25'
    score -= 25;
    game.stage.backgroundColor = '#FFFF00';
  }
  else{
    matchTxt.text = 'YOU LOSE NERD! -$10'
    score -= 10;
    game.stage.backgroundColor = '#FF0000';
  }
  if (score <= 0) {
    spacebar = false;
    matchTxt.text = "Better luck next time, you are out of money. Go home, gambling is bad for your bank account";
    score = 0
    game.stage.backgroundColor = '#DC143C ';
  }
  console.log(score)
  scoreText.text = "$" + score;
}