// creates array called 'candies' that contains all the colors of the candy pieces
const candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];

// creates a 2D array called 'board' that holds all the img tags so that we can access them for crushing the candies and updating the img tags on the webpage
const board = [];

// creates rows and columns for our board
let rows = 9;
let columns = 9;

// creates variable to keep track of the score--variable starts at 0
let score = 0;

// drag variables
let currTile;
let otherTile;

// creates function to start game
window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },100);
}


// creates a random candy function that displays the candy images in a random fashion
function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}

// creates startgame function here
function startGame() {
    for (let row = 0; row < rows; row++) {
        let rowArr = [];
        for (let col = 0; col < columns; col++){
            // creates image tags
            let tile = document.createElement('img');
            tile.id = row.toString() + '-' + col.toString();
            // sets source of image tag and creates a 'randomCandy'function (see above)
            tile.src = './images/' + randomCandy() + '.png';

             // gets board div and append image tags unto board
            

            document.getElementById('board').append(tile);
            rowArr.push(tile)
           
        
        }
        board.push(rowArr);
    }
    console.log(board);
}









 // Drag functionality--event listeners
            tile.addEventListener('dragstart', dragStart); // initializes drag process
            tile.addEventListener('dragover', dragOver); // clicks on candy and moves mouse to drag the candy
            tile.addEventListener('dragenter', dragEnter); // drags candy onto another candy
            tile.addEventListener('dragleave', dragLeave); // leave candy over another candy
            tile.addEventListener('drop', dragDrop); // drops a candy over another candy
            tile.addEventListener('drargend', dragEnd); // swaps candy after drag process completed





// drag functions 
function dragStart(){
    // this refers to the tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    // this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd(){

    if (currTile.src.includes('blank') || otherTile.src.includes('blank')){
        return;
    }

    let currCoords = currTile.id.split('-');
    let row = parseInt(currCoords[0]);
    let col = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split('-');
    let rowTwo = parseInt(otherCoords[0]);
    let colTwo = parseInt(otherCoords[1]);

    let moveLeft = colTwo == col - 1 && row == rowTwo;
    let moveRight = colTwo == col + 1 && row == rowTwo;
    let moveUp = rowTwo == row - 1 &&  col == colTwo;
    let moveDown = rowTwo == row + 1 && col == colTwo;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;

        }
    }
    
}

// function for crushing candies
function crushCandy(){
    // crush five in row

    // crush four in row

    crushThree();
    document.getElementById('score').innerText = score;;

}
function crushThree() {
    // check rows
    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++){
            let candy1 = board[row][col];
            let candy2 = board[row][col+1];
            let candy3 = board[row][col+2];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.png';
                candy2.src = './images/blank.png';
                candy3.src = './images/blank.png';
                score += 4;


            }
        }
        
    }
    // check columns
    for(let col = 0; col < columns; col++){
        for (let row = 0; row < rows; row-2) {
            let candy1 = board[row][col];
            let candy2 = board[row+1][col];
            let candy3 = board[row+2][col];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.png';
                candy2.src = './images/blank.png';
                candy3.src = './images/blank.png';
                score += 4;
            }
        }
    }
}

function checkValid(){
     // check rows
     for (let row = 0; row < rows; row++) {
        for(let col = 0; col < columns-2; col++){
            let candy1 = board[row][col];
            let candy2 = board[row][col+1];
            let candy3 = board[row][col+2];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true;

            }
        }
        
    }
    // check columns
    for(let col = 0; col < columns; col++){
        for (let row = 0; row < rows-2; row++) {
            let candy1 = board[row][col];
            let candy2 = board[row+1][col];
            let candy3 = board[row+2][col];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true;

            }
        }
    }
    return false;

}


function slideCandy() {
    for(let col = 0; col < columns; col++){
        let ind = rows -1;
        for (let row = columns -1; row >= 0; row--){
            if(!board[row][col].includes('blank')){
                board[ind][col].src = board[row][col].src;
                ind -= 1;
            }
        }

        for(let row = ind; r >= 0; r--){
            board[row][col].src = './images/blank.png';
        }
    }
}
    

// function for generating new candies to replace the ones that fizzled out
function generateCandy(){
    for(let col = 0; col < columns; col++){
        if(board[0][col].src.includes('blank')){
            board[0][col].src ='./images/' + randomCandy() + '.png'
        }
    }
}



