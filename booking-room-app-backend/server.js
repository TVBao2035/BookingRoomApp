const connectDataBase = require('./config/connectDataBase.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./Router');
const cors = require('cors');

connectDataBase();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

router(app);

app.listen(3030, ()=>{
    console.log("Server is Running...");
})
