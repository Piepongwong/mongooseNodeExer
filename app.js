const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/video')
var express = require("express")
var app = express()

var hbs = require("hbs")
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static("public"))

var movieSchema = new mongoose.Schema ( {
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: Array,
  rate: String 
});

var Movie = mongoose.model('movies', movieSchema)

app.get("/", function(req, res) {
  Movie.find({$and: [{title: /The/},{year: {$gte: 1999}}, {rate: {$ne: 8.5}}]}, {title:1, year:1, rate:1, director:1, _id:0}, function(err, result){
    if (err) {
      console.log("ERROR", err)
      res.end()
    } else {
      //Showing all titles from the query:
      // var movieTitle = [];
      // for (var i= 0; i<result.length; i++){
      //   movieTitle.push(result[i].title);
      // }
      // res.send(movieTitle)
      //Showing one specific result (index) from the query:
      //res.send(result[0].title)
      //Rendering results in a hbs file
      res.render('movie', {showmovie: result})
    }
  })  
})

app.listen(3000)