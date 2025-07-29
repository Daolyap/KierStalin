document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const initScreen = document.getElementById('initialization-screen');
    const initTextElement = document.getElementById('init-text');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const enterButton = document.getElementById('enter-button');
    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    const allContentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Core Functions ---

    /**
     * Simulates a typewriter effect for a given element.
     * @param {HTMLElement} element - The element to display the text in.
     * @param {string} text - The text to type out.
     * @param {function} onComplete - Callback function to run after typing is finished.
     */
    function typewriter(element, text, onComplete) {
        let i = 0;
        element.innerHTML = ""; // Clear existing text
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 50); // Typing speed
    }

    /**
     * Reveals the main content of the site with a staggered animation.
     */
    function revealSite() {
        initScreen.classList.add('hidden'); // Hide the initialization screen
        
        mainHeader.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        document.getElementById('socials').classList.remove('hidden');

        // Scroll to top to ensure user sees the header
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Staggered fade-in for content sections
        let delay = 300; // ms
        allContentSections.forEach((section) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, delay);
            delay += 200;
        });
    }

    /**
     * Sets the theme based on user preference or system setting.
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    /**
     * Handles the theme toggle button click.
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    /**
     * Initializes smooth scrolling for navigation links.
     */
    function initSmoothScroll() {
        document.querySelectorAll('a.nav-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // --- Initialization Sequence ---

    // 1. Set the initial theme
    initializeTheme();

    // 2. Start the typewriter effect
    const initText = "System check... OK. Loading modules...";
    typewriter(initTextElement, initText, () => {
        // 3. Once typing is done, show and fill the progress bar
        progressBarContainer.classList.remove('hidden');
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
    });

    // 4. When progress bar animation ends, show the 'Enter' button
    progressBar.addEventListener('transitionend', () => {
        enterButton.classList.remove('hidden');
    });

    // 5. Add event listeners for buttons and navigation
    enterButton.addEventListener('click', revealSite);
    themeToggle.addEventListener('click', toggleTheme);
    initSmoothScroll();
});