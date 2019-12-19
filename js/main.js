var totalAmountOfMoney, totalAmountofBet, bet, rand, li, seconds, bettingAmountArray, bettingNumberArray, totalBet,betObject, win, first21, second21, third21, totalProfit, currentBetMoney, numberArray, usedMoney, dollar;

var gameOver = document.getElementById('gameOver');
var number = document.getElementById('number');
var lists = document.getElementById('lists');
var money1 = document.getElementsByClassName('money1');
var bet1 = document.getElementsByClassName('bet1');
var bet2 = document.getElementsByClassName('bet2');
var timer = document.getElementById('timer');
var defaultChip = document.getElementById('chip1').style.outlineColor = 'white';
var bettingNumber = document.getElementsByClassName('bet1')[0];
var bettingAmount = document.getElementsByClassName("bet2")[0];
var selectedChip = document.getElementById('chip1').textContent;
var newGame = document.getElementById('newGames');
var selectNumber = document.getElementsByClassName("table")[0];
var reset = document.getElementById('reset');
var chip1 = document.getElementById("chip1");
let chip2 = document.getElementById("chip2");
let chip3 = document.getElementById("chip3");
let chip4 = document.getElementById("chip4");
let chip5 = document.getElementById("chip5");
var selectedNumb = document.getElementsByClassName('table')[0]
let message = document.getElementById('message');

newGame.addEventListener("click", init);
reset.addEventListener("click", resets);
selectedNumb.addEventListener("click", numberSelected);
chip1.addEventListener("click", chipSelected);
chip2.addEventListener("click", chipSelected);
chip3.addEventListener("click", chipSelected);
chip4.addEventListener("click", chipSelected);
chip5.addEventListener("click", chipSelected);


totalProfit = 0;
seconds = 11;

setInterval(incrementSeconds, 1000);
init();
function init() {
    totalAmountOfMoney = 1000;
    betObject = {};
    renderInit();
}

function resets(){ 
    totalAmountOfMoney= totalBet + totalAmountOfMoney;
    totalBet = 0;
    betObject = {}
    renderInit();
}

function renderInit() {
    bet2[0].textContent = totalAmountofBet;
    bet1[0].textContent = bet;
    money1[0].textContent = totalAmountOfMoney;
    message.textContent = 'Your profit is $' + totalProfit;
    gameOver.style.display = 'none'

}

function payOut (){
    totalProfit = 0;
    win = 0;
    usedMoney = 0;
    numberArray = ['0','1','2','3','4','5',"6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]

    if((betObject['even'] !== undefined || betObject['red'] !== undefined) && (rand % 2 === 0 && rand !== 0)) {
        win += betObject['even'] * 2 || betObject['red'] * 2;
    }
    if((betObject['odd'] !== undefined || betObject['black'] !== undefined) && rand % 2 === 0 && rand !== 0) {
        win += betObject['odd'] * 2 || betObject['black'] * 2;
    }
    if(betObject['1st 12'] !== undefined && (rand > 0 && rand < 13)) {
        win += betObject['1st 12'] * 3;
    }
    if(betObject['2nd 12'] !== undefined && (rand < 25  && rand > 12)) {
        win += betObject['2nd 12'] * 3;
    }
    if(betObject['3rd 12'] !== undefined && (rand < 37 && rand > 24)) {
        win += betObject['3rd 12'] * 3;
    }
    if(betObject['1 - 18'] !== undefined && (rand < 19  && rand > 0)) {
        win += betObject['1 - 18'] * 2;
    }
    if(betObject['19 -36'] !== undefined && (rand < 37 && rand > 18)) {
        win += betObject['19 -36'] * 2;
    }
    if(betObject['00'] !== undefined && rand === '00') {
        win += betObject['00'] * 36;
    }
    for(let i = 0; i < numberArray.length; i++) {
        if(betObject[numberArray[i]] !== undefined && rand === i){
            win += betObject[numberArray[i]] * 36;
        }
    }
    for(let i = 1; i < numberArray.length; i+=3) {
        if(betObject['1st row'] !== undefined && rand === i){
            win += betObject['1st row'] * 3;
        }
    }
    for(let i = 2; i < numberArray.length; i+=3) {
        if(betObject['2nd row'] !== undefined && rand === i){
            win += betObject['2nd row'] * 3;
        }
    }
    for(let i = 3; i < numberArray.length; i+=3) {
        if(betObject['3rd row'] !== undefined && rand === i){
            win += betObject['3rd row'] * 3;
        }
    }
    totalAmountOfMoney += win;

    for(let i = 0; i < Object.values(betObject).length; i++) {
        usedMoney += Number(Object.values(betObject)[i])
    }
    totalProfit = win - usedMoney;
    console.log("totalAmountofMoney", totalAmountOfMoney)
    console.log("totalprofit", totalProfit)
    console.log("win", win)
    renderInit();
}
// chip1.textContent;
function chipSelected() {
    selectedChip = event.target.textContent;
    mainRender();
}

//generates random numbers between 0 ~ 36 including 00
function generateNumber() {
    rand = Math.floor(Math.random() * 38)
    if (rand === 37) {
        rand = "00";
    }
}

//renders picks
function numberSelected() {
    totalBet = 0;
     if(totalAmountOfMoney - Number(selectedChip) >= 0 && event.target.textContent.length < 8) {
        if(betObject[event.target.textContent] === undefined) {
            betObject[event.target.textContent] = Number(selectedChip);
        } else {
            betObject[event.target.textContent] += Number(selectedChip)
        }
        totalAmountOfMoney -= Number(selectedChip);

        for(let i = 0; i < Object.values(betObject).length; i++) {
            totalBet += Number(Object.values(betObject)[i])
        }
    } else {
        bettingAmountArray;
        bettingNumberArray;
        totalAmountOfMoney;
    }
    renderInit();
    betRender();
 }

function mainRender() {
    chip1.style.outlineColor = 'rgb(56, 39, 29)';
    chip2.style.outlineColor = 'rgb(56, 39, 29)';
    chip3.style.outlineColor = 'rgb(56, 39, 29)';
    chip4.style.outlineColor = 'rgb(56, 39, 29)';
    chip5.style.outlineColor = 'rgb(56, 39, 29)';
    event.target.style.outlineColor = "white";
}

function betRender() {
     bettingAmount.textContent = Object.values(betObject);
     bettingNumber.textContent = Object.keys(betObject);
}  

//Roulette bet time function


function incrementSeconds() {
    seconds -= 1;
    totalBet = 0;
    win = 0;
  
    usedMoney = 0;
    if(seconds === -1) {
        generateNumber();
        seconds = 11;
        renderNumber();
        payOut();
        betObject = {};
    }
    if(seconds === 11 && totalAmountOfMoney < 10)
    {
        renderGameOver();
    }
    else if(seconds === 11 && totalAmountOfMoney > 50000)
    {
        renderWin();
    }
    renderClock();
}
function renderGameOver () {
    gameOver.style.display = 'block'
    gameOver.textContent = "BRING MORE MONEY: click on 'New Game' button on right top corner";
   reset.disabled = true;
}
function renderWin() {
    gameOver.style.display = 'block'
    gameOver.textContent = "You won the game: click on 'New Game' button on right top corner";
    reset.disabled = true;
}
//renders latest states of randomly generated numbers
function renderNumber() {
    li = document.createElement('li')
    li.setAttribute('class', 'randNumbers')
    li.textContent = rand;
    lists.appendChild(li)
    if (rand == "0" || rand == "00") {
        document.getElementById("number").style.color = "white";
        li.style.color = "white";
    }
    else if (rand % 2 === 0) {
        document.getElementById("number").style.color = "#ff0000";
        li.style.color = "#ff0000";
    }
    else if (rand % 2 !== 0) {
        document.getElementById("number").style.color = "black";
        li.style.color = "black";
    }
    number.textContent = "Your number is: " + rand;
}

//renders betting time
function renderClock() {
    timer.textContent = "Bet starts in: " + seconds + " sec.";
}

