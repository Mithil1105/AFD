import React, { useState, useRef } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

const VideoPlayer = ({
    src,
    poster,
    alt = "Video content",
    className = "",
    ...props
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVideoClick = () => {
        togglePlay();
    };

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    return (
        <div
            className={`video-player ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                className="video-element"
                poster={poster}
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
                loop
                {...props}
            >
                <source src={src} type="video/mp4" />
                <source src={src.replace('.mp4', '.webm')} type="video/webm" />
                Your browser does not support the video tag.
            </video>

            {/* Custom Controls Overlay */}
            <div className={`video-controls ${showControls ? 'show' : ''}`}>
                <button
                    className="control-button play-button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                    {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                </button>

                <button
                    className="control-button mute-button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                    {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
