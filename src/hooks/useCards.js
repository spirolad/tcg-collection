import {useEffect, useState} from "react";
import {fetchCards} from "../api/cards.js";

export function useCards() {
    const [state, setState] = useState({ status: "loading" });
    const [attempt, setAttempt] = useState(0);

    const updateCards = (transform) => {
        setState((previous) => previous.status === "success"
            ? { ...previous, cards: transform(previous.cards) }
            : previous
        );
    };

    const changeQuantity = (id, delta) => {
        updateCards((previous) => previous.map((card) => (
            card.id === id
                ? { ...card, quantity: Math.max(0, card.quantity + delta) }
                : card
        )));
    };

    const removeCard = (cardId) => {
        updateCards((previous) => previous.filter((card) => card.id !== cardId));
    };

    const retry = () => {
        setState({ status: "loading" });
        setAttempt((previous) => previous + 1);
    };

    const addCard = (newCard) => {
        newCard.id = crypto.randomUUID();
        updateCards((previous) => [...previous, newCard]);
    }

    useEffect(() => {
        let ignore = false;
        fetchCards().then((fetchedCards) => {
            if (!ignore) {
                setState({ status: "success", cards: fetchedCards });
            }
        }).catch((error) => {
            if (!ignore) {
                setState({
                    status: "error",
                    message: error instanceof Error ? error.message : String(error),
                });
            }
        });
        return () => {
            ignore = true;
        };
    }, [attempt]);

    return {state, retry, changeQuantity, removeCard, addCard };
}