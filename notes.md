Reqs:
- JS, scss
- clear plan

Psuedocode
15 meaningful commits
README.md
Mobile-first, but all different widths
GitHub Pages

Readability: var names, func/oo

Or Islamic Trivia 

inspo: https://github.com/jakealistairwood/js-quiz

Nav
- h1: "Barries Quiz"
- nav, button -> "Quit Game" -> refreshes data, return to start page
- flex

1. Start page
1b. Select difficulty: Easy Medium Hard

2. Questions
- questions
- options in grid, 2x2 for mobile, 4x1 for desktop
- form for difficult questions?

3. Answers
- not given or only upon request at the end of completion
- correct or wrong only
    - if correct, fact/detail given
- next question button or timed moving off

4. Timer
- timer to show time left to answer
- possibly usage of time module






Backend
- questions in dictionary/2d array
- select array based on difficulty
- 7 questions for easy, 7 medium, 8 hard
- randomise which questions, and in different order
    while question < needed: 
        append random question

- need to have WAY more questions that the game gives, maybe 30 of each

Maybes:
- diff background colours for difficulty
- dark mode or dark theme
