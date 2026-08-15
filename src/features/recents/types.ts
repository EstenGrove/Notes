export type RecentItemType = "note" | "tag";

export interface RecentItem {
	id: number; // noteID or tagID
	type: RecentItemType;
	createdAt: string;
}

export interface RecentItemDB {
	id: number; // noteID or tagID
	type: RecentItemType;
	created_at: string;
}

export type RecentItems = RecentItem[];
export type RecentItemsDB = RecentItemDB[];

export interface RecentlyViewed {
	tags: RecentItems;
	notes: RecentItems;
}
