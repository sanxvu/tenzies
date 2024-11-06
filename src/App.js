import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [bestRolls, setBestRolls] = React.useState(
    () => JSON.parse(localStorage.getItem("bestRolls")) || null
  )
  const [startTime, setStartTime] = React.useState(null)
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(
    () => JSON.parse(localStorage.getItem("bestTime")) || null
  )

  // Track elapsed time since clicking the first die which starts timer
  React.useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Update every second
      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  // Check if user has won
  React.useEffect(() => {
    if (dice.every(die => die.isHeld && die.value === dice[0].value)) {
      // Update bestTime and save to local storage
      if (bestTime === null || elapsedTime < bestTime) {
        setBestTime(elapsedTime)
        localStorage.setItem("bestTime", JSON.stringify(elapsedTime))
      }
      // Update bestRolls and save to local storage
      if (bestRolls === null || rolls < bestRolls) {
        setBestRolls(rolls)
        localStorage.setItem("bestRolls", JSON.stringify(rolls))
      }

      // Reset states
      setTenzies(true)
      setStartTime(null)
    }
  }, dice)

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    // play new game
    if (tenzies) {
      setTenzies(false)
      setRolls(0)
      setDice(allNewDice())
      setStartTime(Date.now())
    }
    else {
      //start timer if user clicks roll upon entering game
      if (rolls === 0 && !startTime) {
        setStartTime(Date.now())
      }
      //roll dice
      setRolls(prevRolls => prevRolls + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    }
  }

  function holdDice(id) {
    //start timer if user clicks die upon entering game
    if (rolls === 0 && !startTime) {
      setStartTime(Date.now())
    }
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <div class="container">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "Start New Game" : "Roll"}
        </button>
        <p className="bottom-stats">Rolls: {rolls}</p>
        <p className="bottom-stats">Time: {elapsedTime / 1000} seconds</p>
      </main>
      <p className="bestScores">Best Rolls: {bestRolls === null ? "N/A" : bestRolls}</p>
      <p className="bestScores">Best Time: {bestTime === null ? "N/A" : bestTime / 1000} seconds</p>
    </div>
  )
}