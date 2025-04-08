// homeAnimation.js

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up the columns for the falling characters.
// Each column will be 20 pixels wide.
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Create an array with one drop per column (each drop is a vertical position)
const drops = Array(columns).fill(0);

// Characters to display; you can choose any set of ASCII symbols or letters.
const asciiChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";

// The drawing function for the animation
function draw() {
    // Semi-transparent black background to create fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text styling for the ASCII rain effect
    ctx.fillStyle = "#0F0"; // Green color
    ctx.font = `${fontSize}px monospace`;

    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = asciiChars.charAt(Math.floor(Math.random() * asciiChars.length));
        // x coordinate = i*fontSize, y coordinate = drop position * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Random reset to create a falling effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment Y coordinate for the next frame.
        drops[i]++;
    }

    requestAnimationFrame(draw);
}

// Start the animation loop
draw();

// Update canvas dimensions on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
