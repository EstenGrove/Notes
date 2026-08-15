import styles from "../../css/layout/ResizeHandle.module.scss";

type Props = {
	onPointerDown: (e: React.PointerEvent) => void;
	onPointerMove: (e: React.PointerEvent) => void;
	onPointerUp: (e: React.PointerEvent) => void;
	isResizing?: boolean;
};

const ResizeHandle = ({
	onPointerDown,
	onPointerMove,
	onPointerUp,
	isResizing,
}: Props) => {
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
