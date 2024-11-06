# Tenzies

## Description
A simple and fun dice game built with React! Roll, hold, and match all dice to win the game.

## Features
- **Roll Dice:** Roll up to 10 dice with random values each time.
- **Hold Dice:** Click to hold dice values.
- **Rolls Tracking and Best Rolls:** Track your roll count and beat your roll count (saved locally).
- **Timer and Best Time:** Track your time and beat your best score (saved locally).
- **Confetti Celebration:** A confetti effect when you win!

## How to Play
1. Roll the dice.
2. Hold any dice you want to keep.
3. Roll/hold until all dice show the same value.
4. Try to beat your previous best scores (rolls or time-wise)!

## What I Learned
Building Tenzies helped me practice key React concepts:

**State Management:** Managed multiple states for the game logic, including dice, tenzies, rolls, and timing.

**Tracking Rolls:** Counted the number of rolls each game to show how efficiently the game was completed.

**useEffect:** Used useEffect to:
- Track game state changes to check for a win.
- Create a timer that updates each second.
- Store and retrieve the best time using localStorage.

**Local Storage:** Stored the best rolls and best time in local storage so it displays even after refreshing the page.

**Conditional Rendering:** Showed different buttons and messages depending on the game state.

**Animations:** Added a confetti effect when the game is won.

This project helped me get comfortable with React fundamentals and develop interactive UI skills!
