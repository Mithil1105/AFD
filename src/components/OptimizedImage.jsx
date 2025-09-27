import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
    src,
    alt,
    className,
    width = 400,
    height = 300,
    quality = 80,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(null);
    const imgRef = useRef(null);

    // Generate optimized image URLs with different formats and sizes
    const generateOptimizedSrc = (originalSrc, format = 'webp') => {
        // For now, we'll use the original src but in a real app, you'd:
        // 1. Convert images to WebP format
        // 2. Generate multiple sizes (thumbnail, medium, large)
        // 3. Use a CDN with automatic optimization

        // This is a placeholder - in production you'd use:
        // return `https://your-cdn.com/images/${width}x${height}/q${quality}/${format}/${originalSrc}`;

        return originalSrc;
    };

    // Generate a low-quality placeholder (blur-up effect)
    const generatePlaceholder = (originalSrc) => {
        // In production, you'd generate a very small, blurred version
        // For now, we'll use a data URL with a simple gradient
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)" />
            </svg>
        `)}`;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before image comes into view
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && src) {
            // Try WebP first, fallback to original
            const webpSrc = generateOptimizedSrc(src, 'webp');
            setCurrentSrc(webpSrc);
        }
    }, [isInView, src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setImageError(true);
        // Fallback to original image if WebP fails
        if (currentSrc !== src) {
            setCurrentSrc(src);
        }
    };

    return (
        <div
            ref={imgRef}
            className={`optimized-image-container ${className || ''}`}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {/* Placeholder/Blur-up effect */}
            {!isLoaded && (
                <div
                    className="optimized-image-placeholder"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${generatePlaceholder(src)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(10px)',
                        transform: 'scale(1.1)',
                        transition: 'opacity 0.3s ease-out'
                    }}
                />
            )}

            {/* Loading spinner */}
            {!isLoaded && !imageError && (
                <div className="optimized-image-spinner">
                    <div className="loading-spinner"></div>
                </div>
            )}

            {/* Actual image */}
            {isInView && currentSrc && (
                <img
                    src={currentSrc}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    loading="lazy"
                    decoding="async"
                    {...props}
                />
            )}

            {/* Error state */}
            {imageError && (
                <div className="optimized-image-error">
                    <div className="error-icon">📷</div>
                    <p>Image unavailable</p>
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
