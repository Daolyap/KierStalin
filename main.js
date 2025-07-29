// main.js
document.addEventListener('DOMContentLoaded', () => {
    const initScreen = document.getElementById('initialization-screen');
    const progressBar = document.getElementById('progress-bar');
    const enterButton = document.getElementById('enter-button');
    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    const socials = document.getElementById('socials');
    const themeToggle = document.getElementById('theme-toggle');

    // Initialization sequence
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);

    progressBar.addEventListener('transitionend', () => {
        enterButton.classList.remove('hidden');
    });

    enterButton.addEventListener('click', () => {
        initScreen.classList.remove('active');
        mainHeader.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        socials.classList.remove('hidden');
        
        setTimeout(() => {
             mainHeader.style.opacity = '1';
             mainContent.style.opacity = '1';
             socials.style.opacity = '1';
        }, 50)
    });

    // Theme toggling
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});