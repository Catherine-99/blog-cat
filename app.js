//importing modules
const express = require("express");
const path = require("path");
const { get } = require("https");

const { getAllPosts, createNewPost } = require("./database");



//starting server on port 8000
const app = express();
app.listen(8000, () => {
    console.log("Port 8000: server is running")
});

app.use(express.json());

//static files to be served from src folder
const publicDirectory = path.join(__dirname, './src');
app.use(express.static(publicDirectory));

//defining the route for root URL/homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
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



