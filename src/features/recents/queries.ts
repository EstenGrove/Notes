import { database as db } from "../../db/database";
import { RecentItem, RecentItems, RecentItemsDB } from "./types";
import { convertRecentItemFromDB } from "../../db/utils";

const getRecentItems = async (): Promise<RecentItems> => {
	try {
		const recentItemsDB = await db.select<RecentItemsDB>(
			"SELECT * FROM recents",
		);
		const recentItems = recentItemsDB.map(convertRecentItemFromDB);
		return recentItems;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get recents");
	}
};

const addRecentItem = async (recentItem: RecentItem): Promise<boolean> => {
	try {
		await db.execute(
			"INSERT INTO recents (id, type, created_at) VALUES (?, ?, ?)",
			[recentItem.id, recentItem.type, recentItem.createdAt],
		);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

const removeRecentItem = async (recentItem: RecentItem): Promise<boolean> => {
	try {
		await db.execute("DELETE FROM recents WHERE id = ? AND type = ?", [
			recentItem.id,
			recentItem.type,
		]);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export { getRecentItems, addRecentItem, removeRecentItem };
