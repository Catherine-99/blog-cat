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

    //information to send to database
    const postBody = {
        user_id: 1, //hard coding user id for now, whilst implementing post functionality
        post_title: currentTitle,
        post_content: currentContent,
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

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', '0 0 26 26');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M17.869 3.889c-2.096 0-3.887 1.494-4.871 2.524c-.984-1.03-2.771-2.524-4.866-2.524C4.521 3.889 2 6.406 2 10.009c0 3.97 3.131 6.536 6.16 9.018c1.43 1.173 2.91 2.385 4.045 3.729c.191.225.471.355.765.355h.058c.295 0 .574-.131.764-.355c1.137-1.344 2.616-2.557 4.047-3.729C20.867 16.546 24 13.98 24 10.009c0-3.603-2.521-6.12-6.131-6.12');

        svg.appendChild(path);
        likeButton.appendChild(svg);

        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(likeButton);

        mainFeed.appendChild(postElement);
    });
}

retrievePosts();



//log in and register 
//filters and session managment 
//like feature 
