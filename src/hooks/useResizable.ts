import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

type Options = {
	min?: number;
	max?: number;
	storageKey?: string;
};

const useResizable = (defaultWidth: number, options: Options = {}) => {
	const { min = 150, max = 600, storageKey } = options;

	const [width, setWidth] = useState<number>(() => {
		if (storageKey) {
			const saved = localStorage.getItem(storageKey);
			if (saved) return Number(saved);
		}
		return defaultWidth;
	});
	const [isResizing, setIsResizing] = useState(false);

	const startX = useRef(0);
	const startWidth = useRef(0);
	const isDragging = useRef(false);

	const clamp = useCallback((value: number) => Math.min(max, Math.max(min, value)), [min, max]);

	const onPointerDown = useCallback(
		(e: PointerEvent<HTMLDivElement>) => {
			startX.current = e.clientX;
			startWidth.current = width;
			isDragging.current = true;
			setIsResizing(true);
			e.currentTarget.setPointerCapture(e.pointerId);
		},
		[width]
	);

	const onPointerMove = useCallback(
		(e: PointerEvent<HTMLDivElement>) => {
			if (!isDragging.current) return;
			setWidth(clamp(startWidth.current + (e.clientX - startX.current)));
		},
		[clamp]
	);

	const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
		isDragging.current = false;
		setIsResizing(false);
		e.currentTarget.releasePointerCapture(e.pointerId);
	}, []);

	useEffect(() => {
		if (storageKey) localStorage.setItem(storageKey, String(width));
	}, [width, storageKey]);

	return {
		width,
		isResizing,
		handleProps: { onPointerDown, onPointerMove, onPointerUp },
	};
};

export default useResizable;
