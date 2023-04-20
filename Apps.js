const express = require('express');

const app = express()

const passport =require('passport')

const User =require('./models/User')

const session = require('express-session') 

const facebookStrategy =require('passport-facebook').Strategy

app.set("view engine","ejs")

app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:"thisissecretkey"}))

// make our facebook strategy

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "185281703920262", 
    clientSecret    : "db59f04292c54832b547c9bf498a8a6e",
    callbackURL     : "http://localhost:5000/facebook/callback",
    profilefields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

},
function (token, refrshToken, profile, done) {
 
    process.nextTick(function() {
 
        User.findOne({ 'uid' : profile.id }, function(err, user) {
 
            if (err)
                return done(err);
 
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser= new User();
 
                newUser.uid    = profile.id; // set the users facebook id                                     
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                newUser.pic = profile.photos[0].value
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;
 
                    // if successful, return the new user
                    return done(null, newUser);
                });
            }
 
        });
 
    })
 
}));

    
    
app.get('/',(req,res) => {
    res.render("index.ejs")
})

app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}))

app.emit('/facebook/callbock',passport.authenticate('facebook',{
    successRedirect:'/profile',
    failureRedirect:'/failed'
}))

app.get('/profile',(req,res) => {
    console.log(req.user)
    
    res.send("yor are a valid user")

})


app.get('/failed',(req,res) => {
    res.send("you are a non valid use")
})

passport.serializeUser (function(user, done) {
    done(null, user.id);
});
     // used to deserialize the user
    passport.deserializeUser (function(id, done) {
         User.findById(id, function(err, user){
           done(err, user);
         });  
});

app.listen(5000,() =>{
    console.log("App is listening on Port 3000")
})
