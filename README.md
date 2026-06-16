# Kamalesh S Portfolio

A personal portfolio website for Kamalesh S built with Node.js, Express, and a vanilla HTML/CSS/JS frontend.

## Project description

This project is a single-page portfolio website that highlights Kamalesh's engineering and business journey, skills, projects, and contact details. The site uses a modern industrial-tech design system with a blueprint-inspired hero background, sticky navigation, scroll reveal animations, and an Express backend.

## Setup instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000`

## Environment variables

- `PORT` — the server port (default: `3000`)

## Deploy online

This project is ready to deploy as a Node/Express web service.

### Recommended: Render

1. Push this project to a GitHub repository.
2. Go to [Render](https://render.com/) and sign in.
3. Click `New` > `Web Service`.
4. Connect your GitHub repository.
5. Render can use `render.yaml` automatically. If you enter settings manually, use:
   ```bash
   Build Command: npm install
   Start Command: npm start
   ```
6. Deploy the service.
7. Share the public URL Render gives you, usually like:
   ```text
   https://kamalesh-portfolio.onrender.com
   ```

Render's Express deployment guide confirms that Node web services can use commands like `npm install` and `npm start`, then become available at an `onrender.com` URL after deployment.

## Folder structure

```
kamalesh-portfolio/
├── server.js
├── package.json
├── render.yaml
├── .env
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── assets/
```

## Section breakdown

- `Hero` — blueprint grid, typewriter name, CTA buttons, animated counters
- `About` — profile placeholder, summary, trait chips
- `Journey` — vertical timeline with academic and career nodes
- `Skills` — engineering bars, management chips, tools grid
- `Projects` — work and initiative cards with current/in-progress styling
- `Contact` — contact cards, message form, inline validation
- `Footer` — simple copyright line

## Customization

Replace placeholder values in the following areas:

- `CGPA` placeholder in the journey timeline
- Final year project title and description
- `kamalesh280303@gmail.com` in the contact section
- `linkedin.com/in/kamalesh-singararaj-97558b212` in the contact section
- Profile photo at `public/assets/profile-photo.jpg`
