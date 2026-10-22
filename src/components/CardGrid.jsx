import CardTile from "./CardTile.jsx";

function CardGrid({ cards }) {
    if (!cards || cards.length === 0) {
        return <p className="hint">Aucune carte à afficher.</p>;
    }

      return (
        <div className="grid">
          {cards.map(card => (
            <CardTile key={card.id} card={card} />
          ))}
        </div>
      )
}

export default CardGrid;