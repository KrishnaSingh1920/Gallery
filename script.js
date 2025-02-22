const frame = document.querySelector('.frame');
const h3 = document.querySelector('h3');
const images = [
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo1.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo2.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo3.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo4.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo5.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo6.jpg')",
    "url('https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo7.jpg')"
];
const imageLinks = [
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo1.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo2.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo3.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo4.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo5.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo6.jpg',
    'https://raw.githubusercontent.com/KrishnaSingh1920/Gallery/refs/heads/main/Images/Logo7.jpg'
];

let currentIndex = 0;

function preloadImages(imageUrls) {
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url; 
        
    });
}


preloadImages(imageLinks);

// You can also add event listeners to check if the images have loaded
window.onload = function() {
    preloadImages(imageLinks); // Preload images
    frame.style.backgroundImage = images[currentIndex]; // Set first image as background
    updateFrame(); // Update the text for the first image
    console.log('All images are preloaded and ready to use!');
};

function updateFrame() {
    frame.style.backgroundImage = images[currentIndex];
    h3.style.opacity = 0;
    setTimeout(() => {
        h3.textContent = `${currentIndex + 1} of ${images.length}`;
        h3.style.opacity = 1;
    }, 200);
}

document.getElementById('forward').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    frame.style.backgroundImage = images[currentIndex];
    updateFrame();
});

document.getElementById('backward').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    frame.style.backgroundImage = images[currentIndex];
    updateFrame();
});

// Swipe functionality
let startX = 0;
let endX = 0;

frame.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

frame.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const diffX = endX - startX;
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
            // Swipe right: Move to the previous image
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
            // Swipe left: Move to the next image
            currentIndex = (currentIndex + 1) % images.length;
        }
        frame.style.backgroundImage = images[currentIndex];
        updateFrame();
    }
}
