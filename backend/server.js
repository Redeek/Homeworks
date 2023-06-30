const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT


connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/homework', require('./routes/homeworkRoute') )
app.use('/api/users', require('./routes/userRoute') )
app.use('/api/subject', require('./routes/subjectRoute'))

app.use(errorHandler)

app.listen(port, () =>{ console.log(`Server runs on ${port}`)})