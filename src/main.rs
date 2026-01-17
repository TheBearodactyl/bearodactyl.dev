use rocket::fs::FileServer;

#[rocket::launch]
fn launch() -> _ {
    rocket::build().mount("/", FileServer::from("pages"))
}
