document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const gameContainer = document.getElementById('gameContainer');
    const challengeDiv = document.getElementById('challenge');
    const submitBtn = document.getElementById('submitBtn');
    const answerInput = document.getElementById('answer');
    const feedbackDiv = document.getElementById('feedback');

    startBtn.addEventListener('click', () => {
        // Hide the hero section and show the game container
        document.querySelector('.hero').classList.add('hidden');
        gameContainer.classList.remove('hidden');
        fetchChallenge();
    });

    submitBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        // For prototype purposes: using "test" as the expected answer
        if (userAnswer === 'test') {
            feedbackDiv.textContent = 'Correct!';
        } else {
            feedbackDiv.textContent = 'Try again!';
        }
    });

    function fetchChallenge() {
        // Fetch challenge from the backend API endpoint
        fetch('/api/challenge')
            .then(response => response.json())
            .then(data => {
                challengeDiv.textContent = data.question || 'Default challenge text.';
            })
            .catch(error => {
                console.error('Error fetching challenge:', error);
                challengeDiv.textContent = 'Error loading challenge.';
            });
    }
});
