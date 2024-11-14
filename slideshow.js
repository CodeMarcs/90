let currentSlide = 0; // Tracks the current slide index
const slides = document.querySelectorAll('.slide'); // All slides in the slideshow
const totalSlides = slides.length; // Total number of slides

// Function to show the selected slide
function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  
  // Show the current slide
  slides[index].classList.add('active');
}

// Function to move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
  showSlide(currentSlide); // Update the slide position
}

// Function to move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop back to the last slide
  showSlide(currentSlide); // Update the slide position
}

// Initialize the first slide when the page loads
showSlide(currentSlide);
