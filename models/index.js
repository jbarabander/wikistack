var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: ['open', 'closed']},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

function urlTitleGen(title) {
  var randomLength = Math.floor(Math.random() * 50);
  if(!title) {
    for(var i=0; i < randomLength; i++) {
      title += String.fromCharCode(Math.floor(Math.random()*93 + 33));
    }
  }
  return title.replace(/\s+/g,'_').replace(/[^\w]/gi, '');
}



pageSchema.pre('validate', function(next) {
  this.urlTitle = urlTitleGen(this.title);
  next();
});





pageSchema.virtual('route').get(function() {
  return '/wiki/' + this.urlTitle;
});

var userSchema = new mongoose.Schema({
  name: {first: {type: String, required: true}, last: {type: String, required: true}},
  email: {type: String, required: true, unique: true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
