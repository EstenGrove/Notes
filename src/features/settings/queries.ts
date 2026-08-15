import { database as db } from "../../db/database";
import { Setting, Settings, SettingsDB } from "./types";
import { convertSettingFromDB } from "../../db/utils";

const getSettings = async (): Promise<Settings> => {
	try {
		const settingsDB = await db.select<SettingsDB>(
			"SELECT * FROM user_settings",
		);
		const settings = settingsDB.map(convertSettingFromDB);
		return settings;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get settings");
	}
};

// Retrieves a single setting by its key
export const getSettingByKey = async (key: string): Promise<Setting> => {
	try {
		const [settingDB] = await db.select<SettingsDB>(
			"SELECT * FROM user_settings WHERE key = ?",
			[key],
		);
		if (!settingDB) {
			throw new Error(`No setting found for key "${key}"`);
		}
		const setting = convertSettingFromDB(settingDB);
		return setting;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get setting by key");
	}
};

const updateSetting = async (setting: Setting): Promise<boolean> => {
	try {
		await db.execute("UPDATE user_settings SET value = ? WHERE id = ?", [
			setting.value,
			setting.id,
		]);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

const addSetting = async (setting: Setting): Promise<boolean> => {
	try {
		await db.execute("INSERT INTO user_settings (key, value) VALUES (?, ?)", [
			setting.key,
			setting.value,
		]);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export { getSettings, addSetting, updateSetting };
