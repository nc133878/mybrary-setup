if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const indexRouter = require('./routes/index')
const port = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB Connected'))

app.use('/', indexRouter)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})