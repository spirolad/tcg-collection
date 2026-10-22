import {formatPrice} from "../domain/card.js";
import RarityBadge from "./RarityBadge.jsx";

function CardTile({ card }) {

    return (
        <article className={`card-tile rarity-${card.rarity}`}>
            <h3>{ card.name }</h3>
            <p className="meta">{card.set} · <RarityBadge rarity={card.rarity} /></p>
            <p className="price">{ formatPrice(card.price) }</p>
        </article>
    );
}

export default CardTile;