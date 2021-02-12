//Modules
const mongoose = require("mongoose");

//Vars
const uri = "mongodb://localhost/mern-tasks";

//Connect
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Db is connected"))
    .catch(err => console.log(err));


module.exports = mongoose;