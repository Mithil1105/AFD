import React, { useEffect } from "react";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  // Prevent background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (!project) return null;

  return (
    <div className="pmask" role="dialog" aria-modal="true" aria-label={project.name || project.title} onClick={onClose}>
      <div className="pwrap" onClick={(e) => e.stopPropagation()}>
        <button className="pclose" onClick={onClose} aria-label="Close">×</button>
        <h2 className="ptitle">{project.name || project.title}</h2>
        <p className="psub">{project.location}</p>
        <p className="pdesc">{project.shortDesc || project.description || "Project details coming soon."}</p>

        {/* Image gallery area – populated by parent if provided */}
        {project.images && project.images.length > 0 && (
          <div className="pgallery">
            {project.images.map((src, i) => (
              <img key={i} src={src} alt={`${project.name || project.title} ${i+1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

