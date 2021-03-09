const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

/* for future db implementation */
// const mongoose = require('mongoose');
// const uri = process.env.ATLAS_URI;

if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', () => (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

  });
}

const port = process.env.PORT || 8000

app.listen(port, console.log(`running on port ${port}`))