import * as importedQuestions from "./questions.js";

const diffBtns = document.querySelectorAll(".difficultyBtn");
const diffGrid = document.querySelector(".difficultyGrid");
const options = document.querySelectorAll(".option");
const questionBox = document.querySelector(".question");
const timerElement = document.querySelector(".timer");

let score = 0;
let level;
let choice;
let isCorrect;

const handleDifficultySelection = (choice) => {
  if (choice == "Islam (Easy)") {
    return "easy";
    console.log("easy ting");
  } else if (choice == "Imaan (Medium)") {
    return "medium";
  } else if (choice == "Ihsan (Boss)") {
    return "hard";
  } //could make it single line
};

diffBtns.forEach((btn) => {
  btn.addEventListener(
    "click",
    (e) => {
      //e means event, target is the events properties
      console.log("diff clicked");
      let userChoice = e.target.innerText;

      const level = handleDifficultySelection(userChoice);

      diffGrid.classList.add("hidden");
      console.log("level within waitForDifficulty: ", level);

      mainquiz(level);
    }, 
  ); //
});


const mainquiz = async (selectedLevel) => {
  
  console.log("mainquiz, calling random question. Level: ", selectedLevel);
  let quizset = pickRandomQuestions(selectedLevel);
  
  
  let questionCounter = 0
  render(quizset[questionCounter])
  
  let a = quizset[questionCounter].answer;
  console.log('a is ', a);


  timerElement.addEventListener ('', ()=> {  //not entirely sure how works idk
    if (timerElement.innerText==0)  {
    isCorrect=false
    processAnswer(isCorrect) }
  } )


  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      
      let choice = e.target.innerText;
      console.log('question counter: ', questionCounter);

      console.log('a before iscorrect checkering', a);
      

      if (choice == a) {
        isCorrect = true;
        console.log("noice", isCorrect);
      
      } else {
        console.log("wrong af");
        isCorrect = false;
      }

      processAnswer (isCorrect)
      
      questionCounter++

      if (questionCounter < quizset.length) {
        let q = quizset [questionCounter]
        a = q.answer;
        render(q)
        console.log('a has changed to ', a);
        
      }
      else {
        displayResults(score, quizset.length)
      }

    
    } //close event listener func
  ) //close event listener
  } //close foreach function
  ) //close foreach
}; //close mainfunc


const pickRandomQuestions = (level) => {
  console.log("picking random questions");

  let pool = importedQuestions[level];

  console.log(pool);

  const questions = [];

  while (questions.length < 5) {
    let rand = Math.trunc(Math.random() * pool.length); //random returns 0-0.99
    let randomQ = pool[rand];

    if (!questions.includes(randomQ)) questions.push(randomQ);
  }

  return questions;
};

const render = (q) => {
  let choices = q.choices

//   for (let i = 4; i > 1; i--) {
//     //shuffle cards function
//     let r = Math.trunc(Math.random() * i) + 1; //semi-colon here non-negotiable idk why bro
//     [q[r], q[i]] = [q[i], q[r]];
//   }

  console.log(q);

  questionBox.innerText = q.question;

  for (let i = 0; i < choices.length; i++) {
    options[i].innerText = choices[i];
  }

  countdown ()

};

const handlechoiceSelection = (choice, a) => {
  return (choice ===  a) ? true : false
};

const waitForAnswer = (currentQ) => {

    options.forEach((option) => {
        option.addEventListener("click", (e) => {
        let choice = e.target.innerText;

       return handlechoiceSelection(choice, currentQ.answer)

        });
   });
};

const processAnswer = (isCorrect) => {
      if (isCorrect) {
        // render button green 
        score++; //or score =+ 1
      }
      else {    //i.e wrong ans or timer ran out
        // render button red 
      }
      
      //                #buggy       countdown('clear')
      //clearInterval(timerID)
      //disable buttons or freeze whole ui
      //sleep(5);
      //then re-enable buttons
      console.log(score);
}

const countdown = (clear) => {
  
      let timeLeft = 20;
      timerElement.innerText = timeLeft;

      const timerID = setInterval(
        () => {
          timeLeft--;
          timerElement.innerText = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(timerID); //stops firing with the parameter of who will stop firing
           // removeListeners(); //not sure why this is
            return false //not really doing anything
          }
        }, //close setInter function

        1000, ); //close setInterval ()

    if (clear) clearInterval(timerID)

    }

const sleep = (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};

const displayResults = (score, total) => {
  questionBox.innerHTML =  `${score}/${total} = ${score/total*100} `
}

