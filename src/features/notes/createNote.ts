import { invoke } from "@tauri-apps/api/core";
import { getTargetDir } from "../settings/getTargetDir";
import { addNote } from "./queries";
import { Note } from "./types";

const createNote = async (title: string): Promise<Note> => {
	const targetDir = await getTargetDir();

	const fileName = await invoke<string>("create_note_file", {
		dir: targetDir,
		title,
		content: "",
	});

	const now = new Date().toISOString();
	const note = await addNote({
		title,
		fileName,
		content: "",
		isPinned: false,
		createdAt: now,
		updatedAt: now,
		lastViewedAt: now,
	});

	return note;
};

export { createNote };
