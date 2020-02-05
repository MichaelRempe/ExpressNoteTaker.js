// Dependencies //
//====================================================================
const express = require("express");
const path = require("path");
const Note = require("./Note"); //Note Object Constructor
const app = express(); //create app's server

let PORT = process.env.PORT || 8080; //PORT = Server Default or local machine 8080
app.listen(PORT, ()=>{
    console.log(`ExpressNoteTaker is listening on @: http://localhost:${PORT}`);
})

app.use(express.static("public")); // Allows for app to serve static files in provided dir
app.use(express.urlencoded({ extended: true })); //Allows for POST data processing
app.use(express.json());

//====================================================================

// Routes //
//====================================================================
    // Serve HTML //
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));   //ROOT => Landing Page: index.html
});
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"));   //Notes => Note Writing Page: notes.html
});
    // Serve JSON API
app.get("/api/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/db/db.json")); // "/api/notes" => db.json : notes 'database'
})


//====================================================================

