// creates array called 'candies' that contains all the colors of the candy pieces
const candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];

// creates array called 'board' that holds all the img tags so that we can access them for crushing the candies and updating the img tags on the webpage
const board = [];

// creates rows and columns for our board
let rows = 9;
let columns = 9;

// creates variable to keep track of the score--variable starts at 0
let score = 0;

// creates function to start game
window.onload = function(){
    startGame();
}

// creates a random candy function that displays the candy images in a random fashion
function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let row = 0; row < rows; row++) {
        let rowArr = [];
        for (let col = 0; col < columns; col++){
            // creates an image tag 
            let tile = document.createElement('img');
            tile.id = row.toString() + '-' + col.toString();
            // sets source of image tag and creates a 'randomCandy'function (see above)
            tile.src = './images/' + randomCandy() + '.png';

            // gets board div and appends tile 
            document.getElementById('board').append(tile);
            rowArr.push(tile);
        
        }
        board.push(rowArr);
    }
    console.log(board);
}