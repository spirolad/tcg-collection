import {useFavorites} from "../context/favorites.js";

function FavoriteButton({cardId}) {
    const {favoriteIds, toggleFavorite} = useFavorites();
    const isFavorite = favoriteIds.includes(cardId);

    return (
        <button
            className={`favorite${isFavorite ? " is-on" : ""}`}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={() => toggleFavorite(cardId)}
        >
            {isFavorite ? "★" : "☆"}
        </button>
    );
}

export default FavoriteButton;
