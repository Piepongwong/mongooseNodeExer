const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video')
let express = require('express');
let app = express();

let hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static('public'));



let Schema = new mongoose.Schema({
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: Array,
  rate: String
});

let MovieList = mongoose.model('movies', Schema);

app.get("/", function(req, res){
  MovieList.find({ $or: [{rate: {$gt: 8.0}}, {year: {$gt: 2000}}] }, function(err, result){
    if(err){
      console.log("ERROR!", err);
      res.end()
    } else {
      //better:
      res.render("movie", {showMovies: result}) 
    }
      // //you can also just 'send' it and loop it here:
      // let newMovieArray = [];
      // for (let i = 0; i < result.length; i++){
      //   newMovieArray.push(result[i]);
      // }
      // res.send(newMovieArray);
      
  });
});




app.listen(3000);

