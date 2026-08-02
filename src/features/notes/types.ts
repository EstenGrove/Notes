export interface Note {
	noteID: number;
	title: string;
	fileName: string;
	content: string;
	isPinned: boolean;
	createdAt: string;
	updatedAt: string;
	lastViewedAt: string;
}

export interface NoteDB {
	id: number;
	title: string;
	file_name: string;
	content: string;
	is_pinned: boolean;
	created_at: string;
	updated_at: string;
	last_viewed_at: string;
}

// A note before it has a DB-assigned id
export type NewNote = Omit<Note, "noteID">;

export type Notes = Note[];
export type NotesDB = NoteDB[];
