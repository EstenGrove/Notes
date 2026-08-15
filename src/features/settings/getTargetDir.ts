import { getSettingByKey } from "./queries";
import { SETTINGS_KEYS } from "./constants";

const getTargetDir = async (): Promise<string> => {
	const setting = await getSettingByKey(SETTINGS_KEYS.TARGET_DIR);
	return setting.value;
};

export { getTargetDir };
