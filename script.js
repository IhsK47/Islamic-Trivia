import * as importedQuestions from "./questions.js";

const diffBtns = document.querySelectorAll(".difficultyBtn");
const diffGrid = document.querySelector(".difficultyGrid");
const options = document.querySelectorAll(".option");
const questionBox = document.querySelector(".question");
const timerElement = document.querySelector(".timer");
const qCount = document.querySelector(".qTrack");

let score = 0;
let level;
let choice;
let isCorrect;
let timerID;
let questionCounter = 0;

const handleDifficultySelection = (choice) => {
  if (choice == "Islam (Easy)") {
    return "easy";
  } else if (choice == "Imaan (Medium)") {
    return "medium";
  } else if (choice == "Ihsan (Boss)") {
    return "hard";
  } //could make it single line
};

diffBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //e means event, target is the events properties
    console.log("diff clicked");
    let userChoice = e.target.innerText;

    level = handleDifficultySelection(userChoice);

    diffGrid.classList.add("hidden");
    console.log("level within waitForDifficulty: ", level);

    mainquiz(level);
  }); //
});

const mainquiz = (selectedLevel) => {
  let quizset = pickRandomQuestions(selectedLevel);
  let a = doNextQuestion(quizset, questionCounter);

  options.forEach( 
    (option) => { option.addEventListener(
        "click",
        async (e) => {
          let choice = e.target.innerText;
          
          if (choice == a) {
            isCorrect = true;
            console.log("noice", isCorrect);
          } else {
            console.log("wrong af");
            isCorrect = false;
          }

          await processAnswer(isCorrect, e.target);
          questionCounter++;

          if (questionCounter < quizset.length) {
            a = doNextQuestion(quizset, questionCounter);
          } else {
            displayResults(score, quizset.length);
          }
        }, //close event listener func
      ); //close event listener
    }, //close foreach function
  ); //close foreach
}; //close mainfunc

const pickRandomQuestions = (level) => {
  let pool = importedQuestions[level];

  const questions = [];

  while (questions.length < 7) {
    let rand = Math.trunc(Math.random() * pool.length); //random returns 0-0.99
    let randomQ = pool[rand];

    if (!questions.includes(randomQ)) questions.push(randomQ);
  }

  return questions;
};

const doNextQuestion = (quizset, questionCounter) => {
  let q = quizset[questionCounter];
  console.log("question counter: ", questionCounter);
  countdown(quizset, questionCounter);
  render(q);
  let a = q.answer;
  return a;
};

const render = (q) => {
  let choices = q.choices;

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

  options.forEach((i) => (i.disabled = false)); //enable option buttons
};

const waitForAnswer = (currentQ) => {
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      let choice = e.target.innerText;
      return choice === currentQ.answer ? true : false;
    });
  });
};

const processAnswer = async (isCorrect, clickedElem) => {
  console.log("Processing ans...");
  //async allows rest to continue and come back to sleep

  options.forEach((i) => (i.disabled = true)); //freeze option buttons

  if (isCorrect) {
    clickedElem.classList.add("green");
    score++; //or score =+ 1
  } else if (clickedElem == false) {
    questionBox.innerHTML = "Times up! Wait 5 seconds."
  }
  
  else {
    //i.e wrong ans or timer ran out
    clickedElem.classList.add("red");
  }

  clearInterval(timerID); //stops firing with the parameter of who will stop firing

  timerElement.innerText = "P"; //signal pause

  await sleep(3); //works as a to-do btw
  if (clickedElem) clickedElem.classList.remove("red", "green");

  qCount.innerHTML = `${questionCounter + 2}/7 `;
  console.log("ans processed, score is ", score);
};

const countdown = (quizset, questionCounter) => {
  clearInterval(timerID); //clear previous timer incase left over

  let timeLeft = 20;
  timerElement.innerText = timeLeft;

  timerID = setInterval(
    async () => {
      timeLeft--;
      timerElement.innerText = timeLeft;

      if (timeLeft <= 0) {
        await processAnswer(false, false);

        questionCounter++;
        if (questionCounter < quizset.length) {
          doNextQuestion(quizset, questionCounter);
        } else {
          displayResults(score, quizset.length);
        }
      }
    }, //close setInter function

    1000,
  ); //close setInterval ()
};

const sleep = (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};

const displayResults = (score, total) => {
  clearInterval(timerID);
  questionBox.innerHTML = `${score}/${total} = ${(score / total) * 100} `;
};
