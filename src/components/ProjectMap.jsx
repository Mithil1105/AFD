import React, { useState, useEffect, Suspense } from "react";

// Lazy load react-leaflet pieces to avoid SSR/initialization issues
const RL = React.lazy(() => import("./_leaflet/LeafletBundle"));

export default function ProjectMap({ projects = [], onOpenProject }) {
  // Fallback UI if Leaflet not ready
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    // ensure window and document are available
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setCanRender(true);
    }
  }, []);

  if (!canRender) return null;

  return (
    <div className="project-map-wrapper" style={{ borderRadius: "var(--radius)", overflow: "hidden" }}>
      <Suspense fallback={
        <div style={{
          height: "500px",
          display: "grid",
          placeItems: "center",
          background: "var(--card)",
          color: "var(--text)",
          border: "1px solid var(--muted)",
          borderRadius: "var(--radius)"
        }}>
          Loading map…
        </div>
      }>
        <RL projects={projects} onOpenProject={onOpenProject} />
      </Suspense>
    </div>
  );
}

