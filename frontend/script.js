document.addEventListener('DOMContentLoaded', () => {
    const drawingGameBtn = document.getElementById('drawingGameBtn');
    const asciiRunnerBtn = document.getElementById('asciiRunnerBtn');
    const gameContainer = document.getElementById('gameContainer');
    const hero = document.querySelector('.hero');

    drawingGameBtn.addEventListener('click', () => {
        hero.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        import('./games/drawingGame.js')
            .then(module => module.initDrawingGame('gameContainer'))
            .catch(err => console.error('Failed to load Drawing Game:', err));
    });

    asciiRunnerBtn.addEventListener('click', () => {
        hero.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        import('./games/asciiRunner.js')
            .then(module => module.initAsciiRunner('gameContainer'))
            .catch(err => console.error('Failed to load ASCII Runner:', err));
    });
});
