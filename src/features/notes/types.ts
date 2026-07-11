export interface Note {
	noteID: number;
	title: string;
	content: string;
	isPinned: boolean;
	createdAt: string;
	updatedAt: string;
	lastViewedAt: string;
}

export type Notes = Note[];
