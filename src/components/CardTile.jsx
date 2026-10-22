import {formatPrice, isRare} from "../domain/card.js";
import RarityBadge from "./RarityBadge.jsx";

function CardTile({ card, children }) {

    return (
        <article className={`card-tile rarity-${card.rarity}`}>
            <h3>{ card.name }</h3>
            <p className="meta">{card.set} · <RarityBadge rarity={card.rarity} /></p>
            {isRare(card) && <p className="highlight">★ Carte rare</p>}
            {card.quantity > 0 ? (
                <p className="meta">× {card.quantity}</p>
            ) : (
                <p className="sold-out">Plus aucun exemplaire</p>
            )}
            <p className="price">{ formatPrice(card.price) }</p>
            {children && <div className="actions">{children}</div>}
        </article>
    );
}

export default CardTile;