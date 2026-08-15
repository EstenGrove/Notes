import { ReactNode } from "react";
import styles from "../../css/layout/MainPanel.module.scss";

type Props = {
	children?: ReactNode;
};

const MainPanel = ({ children }: Props) => {
	return (
		<section className={styles.MainPanel}>
			<div className={styles.MainPanel_inner}>{children}</div>
		</section>
	);
};

export default MainPanel;
