import { database as db } from "../../db/database";
import { Tag, Tags, TagsDB } from "./types";
import { convertTagFromDB } from "../../db/utils";

const getTags = async (): Promise<Tags> => {
	try {
		const tagsDB = await db.select<TagsDB>("SELECT * FROM tags");
		const tags = tagsDB.map(convertTagFromDB);
		return tags;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get tags");
	}
};

const addTag = async (tag: Tag): Promise<boolean> => {
	try {
		await db.execute("INSERT INTO tags (name, file_count) VALUES (?, ?)", [
			tag.name,
			tag.fileCount,
		]);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

const removeTag = async (tag: Tag): Promise<boolean> => {
	try {
		await db.execute("DELETE FROM tags WHERE id = ?", [tag.tagID]);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export { getTags, addTag, removeTag };
