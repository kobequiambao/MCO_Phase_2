const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

server.get('/', function(req, resp){
    resp.render('main',{
        layout: 'index',
        index_title: 'DLSU FORUM'
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


const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+port);
});

