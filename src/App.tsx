import "./App.css";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import AppPanel from "./components/layout/AppPanel";
import Sidebar from "./components/layout/Sidebar";
import SidePanel from "./components/layout/SidePanel";
import MainPanel from "./components/layout/MainPanel";
import ResizablePanel from "./components/shared/ResizablePanel";

const LAYOUT_CONFIG = {
	sidebar: {
		default: 220, // 22rem
		min: 160, // 16rem
		max: 320, // 32rem
		storageKey: "tags-sidebar",
	},
	sidePanel: {
		default: 280, // 28rem
		min: 220, // 22rem
		max: 480, // 48rem
		storageKey: "notes-list",
	},
	mainPanel: {
		default: 1000, // 100rem
		min: 800, // 80rem
		max: 1200,
		storageKey: "main-panel",
	},
};

function App() {
	const [files, setFiles] = useState<string[]>([]);

	async function listMarkdownFiles() {
		const list = await invoke("list_markdown_files", {
			path: "/Users/stevengore/notes",
		});
		setFiles(list as string[]);
	}

	return (
		<AppPanel>
			{/* TAGS SIDEBAR */}
			<ResizablePanel
				min={LAYOUT_CONFIG.sidebar.min}
				max={LAYOUT_CONFIG.sidebar.max}
				defaultWidth={LAYOUT_CONFIG.sidebar.default}
				storageKey={LAYOUT_CONFIG.sidebar.storageKey}
			>
				<Sidebar />
			</ResizablePanel>
			{/* TAG-NOTES SIDE PANEL */}
			<ResizablePanel
				min={LAYOUT_CONFIG.sidePanel.min}
				max={LAYOUT_CONFIG.sidePanel.max}
				defaultWidth={LAYOUT_CONFIG.sidePanel.default}
				storageKey={LAYOUT_CONFIG.sidePanel.storageKey}
			>
				<SidePanel>
					<h2 style={{ color: "black" }}>Title</h2>
				</SidePanel>
			</ResizablePanel>
			{/* NOTES/EDITOR MAIN PANEL */}
			<MainPanel />
		</AppPanel>
	);
}

export default App;
