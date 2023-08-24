const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const PlayerRouter = require('./Routes/playerroute');
const AuthRouter = require('./Routes/authroute');


dotenv.config({path: './config/config.env'});

const PORT = process.env.PORT;
const mongodbstring = process.env.MONGODB_STRING;
const filePath = path.join(__dirname, 'Public');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(filePath));


mongoose.connect(mongodbstring, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
        console.log('App is listening on port: ' + PORT);
    });
}).catch((error) => {
    console.log(error);
});



app.get('/', async(req,res) => {
    try {
        console.log('Data request successful!');
        res.status(200).json({message:"Connected to Players"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.use('/api', AuthRouter);

app.use('/player', PlayerRouter);


