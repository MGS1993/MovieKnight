const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
require('dotenv').config();
console.log("Database_URL", process.env.DATABASE_URL);
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  
  app.get('/*', (req, res) => {
    
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, console.log(`running on port ${port}`))