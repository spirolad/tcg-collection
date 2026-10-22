import './index.css'
import {collectionValue, copyCount, formatPrice, SAMPLE_CARDS} from "./domain/card.js";
import Panel from "./components/Panel.jsx";
import CardGrid from "./components/CardGrid.jsx";

function App() {

  const totalCards = SAMPLE_CARDS.length;
  const totalCopies = copyCount(SAMPLE_CARDS);
  const totalValue = formatPrice(collectionValue(SAMPLE_CARDS));

  return (
    <>
      <main className="app">
        <header className="app-header">
          <h1>Ma collection TCG</h1>
        </header>
        <p className="summary">: { totalCards } / { totalCopies } / { totalValue }</p>
        <div className="grid">
          <Panel title={"Mes cartes"}>
            <CardGrid cards={SAMPLE_CARDS} />
          </Panel>
        </div>
      </main>
    </>
  )
}

export default App
