document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0; 
  let appleIndex = 0; 
  let currentSnake = [2,1,0]; 
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;
    

  //to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0; //until here is what resets everything
    randomApple();
    direction = 1; //snake going right one space
    scoreDisplay.innerText = score;
    intervalTime = 500; //starting speed of snake
    currentSnake = [2,1,0]; //starting size of snake (3 divs)
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }
  
  // deals with all movement of the snake
  function moveOutcomes() {
  
    //deals with snake hitting border and itself
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //bottom wall
        (currentSnake[0] % width === width -1 && direction === 1) || //right wall
        (currentSnake[0] % width === 0 && direction === -1) || //left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //top wall
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      return clearInterval(interval); //this will clear the interval if any of the above happen (stop the snake from moving)
    }
  
    const tail = currentSnake.pop(); //removes last element of the array and shows it
    squares[tail].classList.remove('snake');  //removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array
  
    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple'); //removes apple
      squares[tail].classList.add('snake'); //adds one div to snake tail
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  //generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length); //makes the apple pop up anywhere on the grid
    } while(squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple');
  }
  
  
  //assign functions to keycodes 
  function control(e) {
    squares[currentIndex].classList.remove('snake'); //prevents snake from appearing to be left behind
  
    if(e.keyCode === 39) {
      direction = 1; // right arrow
    } else if (e.keyCode === 38) {
      direction = -width; // up arrow (width is 10 therefore it will go up one because of the container being 10X10)
    } else if (e.keyCode === 37) {
      direction = -1; //left arrow
    } else if (e.keyCode === 40) {
      direction = +width; //down arrow
    }
  }
  
  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});







