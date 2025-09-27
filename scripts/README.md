# Image Optimization Scripts

This directory contains scripts to optimize images for better web performance.

## Prerequisites

Install the required dependencies:

```bash
npm install sharp
```

## Image Compression Script

The `compress-images.js` script will:

1. **Compress all images** in `src/assets/Project/` to multiple formats (JPEG, WebP)
2. **Generate multiple sizes** (thumbnail, medium, large)
3. **Create placeholders** (blurred, low-quality versions for loading states)
4. **Save optimized images** to `src/assets/Project-optimized/`

### Usage

```bash
# Run the compression script
node scripts/compress-images.js
```

### Output Structure

```
src/assets/Project-optimized/
├── Ambardi Safari Park/
│   ├── image1_thumb.jpg
│   ├── image1_thumb.webp
│   ├── image1_medium.jpg
│   ├── image1_medium.webp
│   ├── image1_large.jpg
│   ├── image1_large.webp
│   └── image1_placeholder.jpg
└── ...
```

## Configuration

Edit `compress-images.js` to adjust:

- **Quality settings**: JPEG (85%), WebP (80%)
- **Image sizes**: Thumb (200x150), Medium (400x300), Large (800x600)
- **Input/Output directories**

## Performance Benefits

- **WebP format**: 25-35% smaller than JPEG
- **Multiple sizes**: Load appropriate size for device
- **Progressive JPEG**: Better perceived loading
- **Placeholders**: Smooth loading experience

## Next Steps

1. Run the compression script
2. Update image paths in your components
3. Implement responsive images with `srcset`
4. Consider using a CDN (Cloudinary, ImageKit, etc.)

## Alternative: Online Tools

If you prefer manual optimization:

- **TinyPNG/TinyJPG**: Online compression
- **Squoosh**: Google's image optimization tool
- **ImageOptim**: Desktop app for batch processing
