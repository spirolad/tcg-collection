import CardTile from "./CardTile.jsx";
import {QuantityControl} from "./QuantityControl.jsx";

function CardGrid({ cards, onQuantityChange, onRemove }) {
    if (!cards || cards.length === 0) {
        return <p className="hint">Aucune carte à afficher.</p>;
    }

      return (
        <div className="grid">
          {cards.map(card => (
            <CardTile key={card.id} card={card}>
              <QuantityControl
                quantity={card.quantity}
                onChange={(delta) => onQuantityChange(card.id, delta)}
              />
              <button onClick={() => onRemove(card.id)}>Retirer</button>
            </CardTile>
          ))}
        </div>
      )
}

export default CardGrid;