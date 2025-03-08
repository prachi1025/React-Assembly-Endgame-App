import { languages } from "./assets/languages"

const languageChips = languages.map(language => <span className={"language-chip"} style={{ backgroundColor:language.backgroundColor, color:language.color}}>{language.name}</span>)

export default function App() {
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
    </main>
  )
}