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
// server.get('/admin', function(req, resp){
//     resp.render('admin',{
//         layout: 'index',
//         title: 'Admin'   
//     });
// });

server.get('/admin_post', async function(req, resp) {
    try {
        const postId = req.query.postId;
        if (!postId) {
            return resp.status(400).send("Post ID is required");
        }

        // Fetch the post information from the database based on the postId
        const post = await PostInfo.findById(postId);
        
        if (!post) {
            // Handle case where post is not found
            return resp.status(404).send("Post not found");
        }

        // Fetch comments associated with the specific post from the database using PostId field
        const comments = await CommentInfo.find({ PostId: postId });
        

        // Fetch replies associated with each comment
        const repliesPromises = comments.map(async (comment) => {
            // Fetch replies for the current comment from replyinfos collection
            return await ReplyInfo.find({ CommentId: comment._id });
        });

        // Resolve all promises to get the actual replies
        const replies = await Promise.all(repliesPromises);

        // Fetch account information for the post's poster
        const posterAccount = await Account.findById(post.AccountId);

        // Fetch account information for each commenter
        const commenters = await Promise.all(comments.map(async (comment) => {
            // Fetch commenter's account information
            const commenterAccount = await Account.findById(comment.CommenterId);
            return commenterAccount; // Return commenter's account info
        }));

        // Log the fetched post, poster, and commenters information to the console
        console.log("Fetched Post Information:", post);
        console.log("Fetched Poster Information:", posterAccount);
        console.log("Fetched Commenters Information:", commenters);
        console.log("Fetched Replies:", replies);

        // Render the 'admin_post' template with the fetched post, poster, commenters, and comments
        resp.render('admin_post', {
            layout: 'index',
            title: 'Post Details',
            post: post,
            poster: posterAccount, // Pass the fetched poster information to the template
            commenters: commenters, // Pass the fetched commenters information to the template
            comments: comments, // Pass the fetched comments to the template
            replies: replies // Pass the fetched replies to the template
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error appropriately, e.g., send an error response
        resp.status(500).send("Internal Server Error");
    }
});

server.get('/admin', async function(req, resp){
    try {
        // Fetch accounts from the database
        const accounts = await Account.find({}); // This assumes you want to fetch all accounts
        const posts = await PostInfo.find({}).populate('AccountId'); // Populate the AccountId field to get the corresponding account info
        // Render the 'admin_account' template with the fetched accounts
        resp.render('admin', {
            layout: 'index',
            title: 'Admin Accounts',
            accounts: accounts, // Pass the fetched accounts and posts to the template
            posts: posts
        });
    } catch (error) {
        console.error("Error fetching accounts:", error);
        // Handle error appropriately, e.g., send an error response
        resp.status(500).send("Internal Server Error");
    }
});

// Add this route to handle post deletion
server.delete('/delete-post', async function(req, res) {
    try {
        const postId = req.query.postId;

        // Delete the post from the database
        await PostInfo.findByIdAndDelete(postId);

        // Return success response
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting post:', error);
        // Return error response
        res.status(500).send('Internal Server Error');
    }
});

server.delete('/delete-account', async function(req, res) {
    try {
        const userId = req.query.userId;

        // Delete the account from the database
        await Account.findByIdAndDelete(userId);

        // Return success response
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting account:', error);
        // Return error response
        res.status(500).send('Internal Server Error');
    }
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
