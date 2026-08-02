import { database as db } from "../../db/database";
import { NewNote, Note, NoteDB, Notes, NotesDB } from "./types";
import { convertNoteFromDB } from "../../db/utils";

const getNotes = async (): Promise<Notes> => {
	try {
		const notesDB = await db.select<NotesDB>("SELECT * FROM notes");
		const notes = notesDB.map(convertNoteFromDB);
		return notes;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get notes");
	}
};

const getNoteByID = async (id: number): Promise<Note> => {
	try {
		const noteDB = await db.select<NoteDB>("SELECT * FROM notes WHERE id = ?", [
			id,
		]);
		const note = convertNoteFromDB(noteDB);
		return note;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get note by ID");
	}
};

const addNote = async (note: NewNote): Promise<Note> => {
	const { title, fileName, content, isPinned, createdAt, updatedAt, lastViewedAt } = note;

	try {
		const [result] = await db.select<NotesDB>(
			"INSERT INTO notes (title, file_name, content, is_pinned, created_at, updated_at, last_viewed_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *",
			[title, fileName, content, isPinned, createdAt, updatedAt, lastViewedAt],
		);
		const newNote = convertNoteFromDB(result);
		return newNote;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to add note");
	}
};

export { getNotes, getNoteByID, addNote };
