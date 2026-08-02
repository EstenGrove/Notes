import React, { ReactNode } from "react";
import styles from "../../css/layout/SidePanel.module.scss";

type Props = {
	children?: ReactNode;
};

const SidePanel = ({ children }: Props) => {
	return (
		<div className={styles.SidePanel}>
			<div className={styles.SidePanel_inner}>{children}</div>
		</div>
	);
};

export default SidePanel;
