import './index.css'
import {SAMPLE_CARDS} from "./domain/card.js";
import Panel from "./components/Panel.jsx";
import CardGrid from "./components/CardGrid.jsx";
import Summary from "./components/Summary.jsx";
import {SearchBar} from "./components/SearchBar.jsx";
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

  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("toutes");

  const visibleCards = cards.filter((card) =>
    card.name.toLowerCase().includes(query)
    && (rarity === "toutes" || card.rarity === rarity)
  );

  return (
    <>
      <main className="app">
        <header className="app-header">
          <h1>Ma collection TCG</h1>
          <Summary cards={cards} />
        </header>
        <div className="grid">
          <Panel title={`Mes cartes (${visibleCards.length} / ${cards.length})`}>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              rarity={rarity}
              onRarityChange={setRarity}
            />
            <CardGrid
              cards={visibleCards}
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
