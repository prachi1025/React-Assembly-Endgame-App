import { languages } from "./assets/languages"
import React from "react"
import clsx from "clsx"

export default function App() {

  const [currentWord, setCurrentWord] = React.useState("react")

  const [userGuesses, setUserGuesses] = React.useState([])

  function keyPress(alph) {
    setUserGuesses(prevUserGuesses => 
      prevUserGuesses.includes(alph) ? prevUserGuesses : [...prevUserGuesses, alph])
  }

  console.log(userGuesses)

  //keyboard on the screen
  const alphabets = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = Array.from(alphabets).map((alphabet, index) => {
    const isGuessed = userGuesses.includes(alphabet) 
    const isCorrect = currentWord.includes(alphabet)
    return (
      <button onClick={() => keyPress(alphabet)} className={clsx("key", {
        "correct": isGuessed && isCorrect,
        "wrong": isGuessed && !isCorrect
      })} key={index}>{alphabet.toUpperCase()}</button>
    )
  } )
  

  //current word in jsx on the page (only shows the alphabets that are guessed)
  const gameWord = Array.from(currentWord).map((alphabet, index) => 
    <span key={index} className="game-word">
      {userGuesses.includes(alphabet) ? alphabet.toUpperCase() : ""} 
    </span> 
    )
  
  //language chips on the page
  const languageChips = languages.map(language => <span className={"language-chip"} style={{ backgroundColor:language.backgroundColor, color:language.color}} key={language.name}>{language.name}</span>)

  return (
    <main>
      <div className="top-div">
        <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>

        <section className="game-status-won">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
      </div>
      
      <div className="language-container">
        {languageChips}
      </div>

      <div className="game-word-container">
        {gameWord}
      </div>
      
      <div className="keyboard-container">
        {keyboard}
      </div>
      
      <button className="new-game">New Game</button>

    </main>
  )
}