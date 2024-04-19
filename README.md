# Candy Crush
SEI Project 1: Candy Crush available at Miagotobene.webgame.io

<img width="304" alt="Screenshot 2024-04-17 at 3 47 48 PM" src="https://github.com/Miagotobene/Miagotobene.webgame.io/assets/90000641/a91a0b1c-7843-4c8c-bb17-1719b3ee407a">

# How to Play
Candy Crush is a puzzle-like game where you match colorful candies to earn points. The goal is to swipe candies to make rows or columns of three or four candies of the same color. When you create a match of candies, they disappear and new candies are randomly generated. Since this is a beginner-friendly game, the goal is simple: earn as many points as you possibly can! You score 3 points for matching a set of three candies and 4 points for matching a set of four candies.

You can move the candies around by simply dragging them. When you drag and make a valid move, you can either change the position of a candy or create a matching set.

PS: You can earn bonus points even before starting the game. This is because automatic matches may exist when the game is reset and candies are randomly generated.

# How to Install
a) Fork and Clone this respository to your local machine

b) Open index.html in your browser to play or

c) Open the directory in your text editor of choice to view or edit the code

# How it Works
This game was built using HTML, CSS and Javascript. 

Firstly, a board unto which the candies are displayed is created. The createBoard function creates 64 divs, each representing the space occupied by the candies. 

```js
 //create your board
    function createBoard() {
      for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = Math.floor(Math.random() * candyColors.length);
        square.style.backgroundImage = candyColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
      }
    }
    createBoard()
```
Next, draggable features are added to the divs/candies such that if theses are triggered, the appropriate functions would be invoked to generate valid candy moves. Each stage of the dragging consists of 5 events.

```js
 // Dragging the Candy, if event is triggered -> run functions below
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('drageleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

```
To generate a valid move, a validMoves array containing the ids of the divs is created. A move is deemed valid if the id of the square/candy being replaced is included in the validMoves array.
```js
// returns the id of the element being listened to
    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
    }
    
    function dragOver(e) {
        e.preventDefault() // prevent candy from it
    }
    
    function dragEnter(e) {
        e.preventDefault()
    }
    
    function dragLeave() {
        this.style.backgroundImage = '';
    }
    
    function dragDrop() { // drags square/candy drops it unto a new one, and change original candy into the color of the square being replaced
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }
    
    function dragEnd() {
        //What is a valid move?
        let validMoves = [squareIdBeingDragged -1 , squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
        let validMove = validMoves.includes(squareIdBeingReplaced)
    
        if (squareIdBeingReplaced && validMove) { // if the id of the square being replaced exists and if move is valid
            squareIdBeingReplaced = null; // clear the value of square being replaced
        }  else if (squareIdBeingReplaced && !validMove) { //
           squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
           squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged; // if square being dragged has nowhere to go return it to its main position
    }
```
Finally, when a move is valid, the functions below check to see if the move results in matches of 3 or 4 candies either by row or column. When a match is found after the functions are ran, the player scores 3 or 4 points depending on whether they matched a set of 3 candies or 4 candies.
```js
    ///Checking for Matches
    //for row of Four
      function checkRowForFour() {
        for (i = 0; i < 60; i ++) {
          let rowOfFour = [i, i+1, i+2, i+3]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForFour()
    
    //for column of Four
      function checkColumnForFour() {
        for (i = 0; i < 39; i ++) {
          let columnOfFour = [i, i+width, i+width*2, i+width*3]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForFour()
    
      //for row of Three
      function checkRowForThree() {
        for (i = 0; i < 61; i ++) {
          let rowOfThree = [i, i+1, i+2]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForThree()
    
    //for column of Three
      function checkColumnForThree() {
        for (i = 0; i < 47; i ++) {
          let columnOfThree = [i, i+width, i+width*2]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForThree()
```



# Future Considerations

