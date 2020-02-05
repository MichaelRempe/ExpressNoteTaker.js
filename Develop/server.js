// Dependencies //
//====================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
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

// Global Data //
//====================================================================
let uniqueIDs = [];
let notes = [];
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
    //POST Notes
app.post("/notes", (req, res)=>{
    data = req.body; //Collect and initialize POST data
    let id = uniqueID();
    // Create new note object with collected data => write new note to  JSON 'database'               
    let note = new Note(data.title, data.text, id);
    notes.push(note);
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data)=>{
        if(err){console.log(err)}
        else{
            database = JSON.parse(data);
            notes = notes.concat(database._notes);
            console.log(database._notes)
            console.log(notes)
            // fs.writeFile(path.join(__dirname, "/db/db.json"), note_db, (err)=>{
            //     if(err){console.log(err)}
            // });
        }
    });

})
//====================================================================


// Helper Functions //
//====================================================================
uniqueID = ()=>{    //Generates random unique id for note object
    let r = 0;
    for (let i = 0; i < 2; i++) {
        r = Math.floor(Math.random() * (1000 - 100) + 100);
    }
    if(uniqueIDs.includes(r)){
        uniqueID();
    }else{
        uniqueIDs.push(r);
        return r;
    }
}
//====================================================================

