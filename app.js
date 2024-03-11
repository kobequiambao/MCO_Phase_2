const express = require('express');
const server = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

// mongoose stuff
mongoose.connect("mongodb://localhost:27017/MCO2", {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Connected to the database!');
});

const AccountSchema = new mongoose.Schema({
    bio: String,
    college: String,
    email: String,
    idNo: Number,
    isAdmin: Boolean,
    password: String,
    photo: Buffer,
    username: String,
});

const CommentInfoSchema = new mongoose.Schema({
    Body: String,
    Date: Date,
    PostId: String,
    isHidden: Boolean,
    CommenterId: String,
    username: Number,
});

const HiddenSchema = new mongoose.Schema({
    AccountId: String,
    PostId: String,
});

const PostInfoSchema = new mongoose.Schema({
    Body: String,
    College: String,
    Title: String,
    Type: String,
    CommentCount: Number,
    isHidden: Boolean,
    AccountId: String,
    NumvoteCount: Number,
    Date: Date,
});

const ReplyInfoSchema = new mongoose.Schema({
   Body: String,
   CommentId: String,
   Date: Date,
   isHidden: Boolean,
   NumvoteCount: Number,
   CommenterId: String, 
});

const Account = mongoose.model('Account', AccountSchema);
const CommentInfo = mongoose.model('CommentInfo', CommentInfoSchema);
const Hidden = mongoose.model('Hidden', HiddenSchema);
const PostInfo = mongoose.model('PostInfo', PostInfoSchema);
const ReplyInfo = mongoose.model('ReplyInfo', ReplyInfoSchema);


// until here



server.get('/', function(req, resp) {
    // Fetch all PostInfo from MongoDB
    PostInfo.find({}).exec()
        .then(postInfoData => {
            resp.render('main', {
                layout: 'index',
                index_title: 'DLSU FORUM',
                postInfo: postInfoData,
            });
        })
        .catch(err => {
            console.error(err);
            resp.status(500).send('Internal Server Error');
        });
});

server.get('/login', function(req, resp){
    resp.render('login',{
        layout: 'index',
        title: 'Log In'
    });
});

server.get('/general', function(req, resp){
    resp.render('general',{
        layout: 'index',
        title: 'General'
    });
});

server.get('/createPost', function(req, resp){
    resp.render('createPost',{
        layout: 'index',
        title: 'Create Post'
    });
});

server.get('/signup', function(req, resp){
    resp.render('register',{
        layout: 'index',
        title: 'Sign Up'
    });
});

server.get('/viewProfile', function(req, resp){
    resp.render('viewProfile',{
        layout: 'index',
        title: 'View Profile'
    });
});

server.get('/editProfile', function(req, resp){
    resp.render('editProfile',{
        layout: 'index',
        title: 'Edit Profile'
    });
});

server.get('/post', function(req, resp){
    resp.render('post', {
        layout: 'index',
        title: 'Post',
        n: req.params.n 
    });
});


const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+port);
});

