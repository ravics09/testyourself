const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/home',(req,res)=>{
	res.send("Its home page");
});

app.listen(8080, ()=>{
	console.log("Server is running on port 8080");
})