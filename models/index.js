var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection('mongodb://localhost/wikistack');
var db = mongoose.conection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var pageSchema = new mongoose.Schema({
  title:    {type: String, require: true},
  urlTitle: {type: String, require: true},
  content:  {type: String, require: true},
  status:   String,
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var userSchema = new mongoose.Schema({
  name: {first: String, last: String},
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
