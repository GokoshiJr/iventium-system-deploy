require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { appConfig } = require('./config');
const app = express();

// middlewares
app.use(morgan('combined')); // morgan en modo dev para ver las request en la consola
app.use(express.json()); // para recibir req json
app.use(express.urlencoded({ extended: false })); // para recibir req urlencoded
app.use(cors()); // para que responda peticiones desde otros hosts

// Serve the static files from the React app
app.use(express.static(path.join(__dirname + '/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

async function initApp({ port=3000 }) {
  try {
    app.listen(port, () => {
      console.log(`Server on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

initApp(appConfig);
