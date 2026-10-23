import {collectionValue, copyCount, formatPrice} from "../domain/card.ts";

function Summary({ cards }) {
    return (
        <p className="summary">
            : {cards.length} / {copyCount(cards)} / {formatPrice(collectionValue(cards))}
        </p>
    );
}

export default Summary;
