import React, { useEffect } from 'react';

const ProjectsMap = ({ projects, onProjectClick }) => {
    useEffect(() => {
        // MapSVG iframe resize functionality
        function mReceiveMessage(event) {
            const frames = document.querySelectorAll('iframe.mapsvg-iframe-responsive');
            frames.forEach((frame) => {
                if (frame.contentWindow === event.source) {
                    frame.style.height = event.data.height + "px";
                }
            });
        }

        function setupIframeResize() {
            if (typeof window !== "undefined") {
                window.addEventListener("message", mReceiveMessage, false);
            }
        }

        setupIframeResize();

        // Cleanup
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("message", mReceiveMessage, false);
            }
        };
    }, []);

    return (
        <div className="projects-map-container">
            <iframe
                src="https://amitfibredecor.com/mapsvg_sc/?mapsvg_shortcode=[mapsvg%20id=1]"
                className="mapsvg-iframe-responsive"
                loading="lazy"
                width="100%"
                height="400px"
                title="Interactive Project Map"
            />
        </div>
    );
};

export default ProjectsMap;
