const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use("/api/songs", require("./api/songs"));
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Connected Successfully!')
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/songs.html');
});
  
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
});



  