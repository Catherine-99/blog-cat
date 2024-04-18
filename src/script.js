//LOGGED IN/LOGGED OUT STATES
// check if user is logged in/ logged out and display appropriate elements accordingly
async function checkAuthentication() {
    const response = await fetch('/authstatus');
    const isAuthenticated = await response.text();
    if (isAuthenticated === 'Logged in') {
      console.log('User is authenticated');
      // show logged in state
      document.getElementById('profile-picture').style.display = 'block';
      document.getElementById('username').style.display = 'block';
      document.getElementById('logout-button').style.display = 'block';
      // hide logged out state 
      document.getElementById('prompt-text').style.display = 'none';
      document.getElementById('login-button').style.display = 'none';
      document.getElementById('register-button').style.display = 'none';
      document.getElementById('new-post-logged-out').style.display = 'none';
    } else {
        //hide logged in state
        console.log('User is not authenticated');
        document.getElementById('profile-picture').style.display = 'none';
        document.getElementById('username').style.display = 'none';
        document.getElementById('logout-button').style.display = 'none';
        document.getElementById('new-post-section').style.display = 'none';
    }
}
checkAuthentication();

//get username for logged in state to display on profile card
async function getUsername() {
    try {
      const response = await fetch('/username');
      if (response.ok) {
        const username = await response.text();
        document.getElementById('username').innerHTML = username;
        return username
      } else {
        console.error('Unable to retrieve username:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
getUsername();


//CREATE NEW POST
const postTitle = document.getElementById('new-post-title');
const postContent = document.getElementById('new-post-textarea');
const postButton = document.getElementById('post-button');

let currentTitle = '';
let currentContent = '';


//event listener on post button with function to send new blog post title, content and user_id to database when post button is clicked
postButton.addEventListener('click', async function() {
    console.log('clicked');
    //setting current title and content = input from text area
    currentTitle = postTitle.value;
    currentContent = postContent.value;
    let currentUsername = await getUsername();
    

    //information to send to database
    const postBody = {
        post_title: currentTitle,
        post_content: currentContent,
        username: currentUsername
    }
    //posting to database, using fetch 
    try{
        const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
        })
        //if response was successful, clear text area and reload page 
        if (response.ok) {
            postTitle.value = '';
            postContent.value = '';    
            location.reload();
        }
    } catch (error) {
        console.error(error);
    };
});


//DISPLAY POSTS ON MAIN FEED

//retrieve posts from database:
async function retrievePosts() {
    try{
        const response = await fetch('/posts');
        if (response.ok) {
            const posts = await response.json();
            displayPosts(posts);
            console.log(posts);
        }
    } catch (error) {
        console.log(error);
    }
}

//display all posts on main feed: 
function displayPosts(posts) {
    const mainFeed = document.getElementById('main-feed-container');

    posts.reverse().forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('blog-post');
        postElement.dataset.postId = post.post_id;

        const titleElement = document.createElement('h2');
        titleElement.classList.add('post-title');
        titleElement.textContent = post.post_title;
        
        const contentElement = document.createElement('p');
        contentElement.classList.add('post-content');
        contentElement.textContent = post.post_content;

        //formatting the date to dd/mm/yyyy
        const date = new Date(post.created_at);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const dateElement = document.createElement('p');
        dateElement.classList.add('date');
        dateElement.textContent = formattedDate;

        const postUsername = document.createElement('p');
        postUsername.classList.add('post-username');
        postUsername.textContent = post.username;


        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(postUsername);

        mainFeed.appendChild(postElement);
    });
}
retrievePosts();


//FILTER FOR MY POSTS WHEN LOGGED IN 

// event listener on 'my posts' button, checks if user is logged in, if logged in displays liked posts, otherwise prompt is displayed
const myPostsButton = document.getElementById('my-posts-button');
myPostsButton.addEventListener('click', async () => {
    // check if the user is authenticated
    myPostsButton.color = '#819A88';
    const response = await fetch('/authstatus');
    const isAuthenticated = await response.text();

    if (isAuthenticated === 'Logged in') {
        console.log('user logged in');
        // only display posts made by logged in user
        toggleMyPostsDisplay();

        //add a delete button to each post in the my post section 
        const postElements = document.querySelectorAll('.blog-post');
        postElements.forEach(postElement => {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('viewBox', '0 0 24 24');

            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', 'M9.25 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v.75H19a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5h4.25z');

            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('fill-rule', 'evenodd');
            path2.setAttribute('d', 'M6.24 7.945a.5.5 0 0 1 .497-.445h10.526a.5.5 0 0 1 .497.445l.2 1.801a44.213 44.213 0 0 1 0 9.771l-.02.177a2.603 2.603 0 0 1-2.226 2.29a26.788 26.788 0 0 1-7.428 0a2.603 2.603 0 0 1-2.227-2.29l-.02-.177a44.239 44.239 0 0 1 0-9.77zm4.51 3.455a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0zm4 0a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0z');
            path2.setAttribute('clip-rule', 'evenodd');

            svg.appendChild(path1);
            svg.appendChild(path2);
           
            deleteButton.appendChild(svg)
            postElement.appendChild(deleteButton)
        })

        //attach event listener to delete posts when clicking on delete button 
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async () => {
                console.log('clicked');
                const postId = button.parentNode.dataset.postId;
                const response = await fetch(`/posts/${postId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Failed to delete post');
                }
            });
        });
    } else {
        //hide all posts
        console.log('not logged in');
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            post.style.display = 'none';
        })
        //display prompt message
        const loggedOutPrompt = document.getElementById('logged-out-prompt');
        loggedOutPrompt.style.display =  'block';
    }
});

// function to toggle to my posts only 
async function toggleMyPostsDisplay() {
    const currentUsername = await getUsername();
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const postUsername = post.querySelector('.post-username').textContent;
        if (postUsername !== currentUsername) {
            post.style.display = 'none';
        } 
    });
};

//HOME BUTTON 
//event listener on homebutton, reloads page and displays all posts on home page 
const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', async () => {

    location.reload();
});


