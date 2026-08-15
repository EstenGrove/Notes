import { Favorite, FavoriteDB } from "../features/favorites/types";
import { Note, NoteDB } from "../features/notes/types";
import { RecentItem, RecentItemDB } from "../features/recents/types";
import { Setting, SettingDB } from "../features/settings/types";
import { Tag, TagDB } from "../features/tags/types";

// NOTES //
// Client (Note) -> DB (NoteDB)
const convertNoteToDB = (note: Note): NoteDB => {
	return {
		id: note.noteID,
		title: note.title,
		file_name: note.fileName,
		content: note.content,
		is_pinned: note.isPinned,
		created_at: note.createdAt,
		updated_at: note.updatedAt,
		last_viewed_at: note.lastViewedAt,
	};
};

// DB (NoteDB) -> Client (Note)
const convertNoteFromDB = (note: NoteDB): Note => {
	return {
		noteID: note.id,
		title: note.title,
		fileName: note.file_name,
		content: note.content,
		isPinned: note.is_pinned,
		createdAt: note.created_at,
		updatedAt: note.updated_at,
		lastViewedAt: note.last_viewed_at,
	};
};

// SETTINGS //
const convertSettingToDB = (setting: Setting): SettingDB => {
	return {
		id: setting.id,
		key: setting.key,
		value: setting.value,
		created_at: setting.createdAt,
		updated_at: setting.updatedAt,
	};
};

const convertSettingFromDB = (setting: SettingDB): Setting => {
	return {
		id: setting.id,
		key: setting.key,
		value: setting.value,
		createdAt: setting.created_at,
		updatedAt: setting.updated_at,
	};
};

// TAGS //
const convertTagToDB = (tag: Tag): TagDB => {
	return {
		id: tag.tagID,
		name: tag.name,
		file_count: tag.fileCount,
	};
};

const convertTagFromDB = (tag: TagDB): Tag => {
	return {
		tagID: tag.id,
		name: tag.name,
		fileCount: tag.file_count,
	};
};

// RECENTS //
const convertRecentItemToDB = (recentItem: RecentItem): RecentItemDB => {
	return {
		id: recentItem.id,
		type: recentItem.type,
		created_at: recentItem.createdAt,
	};
};

const convertRecentItemFromDB = (recentItem: RecentItemDB): RecentItem => {
	return {
		id: recentItem.id,
		type: recentItem.type,
		createdAt: recentItem.created_at,
	};
};

// FAVORITES //
const convertFavoriteToDB = (favorite: Favorite): FavoriteDB => {
	return {
		note_id: favorite.noteID,
		created_at: favorite.createdAt,
	};
};

const convertFavoriteFromDB = (favorite: FavoriteDB): Favorite => {
	return {
		noteID: favorite.note_id,
		createdAt: favorite.created_at,
	};
};

export {
	convertNoteToDB,
	convertNoteFromDB,
	convertSettingToDB,
	convertSettingFromDB,
	convertTagToDB,
	convertTagFromDB,
	convertRecentItemToDB,
	convertRecentItemFromDB,
	convertFavoriteToDB,
	convertFavoriteFromDB,
};
