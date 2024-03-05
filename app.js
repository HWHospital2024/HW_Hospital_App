const express = require('express');
const http = require('http');
const createError = require('http-errors');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());

//Initialize DB Connection 
require('./initDB')();

//Declare all routes here
const PatientRoute = require('./Routes/Patient.route');
app.use('/Patient',PatientRoute);

//Declare all routes here
const BedRoute = require('./Routes/Bed.route');
app.use('/Bed',BedRoute);

//Declare all routes here
const userRoute = require("./Routes/user.route");
app.use("/", userRoute);


//Error Handler
app.use((err,req,res,next) =>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 3000

app.listen(PORT, HOSTNAME, () =>{
    console.log('Server started on port ' || PORT);
});
