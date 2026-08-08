# UPCHAR Public Website

SEO-first Next.js site for the UPCHAR healthcare platform.

## Pages
- Home, About, Services (+ telemedicine / appointments / records)
- Doctors, Hospitals, Book, Diagnostics, Pharmacy, Packages
- Careers, Blog, Contact, FAQ, Privacy, Terms
- Login, Signup, Forgot password

## Run locally
```bash
cd apps/public-website
npm install --ignore-scripts
npm run dev
```
Open http://localhost:3000

> If the API gateway also uses port 3000, run the website with `npx next dev -p 3001`.
