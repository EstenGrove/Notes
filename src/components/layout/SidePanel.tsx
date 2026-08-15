import { ReactNode, useState } from "react";
import styles from "../../css/layout/SidePanel.module.scss";
import SearchInput from "../shared/SearchInput";
import sprite from "../../assets/icons/main.svg";

type Props = {
	children?: ReactNode;
	onAddTagNote: () => void;
	onSearch: (value: string) => void;
};

// Will create a new note for the selected tag
const AddTagNoteButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" className={styles.AddTagNoteButton} onClick={onClick}>
			<svg className={styles.AddTagNoteButton_icon}>
				<use xlinkHref={`${sprite}#icon-add`}></use>
			</svg>
		</button>
	);
};

// Cool
const SidePanel = ({ children, onAddTagNote, onSearch }: Props) => {
	const [search, setSearch] = useState("");

	const handleSearch = (_: string, value: string) => {
		setSearch(value);
		onSearch(value);
	};
	return (
		<div className={styles.SidePanel}>
			<div className={styles.SidePanel_actions}>
				<SearchInput
					value={search}
					name="search"
					placeholder="Search"
					onChange={handleSearch}
				/>
				<AddTagNoteButton onClick={onAddTagNote} />
			</div>
			<div className={styles.SidePanel_inner}>{children}</div>
		</div>
	);
};

export default SidePanel;
