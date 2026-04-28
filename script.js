/* 

gamestate = difficulty or quiz

*/

// import question.js

const gameState = 'difficulty'


if (gameState == 'quiz') {
    quiz()
}

else {
    difficultySelector() //potentially just make it two diff pages
}

const diffBtns = document.querySelectorAll ('difficultyBtn')

/*

if (difficultySelection) = easy
  questions = import easy from questions
  etc
*/
