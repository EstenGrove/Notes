import { database as db } from "../../db/database";
import { Favorite, Favorites, FavoritesDB } from "./types";
import { convertFavoriteFromDB } from "../../db/utils";

const getFavorites = async (): Promise<Favorites> => {
	try {
		const favoritesDB = await db.select<FavoritesDB>("SELECT * FROM favorites");
		const favorites = favoritesDB.map(convertFavoriteFromDB);
		return favorites;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get favorites");
	}
};

const addFavorite = async (favorite: Favorite): Promise<void> => {
	try {
		await db.execute(
			"INSERT INTO favorites (note_id, created_at) VALUES (?, ?)",
			[favorite.noteID, favorite.createdAt],
		);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to add favorite");
	}
};

const removeFavorite = async (favorite: Favorite): Promise<void> => {
	try {
		await db.execute("DELETE FROM favorites WHERE note_id = ?", [
			favorite.noteID,
		]);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to remove favorite");
	}
};

export { getFavorites, addFavorite, removeFavorite };
