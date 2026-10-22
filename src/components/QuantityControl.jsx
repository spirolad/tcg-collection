import {useState} from "react";

export function QuantityControl({ initialQuantity }) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => setQuantity(Math.max(0, quantity - 1));

    return (
        <div className="quantity-control">
            <button onClick={handleDecrement} aria-label="Retirer un exemplaire" disabled={quantity <= 0}>-</button>
            <strong>{ quantity }</strong>
            <button onClick={handleIncrement} aria-label="Ajouter un exemplaire">+</button>
        </div>
    )
}