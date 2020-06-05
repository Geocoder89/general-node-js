const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')
const app = express();
const PORT = 3000;

const errorController = require('./controllers/error')

// this is the configuration to initialize express handlebars
// app.engine('hbs',expressHbs({
//     layoutsDir:'views/layouts/',defaultLayout:'main-layout',
//     extname:'hbs'})
// );

// app.set('view engine', 'hbs')

// this is the configuration to initialize ejs templates

app.set('view engine', 'ejs')
app.set('views','views')
// this is the configuration to set up the pug view engine
// app.set('view engine', 'pug');


const adminRoutes = require('./routes/admin')

const shopRoutes = require('./routes/shop');

const errorRoutes = require('./routes/error');

// third party packages set up
// this is a package to parse our incoming requests
app.use(bodyParser.urlencoded({extended:false}))
// configuration to serve static files
app.use(express.static(path.join(__dirname, 'public')));



// route setup
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);





app.listen(PORT,(req,res)=>{
    console.log(`App is listening on Port ${PORT}`)
})

