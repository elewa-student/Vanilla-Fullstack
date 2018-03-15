const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

// Body parser for forms
let bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let cors = require('cors');

// cross origin resource sharing
// for accepting traffic from gh-pages while hosted on heroku
app.use(cors());

app.use(express.static(path.join(__dirname, './public/')));


const restful_notes = require('./restful_notes_service');
app.use("/notes", restful_notes);

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, function() {
    console.log("litening in port 3001")
})
