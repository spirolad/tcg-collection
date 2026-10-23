import {useState} from "react";
import {FavoritesContext} from "./favorites.js";

function FavoritesProvider({children}) {
    const [favoriteIds, setFavoriteIds] = useState([]);

    const toggleFavorite = (cardId) => {
        setFavoriteIds((previous) => previous.includes(cardId)
            ? previous.filter((id) => id !== cardId)
            : [...previous, cardId]
        );
    };

    return (
        <FavoritesContext value={{favoriteIds, toggleFavorite}}>
            {children}
        </FavoritesContext>
    );
}

export default FavoritesProvider;
