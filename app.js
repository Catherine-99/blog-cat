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
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  });



//route to retrieve all posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
    })

app.post('/posts', async (req, res) => {
    const { user_id, post_title, post_content, created_at } = req.body;
    const result = await createNewPost(user_id, post_title, post_content, created_at);
    res.json(result);
});



