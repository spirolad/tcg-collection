import './index.css'
import {collectionValue, copyCount, formatPrice, SAMPLE_CARDS} from "./domain/card.js";
import CardTile from "./components/CardTile.jsx";
import Panel from "./components/Panel.jsx";

function App() {

  const totalCards = SAMPLE_CARDS.length;
  const totalCopies = copyCount(SAMPLE_CARDS);
  const totalValue = formatPrice(collectionValue(SAMPLE_CARDS));
  console.log("Élément :", <CardTile />);
  console.log("Élément avec props :", <CardTile card={SAMPLE_CARDS[0]} />);

  return (
    <>
      <main className="app">
        <header className="app-header">
          <h1>Ma collection TCG</h1>
        </header>
        <p className="summary">: { totalCards } / { totalCopies } / { totalValue }</p>
        <div className="grid">
          <Panel title={"Mes cartes"}>
            <CardTile card={SAMPLE_CARDS[0]} />
            <CardTile card={SAMPLE_CARDS[1]} />
            <CardTile card={SAMPLE_CARDS[2]} />
          </Panel>
        </div>
      </main>
    </>
  )
}

export default App
