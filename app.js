//importing modules
const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");
const { get } = require("https");

//setting path for .env file
dotenv.config({path: './.env'});

//starting server on port 8000
const app = express();
app.listen(8000, () => {
    console.log("Port 8000: server is running")
});

//static files to be served from src folder
const publicDirectory = path.join(__dirname, './src');
app.use(express.static(publicDirectory));

//defining the route for root URL/homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
  });

//connect to database using env
const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise();


//get all blog posts 
async function getAllPosts() {
    const [posts] = await pool.query("SELECT * FROM PostTable")
    console.log(posts)
    return posts
}

//create new blog post 
async function createNewPost(user_id, post_title, post_content, created_at) {
    const newPost = await pool.query(`
    INSERT INTO PostTable (user_id, post_title, post_content, created_at)
    VALUES (?, ?, ?, ?)
    `, [user_id, post_title, post_content, created_at])
    return newPost
}

let date = new Date();

createNewPost(1,'another title test', 'another content test', date);

getAllPosts()