const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const handlebars = require('express-handlebars');  

const bodyParser = require('body-parser');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({  
    extname: 'hbs',
    defaultLayout: false, 
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    },
}));

server.use(express.static('public'));
server.use(express.static('public', { extensions: ['css', 'js'] }));
mongoose.connect("mongodb+srv://alfredagustines:mongohuhu@apdev.dxbdgzs.mongodb.net/MCO2?retryWrites=true&w=majority&appName=APDEV", { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to the database!');
});

const postInfoSchema = new mongoose.Schema({
    Body: String,
    College: String,
    Title: String,
    Type: String,
    CommentCount: Number,
    isHidden: Boolean,
    AccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    NumvoteCount: Number,
    Date: String
});

const AccountSchema = new mongoose.Schema({
    bio: String,
    college: String,
    email: String,
    idNo: Number,
    isAdmin: Boolean,
    password: String,
    photo: String,
    username: String,
});

const CommentInfoSchema = new mongoose.Schema({
    Body: String,
    Date: String,
    PostId: String,
    isHidden: Boolean,
    CommenterId: String,
    username: Number,
});

const HiddenSchema = new mongoose.Schema({
    AccountId: String,
    PostId: String,
});

const ReplyInfoSchema = new mongoose.Schema({
    Body: String,
    CommentId: String,
    Date: String,
    isHidden: Boolean,
    NumvoteCount: Number,
    CommenterId: String, 
 });

 const Account = mongoose.model('Account', AccountSchema);
 const CommentInfo = mongoose.model('CommentInfo', CommentInfoSchema);
 const Hidden = mongoose.model('Hidden', HiddenSchema);
 const PostInfo = mongoose.model('PostInfo', postInfoSchema);
 const ReplyInfo = mongoose.model('ReplyInfo', ReplyInfoSchema);
 
 
// Set up a route to render the Handlebars template
server.get('/', async (req, res) => {
    try {
        // Find all documents in the PostInfo collection
        const postInfoData = await PostInfo.find().populate('AccountId');

        // Render the Handlebars template with the PostInfo data and additional parameters
        res.render('main', {
            layout: 'index',
            index_title: 'DLSU FORUM',
            postInfoData
        });
    } catch (error) {
        console.error('Error retrieving PostInfo data:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/main', async (req, res) => {
    try {
        // Find all documents in the PostInfo collection
        const postInfoData = await PostInfo.find().populate('AccountId');

        // Render the Handlebars template with the PostInfo data and additional parameters
        res.render('main', {
            layout: 'index',
            index_title: 'DLSU FORUM',
            postInfoData
        });
    } catch (error) {
        console.error('Error retrieving PostInfo data:', error);
        res.status(500).send('Internal Server Error');
    }
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

server.get('/post/:postId', async (req, resp) => {
    try {
      const postId = req.params.postId;
  
      // Validate that postId is a valid ObjectId
      if (!ObjectId.isValid(postId)) {
        return resp.status(400).send('Invalid post ID');
      }
  
      // Find the specific post based on the postId
      const postInfoData = await PostInfo.findById(postId).populate('AccountId');
      
      // Check if the post exists
      if (!postInfoData) {
        return resp.status(404).send('Post not found');
      }
  
      // Render the Handlebars template with the specific post data and additional parameters
      resp.render('post', {
        layout: 'index',
        index_title: 'Post',
        postInfoData,
    });
    } catch (error) {
      // Handle errors appropriately
      console.error('Error retrieving PostInfo data:', error);
      resp.status(500).send('Internal Server Error');
    }
  });
// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});