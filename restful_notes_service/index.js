//      learning tasks
// access /all then /reset - explain what happens in the console
// change shuffle around the routes, what happens?
const express = require("express");
const router = express.Router();


// routes =>

/* ------------------- INDEX -------------------*/
// GET  "/"                     => greetings

/* ------------------- INDEX -------------------*/
// GET  "/all"                     => show all notes

/* ------------------- INDEX -------------------*/
// GET  "/reset"                     => resets db

/* ------------------- CREATE -------------------*/
// GET  "/add"                => Create new Beaver
// POST "/add"                => Create new Beaver
//                                 Redirect to "/note/:id"

/* ------------------- READ -------------------*/
// GET  "/:id"             => View Beaver Info with id ...

/* ------------------- UPDATE -------------------*/
// GET  "/:id/update"     => update Beaver with id...
// POST "/:id/update"     => update Beaver with id...
//                                 Redirect to "/note/:id"

/* ------------------- DELETE -------------------*/
// GET  "/:id/delete"     => delete Beaver with id...
// POST "/:id/delete"     => delete Beaver with id...
//                                 Redirect to "/"

/* reinitialize  - most APIs don't expose this operation */
// POST "/reset"


router.get("/", function(req, res) {
    console.log("-- GET /all --");
    res.json("hi, you're at my notes api")
})

router.get("/all", function(req, res){
    console.log("-- GET /all --");
    res.json(notes_service.read_all());
})
router.post("/reset", function(req, res){
    console.log("-- GET /reset --");
    notes_service.reset();
    res.redirect("/all");
})

router.get("/add", function(req, res){
    console.log("-- GET /add --");
    res.json('put a new "note" property in the body and submit')
})

router.post("/add", function(req, res){
    console.log("-- POST /add --");
    let new_note = req.body.note;
    let id = notes_service.create(new_note);
    res.redirect("/" + id)
})

router.get("/:id", function(req, res){
    console.log("-- GET /:id --");
    let note_id = req.params.id
    res.json(notes_service.read_one(note_id));
})

router.get("/:id/update", function(req, res){
    console.log("-- GET /:id/update --");
    let note_id = req.params.id
    let response = {}
    response[note_id] = notes_service.read_one(note_id);
    response.next_step = 'post with a \'note\' property in the body';
    res.json(response);
})

router.post("/:id/update", function(req, res){
    console.log("-- POST /:id/update --");
    let note_id = req.params.id
    notes_service.update(note_id, req.body.note)
    res.redirect("/" + note_id)
})

router.get("/:id/delete", function(req, res){
    console.log("-- GET /:id/delete --");
    let note = notes_service.read_one(req.params.id);
    res.json({id: note, message: 'confirm deleting this note'});
})

router.post("/:id/delete", function(req, res){
    console.log("-- POST /:id/delete --");
    notes_service.remove(req.params.id);
    res.redirect("/all")
})


module.exports = router;

