// asciiRunner.js

export function initAsciiRunner(containerId) {
    const container = document.getElementById(containerId);

    // Create the canvas for the game
    container.innerHTML = '<canvas id="asciiRunnerCanvas"></canvas>';
    const canvas = document.getElementById("asciiRunnerCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.font = "20px monospace";

    // Game variables
    let playerX = 50;
    let playerY = canvas.height - 40; // ground level
    let jumpVelocity = 0;
    let jumpCount = 0;  // allow up to two jumps (double jump)
    let obstacles = [];  // array to store obstacles; each obstacle will have { x, y, passed }
    let score = 0;
    let gameSpeed = 2;

    // Color settings
    const bgColor = "#111";        // dark background
    const playerColor = "#1a73e8";  // deep blue for the player (@)
    const obstacleColor = "#e84545"; // red for obstacles (#)
    const scoreColor = "#ffffff";  // white for score

    // Jump event: allow double jump using the spacebar
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            if (jumpCount < 2) {
                jumpVelocity = jumpCount === 0 ? -12 : -10;
                jumpCount++;
            }
        }
    });

    function gameLoop() {
        // Paint the dark background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update player position (gravity and jump physics)
        if (playerY < canvas.height - 40 || jumpVelocity < 0) {
            playerY += jumpVelocity;
            jumpVelocity += 0.5;
        } else {
            playerY = canvas.height - 40;
            jumpVelocity = 0;
            jumpCount = 0;
        }

        // Draw the player (@)
        ctx.fillStyle = playerColor;
        ctx.fillText("@", playerX, playerY);

        // Update obstacles: move them left and remove if off-screen
        obstacles = obstacles.map(obstacle => ({...obstacle, x: obstacle.x - gameSpeed}));
        if (obstacles.length && obstacles[0].x < -20) obstacles.shift();

        obstacles.forEach(obstacle => {
            ctx.fillStyle = obstacleColor;
            ctx.fillText("#", obstacle.x, obstacle.y);
        });

        // Generate new obstacle with a chance, add a 'passed' flag
        if (Math.random() < 0.02) {
            obstacles.push({ x: canvas.width, y: canvas.height - 40, passed: false });
        }

        // Check if the player has successfully passed an obstacle to increase score
        obstacles.forEach(obstacle => {
            if (!obstacle.passed && obstacle.x + 20 < playerX) {
                obstacle.passed = true;
                score++;
            }
        });

        // Collision detection: if player is too low when an obstacle is near
        obstacles.forEach(obstacle => {
            if (
                obstacle.x < playerX + 20 &&
                obstacle.x > playerX - 20 &&
                playerY > canvas.height - 60
            ) {
                resetGame();
            }
        });

        // Display the score on the top left
        ctx.fillStyle = scoreColor;
        ctx.fillText("Score: " + score, 10, 30);

        requestAnimationFrame(gameLoop);
    }

    function resetGame() {
        playerY = canvas.height - 40;
        jumpVelocity = 0;
        jumpCount = 0;
        obstacles = [];
        score = 0;
    }

    gameLoop();
}
