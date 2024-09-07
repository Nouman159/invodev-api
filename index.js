const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const errorController = require('./Controllers/errorController')
const doctor = require('./Routes/doctor')
const patient = require('./Routes/patient')
const appointment = require('./Routes/appointment')
const testHistory = require('./Routes/testHistory')

//Express Server Setup
const app = express();
const port = process.env.PORT || 5001;

//Express Middlewares
app.use(express.json());
app.use(cors());


// Connection URL
const DB = process.env.mongoURI;
mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        //Server status endpoint
        app.get('/', (req, res) => {
            res.send('Server is Up!');
        });


        app.use('/invodev-api/doctors', doctor)
        app.use('/invodev-api/patients', patient)
        app.use('/invodev-api/appointments', appointment)
        app.use('/invodev-api/tests', testHistory)

        app.use(errorController.get404)
        app.use(errorController.get500)

        app.listen(port, () => {
            console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
        });
    }).catch((error) => console.error('Error connecting to MongoDB Atlas:', error));