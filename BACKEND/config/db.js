const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mytestProjectDB",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.logO("Error in connecting with database" + err);
})