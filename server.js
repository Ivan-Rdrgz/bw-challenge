import express from 'express'

import {createConection} from "./config/database.js"
import users from "./api/users.js"
import auth from "./api/auth.js"
import cors from "cors"

// Create connection to lowdb 
createConection()

// Initialize express and declare PORT number 
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
// Initialize middleware
app.use(express.json({extended:false}))

// Define Routes
app.use('/api/users', users)
app.use('/api/auth', auth)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))