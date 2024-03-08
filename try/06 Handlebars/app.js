//Install Command:
//npm init
//npm i express express-handlebars body-parser

//Common Project Heirarchy
//  Project Folder
//    = views (required for handlebars)
//        = layouts
//        = partials
//    = public
//    = routes
//    = node_modules
//    = app.js
//    = package.json

//Handlebars is an embeded technology that can be used to include one
//page into another. This is similar to how to how PhP and Servlets
//organize their views.
//https://www.npmjs.com/package/express-handlebars
const express = require('express');
const server = express();

//This is a new library called Body Parser. This system will parse the data
//from its internal JSon system to make request messages simpler.
const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

//The system must use the hbs view engine. When this is used,
//it will require a folder called "views" where all the embeded
//javascript files will be used. Sub-foldering may also be used.
const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

//Note: it is also possible to use the keyword 'handlebars' and the
//      extension '.handlebars". In this example, the shorthand is used.

//This is where static resources are loaded. Client side files like
//CSS and JS files can be stored here. Images can be placed as well.
server.use(express.static('public'));

//To use the HBS functionality, use the function called render
//and render the HBS file from the view folder. It will require
//a layout hbs from the layouts folder which will serve as a
//frame to the webpage.
server.get('/', function(req, resp){
    resp.render('main',{
        layout: 'index',
        title: 'My Question page'
    });
});

function convertStrToList(vname){
    let retValue = new Array();
    for(let i=0; i<vname.length; i++){
        retValue.push({
            'letter': vname[i],
            'check': vname[i]>='0' && vname[i]<='9'
        });
    }
    return retValue;
}

//It is possible to pass information to the pages.
//Note: The concept of get and post will be more explained in a later
//      sample. For now, just note that a post is being used.
server.get('/answer', function(req, resp){
    resp.render('answer',{
        layout: 'index',
        title: 'My Answer page',
        vname: req.query.vname,
        vpass: req.query.vpass,
        vlist: convertStrToList(req.query.vname)
    });
});

const port = process.env.PORT | 9090;
server.listen(port, function(){
    console.log('Listening at port '+port);
});

//---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
//Note: Some tutorials online shows the use of EJS.
//      This is just another library that can handle
//      page templates.
