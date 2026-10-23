import {useRef, useState} from "react";
import {parseRarity, RARITIES, SETS} from "../domain/card.ts";

function validate(draft) {
    const errors = [];
    if (draft.name.trim().length < 2) {
        errors.push("Le nom de la carte doit contenir au moins 2 caractères.");
    }
    if (draft.price.trim() === "" || isNaN(Number(draft.price)) || Number(draft.price) < 0) {
        errors.push("Le prix doit être un nombre positif.");
    }
    if (draft.quantity.trim() === "" || isNaN(Number(draft.quantity)) || Number(draft.quantity) < 1) {
        errors.push("La quantité doit être un nombre entier positif.");
    }
    return errors;
}

export function AddCardForm({addCard}) {

    const EMPTY_DRAFT = { name: "", set: "Set de Base", rarity: "commune", price: "", quantity: "1" };
    const inputRef = useRef(null);;

    const [cardToAdd, setCardToAdd] = useState(EMPTY_DRAFT);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field, value) => {
        setCardToAdd((previous) => ({ ...previous, [field]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        const errors = validate(cardToAdd);
        if (errors.length === 0) {
            addCard({
                ...cardToAdd,
                name: cardToAdd.name.trim(),
                price: Number(cardToAdd.price),
                quantity: Number(cardToAdd.quantity),
            });
            setCardToAdd(EMPTY_DRAFT);
            setSubmitted(false);
            inputRef.current.focus();
        }
    }

    return (
        <>
            {submitted && validate(cardToAdd).length > 0 && (
                <ul className="errors error">
                    {validate(cardToAdd).map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <form className="add-form" noValidate onSubmit={handleSubmit}>
                <label>
                    Nom
                    <input
                        value={cardToAdd.name}
                        ref={inputRef}
                        onChange={(event) => updateField("name", event.target.value)}
                    />
                </label>
                <label>
                    Extension
                    <select
                        value={cardToAdd.set}
                        onChange={(event) => updateField("set", event.target.value)}
                    >
                        {SETS.map((set) => (
                            <option key={set} value={set}>{set}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Rareté
                    <select
                        value={cardToAdd.rarity}
                        onChange={(event) => updateField("rarity", parseRarity(event.target.value))}
                    >
                        {RARITIES.map((rarity) => (
                            <option key={rarity} value={rarity}>{rarity}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Prix
                    <input
                        inputMode="decimal"
                        value={cardToAdd.price}
                        onChange={(event) => updateField("price", event.target.value)}
                    />
                </label>
                <label>
                    Quantité
                    <input
                        type="number"
                        value={cardToAdd.quantity}
                        onChange={(event) => updateField("quantity", event.target.value)}
                    />
                </label>
                <button type="submit">Ajouter la carte</button>
            </form>
        </>
    )

}