//importing modules
const express = require("express");
const path = require("path");
const { get } = require("https");

//auth0 for log in and register
const { auth } = require('express-openid-connect');

//environmental variables
const dotenv = require("dotenv");
dotenv.config({path: './.env'});

const { getAllPosts, createNewPost } = require("./database");

//config for auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL,
    secret: process.env.SECRET
  };


//starting server on port 8000
const app = express();
app.listen(3000, () => {
    console.log("Port 3000: server is running")
});


app.use(express.json());
app.use(auth(config));

//static files to be served from src folder
const publicDirectory = path.join(__dirname, './src');
app.use(express.static(publicDirectory));

//defining the route for root URL/homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
  });

// route for checking authentication status
app.get('/authstatus', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send('Logged in');
    } else {
        res.send('Logged out');
    }
});

//route for checking username
app.get('/username', (req, res) => {
    if (req.oidc.isAuthenticated()) {
      const username = req.oidc.user.nickname; 
      res.send(username);
    } else {
      res.status(401).send('user not logged in'); 
    }
  });

//route to retrieve all posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
    })

app.post('/posts', async (req, res) => {
    const { post_title, post_content, username, created_at } = req.body;
    const result = await createNewPost(post_title, post_content, username, created_at);
    res.json(result);
});



