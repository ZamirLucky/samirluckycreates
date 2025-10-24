
// Initialize the Typed.js library for typing animation
var typed = new Typed('#element', {
  strings: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Application Developer', 'AI/ML Developer'],
  typeSpeed: 200,
  backSpeed: 200,
  backDelay: 2000,
  loop: true

});

// Highlight active navigation link based on scroll position
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id]"); 
    const navLinks = document.querySelectorAll(".nav-link"); 

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60 && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
});

// Contact form validation and submission using JustValidate library and Formspree API
const validator = new JustValidate(document.querySelector('#contact-form'));  
    
validator
.addField(document.querySelector('#name'), [
  {
    rule: 'required', errorMessage: 'Please enter your name',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'The name must be at least 3 characters',
  },
  {
    rule: 'maxLength',
    value: 50,
    errorMessage: 'The name must be less than 50 characters',
  },
])
.addField(document.querySelector('#email'), [
  {
    rule: 'required', errorMessage: 'Please enter your email',
  },
  {
    rule: 'email', errorMessage: 'Please enter a valid email',
  },
  {
    rule: 'maxLength',
    value: 100,
    errorMessage: 'The email must be less than 100 characters',
  },
])
.addField(document.querySelector('#subject'), [
  {
    rule: 'required', errorMessage: 'Please enter the subject',
  },
  { rule: 'maxLength', value: 100, errorMessage: 'The subject must be less than 100 characters' },
])
.addField(document.querySelector('#message'), [
  {
    rule: 'required', errorMessage: 'Please enter your message',
  },
  { rule: 'maxLength', value: 700, errorMessage: 'The message must be less than 700 characters' },
])
.onSuccess((event) => {
    event.preventDefault(); 

    const form = document.getElementById('contact-form');

    if (form && form instanceof HTMLFormElement) {
         
        const formData = new FormData(form); 
        const jsonObject = {};
        formData.forEach((value, key) => { jsonObject[key] = value }); 

        // Client-side validation
        if (!jsonObject['text-name'] || !jsonObject['text-email'] || !jsonObject['text-message']) {
            alert("Please fill in all required fields.");
            return;
        }

        // Honeypot field check
        if (jsonObject['userCode']) {
            console.warn("Spam detected via honeypot field.");
            return; 
        }

        // If validation passes, proceed to submit the form data
        fetch("https://formspree.io/f/xjkgeekl", {  
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              "Accept": "application/json"
            },
            body: JSON.stringify(jsonObject) 
        })
        .then(response => {
            if (response.ok) {
              alert("Your message has been sent successfully!");
              form.reset();
            } else {
              return response.json().then(err => Promise.reject(err));
            }   
        }) 
        .catch(error => {
            alert("Your message could not be sent. Please try again.");
            console.error("form submision error: ", error);
        });
    } else {
        alert("Something went wrong. Please try again.");
    }
});
