const btnEl = document.getElementById('btn');
const resetBtn = document.getElementById('reset-btn');

const diceEl = document.getElementById('dice');
const rollHistoryEl = document.getElementById('roll-history');
const rollSoundEl = new Audio('dice-roll.wav');
let historyList = [];

function rollDice(){
  const rollResult = Math.floor(Math.random() * 6) + 1;
  const diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult)
  updateRollHistory()
}

function updateRollHistory(){
  rollHistoryEl.innerHTML = '';
  for (let i = 0; i < historyList.length; i++){
    const listItem = document.createElement('li');
    listItem.innerHTML = ` Roll ${i + 1}: <span>${getDiceFace(
      historyList[i]
    )}</span>`;
    rollHistoryEl.appendChild(listItem);
  }

  document.getElementById('total-rolls').textContent = historyList.length;
  const sum = historyList.reduce((a, b) => a + b, 0);
  document.getElementById('total-sum').textContent = sum;
}

function getDiceFace(rollResult){
  switch (rollResult) {
    case 1:
      return '&#9856;';
    case 2:
      return '&#9857;';
    case 3:
      return '&#9858;';
    case 4:
      return '&#9859;';
    case 5:
      return '&#9860;';
    case 6:
      return '&#9861;';
    default:
      return '';            
  }
}

btnEl.addEventListener('click', ()=>{
  rollSoundEl.currentTime = 0;
  rollSoundEl.play();
  diceEl.classList.add('roll-animation');
  setTimeout(() => {
    rollSoundEl.pause();            // Stop the sound
    rollSoundEl.currentTime = 0;    // Reset sound to beginning
    diceEl.classList.remove('roll-animation');
    rollDice();
  }, 1000);
})

resetBtn.addEventListener('click', () => {
  historyList = [];
  rollHistoryEl.innerHTML = '';
  document.getElementById('total-rolls').textContent = '0';
  document.getElementById('total-sum').textContent = '0';
  diceEl.innerHTML = '&#9856;';
});