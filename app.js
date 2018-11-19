

const express = require("express")
var app = express()
const mongoose = require('mongoose');
// var bodyParser = require('body-parser')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

app.use(cookieParser("juuuuude"))



// MongoDB Connect
mongoose.connect('mongodb://localhost/video', {
    usedNewUrlParse : true
})



// Models
var Schema = mongoose.Schema;

var Movie = mongoose.model('movies', new Schema({ 
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: Array,
    rate: String
}), 'movies');

var Users = mongoose.model('users', new Schema({ 
    firstname: String,
    lastname: String,
    username: String,
    password: String,
}), 'users');



// Middleware
app.use(bodyParser.urlencoded({extended:false}));

var hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');   // handle bars
app.set('view engine', 'hbs');


// Routes
app.get("/", (req, res) => {
    Movie.find(( { year: { $gt: 2000} } ), function (err, result ) {
        res.render("index", {search : result} )
    }) 
});

// search movies route
app.get("/search", function(req, res) {
    
    Movie.find(( { year: { $gt: 2000} } ), function (err, result ) {
    res.render("newSearch", {search : result} )
    }) 
})



app.post("/post-user-data", function(req, res) {
    

    Movie.find(( { title: req.body.movietitle }), function (err, result ) {
        
        res.render("index", {search : result} )

    }) 
})


app.post("/input-user-data", function(req, res) {
    
     Movie.find(( { year: req.body.movieyear }), function (err, result ) {
        
    res.render("index", {search : result} )

    }) 
})



app.post("/post-movie", function(req, res) {


    var newMovie = new Movie ({
        title: req.body.Title,
        year: req.body.year,
        director: req.body.director
        
    })


    newMovie.save((err) => {
        if (err) {
            res.send ("no way")
        }
        else {
            res.send("Thanks for adding to our collection!")
        }
    })

})

    
// user sign-up 


app.get ("/sign-up", function (req, res ) {
    res.render("sign-up")
 }) 

 
 

 app.post("/post-sign-up", function(req, res) {

    bcrypt.hash(req.body.password, 5, function(err, hash) {
        if (err) {
            res.end("error");
            throw err;
        }  
        var newUser = new Users ({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hash
        })

        newUser.save((err) => {
            if (err) {
                res.send ("no way")
            }
            else {
              //  res.render('/sign-up') 
                res.send("thanks for siginig up!")
            }
        })

    })

 })




app.get('/index', (req,res)=>{
     // Set cookie
    res.cookie('loggedIn','juud') // options is optional
    res.render('login')
})




app.get('/search', (req, res) =>{
    if(req.cookies.loggedIn === "true") {
        res.render("search")
    } else {
        res.redirect("login")
    }
});





app.get("/login", function(req, res){
    res.render('login')

});


app.post ("/post-log-in", function (req ,res) {
        
    var password = req.body.password
    const username = req.body.username 
    
    Users.find({username: req.body.username}, (err, result) => {
      

        if (err) {
            res.send("no way today try tomorrow")
        }
        else if (result.length === 0) {
            res.send("lol")
        }
         else{
            bcrypt.compare(req.body.password, result[0].password , function(err, match) {
              //  console.log("sjjsjsjjjs",match)
                if (match) {
                    res.cookie("loggedIn", "true", {signed: true})
                    res.redirect("/search") 
                    }
                // else{
                //     //password is wrong
                // }
            })
        }
    }) 
})



app.get('/logout', (req, res) => {

    res.clearCookie('loggedIn')
    res.send ("You are logged out")
   //  res.redirect('/login')
});

// Question how do i get the logout botton on the page after the add movies?
// why does the movies all appear on the index i know the search handle bar is there b/c it displays the result
// from add and search movies.
// but how can we remove all movies

// server listner

app.listen(3000, function() {
    
});





