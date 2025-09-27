import React, { useState, useRef, useEffect } from 'react';

const ResponsiveImage = ({
    src,
    alt,
    className,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(null);
    const imgRef = useRef(null);

    // Generate srcset for different sizes and formats
    const generateSrcSet = (baseSrc, format = 'webp') => {
        const baseName = baseSrc.replace(/\.[^/.]+$/, '');
        const sizes = ['_thumb', '_medium', '_large'];
        const widths = [200, 400, 800];

        return sizes.map((size, index) =>
            `${baseName}${size}.${format} ${widths[index]}w`
        ).join(', ');
    };

    // Generate fallback srcset for JPEG
    const generateFallbackSrcSet = (baseSrc) => {
        return generateSrcSet(baseSrc, 'jpg');
    };

    // Generate placeholder
    const generatePlaceholder = (baseSrc) => {
        const baseName = baseSrc.replace(/\.[^/.]+$/, '');
        return `${baseName}_placeholder.jpg`;
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
                rootMargin: '100px' // Start loading earlier
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && src) {
            // Try to use optimized version, fallback to original
            const optimizedSrc = src.replace('Project/', 'Project-optimized/');
            setCurrentSrc(optimizedSrc);
        }
    }, [isInView, src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setImageError(true);
        // Fallback to original image
        if (currentSrc !== src) {
            setCurrentSrc(src);
        }
    };

    if (!isInView) {
        return (
            <div
                ref={imgRef}
                className={`responsive-image-container ${className || ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    background: 'var(--muted)',
                    borderRadius: 'var(--radius)'
                }}
            />
        );
    }

    return (
        <div
            className={`responsive-image-container ${className || ''}`}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {/* Placeholder */}
            {!isLoaded && (
                <img
                    src={generatePlaceholder(currentSrc || src)}
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(5px)',
                        transform: 'scale(1.1)',
                        zIndex: 1
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            )}

            {/* Loading spinner */}
            {!isLoaded && !imageError && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2
                    }}
                >
                    <div className="loading-spinner"></div>
                </div>
            )}

            {/* Main image */}
            {currentSrc && (
                <picture>
                    {/* WebP source */}
                    <source
                        srcSet={generateSrcSet(currentSrc, 'webp')}
                        sizes={sizes}
                        type="image/webp"
                    />
                    {/* JPEG fallback */}
                    <source
                        srcSet={generateFallbackSrcSet(currentSrc)}
                        sizes={sizes}
                        type="image/jpeg"
                    />
                    {/* Fallback img */}
                    <img
                        src={currentSrc}
                        srcSet={generateFallbackSrcSet(currentSrc)}
                        sizes={sizes}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        style={{
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius)'
                        }}
                        loading="lazy"
                        decoding="async"
                        {...props}
                    />
                </picture>
            )}

            {/* Error state */}
            {imageError && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--muted)',
                        color: 'var(--muted-foreground)',
                        borderRadius: 'var(--radius)'
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Image unavailable</p>
                </div>
            )}
        </div>
    );
};

export default ResponsiveImage;
