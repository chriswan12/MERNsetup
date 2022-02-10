// setup for server 
const express = require("express");
const app = express(); 
const mongoose = require("mongoose"); 
require('dotenv').config(); 
const UserModel = require('./models/Users'); 

app.use(express.json()); 
app.use(cors());

// Connect to database
mongoose.connect(`mongodb+srv://chriswan12:${process.env.PASSWORD}@mernbeg.akzdh.mongodb.net/${process.env.USER_DATABASE}`); 


const PORT_NUM = 3001; 

// API Requests 

app.get("/getUsers", (req, res) => { 
    UserModel.find({}, (err, result) => { 
        if (err){ 
            res.json(err); 
        }  else { 
            res.json(result); 
        }
    })
}) 

app.post("/createUser", async (req, res) => { 
    const user = req.body 
    const newUser = new UserModel(user); 
    await newUser.save(); 
   
    res.json(user); 
}) 

// start server 
app.listen(PORT_NUM, () => {
    console.log(`SERVER is running on port ${PORT_NUM}`); 
})


