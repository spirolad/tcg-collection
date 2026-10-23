import './index.css'
import {collectionValue, formatPrice} from "./domain/card.js";
import Panel from "./components/Panel.jsx";
import CardGrid from "./components/CardGrid.jsx";
import Summary from "./components/Summary.jsx";
import {SearchBar} from "./components/SearchBar.jsx";
import {useState} from "react";
import {useCards} from "./hooks/useCards.js";
import {useDocumentTitle} from "./hooks/useDocumentTitle.js";
import FavoritesCount from "./components/FavoritesCount.jsx";
import {AddCardForm} from "./components/AddCardForm.jsx";
import {CardNotes} from "./components/CardNotes.jsx";

function App() {

  const {state, retry, changeQuantity, removeCard, addCard } = useCards();
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("toutes");
  const [selectedId, setSelectedId] = useState(null);

  const cards = state.status === "success" ? state.cards : [];
  const selectedCard = cards.find((card) => card.id === selectedId);

  const visibleCards = cards.filter((card) =>
    card.name.toLowerCase().includes(query.trim().toLowerCase())
    && (rarity === "toutes" || card.rarity === rarity)
  );

  const value = collectionValue(cards);
  useDocumentTitle(`Ma collection (${formatPrice(value)})`);

  if (state.status === "loading") {
    return <p>Chargement de la collection…</p>;
  }

  if (state.status === "error") {
    return (
      <p>
        Erreur : {state.message}{" "}
        <button onClick={retry}>Réessayer</button>
      </p>
    );
  }

  return (
    <>
      <main className="app">
        <header className="app-header">
          <h1>Ma collection TCG</h1>
          <Summary cards={cards} />
          <FavoritesCount />
        </header>
        <Panel title="Ajouter une carte" >
          <AddCardForm addCard={addCard} />
        </Panel>
        {selectedCard && <CardNotes key={selectedCard.id} card={selectedCard} />}
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
              onQuantityChange={changeQuantity}
              onRemove={removeCard}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </Panel>
        </div>
      </main>
    </>
  )
}

export default App
