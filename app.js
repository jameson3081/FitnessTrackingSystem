require('dotenv').config();
const express = require('express')
const app = express();
const path = require ('path');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//Set EJS as the View engine
app.set('view engine', 'ejs');

//IMPORT ROUTES(/routes/)
const pagesRoute = require('./routes/pages')
app.use(express.static(path.join('public'))) //USE files in 'public' folder



//ESTABLISHING MONGODB NODESERVER CONNECTION(CHECK .env)
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('MongoDB Server Database Connection Established...')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// END OF ESTABLISHING MONGODB CONNECTION






// Port to listen(AUTOMATIC) OR localhost:3000/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})


app.use('/', pagesRoute) //USE PAGES ROUTE