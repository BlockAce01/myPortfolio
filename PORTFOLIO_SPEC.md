my special interest is to QA, DevOps, AI

Project Goal:
Create a modern, single-page personal portfolio website for a software engineer named "Yugan Kavinda." The website should be fully responsive, feature both light and dark themes, and include interactive animations and 3D graphics to create a polished and professional user experience.
Core Technologies:
Framework: React (v19+) with TypeScript.
Styling: Tailwind CSS (loaded via CDN).
3D Graphics: Three.js, using @react-three/fiber and @react-three/drei.
Font: "Inter" from Google Fonts.
Setup: The project must run directly in the browser without a build step. Use an importmap in index.html to handle dependencies from a CDN.
Detailed Specifications:
1. HTML Setup (index.html)
Create a standard HTML5 document.
Add a link tag for the "Inter" Google Font.
Add a <script> tag for the Tailwind CSS CDN.
Import Map: Create a <script type="importmap"> to map the following libraries to CDN URLs: react, react-dom, three, @react-three/fiber, @react-three/drei.
Theme Persistence: Include a small script in the <head> to check localStorage and prefers-color-scheme to apply the 'dark' class to the <html> element on initial load. This prevents a "flash of unstyled content" (FOUC) when a user has dark mode enabled.
The <body> should have a root <div> with id="root" and load the main script (index.tsx) as a module.
2. Main Application Structure (App.tsx)
The main App component should wrap all page content inside a ThemeProvider.
It should render the following components in order: Header, HeroSection, AboutSection, ProjectsSection, ContactSection, and Footer.
Background Styling: Implement a subtle, full-page background effect. Use a combination of a faint grid pattern and a large, soft radial gradient positioned at the top-left, which changes color slightly for the dark theme.
Scroll Animations: Create a wrapper component (AnimatedSection) that uses the IntersectionObserver API. Any section wrapped in this component should smoothly fade in and slide up as it enters the viewport. This animation should only trigger once per section.
3. Component Breakdown:
Header.tsx:
A fixed header that is transparent initially but becomes semi-opaque with a backdrop blur and a subtle shadow when the user scrolls down.
It should contain the initials "YK." as a logo on the left.
On the right, include navigation links ("Home," "About," "Projects," "Contact") that smoothly scroll to the corresponding sections.
Include a theme toggle button with a sun/moon icon that switches between light and dark modes.
HeroSection.tsx (#home):
The section should be vertically centered on the screen.
Left Side (Desktop): A dynamic, interactive 3D object.
Use @react-three/fiber's <Canvas> to render the scene.
The 3D object should be a <TorusKnot>.
It should rotate slowly and continuously on its own.
Users should be able to orbit the object with their mouse (but not zoom or pan).
The color of the TorusKnot should be a shade of indigo, changing brightness/saturation to match the current light or dark theme.
Right Side (Desktop):
A main heading: "Hi, I'm Yugan Kavinda."
A sub-heading with a brief professional summary.
Two call-to-action buttons: "View My Work" (primary) and "Get In Touch" (outline style).
AboutSection.tsx (#about):
A section with the heading "About Me."
A centered block of text providing a more detailed professional summary.
Below the text, display a grid of skills. Each skill should be represented by a card containing an icon and the skill name. Use a generic, minimalist placeholder icon for all skills initially. The cards should have a subtle hover effect (e.g., lift up slightly).
ProjectsSection.tsx (#projects):
A section with the heading "My Projects."
Display projects in a responsive grid (2 columns on desktop, 1 on mobile).
Each project is a Card component with:
A header image that zooms in slightly on hover.
A title and description.
A list of technology tags, displayed as small, styled Badge components.
Footer buttons for "Live Demo" and "Source Code."
The project cards should fade in with a slight stagger effect as the section becomes visible.
ContactSection.tsx (#contact):
A simple, centered section with the heading "Get In Touch."
A short paragraph inviting collaboration.
A row of large, clickable social media icons (GitHub, LinkedIn, Twitter) that link to the respective profiles. The icons should scale up slightly on hover.
Footer.tsx:
A simple footer with a top border.
It should contain a copyright notice: "© [Current Year] Yugan Kavinda. All rights reserved."
4. Reusable UI Components (components/ui/)
Button.tsx: A flexible button component with variants for 'default' (solid color), 'outline', and 'ghost' styles.
Card.tsx: A set of composable card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
Badge.tsx: A small, rounded component for displaying project tags.
5. State Management & Data:
ThemeContext.tsx: Create a React Context to manage the theme state ('light' or 'dark'). The ThemeProvider should contain the logic to toggle the theme, update the <html> class, and save the preference to localStorage.
constants.tsx: Centralize all static data for the portfolio (project details, skills list, social media links) in this file. This makes the site easy to update.
types.ts: Define TypeScript interfaces for your data structures (Project, Skill, SocialLink).
6. Assets (favicon.svg)
Generate an SVG favicon that displays the initials "YK".
Use inline CSS within the SVG to make it theme-aware: it should have a light background/dark text in light mode, and a dark background/light text in dark mode, by using a @media (prefers-color-scheme: dark) query.
