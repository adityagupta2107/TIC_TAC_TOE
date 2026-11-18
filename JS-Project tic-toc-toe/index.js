const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currPlayer;
let gameGrid;


const WinPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//functin to Initialize Game
function initGame(){
    newGameBtn.classList.remove("active");
    currPlayer="X"
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents="all";  
        box.classList=`box box${index+1}`;
    });
    
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}

initGame();
console.logs("game start");
function swapTurn(){
    if(currPlayer==="X"){
        currPlayer="O";
    }
    else{
         currPlayer="X";
    }
    //UI Upadate
    gameInfo.innerText=`Current Player - ${currPlayer}`;

}

function checkGameOver(){
    let ans="";
    WinPos.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[0]==="X"){
                ans="X";
            }
            else{
                ans="O";
            }

            boxes.forEach ((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!==""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcnt=0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillcnt++;
        }
    });

    if(fillcnt===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
