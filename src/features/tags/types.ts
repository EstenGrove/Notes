export interface Tag {
	tagID: number;
	name: string;
	fileCount: number;
}

export interface TagDB {
	id: number;
	name: string;
	file_count: number;
}

export type Tags = Tag[];
export type TagsDB = TagDB[];
