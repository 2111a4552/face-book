const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sanjayk20octece:sanjayk20octece@cluster0.y67m2av.mongodb.net/Facebook?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
    uid: String,
    email: string,
    name: String,
    pic: String
});

module.exports = mongoose.model('User', userSchema);