export function QuantityControl({ quantity, onChange }) {
    return (
        <div className="quantity-control">
            <button onClick={() => onChange(-1)} aria-label="Retirer un exemplaire" disabled={quantity <= 0}>-</button>
            <strong>{ quantity }</strong>
            <button onClick={() => onChange(1)} aria-label="Ajouter un exemplaire">+</button>
        </div>
    )
}