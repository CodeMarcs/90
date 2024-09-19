/* Sign-up | Register */
function myFunction() {
    alert("You're account has been succesfully registered")
}


/* Login */
function myFunction2() {
    alert("Log in successful!")
}

document.querySelector('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (username === 'myemail' && password === 'mypassword') {
        alert('Login successful!');
      } else {
        alert('Incorrect username or password.');
      }
    });