document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const initScreen = document.getElementById('initialization-screen');
    const matrixTitleContainer = document.getElementById('matrix-title');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const enterButton = document.getElementById('enter-button');
    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    const allContentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Core Functions ---

    /**
     * Creates a matrix-style decoding animation for a string.
     * @param {HTMLElement} container - The element to display the animation in.
     * @param {string} finalString - The string to decode to.
     * @param {function} onComplete - Callback function to run after animation is finished.
     */
    function matrixDecodeEffect(container, finalString, onComplete) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&?#@$';
        const revealDelay = 100; // ms delay between revealing each character
        const scrambleDuration = 1000; // ms duration for each character's scramble effect

        container.innerHTML = ''; // Clear container
        const finalChars = finalString.split('');
        
        finalChars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : ''; // Handle spaces
            container.appendChild(span);

            if (char === ' ') return; // Don't animate spaces

            // Delay the start of each character's animation
            setTimeout(() => {
                const scrambleInterval = setInterval(() => {
                    span.textContent = chars[Math.floor(Math.random() * chars.length)];
                }, 50);

                // After the scramble duration, reveal the final character
                setTimeout(() => {
                    clearInterval(scrambleInterval);
                    span.textContent = char;
                    span.classList.add('settled');
                }, scrambleDuration);

            }, index * revealDelay);
        });

        // Trigger the onComplete callback after the entire animation is done
        const totalDuration = (finalChars.length - 1) * revealDelay + scrambleDuration;
        setTimeout(onComplete, totalDuration);
    }

    /**
     * Reveals the main content of the site with a staggered animation.
     */
    function revealSite() {
        initScreen.classList.add('hidden');
        mainHeader.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        document.getElementById('socials').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        let delay = 300;
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
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
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

    // 2. Start the matrix decode animation
    matrixDecodeEffect(matrixTitleContainer, "DEVIOUS.WORK", () => {
        // 3. Once animation is complete, show and fill the progress bar
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