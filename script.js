document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.querySelector('.animation-container');
    const logoAnimation = document.querySelector('.logo-animation');

    // Remove animation container after 2 seconds
    setTimeout(() => {
        animationContainer.classList.add('hidden');
    }, 2000); // 2 seconds
});