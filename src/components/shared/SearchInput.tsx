import React, { useMemo } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/shared/SearchInput.module.scss";

type Props = {
	name: string;
	id?: string;
	placeholder?: string;
	value?: string;
	onChange: (name: string, value: string) => void;
};

const ClearIcon = ({ onClick }: { onClick: () => void }) => {
	return (
		<svg tabIndex={0} className={styles.ClearIcon} onClick={onClick}>
			<use xlinkHref={`${sprite}#icon-clear`}></use>
		</svg>
	);
};

const SearchIcon = ({ onClick }: { onClick: () => void }) => {
	return (
		<svg tabIndex={0} className={styles.SearchIcon} onClick={onClick}>
			<use xlinkHref={`${sprite}#icon-search`}></use>
		</svg>
	);
};

const Icon = ({
	isSearching = false,
	onClick,
}: {
	isSearching: boolean;
	onClick: () => void;
}) => {
	if (isSearching) {
		return <ClearIcon onClick={onClick} />;
	}
	return <SearchIcon onClick={onClick} />;
};

const SearchInput = ({
	name,
	id,
	placeholder,
	value,
	onChange,
	...rest
}: Props) => {
	const isSearching = useMemo(() => !!value?.trim(), [value]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value);
	};

	const handleClear = () => {
		onChange(name, "");
	};
	return (
		<div className={styles.SearchInput}>
			<input
				type="text"
				id={id}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.SearchInput_input}
				{...rest}
			/>
			<Icon isSearching={isSearching} onClick={handleClear} />
		</div>
	);
};

export default SearchInput;
