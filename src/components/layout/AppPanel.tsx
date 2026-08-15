import { ReactNode } from "react";
import styles from "../../css/layout/AppPanel.module.scss";

type Props = {
	children?: ReactNode;
};

const AppPanel = ({ children }: Props) => {
	return (
		<main className={styles.AppPanel}>
			<div className={styles.AppPanel_inner}>{children}</div>
		</main>
	);
};

export default AppPanel;
