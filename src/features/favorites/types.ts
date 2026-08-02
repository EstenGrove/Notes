export interface Favorite {
	noteID: number;
	createdAt: string;
}

export interface FavoriteDB {
	note_id: number;
	created_at: string;
}

export type Favorites = Favorite[];
export type FavoritesDB = FavoriteDB[];
