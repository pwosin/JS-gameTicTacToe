'use strict';
(function() {
// variables 
let helpBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];// help board for saving moves 
const playBoard = document.getElementsByClassName("move");// table of fields
const possibeWin = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];// table wi win possibilities 
const gameInfo = document.getElementById("gameInfo");
const startGame = document.getElementById("startGame");
const plMove = 1; // player move is 1 in help board
const cpMove = 10; // computer move is 10 in help board
let playerMove = true;
let move = 0;
let diagonal = [0, 2, 6, 8]; // table with corner fields 
let cross = [1, 3, 5, 7]; // table with cross fields 

//cearing playboard 
const clearBoard = () => {
    for(let i=0; i<playBoard.length; i++){
        playBoard[i].innerHTML ='';
        playBoard[i].style.color = 'black';
        helpBoard[i] = 0;
        gameInfo.innerHTML = '<h2 class="pt-2 text-center">Play the Game!</h2>'
    }
}
//new game start 
let newGame = () => {
    clearBoard();
    for(let i=0; i<playBoard.length; i++){
        playBoard[i].onclick = function myFunction() {
                if(playerMove){ //check player turn 
                    playBoard[i].innerHTML = '<i class="far fa-circle"></i>';
                    helpBoard[i] = plMove;
                    checkWinner(3); // check player won
                    playerMove = false; //turn of player turn
                    compMove(); // copmuter move
                    checkWinner(30); //check cpu won
                    rmOnclick(i); // removig click posibillieties on clicked field
                }
        }
    }
}

//removing click possibilities
const rmOnclick = numb => {
        playBoard[numb].onclick = '';
}


//checking game is ended, winner and is it a tie
const checkWinner = x => {
    let color;
    let state;
    if(!(helpBoard.includes(0))) gameInfo.innerHTML = '<h2 class="text-center pt-5"> Game over! Its a Tie!</h2>';
    for(let i=0; i<possibeWin.length;i++){
        if (helpBoard[possibeWin[i][0]] + helpBoard[possibeWin[i][1]] + helpBoard[possibeWin[i][2]] === x){
            if(x == 3){
                 color = 'green';
                 state = 'Win'
            }
            else if(x == 30){
                 color = 'red';
                 state = 'Lost'
            }
            playBoard[possibeWin[i][0]].style.color = color;
            playBoard[possibeWin[i][1]].style.color = color
            playBoard[possibeWin[i][2]].style.color = color;
            gameInfo.innerHTML = '<h2 class="text-center pt-5"> Game over! You '+state+'!</h2>';
        }     
    }
}   

//checking player/computer is one move of winning returning field number need to win or false if noone is about to win
const isAboutToWin = numb => {
    for(let i=0; i<possibeWin.length;i++){
        if (helpBoard[possibeWin[i][0]] + helpBoard[possibeWin[i][1]] + helpBoard[possibeWin[i][2]] === numb){
            if(helpBoard[possibeWin[i][0]]===0){
                return possibeWin[i][0];
            }
            else if(helpBoard[possibeWin[i][1]]===0){
                return possibeWin[i][1];
            }
            else if(helpBoard[possibeWin[i][2]]===0){
                return possibeWin[i][2];
            }
            else {
                return 0;
            }
        }
    }
}

//simple computer move function 
const compMove = () => {
    let isComputerWining = isAboutToWin(20);
    let isPlayerWining = isAboutToWin(2);
    //checking copmuter is one move from win, if true make a move and win
    if(isComputerWining){
        playBoard[isComputerWining].innerHTML = '<i class="fas fa-times"></i>';
        helpBoard[isComputerWining] = 10; // adding computer move to helpboard
        //console.log('comp is winning');
        rmOnclick(isComputerWining); // removing click possibilieties on computer picked field
    }
    //check if player is one move from win, it true make block move
     else if(isPlayerWining){
        playBoard[isPlayerWining].innerHTML = '<i class="fas fa-times"></i>';
        helpBoard[isPlayerWining] = 10;
        //console.log('player is winning');
        rmOnclick(isPlayerWining);
    }
    //check if midle field is free, its best move
    else if(helpBoard[4]===0){
        playBoard[4].innerHTML = '<i class="fas fa-times"></i>';
        //console.log('taking midle');
        helpBoard[4] = 10;
        rmOnclick(4);
    }
    //first move on corners fields
    else if(helpBoard[diagonal[0]]===0 || helpBoard[diagonal[1]]===0 || helpBoard[diagonal[2]]===0 || helpBoard[diagonal[3]]===0){
        let item = diagonal[Math.floor(Math.random()*diagonal.length)];
        //make little randomization so computer move looks more like human
        while(helpBoard[item]!=0){
            item = diagonal[Math.floor(Math.random()*diagonal.length)];
            if(helpBoard[item===0]) break;
            //console.log(' while 1 diagonal');
        }
        playBoard[item].innerHTML = '<i class="fas fa-times"></i>';
        helpBoard[item]=10;
        rmOnclick(item);
}
//then on cross fields
    else if(helpBoard[cross[0]]===0 || helpBoard[cross[1]]===0 || helpBoard[cross[2]]===0 || helpBoard[cross[3]]===0){
        let item = cross[Math.floor(Math.random()*cross.length)];
        //make little randomization so computer move looks more like human
        while(helpBoard[item]!=0){
            item = cross[Math.floor(Math.random()*diagonal.length)];
            if(cross[item===0]) break;
            //console.log('while 2 cross');
        }
        playBoard[item].innerHTML = '<i class="fas fa-times"></i>';
        helpBoard[item]=10;
        rmOnclick(item);
    }
        playerMove = true; // eneble player turn
    
}
    //start button listener
    startGame.addEventListener("click", newGame);
})();