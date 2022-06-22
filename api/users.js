import express from 'express'
const router = express.Router();
import {getConnection} from "../config/database.js"
import {User} from "../models/User.js"

// If file.json doesn't exist, db.data will be null
// Set default data
// db.data = db.data || { posts: [] } // Node < v15.x

// Create and query items using plain JS


// @route  GET api/users
// @desc   Test Route 
// @access Public 

let newUser = new User({
    _id: 1234,
    guid : "sdfasdfasgfdgsdfgsdfgsdfgsdf",
    isActive : true,
    balance : 36.22,
    picture : "pic",
    age : 23,
    eyeColor : "blue",
    name : {
        first: "ivan",
        last: "rodriguez"
    },
    company : "tesla",
    email : "ivan@gmail.com",
    salt : "dsfasdf",
    password : "sdfadsfasdfasds",
    phone : "9515671704",
    address : "2544 el greco dr",
})

router.get("/user", async (req,res) => {
    const db = getConnection();
    db.data.users.push(newUser)
    await db.write()
    res.send('users route')
});

export default router