# Documentation: index.html

## 1. File Summary

`index.html` is the structural backbone of the "Devious.work" static landing page. It uses semantic HTML5 to define the content and layout of the website, ensuring accessibility and search engine optimization (SEO). The document is divided into two main parts: an initial loading/animation screen and the main site content, which includes a header, several content sections, and a footer.

---

## 2. Current Features

-   **Meta Tags**: Includes comprehensive meta tags for SEO, social media sharing (Open Graph and Twitter Cards), and viewport configuration for responsiveness.
-   **Font Integration**: Links to Google Fonts for the 'VT323' monospace font, which is crucial for the site's retro aesthetic.
-   **CRT Overlay**: A `div` with the class `crt-overlay` is placed at the beginning of the `<body>` to create a site-wide retro monitor effect (scanlines, flicker).
-   **Initialization Screen (`#initialization-screen`)**:
    -   A full-page container that is shown on first load.
    -   Contains a `div` (`#matrix-title`) where the "DEVIOUS.WORK" matrix decoding animation is rendered by `main.js`.
    -   Includes a progress bar (`#progress-bar-container`) and an enter button (`#enter-button`) that appear sequentially after the initial animation.
-   **Main Site Structure (Initially Hidden)**:
    -   **Header (`#main-header`)**: Contains the primary navigation (`<nav>`) with links that allow smooth scrolling to different sections. It also includes the theme toggle button.
    -   **Main Content (`#main-content`)**: A wrapper for the primary sections of the page.
        -   **About Section (`#about`)**: A brief introduction to the website.
        -   **Subdomains Section (`#subdomains`)**: A list of curated links to related projects on subdomains.
        -   **Portfolio Section (`#portfolio`)**: A grid layout (`portfolio-grid`) showcasing individual projects with titles, descriptions, and status indicators.
    -   **Footer (`#socials`)**: Contains links to social media profiles and a footer credit.

---

## 3. Key Sections & IDs

-   `#initialization-screen`: The entry point of the user experience. Its visibility is controlled by `main.js`.
-   `#matrix-title`: The target container for the JavaScript-driven title animation.
-   `#main-header`, `#main-content`, `#socials`: The three primary containers for the site's content. They are hidden by default and revealed by `main.js` after the user clicks the enter button.
-   `.content-section`: A class applied to all major content blocks (`#about`, `#subdomains`, etc.) to standardize styling and enable staggered JavaScript animations.
-   `.nav-link`: Class for navigation links, used by `main.js` to enable smooth scrolling.
-   `#theme-toggle`: The button used to switch between light and dark color schemes.

---

## 4. Dependencies

-   **`style.css`**: Provides all styling, layout, and visual effects. Linked in the `<head>`.
-   **`main.js`**: Controls all interactivity, animations, and the transition from the initialization screen to the main content. Linked at the end of the `<body>`.

---

## 5. Maintainability Notes

-   **Adding a New Section**: To add a new content section, create a new `<section>` element within `#main-content`. Give it a unique ID and the class `content-section`. Add a corresponding link in the `<nav>` element in `#main-header` to enable smooth scrolling. The staggered animation will apply automatically.
-   **Updating Portfolio**: To add a new portfolio piece, duplicate a `div` with the class `portfolio-item` within the `.portfolio-grid`. Update the `<h3>`, `<p>`, and `.item-status` content.
-   **Managing Subdomains**: The list in the `#subdomains` section is manually curated. To add or remove a link, simply edit the `<ul>` element.```