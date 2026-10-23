import './index.css'
import {collectionValue, formatPrice} from "./domain/card.ts";
import Panel from "./components/Panel.tsx";
import CardGrid from "./components/CardGrid.tsx";
import Summary from "./components/Summary.tsx";
import {SearchBar} from "./components/SearchBar.tsx";
import {useState} from "react";
import {useCards} from "./hooks/useCards.ts";
import {useDocumentTitle} from "./hooks/useDocumentTitle.ts";
import FavoritesCount from "./components/FavoritesCount.tsx";
import {AddCardForm} from "./components/AddCardForm.tsx";
import {CardNotes} from "./components/CardNotes.tsx";

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
