import './index.css'
import {SAMPLE_CARDS} from "./domain/card.js";
import Panel from "./components/Panel.jsx";
import CardGrid from "./components/CardGrid.jsx";
import Summary from "./components/Summary.jsx";
import {useState} from "react";

function App() {

  const [cards, setCards] = useState(SAMPLE_CARDS);

  const handleQuantityChange = (id, delta) => {
    setCards((previous) => previous.map((card) => {
      if (card.id === id) {
        return { ...card, quantity: Math.max(0, card.quantity + delta) };
      }
      return card;
    }));
  }

  const handleRemove = (cardId) => {
    setCards((previous) => previous.filter((card) => card.id !== cardId));
  }

  return (
    <>
      <main className="app">
        <header className="app-header">
          <h1>Ma collection TCG</h1>
          <Summary cards={cards} />
        </header>
        <div className="grid">
          <Panel title={"Mes cartes"}>
            <CardGrid
              cards={cards}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </Panel>
        </div>
      </main>
    </>
  )
}

export default App
