
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

        fetch("send_email.php", {  
            method: "POST",
            body: formData,
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {
                alert(data.message);
                form.reset();
            } else {
                alert(data.error);
            }       
        })
        .catch(error => {
            alert("Something went wrong. Please try again.", error);
        });
    } else {
        alert("Something went wrong. Please try again.");
    }
});
