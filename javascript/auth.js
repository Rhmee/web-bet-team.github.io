const { response } = require('express');
const pool = require('./db');

class FormHandler {
    constructor() {
        this.loginLink = document.getElementById("loginLink");
        this.signupLink = document.getElementById("signupLink");
        this.loginLinkk = document.getElementById("loginLinkk");
        this.formSignup = document.querySelector(".form_signup");
        this.formLogin = document.querySelector(".form_login");
        this.formContainer = document.querySelector(".form_cont");
        this.formClose = document.querySelector(".form_close");

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.loginLink.addEventListener("click", this.showLoginForm.bind(this));
        this.signupLink.addEventListener("click", this.showSignupForm.bind(this));
        this.loginLinkk.addEventListener("click", this.showLoginForm.bind(this));
        this.formClose.addEventListener("click", this.hideForm.bind(this));

        // Add event listener for login button
        const loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", this.login.bind(this));

        // Add event listener for signup button
        const signupButton = document.getElementById("signupButton");
        signupButton.addEventListener("click", this.signup.bind(this));
    }

    showLoginForm(event) {
        event.preventDefault();
        this.formSignup.style.display = "none";
        this.formLogin.style.display = "block";
        this.formContainer.style.display = "block";
    }

    showSignupForm(event) {
        event.preventDefault();
        this.formLogin.style.display = "none";
        this.formSignup.style.display = "block";
        this.formContainer.style.display = "block";
        this.formLogin.scrollIntoView({ behavior: 'smooth' });
    }

    hideForm() {
        this.formContainer.style.display = "none";
    }

    async login() {
        try {
            const phoneNumber = document.getElementById("loginPhoneNumber").value;
            const password = document.getElementById("loginPassword").value;

            const response = await fetch('http://localhost:3000/api/v1/movies/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber, password: password }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result); // Handle the successful login response
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    async signup() {
        try {
            const username = document.getElementById("signupUsername").value;
            const phoneNumber = document.getElementById("signupPhoneNumber").value;
            const password = document.getElementById("signupPassword").value;

            const response = await fetch('http://localhost:3000/api/v1/movies/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, phone_number: phoneNumber, password: password }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
            } else {
                console.log('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const formHandler = new FormHandler();
});
