// Definig the starting variables, health, xp, gold ect.
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
/*This is setting our elements, document is how JS interacts with HTML, and the
  .querySelector finds the class/id of what we wanna target, this makes it so we
  can edit click actions and text.
*/
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const gamescreen = document.querySelector("#img")
/* 
This is defining lists and uses objects, syntax is
 key: values
 "key key": values

 these are used when we have multiple things of the same type we need to cycle 
 through, weapons, monsters and locations.
 */
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "Bartholomew The Mericless",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    image: "assets/townsqaure.jpeg"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
    image: "assets/shop.jpg"
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
    image: "assets/cave.jpeg"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goCave],
    text: "You are fighting a monster.",
    image: ["assets/slime.jpg","assets/beast.jpg","assets/dragon.jpg"]
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go back to the Cave", "Go to the store"],
    "button functions": [goTown, goCave, goStore],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    image: "assets/killmonster.jpg"
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
    image: "assets/gameEnd.jpg"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" ,
    image: "assets/gameWin.webp"
  }
];

// initialize buttons.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
/*
this Functions changes the location using the location list which is filled with objects, these objects contain
the data we need for the button text and what they do, the text of the main area, and stuff like that 
*/
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  if (Array.isArray(location.image)) {
    gamescreen.src = location.image[fighting];
  } else {
    gamescreen.src = location.image;
  }
}
//this function calls the locations list for the town
function goTown() {
  update(locations[0]);
}
// this functions calls the locations list for the store
function goStore() {
  update(locations[1]);
}
// this functions calls the locations list for the cave
function goCave() {
  update(locations[2]);
}
//##########S this section is all about the store and the actions you can take there
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() { //the double if is to make sure they cant spend 30 on nothing once they get the sword
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
//the fight <monster> functions utilize the monsters list and objects
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}
//############### these following functions handle combat.
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level); //this is determining attack damage using monsters level
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;//this calculates our damage, more xp = more damage
  } else {
    text.innerText += " You miss."; //this is the else of if we hit the monster, which just displays we missed.
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) { //this handles losing/winning and monster killing
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) { //this is the procedure that handles whether or not a weapon can break
    // Math.random() generates a random number 0.0 to 1.0, giving weapons about a 10% chance to break unless you have one weapon
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) { //this function handles monster damage, using the monsters level
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); //hit will = 5 times monster level - a random rounded number * xp
  console.log(hit);
  return hit > 0 ? hit : 0; //if the monsters damage equation is below 0, it would return just 0 damage as opposed to negative damage
}
/*
this function handles the math behind whether you actually hit the monster, it generates a random number
default range is 0.0 - 1.0, so after we get our random number it will be compared to 0.2
calculates to about 20% miss rate
*/ 
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}


//########## This section is to do with winning losing
function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}