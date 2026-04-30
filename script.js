/* 

gamestate = difficulty or quiz

*/

//import "./question.js";


import * as questions from './questions.js';

const gameState = "selectDifficulty";

const diffBtns = document.querySelectorAll(".difficultyBtn");

const options = document.querySelectorAll(".option");

console.log("yo");
console.log(options);

let myFunction = (a, b) => a * b;

const difficultySelector = () => {

  diffBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //e means event, target is the events properties
      console.log("diff clicked");
      let choice = e.target.innerText;

      if (choice == "Islam (Easy)") {
        const difficulty = "easy";
      }

      e.target.classList.toggle("hidden"); //###well currently this clears the button not the whole diff Grid as kinda expected tbh
      console.log ('that was me guys') //## so this doesnt print
      mainQuiz();
    });
  });

};

let currentQuestion = 0;

const mainQuiz = () => {
  console.log("we're in the maingame now.");


/*

once questionsArray loaded, 

currentQuestion = function

for qeustions length
- temp = array.i 
return q and return shuffled answers 


*/

  ///// question function?
  let q = ["What percentage is the zakat tax?", "2.5%", "4%", "5%", "0.4%"];
  let a = q[1];

  for (let i = 4; i > 1; i--) {
    //shuffle cards function
    let r = Math.trunc(Math.random() * i) + 1; //semi-colon here non-negotiable idk why bro
    [q[r], q[i]] = [q[i], q[r]];
  }

  console.log(q);

  for (let i = 0; i < q.length - 1; i++) {
    options[i].innerText = q[i + 1];
    console.log('so display is col');
  }

  ///// end question


  options.forEach(
    (option) => {
      option.addEventListener("click", (e) => {
        let choice = e.target.innerText;
        
        if (choice == a) {
            console.log('noice');
        }
        else {
        console.log('i dont fking work');
        console.log(e.target); } 

      });
  } );
};

mainQuiz();

if (gameState == "quiz") {
  mainQuiz();
} else {
  difficultySelector(); //potentially just make it two diff pages
}

/*
if (difficultySelection) = easy
  questions = import easy from questions.js //## can import be mid file or only at beginning
  
*/
