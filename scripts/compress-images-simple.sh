#!/bin/bash

echo "Image Compression Script"
echo "========================"
echo ""
echo "This script will help you compress images using online tools."
echo ""
echo "Steps to optimize your images:"
echo ""
echo "1. Go to https://squoosh.app/ (Google's image optimization tool)"
echo "2. Upload your images from src/assets/Project/"
echo "3. Choose WebP format with 80% quality"
echo "4. Download optimized images"
echo "5. Replace original images with optimized versions"
echo ""
echo "Alternative tools:"
echo "- https://tinypng.com/ (for PNG/JPG)"
echo "- https://compressor.io/ (multiple formats)"
echo "- https://imageoptim.com/ (Mac only)"
echo ""
echo "For batch processing with ImageMagick (if installed):"
echo "mogrify -resize 800x600 -quality 85 -format jpg src/assets/Project/*/*.jpg"
echo ""

# Check if ImageMagick is installed
if command -v magick &> /dev/null; then
    echo "ImageMagick is installed. Would you like to compress images automatically? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Compressing images..."
        find src/assets/Project -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read -r file; do
            echo "Processing: $file"
            magick "$file" -resize 800x600 -quality 85 -format jpg "$file"
        done
        echo "Compression complete!"
    fi
else
    echo "ImageMagick not found. Opening Squoosh in your browser..."
    if command -v open &> /dev/null; then
        open https://squoosh.app/
    elif command -v xdg-open &> /dev/null; then
        xdg-open https://squoosh.app/
    else
        echo "Please open https://squoosh.app/ in your browser"
    fi
fi

echo ""
echo "Done! Follow the steps above to optimize your images."
