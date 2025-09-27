# Media Assets for Achievements Section

This directory contains media files for the achievements section on the home page.

## Directory Structure

```
public/assets/
├── videos/                    # Video files for achievements
│   ├── lion-sculpture.mp4
│   ├── lion-sculpture.webm
│   ├── modi-statue.mp4
│   └── modi-statue.webm
└── achievements/              # Image files for achievements
    ├── lion-sculpture-poster.jpg
    ├── namami-gange.jpg
    └── modi-statue-poster.jpg
```

## Video Requirements

### Supported Formats
- **MP4** (H.264 codec) - Primary format
- **WebM** (VP9 codec) - Fallback format for better compression

### Recommended Settings
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 30fps
- **Bitrate**: 2-5 Mbps for good quality/size balance
- **Duration**: 30-60 seconds for best user experience

### File Naming Convention
- Use descriptive names: `project-name.mp4`
- Include both MP4 and WebM versions for each video
- Poster images should match: `project-name-poster.jpg`

## Image Requirements

### Poster Images (for videos)
- **Format**: JPG or PNG
- **Resolution**: 1920x1080 or 1280x720
- **Aspect Ratio**: 16:9 (matches video)
- **File Size**: Under 500KB for fast loading

### Achievement Images
- **Format**: JPG or PNG
- **Resolution**: 800x600 or higher
- **Aspect Ratio**: 4:3 or 16:9
- **File Size**: Under 1MB for fast loading

## Adding New Media

1. **For Videos**:
   - Add MP4 file to `videos/` directory
   - Add WebM file to `videos/` directory (optional but recommended)
   - Add poster image to `achievements/` directory
   - Update the video paths in `src/pages/Home.jsx`

2. **For Images**:
   - Add image file to `achievements/` directory
   - Update the image path in `src/pages/Home.jsx`

## Optimization Tips

- **Compress videos** using tools like HandBrake or FFmpeg
- **Optimize images** using tools like TinyPNG or ImageOptim
- **Use WebP format** for images when possible
- **Consider lazy loading** for better performance

## Example Video Conversion

```bash
# Convert to MP4 (H.264)
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Convert to WebM (VP9)
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

## Browser Support

- **MP4**: Supported by all modern browsers
- **WebM**: Supported by Chrome, Firefox, Edge (not Safari)
- **Fallback**: MP4 will be used if WebM is not supported
