require('./config/db');
var express = require('express');
var bodyparser = require('body-parser');
var routes=require('./routes/userRoutes');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


//session 
app.use(session({
    secret:'MySession',
    saveUninitialized:true,
    resave:true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/',routes);



const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Server is running at http://localhost:"+port);
});