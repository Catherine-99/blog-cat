//import modules
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

//setting path for .env file
dotenv.config({path: './.env'});

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
async function createNewPost(post_title, post_content, username) {
    const newPost = await pool.query(`
    INSERT INTO PostTable (post_title, post_content, username, created_at)
    VALUES (?, ?, ?, NOW())
    `, [post_title, post_content, username])
    return newPost
}


module.exports = { getAllPosts, createNewPost};
