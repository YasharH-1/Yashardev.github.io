// script.js

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute('href'); // Get the target section ID
      const targetElement = document.querySelector(targetId); // Find the target element
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start' // Align to the top of the section
        });
      }
    });
  });

  // Form submission with EmailJS
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission

      // Get form inputs
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      // Simple validation
      if (!name || !email || !message) {
        showMessage('Please fill out all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Send email using EmailJS
      sendEmail(name, email, message);
    });
  }

  // Function to validate email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Function to send email using EmailJS
  function sendEmail(name, email, message) {
    const spinner = document.querySelector('.loading-spinner');
    const messageDiv = document.querySelector('.message');

    // Show loading spinner
    spinner.style.display = 'block';
    messageDiv.textContent = ''; // Clear previous messages

    // Initialize EmailJS with your Public Key
    emailjs.init('nMF8vZecudTuqdEkx'); // Replace with your EmailJS Public Key

    // Send the email
    emailjs.send('service_kxj9uxs', 'template_kfpwkki', {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(function (response) {
      // Hide spinner and show success message
      spinner.style.display = 'none';
      showMessage('Message sent successfully!', 'success');
      contactForm.reset(); // Clear the form
    }, function (error) {
      // Hide spinner and show error message
      spinner.style.display = 'none';
      showMessage('Failed to send message. Please try again later.', 'error');
      console.error('EmailJS Error:', error);
    });
  }

  // Function to show messages
  function showMessage(text, type) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
  }

  // Add hover effects to skill cards (optional)
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check for saved dark mode preference in localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    const isDarkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
    darkModeToggle.textContent = isDarkModeEnabled ? '☀️' : '🌙';
  });
});