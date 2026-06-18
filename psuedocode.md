Islamic Trivia 



Nav
- h1: "Barries Quiz"
- nav, button -> "Quit Game" -> refreshes data, return to start page
- flex

1. Start page
1b. Select difficulty: Easy Medium Hard in a 3x1 grid

2. Questions
- h2 question
- divs of options in big div grid, 2x2 for mobile, 4x1 for desktop
- input for difficult questions?
- mouse click to options group

3. Answers
- not given or only upon request at the end of completion
- correct or wrong only
    - if correct, fact/detail given
- next question button or timed moving off

4. Timer
- timer to show time left to answer
- possibly usage of time module

Program Flow:

Start Page
- mouse click for difficulty
    - sends level data
    - loads questions
    - changes display to questions with grid 

For len, questions array: divs = question
- mouse click to option
    - check isCorrect
    - runs answerCheck ()
        if correct: increment score
    - edit question and options text to next question

Exit loop, display score, calc and display percentage and which questions answered wrongly
- refresh button


Backend
- questions in dictionary
- select array based on difficulty
- 7 questions for easy, 7 medium, 8 hard
- randomise which questions, and in different order
    while question < needed: 
        append random question

- need to have WAY more questions that the game gives, maybe 30 of each

Maybes:
- timer, 30s ez, 20 m, 15 hard
