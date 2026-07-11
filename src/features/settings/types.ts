export interface Setting {
	id: number;
	key: string;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export type Settings = Setting[];
