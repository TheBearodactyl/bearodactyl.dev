use std::process::Command;

fn main() -> std::io::Result<()> {
    let pages = vec!["./pages/home"];

    for page in pages {
        let script_path = format!("{}/script.ts", page);
        let out_path = format!("{}/script.js", page);

        Command::new("tsc")
            .arg(&script_path)
            .arg("--lib")
            .arg("es2024,dom")
            .arg("--outFile")
            .arg(&out_path)
            .spawn()?;
    }

    Ok(())
}
