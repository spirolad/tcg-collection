import {formatPrice, isRare} from "../domain/card.js";
import RarityBadge from "./RarityBadge.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

function CardTile({ card, children, selected = false }) {

    return (
        <article className={`card-tile rarity-${card.rarity}${selected ? " is-selected" : ""}`}>
            <div className="actions">
                <h3>{ card.name }</h3>
                <FavoriteButton cardId={card.id} />
            </div>
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