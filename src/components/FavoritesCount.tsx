import {useFavorites} from "../context/favorites.ts";

function FavoritesCount() {
    const {favoriteIds} = useFavorites();

    return <span>★ {favoriteIds.length} favori(s)</span>;
}

export default FavoritesCount;
