import './index.css'
import {collectionValue, formatPrice} from "./domain/card.js";
import Panel from "./components/Panel.jsx";
import CardGrid from "./components/CardGrid.jsx";
import Summary from "./components/Summary.jsx";
import {SearchBar} from "./components/SearchBar.jsx";
import {useEffect, useState} from "react";
import {fetchCards} from "./api/cards.js";

function App() {

  const [state, setState] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("toutes");

  const cards = state.status === "success" ? state.cards : [];
  const updateCards = (transform) => {
    setState((previous) => previous.status === "success"
      ? { ...previous, cards: transform(previous.cards) }
      : previous
    );
  };

  const handleQuantityChange = (id, delta) => {
    updateCards((previous) => previous.map((card) => (
      card.id === id
        ? { ...card, quantity: Math.max(0, card.quantity + delta) }
        : card
    )));
  };
  const handleRemove = (cardId) => {
    updateCards((previous) => previous.filter((card) => card.id !== cardId));
  };

  useEffect(() => {
    let ignore = false;
    setState({ status: "loading" });
    fetchCards().then((fetchedCards) => {
      if (!ignore) {
        setState({ status: "success", cards: fetchedCards });
      }
    }).catch((error) => {
      if (!ignore) {
        setState({
          status: "error",
          message: error instanceof Error ? error.message : String(error),
        });
      }
    });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  const visibleCards = cards.filter((card) =>
    card.name.toLowerCase().includes(query.trim().toLowerCase())
    && (rarity === "toutes" || card.rarity === rarity)
  );

  const value = collectionValue(cards);
  useEffect(() => {
    document.title = `Ma collection (${formatPrice(value)})`;
  }, [value]);

  if (state.status === "loading") {
    return <p>Chargement de la collection…</p>;
  }

  if (state.status === "error") {
    return (
      <p>
        Erreur : {state.message}{" "}
        <button onClick={() => {
          setState({ status: "loading" });
          setAttempt((previous) => previous + 1);
        }}>Réessayer</button>
      </p>
    );
  }

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
