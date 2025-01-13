const Song = require("../models/song");
const router = require("express").Router();

// Get list of all songs in the database
router.get("/", function(req, res) {
   Song.find()
        .then((songs) => res.json(songs))
        .catch((err)=>res.status(400).send(err));

   ;
});

// Add a new song to the database
router.post("/", function(req, res) {
   const song = new Song(req.body);
   song.save()
        .then(song => {
            res.status(201).json(song);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    ;
});

// Search a song by Genre
router.get('/genre/:genre', function(req, res){
    const genre = req.params.genre.trim();
    Song.find({genre: {$in: [genre]}})
        .then(song => {
            res.send(song);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});
 
// Delete a Song
router.delete("/:id", function(req, res) {
    Song.deleteOne({_id: req.params.id})
        .then((result) => {if (result.matchedCount === 0) {res.sendStatus(400)}
                            else {res.sendStatus(204)}})
        .catch((err) => res.status(400).send(err));
});
  
// Update a Song
router.put("/:id", function(req, res) {
    // Song to update sent in body of request
    const song = req.body;
 
    // Replace existing song fields with updated song
    Song.updateOne({ _id: req.params.id }, song)
    .then(result => {
       if (result.nModified === 0) {
          res.sendStatus(404);
       } 
       else {
          res.sendStatus(204);
       }
    })
    .catch(err => {
       res.status(400).send(err);
    });
 });

  
module.exports = router;