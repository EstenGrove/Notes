export interface Setting {
	id: number;
	key: string;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export interface SettingDB {
	id: number;
	key: string;
	value: string;
	created_at: string;
	updated_at: string;
}

export type Settings = Setting[];
export type SettingsDB = SettingDB[];
