
//REGISTER NEW USER
const registerButton = document.getElementById('confirm-register');
const alertText = document.getElementById('alert-text');


let newUsername = document.getElementById('username-input');
let newEmail = document.getElementById('email-input');
let newPassword = document.getElementById('password-input');

let currentUsername = '';
let currentEmail = '';
let currentPassword = '';

//event listener on register button with function to create new user
registerButton.addEventListener('click', async function registerUser(){
    event.preventDefault();
    
    //current input from input fields:
    currentUsername = newUsername.value;
    currentEmail = newEmail.value;
    currentPassword = newPassword.value;

    //characters not allowed in input fields
    const forbiddenCharacters = ['"', "'", "<", ">"];

    //validate username, checking if field is empty or includes forbidden characters
    if (currentUsername.trim() === '' || forbiddenCharacters.some(char => currentUsername.includes(char))) {
        alertText.innerHTML = 'please enter a valid username';
        return;
    }

    //validate email address, checking if email is a valid email address and does not include forbiddenn characters
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentEmail) || forbiddenCharacters.some(char => currentEmail.includes(char))) {
        alertText.innerHTML = 'please enter a valid email address';
        return;
    }

    //validate password
    if (forbiddenCharacters.some(char => currentPassword.includes(char))) {
        alertText.innerHTML = 'please enter a valid password';
        return;
    }

    
    //information to send to database
    const postBody = {
        username: currentUsername, 
        email: currentEmail,
        password: currentPassword,
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        });

        if (response.ok) {
            // registration successful
            console.log('User registered successfully');
            newUsername.value = '';
            newEmail.value = '';
            newPassword.value = '';
            window.location.href = '/login.html';
        } else {
            // registration failed
            console.error('Failed to register user');
            // You can display an error message to the user here
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
})

console.log('lol')