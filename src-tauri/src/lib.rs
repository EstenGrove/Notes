use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn list_markdown_files(path: &str) -> Vec<String> {
    let entries = std::fs::read_dir(path).unwrap();
    let mut files = Vec::new();

    for entry in entries {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.is_file() && path.extension().unwrap_or_default() == "md" {
            files.push(path.display().to_string());
        }
    }
    files
}

// Filesystem-unsafe characters across Windows/macOS/Linux, replaced so the
// title can be used directly as a filename.
fn sanitize_title_for_filename(title: &str) -> String {
    title
        .trim()
        .replace(' ', "_")
        .chars()
        .map(|c| if r#"/\:*?"<>|"#.contains(c) { '_' } else { c })
        .collect()
}

/// Writes a new note's markdown file into `dir`, deriving the filename from
/// `title`. If that filename is already taken, appends `_2`, `_3`, etc. until
/// a free one is found. Returns the filename actually used (without `dir`),
/// which the caller persists in the notes table since it may differ from a
/// naive slug of `title` after collision handling.
#[tauri::command]
fn create_note_file(dir: String, title: String, content: String) -> Result<String, String> {
    let dir_path = std::path::Path::new(&dir);
    if !dir_path.is_dir() {
        return Err(format!("Notes directory does not exist: {}", dir));
    }

    let base_name = sanitize_title_for_filename(&title);
    if base_name.is_empty() {
        return Err("Note title must contain at least one valid character".to_string());
    }

    let mut file_name = format!("{}.md", base_name);
    let mut counter = 2;
    while dir_path.join(&file_name).exists() {
        file_name = format!("{}_{}.md", base_name, counter);
        counter += 1;
    }

    std::fs::write(dir_path.join(&file_name), content).map_err(|e| e.to_string())?;

    Ok(file_name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "initial_schema",
        sql: include_str!("../migrations/v1_setup.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            SqlBuilder::default()
                .add_migrations("sqlite:notes.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            greet,
            list_markdown_files,
            create_note_file
        ])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
