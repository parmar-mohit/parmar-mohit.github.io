
# Mohit's Terminal Portfolio

Welcome to Mohit Parmar's interactive terminal-themed personal portfolio website. This project showcases skills, projects, experience, and more, all wrapped in a retro-hacker aesthetic.

## Project Overview

This portfolio is built as a modern web application designed to be engaging and reflective of a developer's passion for technology. It features a unique terminal-style interface, animated elements, and a responsive design to ensure a great user experience across devices. The content is largely data-driven, with key information externalized into JSON files for easier management.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/), Custom SVGs
*   **Fonts**: Geist Sans & Geist Mono (from `geist/font`)
*   **Deployment**: Intended for Firebase Hosting (though can be deployed on any Next.js compatible platform like Vercel)

## Folder Structure

The project follows a standard Next.js App Router structure with some conventions for organization:

```
.
├── public/                 # Static assets (images, resume.pdf etc.)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/         # Main application routes (layout, pages)
│   │   │   ├── about/
│   │   │   ├── blogs/
│   │   │   ├── certificates/
│   │   │   ├── connect/
│   │   │   ├── courses/
│   │   │   ├── education/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   └── page.tsx    # Home page
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles & Tailwind directives
│   │   └── not-found.tsx   # Custom 404 page
│   ├── components/
│   │   ├── client/         # Client-side specific components (e.g., InteractiveTerminal)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── sections/       # Larger page sections (e.g., HeroSection, SkillsGrid, TimelineDisplay)
│   │   └── ui/             # ShadCN UI components (Button, Card, etc.)
│   ├── data/               # Externalized JSON data files
│   │   ├── aboutMe.json
│   │   ├── blogPosts.json
│   │   ├── certificates.json
│   │   ├── courses.json
│   │   ├── education.json
│   │   ├── experience.json
│   │   ├── mainNavLinks.json
│   │   ├── pageSnippets.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── socialLinks.json # Serves as contact.json
│   ├── hooks/              # Custom React hooks (e.g., useToast, useMobile)
│   ├── lib/                # Utility functions, constants, icon mappings
│   │   ├── commandProcessor.tsx # Logic for the interactive terminal
│   │   ├── constants.ts    # Type definitions and data imports from /data
│   │   ├── icon-map.tsx    # Mapping for icons
│   │   └── utils.ts        # General utility functions (e.g., cn for classnames)
│   └── ...                 # Other configuration files (next-env.d.ts, etc.)
├── .env                    # Environment variables (empty as AI features are removed)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## How JSON Data Files Drive Content

Most of the repeatable content on the site (projects, skills, blog posts, timeline entries, navigation links, contact info, etc.) is externalized into JSON files located in the `/src/data/` directory.

*   **Data Centralization**: This approach keeps content separate from the component logic, making it easier to update information without digging into React components.
*   **Loading**: These JSON files are imported into `src/lib/constants.ts`, which then re-exports the data along with their TypeScript type definitions. Components and pages across the application import data from `constants.ts`.
*   **Build-Time Inclusion**: Since the JSON files are imported directly, Next.js includes their content in the build, making it available at runtime without requiring client-side fetching for initial display.
*   **Graceful Fallbacks**: Components that render lists of data (e.g., projects, skills, experience, education, courses, certificates, blogs) are designed to check if the data array is empty. If so, they display a user-friendly message like "No projects to display yet" instead of crashing or showing an empty section. This ensures a robust user experience even if some data sections are not yet populated.

**Example Data Format (`src/data/projects.json`):**
```json
[
  {
    "id": "project-alpha",
    "title": "AI-Powered Code Reviewer",
    "description": "A tool that leverages machine learning...",
    "imageUrls": ["https://placehold.co/1200x600.png"],
    "techTags": ["Python", "ML", "Flask"],
    "fullTechStack": ["Python", "TensorFlow", "Flask", "Docker"],
    "whyIBuiltThis": "To explore AI applications...",
    "githubUrl": "https://github.com/mohitparmar/project-alpha",
    "liveDemoUrl": "https://project-alpha.mohit.dev",
    "dataAiHint": "code editor project"
  }
  // ... more projects
]
```

**Example Data Format (`src/data/mainNavLinks.json`):**
```json
[
  { "href": "/", "label": "Home", "iconName": "User" },
  { "href": "/about", "label": "About", "iconName": "User" }
  // ... more links
]
```
Each JSON file has a specific structure tailored to the content it holds. Refer to the type definitions in `src/lib/constants.ts` for the exact structure of each data type. Adding or removing entries in these JSON files and rebuilding the application will automatically update the site content.

## Key Architectural Decisions

*   **Next.js App Router**: Utilizes the App Router for server components, nested layouts, and improved routing.
*   **Server and Client Components**: A mix of Server Components (for data fetching and static rendering where possible) and Client Components (for interactivity, hooks, and browser APIs) is used. The `'use client';` directive marks client boundaries. Particular care is taken to ensure client-side utilities (like `getIcon`) are only invoked within client components.
*   **ShadCN UI & Tailwind CSS**: Provides a set of pre-built, accessible UI components that are styled using Tailwind CSS utility classes, allowing for rapid development and customization. The theme is managed via CSS variables in `src/app/globals.css`.
*   **Data Externalization**: Content is primarily managed via JSON files in `/src/data`, imported at build time via `src/lib/constants.ts`. This simplifies content updates and ensures type safety.
*   **Icon System**: `lucide-react` is used for most icons. A custom `src/lib/icon-map.tsx` utility (`getIcon`) allows mapping string names (used in JSON data and components) to actual icon components, facilitating data-driven icon rendering. This is crucial for passing icon information from Server to Client Components correctly.
*   **Interactive Terminal**: A custom client-side terminal component (`src/components/client/interactive-terminal.tsx`) simulates a command-line interface, processing commands defined in `src/lib/commandProcessor.tsx`. It uses placeholder data from `constants.ts` for its context.
*   **Timeline Display**: A reusable `TimelineDisplay` component (`src/components/sections/timeline-display.tsx`) is used for presenting chronological data like work experience and education in a visually consistent manner.
*   **Theming**: The dark, terminal-inspired theme is primarily controlled by CSS custom properties (variables) in `src/app/globals.css`, which are then used by Tailwind CSS and ShadCN components. Effects like Matrix rain and CRT scanlines are also managed here.

## Local Development

1.  **Prerequisites**:
    *   Node.js (LTS version recommended)
    *   npm or yarn

2.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Set up Environment Variables (Optional)**:
    *   The `.env` file is gitignored and is no longer strictly needed as AI features requiring API keys have been removed. However, it's good practice to keep it for potential future integrations.

5.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically start on `http://localhost:9002` (as per the `dev` script in `package.json`).

## Firebase Hosting Deployment (Example)

While this project uses local JSON for content, it can be deployed to Firebase Hosting. For dynamic content updates without rebuilds using Firebase, you'd typically integrate Firestore.

**Steps for Static Deployment to Firebase Hosting:**

1.  **Install Firebase CLI**:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project**:
    ```bash
    firebase init hosting
    ```
    *   Select an existing Firebase project or create a new one.
    *   Set your public directory to `out` (for static Next.js export).
    *   Configure as a single-page app: No (unless specifically needed).
    *   Set up automatic builds and deploys with GitHub: Optional.

4.  **Build the Next.js app for static export**:
    *   Modify `next.config.ts` to add `output: 'export',` if not already present for static sites.
    *   Run:
        ```bash
        npm run build
        ```
        This will generate the static site in the `out` directory.

5.  **Deploy to Firebase Hosting**:
    ```bash
    firebase deploy --only hosting
    ```

**For Next.js SSR/ISR with Firebase Functions (more advanced):**
Refer to Firebase documentation for deploying Next.js applications using Cloud Functions for SSR capabilities. This is more complex than static hosting.

## Troubleshooting Common Issues

*   **Module Not Found (e.g., `geist/font`)**: Ensure all dependencies in `package.json` are installed by running `npm install` or `yarn install`.
*   **Client/Server Component Errors**:
    *   "Attempted to call X() from the server but X is on the client": This is a common error in Next.js App Router. Ensure functions or components intended for client-side execution are in files marked with `'use client';` or are only called from such components. Avoid passing non-serializable props (like functions or component instances) from Server to Client Components directly; pass data (like icon names as strings) instead, and resolve them to components on the client side (e.g., using `src/lib/icon-map.tsx`).
    *   Ensure that any component directly calling client-side hooks (`useState`, `useEffect`, etc.) or browser APIs is marked with `'use client';`.
*   **Styling Issues**: Clear browser cache. Ensure Tailwind CSS is processing files correctly (check `tailwind.config.ts` content paths). Verify CSS variable definitions in `src/app/globals.css`.
*   **Data Not Appearing**: Verify JSON file paths in `src/lib/constants.ts` are correct. Check the JSON file for syntax errors. Ensure the component rendering the data correctly handles empty arrays by displaying a fallback UI.
*   **Environment Variables Not Loaded**: If using a `.env` file, ensure it's in the project root and Next.js is restarted after changes.
*   **Hydration Errors**: These occur when server-rendered HTML differs from the initial client-side render. Defer operations producing different values (e.g., `Math.random()`, `new Date()`) or using browser-specific APIs (`window`, `localStorage`) to a `useEffect` hook.

## Responsiveness Guidelines & Breakpoint Notes

*   **Approach**: The site uses Tailwind CSS, which is a utility-first framework. Responsiveness is achieved using Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`, `xl:`).
*   **Key Breakpoints** (default Tailwind, can be customized in `tailwind.config.ts`):
    *   `sm`: 640px
    *   `md`: 768px
    *   `lg`: 1024px
    *   `xl`: 1280px
    *   `2xl`: 1536px
*   **Testing**: Use browser developer tools to test responsiveness across different screen sizes. Pay attention to:
    *   Navigation (desktop vs. mobile menu).
    *   Grid layouts (e.g., project cards, skill grids, page snippets).
    *   Text readability and wrapping.
    *   Image scaling and containment (e.g., GitHub/LeetCode widgets).
    *   Terminal widget usability on smaller screens.
*   **Considerations**:
    *   Use Flexbox and CSS Grid for layout foundations.
    *   Ensure interactive elements have sufficient touch target sizes on mobile.
    *   Optimize images for different screen sizes if necessary (though `next/image` handles much of this).
    *   The `InteractiveTerminal` component is designed to be responsive but complex interactions might be better on larger screens.

## Future Recommendations

*   **True Dynamic Content**: Integrate Firebase Firestore (or another DB) for managing projects, blog posts, etc., allowing runtime updates without needing to rebuild the site. This would be a significant upgrade from the current JSON-based system.
*   **Terminal Enhancements**: Expand the interactive terminal with more commands, games, or more sophisticated natural language processing (if AI features are reintroduced).
*   **Advanced Animations**: Explore libraries like Framer Motion for more complex page transitions or component animations if desired.
*   **Accessibility (A11y)**: Conduct a thorough accessibility audit and implement improvements (e.g., ARIA attributes, keyboard navigation enhancements).
*   **Performance Optimization**: Further optimize image loading, code splitting, and reduce JavaScript bundle sizes as the application grows.
*   **Contact Form**: Re-implement a functional contact form (e.g., using Firebase Functions or a third-party service) if direct email is not preferred. The current Connect page relies on direct links.
*   **Code Splitting for JSON**: For very large JSON files, consider strategies for code-splitting or dynamic imports if initial load times become an issue (though Next.js handles this well for reasonable sizes).

This `README.md` should serve as a good guide for understanding and developing the project.
