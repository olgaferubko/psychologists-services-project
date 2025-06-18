# Psychologists Services

## What is Psychologists Services?
Psychologists Services is a web application designed for a company offering access to professional psychologists. Users can browse a list of specialists, sort them by various criteria, add favorites, and book personal consultations. The app features a clean, responsive interface, user authentication, and persistent storage of user preferences.

## Key Features:
- Modern home page with project title, company slogan, and a clear call-to-action
- "Psychologists" page with a list of specialists, sortable by:
  - Alphabetical order (A-Z or Z-A)
  - Price (lowest to highest or vice versa)
  - Rating (lowest to highest or vice versa)
- Private "Favorites" page with saved psychologists
- Modals for Login, Registration, and Appointment forms with validation (react-hook-form & yup)
- Firebase Authentication: sign up, log in, log out, current user data
- Firebase Realtime Database for storing psychologist profiles
- "Heart" button to add/remove psychologists to/from favorites (with UI color change)
- "Read more" button to expand the card with full info and reviews
- "Make an appointment" button to open a booking form modal
- Favorites persist after page reload (localStorage)


## Tech Stack:
- React + Vite (build tool)
- React Router for navigation
- Firebase Authentication & Realtime Database
- React Hook Form + Yup for form handling & validation
- CSS Modules
- Redux for state management

## Pages and Routes

- `/` — Home page with a welcome message and CTA
- `/psychologists` — List of psychologists with filters and pagination
- `/favorites` — Private page with favorite psychologists (authenticated users only)

## How It Works:
Psychologist data is fetched from Firebase Realtime Database with a "Load more" button for pagination.  
Favorites are stored per user (if logged in) or in localStorage.  
Authentication is powered by Firebase (Email/Password).  
Modal forms (auth, appointment) include required field validation and can be closed via backdrop, Esc key, or close icon.

## Getting Started:
```bash
Clone the repository: 
git clone <your-repo-url>

Install dependencies: 
npm install

Run locally: 
npm run dev

Build for production: 
npm run build
```

## About Me:
Hi! I’m Olga Ferubko, a Front-End Developer passionate about crafting intuitive and responsive user interfaces. I’m constantly leveling up my skills in JavaScript and React and enjoy writing clean, maintainable code.

Feel free to connect with me:

GitHub: https://github.com/olgaferubko

Email: ferubko.olga@gmail.com

LinkedIn: https://www.linkedin.com/in/olga-ferubko/

Check it out:
Deployed and live here: https://psychologists-services-project.vercel.app/