<p align="center" >
  <img src="https://github.com/Catherine-99/blog-cat/assets/142168043/d19f75da-de44-4ddb-9795-2f6a000bb3aa" height="200" width="170" />
</p>

<h1 align="center">
  blog-cat - a micro blogging web app
</h1>
<p align="center">
  Blog-cat is a basic microblogging web app that allows users to share simple text based posts and discover other users posts on the homepage
</p>
<img width="1466" alt="blogcat-homepage-loggedin" src="https://github.com/Catherine-99/blog-cat/assets/142168043/03c57135-6adc-428d-b07b-d88ec782243e">


<h2>About the Project</h2>
<h3>Description</h3>
<p>This app was a personal project, it utilises a basic CRUD API for data management, which was implemented using MySQL. It also integrates Auth0 to securely handle user authentication.</p>
<p>Users can:</p>

<ul>
  <li>register a new account and log in/log out</li>
  <li>view posts made on the platform on the homepage mainfeed</li>
  <li>create their own text based posts</li>
  <li>view their own posts in the myposts tab</li>
  <li>delete their own posts</li>
</ul>
<br>
<h3>Preview</h3>

<div style="display: flex;">
  <p>creating a new post and deleting posts</p>
  <img src="https://github.com/Catherine-99/blog-cat/assets/142168043/a10218d5-eab3-458f-9f87-eb8e241b4c5d"  width="450">
  <img src="https://github.com/Catherine-99/blog-cat/assets/142168043/69d0d5e2-4344-431e-b9e1-3c814dc1509c"  width="450">
</div>

<div style="display: flex;">
  <p>logged out state and log in screen</p>
  <img src="https://github.com/Catherine-99/blog-cat/assets/142168043/9119a6c1-5b20-4e46-9048-a375be1d0763" width="450">
  <img src="https://github.com/Catherine-99/blog-cat/assets/142168043/c6794b24-87f0-4676-a90b-72eb430658e2" width="450">
</div>

<br>
<h3>Built With</h3>
<ul>
  <li>Frontend:</li>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  <li>Backend:</li>
    <ul>
      <li>Node.js (Express.js framework)</li>
      <li>MySQL</li>
    </ul>
  <li>Authentication:</li>
  <ul>
    <li>Auth0</li>
  </ul>
</ul>

<br>

<h3>App Design</h3> 
<p>Below is a screenshot of the Figma design file used as a reference for developing the app. <br> The design was created by myself to visualise the layout and user interface of the application before implementation.</p>

![Frame 53](https://github.com/Catherine-99/blog-cat/assets/142168043/f096e05c-5a1c-4d8c-9590-17679f257f9d)

<h2>Getting Started</h2>
<p>To get a local copy of blog-cat up and running follow these steps:</p>

<h3>Prerequisites</h3>
<p>Before you can run this project, make sure you have the following prerequisites installed and configured on your machine:</p>
<ul>
  <li>Node.js: Download and install Node.js from the official website: https://nodejs.org/en/download/</li>
  <li>Express.js: Install Express.js using npm, the Node.js package manager </li>
  <li>MYSQL2: Install MySQL2, a MySQL client for Node.js, using npm</li>
  <li>Auth0: Set up an Auth0 account and configure authentication for the application by refering to the official Auth0 documentation for instructions</li>
</ul>


<h3>Installation</h3>

<p>Clone the repository to your local machine:</p>

<code>git clone https://github.com/Catherine-99/blog-cat.git</code><br>
<code>cd blog-cat</code>

<br>

<p>Install the required dependencies using npm:</p>

<code>npm install express mysql2 dotenv express-openid-connect</code>

<br>

<h3>Configuration</h3>
<p>1. Create a .env file in the root directory.</p>
<p>2. Define the following environmental variables in the .env file:</p>

<code>HOST=your_mysql_host
USER=your_mysql_user
PASSWORD=your_mysql_password
DATABASE=your_mysql_database
BASEURL=your_auth0_base_url
CLIENTID=your_auth0_client_id
ISSUERBASEURL=your_auth0_issuer_base_url
SECRET=your_auth0_secret</code>

<br>

<h3>Database Set Up</h3>
<p>1. Create a MySQL database.</p>
<p>2. Run the following SQL query to create the post_table table:</p>

<code>CREATE TABLE post_table (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  post_title VARCHAR(5000) NOT NULL,
  post_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(255) NOT NULL
);</code>

<h3>Running the App</h3>
<p>1. Start the Express server:</p>

<code>node app.js</code>
<br>
<p>2. Access the application in your web browser at http://localhost:8080.</p>

<h2>Roadmap</h2>

<h2>Contributing</h2>

<h2>License</h2>


