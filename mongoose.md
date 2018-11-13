### Combining MongoDB and NodeJs with Mongoose

Alright, so we know how to set up a webserver using NodeJs and the Express framework and we know how to query a database in Compas. So how do use MongoDB in NodeJs? The answer is: with Mongoose.

Mongoose is a npm package. To figure out how it is installed and set up, go to the npm website and follow the instructions.

### Exercise

We're going to query the movies database we've imported before in nodeJs. After that, you've to display the movies on a website using Handlebars. To do that, we've to connect to the database first:

```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video')
```

Now we've to tell Mongoose what kind of documents we're interested in:
```
var Schema = mongoose.Schema;

var Movie = mongoose.model('movies', new Schema({ 
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: Array,
    rate: String
}), 'movies')
```

As you can see, the structure of the 'Schema' is exactly the same as the structure of the documents of the 'Movies' collection.

Now we can start to query the database with the same commands as with Compass:

```
Movies.find({field: 'value'}, function(err, result) {
    console.log(result)
})
```

'result' will contain the value of the query. Please note that 'field' and 'value' are placeholders for real queries like `{title: 'The Dark Knight'}`. You can also use one of the more complex queries like `{$and: [{director: 'Christopher Nolan'}, {year: '2000'}]}`.

This was an example of a READ operation. We're going to learn in another lesson how the CREATE, UPDATE and DELETE as well. 

Now you know how to query a database. All that is left to do to display the data on a webpage is by passing the data to the `res.render` method and let handlebars take care of it. (of course you've to create a hbs file first). That part is left to you. ;)