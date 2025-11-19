# GradeGenius Marketing Website

Professional marketing website for GradeGenius - AI-Powered Grading Platform.

## Overview

This is a standalone Next.js website showcasing the GradeGenius platform with landing pages, features, pricing, and contact information. Built with Next.js 14, React 18, and TailwindCSS for optimal performance and SEO.

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS 3
- **Icons**: Lucide React
- **Deployment**: Vercel / Any Node.js hosting

## Features

### Pages Included

1. **Home (/)** - Landing page with:
   - Hero section with CTA
   - Feature showcase (6 key features)
   - How it works (3-step process)
   - Statistics and social proof
   - Call-to-action section

2. **About (/about)** - Company information:
   - Mission and vision
   - Core values
   - Company statistics
   - Team story

3. **Pricing (/pricing)** - Pricing tiers:
   - Starter (Free) plan
   - Professional ($29/month) plan
   - Enterprise (Custom) plan
   - FAQ section

4. **Contact (/contact)** - Contact page with:
   - Contact form
   - Contact information
   - Office hours
   - Support options

### Components

- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Multi-column footer with links and contact info

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm

### Installation

```bash
# Navigate to website directory
cd website

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3003](http://localhost:3003) to view the website.

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Export Static Site

```bash
# Export as static HTML/CSS/JS
npm run export
```

This will create an `out/` directory with static files that can be deployed to any static hosting service.

## Configuration

### Port Configuration

The development server runs on port **3003** by default to avoid conflicts with the main GradeGenius application (port 3002).

To change the port, edit `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p YOUR_PORT",
    "start": "next start -p YOUR_PORT"
  }
}
```

### Application Login Link

The website links to the main GradeGenius application at `http://localhost:3002/login`.

**For production deployment**, update these links in:
- `components/Navbar.js` (line 27 and mobile menu)
- `pages/index.js` (hero CTA and bottom CTA)
- `pages/about.js` (bottom CTA)
- `pages/pricing.js` (plan CTAs)

Replace `http://localhost:3002/login` with your production URL.

### Styling

The website uses custom TailwindCSS configuration with:
- Custom color palette (primary blues and purples)
- Gradient utilities
- Custom button components
- Responsive utilities

Edit `tailwind.config.js` to customize colors and styles.

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

1. Push code to GitHub
2. Import project to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

### Static Hosting (AWS S3, GitHub Pages, etc.)

```bash
# Export static files
npm run export

# Deploy the 'out/' directory to your static host
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3003
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t gradegenius-website .
docker run -p 3003:3003 gradegenius-website
```

## Environment Variables

No environment variables required for basic functionality.

For production deployments, you may want to add:

```env
NEXT_PUBLIC_APP_URL=https://app.gradegenius.com
NEXT_PUBLIC_API_URL=https://api.gradegenius.com
```

Then update links dynamically:

```javascript
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
```

## Project Structure

```
website/
├── pages/              # Next.js pages
│   ├── _app.js        # App wrapper
│   ├── _document.js   # HTML document
│   ├── index.js       # Home page
│   ├── about.js       # About page
│   ├── pricing.js     # Pricing page
│   └── contact.js     # Contact page
├── components/         # React components
│   ├── Navbar.js      # Navigation bar
│   └── Footer.js      # Footer
├── styles/            # Global styles
│   └── globals.css    # TailwindCSS imports
├── public/            # Static assets
│   └── images/        # Image assets
├── package.json       # Dependencies
├── next.config.mjs    # Next.js configuration
├── tailwind.config.js # TailwindCSS configuration
└── README.md          # This file
```

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Content

- **Hero text**: Edit `pages/index.js` lines 20-40
- **Features**: Edit `pages/index.js` lines 110-200
- **Pricing**: Edit `pages/pricing.js` lines 8-85
- **Company info**: Edit `pages/about.js`

### Contact Form

The contact form currently logs to console. To make it functional:

1. Create an API route in `pages/api/contact.js`:

```javascript
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Send email using SendGrid, Mailgun, or your preferred service
    // await sendEmail({ name, email, subject, message });

    res.status(200).json({ success: true });
  }
}
```

2. Update form submission in `pages/contact.js`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  // Handle response...
};
```

## Performance Optimization

- Images: Use Next.js `<Image>` component for automatic optimization
- Fonts: Self-hosted Google Fonts via `@import` in CSS
- Code splitting: Automatic with Next.js
- Static generation: Consider using `getStaticProps` for faster page loads

## SEO Optimization

The website includes basic SEO setup. Enhance by:

1. Adding `next-seo` package
2. Creating unique meta descriptions per page
3. Adding structured data (JSON-LD)
4. Generating sitemap
5. Adding robots.txt

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

This website is part of the GradeGenius monorepo. When making changes:

1. Test responsive design on mobile/tablet/desktop
2. Ensure all links work correctly
3. Test contact form functionality
4. Check performance with Lighthouse
5. Verify SEO metadata

## License

Copyright © 2025 GradeGenius. All rights reserved.

## Support

For questions about the website:
- Email: support@gradegenius.com
- Phone: +1 (555) 123-4567

## Related Projects

- **Main Application**: `../frontend/` - GradeGenius web application
- **Backend API**: `../backend/` - GradeGenius API server

---

**Note**: This website is designed to run independently from the main GradeGenius application. It can be deployed separately on its own domain (e.g., www.gradegenius.com) while the main app runs on a subdomain (e.g., app.gradegenius.com).
