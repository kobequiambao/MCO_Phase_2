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
//server.use(express.static('public', { extensions: ['css', 'js'] }));

let loggedInUser = '';
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
 
 
server.get('/', async (req, res) => {
    try {
        const postInfoData = await PostInfo.find().populate('AccountId');

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
        const postInfoData = await PostInfo.find().populate('AccountId');

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

server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        loggedInUser = username;
        const existingAccount = await Account.findOne({ username, password });

        if (!existingAccount) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.redirect(`/general`);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.get('/general', async (req, res) => {
    try {
        const postInfoData = await PostInfo.find().populate('AccountId');
        
        const userData = await Account.findOne({ username: loggedInUser });

        if (!userData) {
            return res.status(404).send('User not found');
        }

        res.render('general', {
            layout: 'index',
            title: 'General',
            userData,
            postInfoData
        });
    } catch (error) {
        console.error('Error rendering general template:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/createPost', function(req, resp){
        resp.render('createPost',{
            layout: 'index',
            title: 'Create Post'
        });
});

server.use(bodyParser.urlencoded({ extended: true }));


server.get('/signup', (req, res) => {
    res.render('register', {
        layout: 'index',
        title: 'Sign Up'
    });
});

server.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingAccount = await Account.findOne({ $or: [{ email }, { username }] });

        if (existingAccount) {
            return res.status(401).json('An account with the same email or username already exists.');
        }

        const newAccount = new Account({
            username,
            email,
            password,
            bio: '',
            college: '',
            idNo: 0,
            isAdmin: false,
            photo: '',
        });

        const result = await newAccount.save();

        console.log('Data added to the database:', result);
        res.redirect('/login');
    } catch (error) {
        console.error('Error adding data to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/viewProfile', async (req, res) => {
    try {
        const userData = await Account.findOne({ username: loggedInUser });

        if (!userData) {
            return res.status(404).send('User not found');
        }

        const userPosts = await PostInfo.find({ AccountId: userData._id }).populate('AccountId');

        res.render('viewProfile', {
            layout: 'index',
            title: 'View Profile',
            userData,
            userPosts
        });

    } catch (error) {
        console.error('Error rendering viewProfile template:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/editProfile', function(req, resp){
        resp.render('editProfile',{
            layout: 'index',
            title: 'Edit Profile'   
        });
});
server.get('/admin', function(req, resp){
    resp.render('admin',{
        layout: 'index',
        title: 'Admin'   
    });
});

server.get('/admin_post', function(req, resp){
    resp.render('admin_post',{
        layout: 'index',
        title: 'Admin Posts'   
    });
});

server.get('/admin_account', function(req, resp){
    resp.render('admin_account',{
        layout: 'index',
        title: 'Admin Accounts'   
    });
});
server.get('/post/:postId', async (req, resp) => {
    try {
      const postId = req.params.postId;
      if (!ObjectId.isValid(postId)) {
        return resp.status(400).send('Invalid post ID');
      }
  
      const postInfoData = await PostInfo.findById(postId).populate('AccountId');
      const userData = await Account.findOne({ username: loggedInUser });

        if (!userData) {
            return resp.status(404).send('User not found');
        }
      if (!postInfoData) {
        return resp.status(404).send('Post not found');
      }
  
      resp.render('post', {
        layout: 'index',
        index_title: 'Post',
        postInfoData,
        userData,
    });
    } catch (error) {
      console.error('Error retrieving PostInfo data:', error);
      resp.status(500).send('Internal Server Error');
    }
  });

 











const port = 3000;
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});