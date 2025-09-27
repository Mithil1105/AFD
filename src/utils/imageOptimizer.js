// Image optimization utilities
export const optimizeImage = (file, options = {}) => {
    return new Promise((resolve) => {
        const {
            maxWidth = 800,
            maxHeight = 600,
            quality = 0.8,
            format = 'jpeg'
        } = options;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;

            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);

            const optimizedDataUrl = canvas.toDataURL(`image/${format}`, quality);
            resolve(optimizedDataUrl);
        };

        img.src = URL.createObjectURL(file);
    });
};

// Generate responsive image sizes
export const generateResponsiveSizes = (originalSrc) => {
    const sizes = [
        { width: 200, height: 150, suffix: '_thumb' },
        { width: 400, height: 300, suffix: '_medium' },
        { width: 800, height: 600, suffix: '_large' }
    ];

    return sizes.map(size => ({
        ...size,
        src: originalSrc.replace(/(\.[^.]+)$/, `${size.suffix}$1`)
    }));
};

// Check if browser supports WebP
export const supportsWebP = () => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

// Generate optimized image URL with fallback
export const getOptimizedImageUrl = async (originalSrc, width, height, quality = 80) => {
    const webpSupported = await supportsWebP();

    // In a real application, you would:
    // 1. Upload images to a CDN (like Cloudinary, ImageKit, or AWS CloudFront)
    // 2. Use their transformation APIs to generate optimized versions
    // 3. Return the optimized URL

    // For now, we'll return the original src
    // In production, this would be something like:
    // return `https://your-cdn.com/images/w_${width},h_${height},q_${quality},f_${webpSupported ? 'webp' : 'auto'}/${originalSrc}`;

    return originalSrc;
};

// Create a low-quality placeholder
export const createPlaceholder = (width, height, color = '#f0f0f0') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#e0e0e0');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.1);
};

// Preload images for better UX
export const preloadImages = (imageUrls) => {
    return Promise.all(
        imageUrls.map(url =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            })
        )
    );
};
