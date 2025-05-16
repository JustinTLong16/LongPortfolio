//defining needed variables
const keyList = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
let currentKeyIndex = getRandomIndex(keyList);
let currentKey=keyList[currentKeyIndex];

//This is grabbing HTML elements
const keyLabel = document.querySelector("#keyToPress"); //grabs the Key Label to display the key we need we need to press
const output = document.querySelector("#output") // grabs the output label to display whether or not you hit the right key
keyLabel.innerHTML = (currentKey) // sets key label
console.log(currentKey)
let correctKeys=0;
let numberOfKeys=0;
let insultlist; //to be added later 

//functions!
function getRandomIndex(keyList) {
    // Generate a random index within the range of keyList length
    const randomIndex = Math.floor(Math.random() * keyList.length);
    return randomIndex;
}
function keyGame (event) {
    const accuracy = Math.floor(numberOfKeys === 0 ? 0 : (correctKeys / numberOfKeys) * 100); //calculate the accuracy every function run
    let key = event.key
    if (key === currentKey && key ){
        console.log("pressed key!!");
        currentKeyIndex = getRandomIndex(keyList);
        currentKey = keyList[currentKeyIndex];
        keyLabel.innerHTML = (currentKey);
        correctKeys++;
        numberOfKeys++;
        console.log(currentKey);
        output.innerHTML = (`You got it right! Accuracy: ${accuracy}%u`);
} else { 
    numberOfKeys++
    output.innerHTML = (`Wrong! try again Stupid. Accuracy: ${accuracy}%`)
}
} 