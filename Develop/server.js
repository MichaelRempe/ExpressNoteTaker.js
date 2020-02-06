// Dependencies //
//====================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const Note = require("./Note"); //Note Object Constructor
const app = express(); //create app's server

let PORT = process.env.PORT || 8080; //PORT = Server Default or local machine 8080
app.listen(PORT, () => {
    console.log(`ExpressNoteTaker is listening on @: http://localhost:${PORT}`);
})

app.use(express.static("public")); // Allows for app to serve static files in provided dir
app.use(express.urlencoded({ extended: true })); //Allows for POST data processing
app.use(express.json());
//====================================================================

// Global Data //
//====================================================================
let uniqueIDs = [];
let localNotes = [];
//====================================================================

// Routes //
//====================================================================
// Serve HTML //
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));   //ROOT => Landing Page: index.html
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));   //Notes => Note Writing Page: notes.html
});
// Serve JSON API
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json")); // "/api/notes" => db.json : notes 'database'
})
//POST Notes
app.post("/api/notes", (req, res) => {
    data = req.body; //Collect and initialize POST data
    let id = uniqueID();
    // Create new note object with collected data => write new note to  JSON 'database'               
    let note = new Note(data.title, data.text, id);
    localNotes = []; //clear local note storage of data
    localNotes.push(note); // push new note onto local note storage
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
        if (err) { console.log(err) }
        else {
            let database = JSON.parse(data);
            localNotes = localNotes.concat(database); //pull server notes and concat with local notes
        }
        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(localNotes), (err) => { // push [local+server] notes back to db.json
            if (err) { console.log(err) }
        });
    });
    res.sendFile(path.join(__dirname, "/db/db.json"));
})

app.delete("/api/notes/:id", (req, res) => {
    let note_id = parseInt(req.params.id);
    localNotes = []; //clear local note storage of data
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
        if (err) { console.log(err) }
        else {
            let database = JSON.parse(data);
            localNotes = localNotes.concat(database); //pull server notes and concat with local notes
            let filteredNotes = localNotes.filter((obj) => {
                if(obj.id !== note_id){
                    return obj.id;e4
                };
            })
            console.log(filteredNotes);
            fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(filteredNotes), (err) => { // push [local+server] notes back to db.json
                if (err) { console.log(err) }
            });
        }
    })
    res.sendFile(path.join(__dirname, "/db/db.json"));
})
//====================================================================


// Helper Functions //
//====================================================================
uniqueID = () => {    //Generates random unique id for note object
    let r = 0;
    for (let i = 0; i < 2; i++) {
        r = Math.floor(Math.random() * (1000 - 100) + 100);
    }
    if (uniqueIDs.includes(r)) {
        uniqueID();
        console.log("un-unique num, re-gen")
    } else {
        uniqueIDs.push(r);
        return r;
    }
}
//====================================================================

