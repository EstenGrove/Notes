export type RecentItemType = "note" | "tag";

export interface RecentItem {
	id: number; // noteID or tagID
	type: RecentItemType;
	createdAt: string;
}

export type RecentItems = RecentItem[];

export interface RecentlyViewed {
	tags: RecentItems;
	notes: RecentItems;
}
