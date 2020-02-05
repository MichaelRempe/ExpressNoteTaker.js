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
const uniqueIDs = [];
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
    req.body.data = data; //Collect and initialize POST data
    let title = data[0];
    let content = data[1];
    let id = uniqueID();
    // Create new note object with collected data => write new note to  JSON 'database'               
    let note = new Note(title, content, id);
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data)=>{
        if(err){console.log(err)}
        else{
            let dummyData = JSON.parse(data);
            console.log(dummyData);
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

