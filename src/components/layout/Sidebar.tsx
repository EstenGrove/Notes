import { ReactNode } from "react";
import styles from "../../css/layout/Sidebar.module.scss";

type Props = {
	children?: ReactNode;
};

const Sidebar = ({ children }: Props) => {
	return (
		<aside className={styles.Sidebar}>
			<div className={styles.Sidebar_inner}>{children}</div>
		</aside>
	);
};

export default Sidebar;
