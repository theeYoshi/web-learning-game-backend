// drawingGame.js

// The initDrawingGame function sets up a canvas in the given container
// and starts a simple animation with a bouncing ball.
export function initDrawingGame(containerId) {
    const container = document.getElementById(containerId);

    // Clear container in case something is already there
    container.innerHTML = '<canvas id="gameCanvas"></canvas>';
    const canvas = document.getElementById('gameCanvas');

    // Set canvas dimensions to fill the container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');

    // Initial parameters for the ball
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let vx = 3;
    let vy = 3;
    const radius = 20;

    // Animation loop: clear, update position, and draw the ball
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Bounce off the walls
        if (x + radius > canvas.width || x - radius < 0) {
            vx = -vx;
        }
        if (y + radius > canvas.height || y - radius < 0) {
            vy = -vy;
        }

        x += vx;
        y += vy;

        // Draw the ball
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#007BFF';
        ctx.fill();
        ctx.closePath();

        // Continue the animation
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
}
