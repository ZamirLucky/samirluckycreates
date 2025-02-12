
// Typed.js
var typed = new Typed('#element', {
  strings: ['software engineer', 'frontend developer', 'backend developer', 'full stack developer', 'application developer'],
  typeSpeed: 200,
  backSpeed: 200,
  backDelay: 2000,
  loop: true

});

// 
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

// 
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
])
.addField(document.querySelector('#email'), [
  {
    rule: 'required', errorMessage: 'Please enter your email',
  },
  {
    rule: 'email', errorMessage: 'Please enter a valid email',
  },
])
.addField(document.querySelector('#subject'), [
  {
    rule: 'required', errorMessage: 'Please enter the subject',
  },
])
.addField(document.querySelector('#message'), [
  {
    rule: 'required', errorMessage: 'Please enter your message',
  },
])
.onSuccess((event) => {
    event.preventDefault(); // Prevent form submission

    const form = document.getElementById('contact-form');

    if (form && form instanceof HTMLFormElement) {
         
        const formData = new FormData(form);   // Create FormData object from the form
        const jsonObject = {};
        formData.forEach((value, key) => { jsonObject[key] = value }); // Convert FormData to JSON

        fetch("https://formspree.io/f/xjkgeekl", {  
            method: "POST",
            headers: { 
              "Content-Type": "application/json", // Send JSON data
              "Accept": "application/json"
            },
            body: JSON.stringify(jsonObject) // Convert JSON object to string,
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
