const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose
    .connect('mongodb+srv://hospitalcust01.tu8mog8.mongodb.net/',
    {
        dbName: 'Hospital',
        user:'hr3000',
        pass: 'ia9vLUpL9TQPi1RC'
    })
.then(() => {
    console.log("MongoDB connected");
})

app.all('/test',(req,res)=>{
    console.log(req.body);
    //console.log(req.querxy.name);
    res.send(req.body);
})

const PatientRoute = require('./Routes/Patient.route');
app.use('/Patient',PatientRoute);

app.use((req,res,next) =>{
    const err = new Error("Not Found")
    err.status = 404
    next(err)
});

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

app.listen(3000, () =>{
    console.log('Server started on port 3000...');
});