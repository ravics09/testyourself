const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 9090;

const myRouter = require('./routers/userRouter');
const testRouter = require('./routers/testRouter');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', myRouter);
app.use('/test', testRouter);

app.listen(port, ()=>{
	console.log("Server is running on port", port);
})