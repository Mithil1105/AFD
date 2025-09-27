@echo off
echo Image Compression Script for Windows
echo ====================================
echo.
echo This script will help you compress images using online tools.
echo.
echo Steps to optimize your images:
echo.
echo 1. Go to https://squoosh.app/ (Google's image optimization tool)
echo 2. Upload your images from src/assets/Project/
echo 3. Choose WebP format with 80%% quality
echo 4. Download optimized images
echo 5. Replace original images with optimized versions
echo.
echo Alternative tools:
echo - https://tinypng.com/ (for PNG/JPG)
echo - https://compressor.io/ (multiple formats)
echo - https://imageoptim.com/ (Mac only)
echo.
echo For batch processing:
echo - Use https://bulkresizephotos.com/
echo - Or install ImageMagick and run:
echo   magick mogrify -resize 800x600 -quality 85 -format jpg src/assets/Project/*/*.jpg
echo.
echo Press any key to open Squoosh in your browser...
pause > nul
start https://squoosh.app/
echo.
echo Done! Follow the steps above to optimize your images.
pause
