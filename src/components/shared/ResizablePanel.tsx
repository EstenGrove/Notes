import { ReactNode } from "react";
import useResizable from "../../hooks/useResizable";
import ResizeHandle from "./ResizeHandle";
import styles from "../../css/shared/ResizablePanel.module.scss";

type Props = {
	children?: ReactNode;
	defaultWidth: number;
	min?: number;
	max?: number;
	storageKey?: string;
};

const ResizablePanel = ({ children, defaultWidth, min, max, storageKey }: Props) => {
	const { width, isResizing, handleProps } = useResizable(defaultWidth, { min, max, storageKey });

	return (
		<div className={styles.ResizablePanel} style={{ flex: `0 0 ${width}px` }}>
			<div className={styles.ResizablePanel_content}>{children}</div>
			<ResizeHandle {...handleProps} isResizing={isResizing} />
		</div>
	);
};

export default ResizablePanel;
