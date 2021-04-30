require('./config/db');
var express = require('express');
var bodyparser = require('body-parser');
var routes=require('./routes/userRoutes');


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/',routes);


const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Server is running at http://localhost:"+port);
});