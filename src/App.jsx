import { languages } from "./assets/languages"
import React from "react"
import clsx from "clsx"
import { getFarewellText, getRandomWord} from "./assets/utils"

export default function App() {
  // State Values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord())
  const [userGuesses, setUserGuesses] = React.useState([])

  //dervied value (my method)
  // let wrongGuessCount = 0
  // for (let i = 0 ; i < userGuesses.length ; i++) {
  //   if (!currentWord.includes(userGuesses[i])) {
  //     wrongGuessCount = wrongGuessCount + 1
  //   }
  // }
  // console.log(wrongGuessCount)

  // derived value (tutor method) (both method work same)
  const wrongGuessesCount = userGuesses.filter(guess => !currentWord.includes(guess)).length
  // console.log(wrongGuessesCount)

  function keyPress(alphabet) {
    if (!isGameOver) {
      setUserGuesses(prevUserGuesses => 
      prevUserGuesses.includes(alphabet) ? prevUserGuesses : [...prevUserGuesses, alphabet])
    }
  }

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
  
  //language chips on the page (has the functionality of adding skull overlay to lost languages as we guess wrong alphabets)
  const languageChips = languages.map((language, index) => {
    const isLost = index < wrongGuessesCount ? true : false
    return ( 
      <span className={clsx("language-chip", { lost: isLost })} style={{ backgroundColor:language.backgroundColor, color:language.color}} key={language.name}>{language.name}</span>
    )
  })

  const isGameLost = wrongGuessesCount  >=(languageChips.length - 1) ? true : false

  const isGameWon = Array.from(currentWord).every(alphabet => userGuesses.includes(alphabet))

  const isGameOver = isGameLost || isGameWon

  function renderGameStatus() {
    if(!isGameOver && isLastUserGuessIncorrect) { 
      return (
        <>
          <h2> {getFarewellText(languages[wrongGuessesCount - 1].name)} </h2>
        </>
      )
    } 
    if(isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }

    return null
  }

  const lastUserGuess = userGuesses[userGuesses.length - 1]

  const isLastUserGuessIncorrect = lastUserGuess && !currentWord.includes(lastUserGuess)

  function resetGame() {
    setCurrentWord(getRandomWord())
    setUserGuesses([])
  }
  return (
    <main>
      <div className="top-div">
        <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>

        <section className={clsx("game-status", {"game-won": isGameWon, "game-lost": isGameLost, "guess-incorrect": isLastUserGuessIncorrect})}>
          {renderGameStatus()}
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
      
      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}

    </main>
  )
}