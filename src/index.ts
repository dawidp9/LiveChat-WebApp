import dotenv from "dotenv";
import express from "express";
import * as path from "path";
const app = express();

// initialize configuration
dotenv.config();

// configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get( "/", (req, res) => {
    res.render("index");
});

app.get( "/api/*", (req, res) => {
    res.send( "Hello from API GET /api/*" );
});

// set server port
app.set("port", process.env.SERVER_PORT || 8080);
// start the Express server
app.listen(app.get("port"), () => {
    console.log(`Server is started on port ${app.get("port")}`);
});
