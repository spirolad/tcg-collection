import {useFavorites} from "../context/favorites.js";

function FavoritesCount() {
    const {favoriteIds} = useFavorites();

    return <span>★ {favoriteIds.length} favori(s)</span>;
}

export default FavoritesCount;
