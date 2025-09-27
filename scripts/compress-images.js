const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    inputDir: 'src/assets/Project',
    outputDir: 'src/assets/Project-optimized',
    formats: ['jpeg', 'webp'],
    qualities: {
        jpeg: 85,
        webp: 80
    },
    sizes: [
        { width: 200, height: 150, suffix: '_thumb' },
        { width: 400, height: 300, suffix: '_medium' },
        { width: 800, height: 600, suffix: '_large' }
    ]
};

// Ensure output directory exists
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Process a single image
async function processImage(inputPath, outputDir, projectName) {
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const ext = path.extname(inputPath).toLowerCase();

    // Skip if not an image
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        console.log(`Skipping non-image file: ${inputPath}`);
        return;
    }

    console.log(`Processing: ${inputPath}`);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Process each size
        for (const size of config.sizes) {
            const projectOutputDir = path.join(outputDir, projectName);
            ensureDir(projectOutputDir);

            // Process each format
            for (const format of config.formats) {
                const outputFileName = `${fileName}${size.suffix}.${format}`;
                const outputPath = path.join(projectOutputDir, outputFileName);

                let pipeline = image.clone().resize(size.width, size.height, {
                    fit: 'cover',
                    position: 'center'
                });

                if (format === 'jpeg') {
                    pipeline = pipeline.jpeg({
                        quality: config.qualities.jpeg,
                        progressive: true,
                        mozjpeg: true
                    });
                } else if (format === 'webp') {
                    pipeline = pipeline.webp({
                        quality: config.qualities.webp,
                        effort: 6
                    });
                }

                await pipeline.toFile(outputPath);
                console.log(`  Created: ${outputPath}`);
            }
        }

        // Also create a placeholder (very small, blurred version)
        const placeholderPath = path.join(outputDir, projectName, `${fileName}_placeholder.jpg`);
        await image
            .resize(20, 20, { fit: 'cover' })
            .blur(2)
            .jpeg({ quality: 10 })
            .toFile(placeholderPath);

        console.log(`  Created placeholder: ${placeholderPath}`);

    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error.message);
    }
}

// Process all images in a directory
async function processDirectory(inputDir, outputDir) {
    const items = fs.readdirSync(inputDir);

    for (const item of items) {
        const itemPath = path.join(inputDir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            console.log(`\nProcessing project: ${item}`);
            const projectOutputDir = path.join(outputDir, item);
            ensureDir(projectOutputDir);

            const projectItems = fs.readdirSync(itemPath);
            for (const projectItem of projectItems) {
                const projectItemPath = path.join(itemPath, projectItem);
                const projectItemStat = fs.statSync(projectItemPath);

                if (projectItemStat.isFile()) {
                    await processImage(projectItemPath, outputDir, item);
                }
            }
        }
    }
}

// Main function
async function main() {
    console.log('Starting image compression...');
    console.log('This will create optimized versions of all images.');
    console.log('Make sure you have sharp installed: npm install sharp');

    try {
        ensureDir(config.outputDir);
        await processDirectory(config.inputDir, config.outputDir);
        console.log('\n✅ Image compression completed!');
        console.log(`\nOptimized images saved to: ${config.outputDir}`);
        console.log('\nNext steps:');
        console.log('1. Update your image paths to use the optimized versions');
        console.log('2. Consider using a CDN for even better performance');
        console.log('3. Implement responsive images with srcset');
    } catch (error) {
        console.error('Error during compression:', error);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { processImage, processDirectory, config };
