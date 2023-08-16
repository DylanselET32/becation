const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const { authMiddleware } = require('./middleware/authMiddleware');
require('dotenv').config()


const app = express();

// Configure the port for the application
app.set('port', process.env.PORT || 3000);

// Use morgan to log application requests
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// Configure the routes for the application
app.get('/', (req, res) => {
    res.json({ 
        "Title": "BeCation",
        "description": "La API se encuentra funcionando exitosamente"
    })
})


app.use('/v1', require('./routes/v1/indexV1')); //esta es la version 1 de la api

//en caso de que no entre en ninguna ruta anterior, va a tirar la siguiente
app.use(function(req, res, next) {
    res.status(404).json({ error: 'The requested route does not exist' });
  });
  
// Start the application server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});

