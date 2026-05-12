import * as importedQuestions from "./questions.js";

const diffBtns = document.querySelectorAll(".difficultyBtn");
const diffGrid = document.querySelector(".difficultyGrid");
const questionBox = document.querySelector(".question");

const options = document.querySelectorAll(".option");
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
  }
};

diffBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //e means event, target is the events properties
    let userChoice = e.target.innerText;

    level = handleDifficultySelection(userChoice);

    diffGrid.classList.add("hidden");
    console.log("level within waitForDifficulty: ", level);

    mainquiz(level);
  }); 
});

const mainquiz = (selectedLevel) => {
  let quizset = pickRandomQuestions(selectedLevel);
  let a = doNextQuestion(quizset, questionCounter);

  options.forEach(
    (option) => {
      option.addEventListener(
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
  console.log("Current pool length: ", pool.length);

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

  //   for (let i = choices.length; i > 1; i--) {
  //     //shuffle cards function
  //     let r = Math.trunc(Math.random() * i) + 1; //semi-colon here non-negotiable idk why bro
  //     [choices[r], choies[i]] = [choices[i], choices[r]];
  //   }

  questionBox.innerText = q.question;

  for (let i = 0; i < choices.length; i++) {
    options[i].innerText = choices[i];
  }

  options.forEach((i) => (i.disabled = false)); //enable option buttons
};

const processAnswer = async (isCorrect, clickedElem) => {
  console.log("Processing ans...");
  //async allows rest to continue and come back to sleep

  options.forEach((i) => (i.disabled = true)); //freeze option buttons

  if (isCorrect) {
    clickedElem.classList.add("green");
    score++; 
  } else if (clickedElem == false) {
    questionBox.innerHTML = "Times up! Wait for the next question.";
  } else {
    //i.e wrong ans or timer ran out
    clickedElem.classList.add("red");
  }

  clearInterval(timerID); //stops firing with the parameter of who will stop firing

  timerElement.innerText = "P";

  await sleep(2); //works as a to-do btw
  if (clickedElem) clickedElem.classList.remove("red", "green");

  qCount.innerHTML = `${questionCounter + 2}/7 `;
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
  //options.classList.add('hidden')

  timerElement.classList.add("hidden");
  qCount.innerHTML = "Press restart and play again!";

  const percentage = Math.round((score / total) * 100);
  let grade;

  console.log(score / total);

  console.log((score / total).toFixed(2));

  console.log(percentage);

  switch (true) {
    case percentage >= 95:
      grade = "ممتاز مرتفع (Dub - A+)";
      break;
    case percentage >= 90:
      grade = "ممتاز (Quite Exquisite - A)";
      break;
    case percentage >= 80:
      grade = "جيد جداً (Real Good - B)";
      break;
    case percentage >= 70:
      grade = "جيد (Good - C)";
      break;
    case percentage >= 60:
      grade = "مقبول (Scraped it - D)";
      break;
    default:
      grade = "راسب (big L)";
  }

  console.log(grade);

  questionBox.innerHTML = `${score}/${total} questions right, 
  that's ${percentage}%, ${grade}! `;
};
