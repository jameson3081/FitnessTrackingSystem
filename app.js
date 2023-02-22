const express = require('express')
const app = express();
const path = require ('path');

//Set EJS as the View engine
app.set('view engine', 'ejs');

//IMPORT ROUTES(/routes/)
const pagesRoute = require('./routes/pages')
app.use(express.static(path.join('public'))) //USE files in 'public' folder



// Port to listen(AUTOMATIC) OR localhost:3000/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})


app.use('/', pagesRoute) //USE PAGES ROUTE