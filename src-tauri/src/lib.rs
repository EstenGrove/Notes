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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, list_markdown_files])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
