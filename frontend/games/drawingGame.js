// drawingGame.js

export function initDrawingGame(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<canvas id="gameCanvas"></canvas>';
    const canvas = document.getElementById('gameCanvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');

    // Color settings to match the theme
    const bgColor = "#111";        // dark background
    const ballColor = "#1a73e8";     // deep blue for the ball

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let vx = 3;
    let vy = 3;
    const radius = 20;

    function animate() {
        // Fill the background with the themed dark color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Bounce logic for walls and ceiling/floor
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
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();

        requestAnimationFrame(animate);
    }

    animate();
}
