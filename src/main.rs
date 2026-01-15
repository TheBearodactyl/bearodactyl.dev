use rocket::fs::FileServer;
use std::path::Path;

#[rocket::launch]
fn launch() -> _ {
    let pages_path = Path::new(env!("CARGO_MANIFEST_DIR")).join("pages");
    rocket::build().mount("/", FileServer::from(pages_path))
}
