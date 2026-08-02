import type { PointerEvent } from "react";
import styles from "../../css/shared/ResizeHandle.module.scss";

type Props = {
	onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
	onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
	onPointerUp: (e: PointerEvent<HTMLDivElement>) => void;
	isResizing?: boolean;
};

const ResizeHandle = ({ onPointerDown, onPointerMove, onPointerUp, isResizing }: Props) => {
	return (
		<div
			className={`${styles.ResizeHandle} ${isResizing ? styles.isResizing : ""}`}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
		/>
	);
};

export default ResizeHandle;
