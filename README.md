# Semantic Portfolio Website

A responsive, multi-page personal portfolio built with semantic HTML5, CSS and vanilla JavaScript.

## Pages
- `index.html` — home page
- `about.html` — background and skills
- `projects.html` — sample project cards
- `contact.html` — keyboard-accessible contact form

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Personalize before submission
1. Replace `Your Name` and `YN` with your name and initials.
2. Update the email address in `contact.html`.
3. Replace sample project cards with your actual work and valid links.
4. Update the meta descriptions and Open Graph titles on each page.
5. Add your own domain to canonical URLs if you deploy the site.

## Accessibility features
- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Skip link to the main content.
- Correct heading hierarchy and page-specific document titles.
- Visible keyboard focus and logical tab order.
- Responsive navigation button with `aria-expanded` and `aria-controls`.
- Form labels explicitly associated with inputs, native validation, and autocomplete.
- Reduced-motion preference support.
- Sufficiently high-contrast text and controls.

## Contact form limitation
The form uses `mailto:` as a no-backend demonstration. It opens the visitor's default email application and does not provide reliable server-side message delivery. For a production site, connect a backend or trusted form provider, add server-side validation and spam protection, and publish a privacy notice.

## Lighthouse
The implementation is designed to support strong Accessibility and SEO scores. A guaranteed 100 score cannot be promised without auditing the deployed version in its actual environment. Run Lighthouse in Chrome on all four pages and fix any reported issues. Performance and best-practices scores can vary with hosting, browser extensions, and deployment configuration.
