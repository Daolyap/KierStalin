# Documentation: main.js

## 1. File Summary

`main.js` is the engine that drives all interactivity and dynamic effects on the "Devious.work" website. It is written in vanilla JavaScript and is fully self-contained with no external libraries. Its primary responsibilities include managing the initialization sequence, handling user interactions (button clicks), controlling the theme, and enabling smooth navigation.

---

## 2. Current Features

-   **Initialization Sequence**: The script orchestrates a multi-step loading sequence when the page is first visited:
    1.  It immediately sets the color theme based on user's `localStorage` or system preference.
    2.  It triggers the `matrixDecodeEffect` function to animate the "DEVIOUS.WORK" title.
    3.  Upon completion of the title animation, it reveals and fills a progress bar.
    4.  Once the progress bar is full, it reveals the "[ ENTER ]" button.
-   **Site Reveal**: On clicking the enter button, the script hides the initialization screen and gracefully reveals the main header, content, and footer.
-   **Staggered Content Animation**: After revealing the site, it adds a `.visible` class to each `.content-section` with a slight delay between each one, creating an elegant staggered fade-in effect.
-   **Theme Management**:
    -   `initializeTheme()`: Checks for a theme preference in `localStorage`. If none is found, it respects the user's OS-level preference (`prefers-color-scheme`).
    -   `toggleTheme()`: Listens for clicks on the `#theme-toggle` button, switches the `data-theme` attribute on the `<html>` element, and saves the new preference to `localStorage`.
-   **Smooth Scrolling**: The `initSmoothScroll()` function attaches click listeners to all navigation links (`.nav-link`) and uses `scrollIntoView({ behavior: 'smooth' })` to provide a smooth scrolling experience instead of an instant jump.

---

## 3. Key Functions

-   **`DOMContentLoaded` Event Listener**: The entire script is wrapped in this listener to ensure the DOM is fully loaded before any code executes.
-   **`matrixDecodeEffect(container, finalString, onComplete)`**:
    -   Animates a string to look like it's being decoded.
    -   It dynamically creates `<span>` elements for each character and uses `setInterval` to rapidly change their content before settling on the final letter.
    -   Accepts a callback function (`onComplete`) which is crucial for chaining it into the initialization sequence.
-   **`revealSite()`**: Handles the transition from the loading screen to the main site. It is responsible for changing element visibility and triggering the staggered content animation.
-   **`initializeTheme()` & `toggleTheme()`**: A modular pair of functions that handle all logic related to the light/dark mode, making the theme system persistent and automatic.
-   **`initSmoothScroll()`**: Encapsulates the smooth scroll functionality, keeping the code organized.

---

## 4. Dependencies

-   This script operates on the DOM structure defined in `index.html`.
-   It relies on the CSS classes and IDs defined in `style.css` to control visibility (`.hidden`), trigger animations (`.visible`), and manage themes (`[data-theme]`).

---

## 5. Maintainability Notes

-   **Changing Animation Timings**:
    -   The matrix effect speed can be changed by adjusting `revealDelay` and `scrambleDuration` inside the `matrixDecodeEffect` function.
    -   The staggered content fade-in speed can be adjusted by changing the `delay` variable inside the `revealSite` function.
-   **Adding New Interactive Elements**: If a new interactive element is added to `index.html`, its corresponding event listener and logic should be added within the main `DOMContentLoaded` callback to maintain structure.
-   **Disabling Animations**: To disable an animation for debugging, you can comment out the call to the relevant function (e.g., `matrixDecodeEffect`) and directly invoke its `onComplete` callback to proceed to the next step in the sequence.