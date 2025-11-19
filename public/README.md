# GradeGenius Brand Assets

This directory contains the brand assets for the GradeGenius website.

## Favicon Files

The following files are included:

- `favicon.svg` - SVG favicon (works in modern browsers)
- `site.webmanifest` - Web app manifest for PWA support

## Missing Assets (To Generate)

The following PNG files should be generated from `favicon.svg`:

1. `favicon-16x16.png` - 16x16 favicon
2. `favicon-32x32.png` - 32x32 favicon
3. `apple-touch-icon.png` - 180x180 for iOS devices
4. `favicon-192x192.png` - 192x192 for Android
5. `favicon-512x512.png` - 512x512 for high-res displays
6. `og-image.png` - 1200x630 Open Graph image for social sharing

### How to Generate

You can use online tools or ImageMagick to convert the SVG to PNG:

```bash
# Using ImageMagick (if installed)
convert -background none favicon.svg -resize 16x16 favicon-16x16.png
convert -background none favicon.svg -resize 32x32 favicon-32x32.png
convert -background none favicon.svg -resize 180x180 apple-touch-icon.png
convert -background none favicon.svg -resize 192x192 favicon-192x192.png
convert -background none favicon.svg -resize 512x512 favicon-512x512.png
```

Or use online tools like:
- https://realfavicongenerator.net/
- https://favicon.io/

## Brand Colors

- Primary Gradient: #667eea → #764ba2
- Secondary: #f093fb → #f5576c
- Accent: #4facfe → #00f2fe
