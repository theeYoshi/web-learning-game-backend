// asciiRunner.js

// Export the init function for the ASCII Runner game
export function initAsciiRunner(containerId) {
    const container = document.getElementById(containerId);

    // Insert a canvas element for the game
    container.innerHTML = '<canvas id="asciiRunnerCanvas"></canvas>';
    const canvas = document.getElementById("asciiRunnerCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to fill container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.font = "20px monospace";

    // Game variables
    let playerX = 50;
    let playerY = canvas.height - 40; // initial ground level
    let jumpVelocity = 0;
    let isJumping = false;
    let obstacles = [];  // Array to store obstacles

    // Game loop variables
    let gameSpeed = 2;

    // Listen for key events for jump (spacebar)
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" && !isJumping) {
            isJumping = true;
            jumpVelocity = -10;
        }
    });

    // Main game loop
    function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update player position (simulate jump physics)
        if (isJumping) {
            playerY += jumpVelocity;
            jumpVelocity += 0.5; // gravity effect
            // Reset jump when player lands on ground
            if (playerY >= canvas.height - 40) {
                playerY = canvas.height - 40;
                isJumping = false;
                jumpVelocity = 0;
            }
        }

        // Draw the player (@ character)
        ctx.fillStyle = "#007BFF";
        ctx.fillText("@", playerX, playerY);

        // Update and draw obstacles (represented by "#")
        // Move obstacles leftwards
        obstacles = obstacles.map(obstacle => ({...obstacle, x: obstacle.x - gameSpeed}));
        // Remove obstacles that have moved off-screen
        if (obstacles.length && obstacles[0].x < -20) obstacles.shift();

        obstacles.forEach(obstacle => {
            ctx.fillStyle = "#FF0000";
            ctx.fillText("#", obstacle.x, obstacle.y);
        });

        // Randomly generate a new obstacle
        if (Math.random() < 0.02) {
            obstacles.push({ x: canvas.width, y: canvas.height - 40 });
        }

        // Simple collision detection
        obstacles.forEach(obstacle => {
            // If obstacle is near the player horizontally and player is low (not jumping high enough)
            if (
                obstacle.x < playerX + 20 &&
                obstacle.x > playerX - 20 &&
                playerY > canvas.height - 60
            ) {
                // Collision detected: reset game
                resetGame();
            }
        });

        requestAnimationFrame(gameLoop);
    }

    // Reset function to restart the game after a collision
    function resetGame() {
        playerY = canvas.height - 40;
        isJumping = false;
        jumpVelocity = 0;
        obstacles = [];
        // Optionally you could add a “Game Over” message here.
    }

    // Start the game loop
    gameLoop();
}
