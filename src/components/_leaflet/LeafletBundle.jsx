import React, { useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

// Create a better-looking pin icon using Leaflet's default style but colored
const icon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// India bounds - covers entire country
const indiaBounds = [
  [6.5, 68.0],  // Southwest corner (south, west)
  [37.0, 97.5]  // Northeast corner (north, east)
];

const centerIndia = [22.0, 78.0]; // Center of India

// Component to auto-fit bounds to show all markers
function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    const positions = points.map(p => p.position || [p.lat, p.lng]);
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 8 // Allow more zoom to see overlapping markers
      });
    }
  }, [map, points]);

  return null;
}

// Component to display markers without clustering - using React-Leaflet components
// Handles overlapping markers by adding small offsets
function MarkerGroup({ points, onOpenProject }) {
  // Group markers by location and add offsets for overlapping ones
  const processedPoints = useMemo(() => {
    const grouped = {};
    const result = [];
    
    points.forEach((p) => {
      const position = p.position || [p.lat, p.lng];
      const key = `${position[0].toFixed(2)}_${position[1].toFixed(2)}`;
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push({ ...p, position });
    });

    // Add offsets for overlapping markers
    Object.values(grouped).forEach((group) => {
      if (group.length === 1) {
        result.push(group[0]);
      } else {
        // Multiple markers at same location - add small offsets
        group.forEach((marker, index) => {
          const offset = 0.02; // Small offset in degrees
          const angle = (index * 2 * Math.PI) / group.length; // Spread in circle
          const offsetLat = marker.position[0] + (offset * Math.cos(angle));
          const offsetLng = marker.position[1] + (offset * Math.sin(angle));
          result.push({ ...marker, position: [offsetLat, offsetLng] });
        });
      }
    });
    
    return result;
  }, [points]);

  return (
    <>
      {processedPoints.map((p) => {
        return (
          <Marker
            key={p.id || `${p.lat}-${p.lng}`}
            position={p.position}
            icon={icon}
            zIndexOffset={1000} // Ensure markers are on top
            eventHandlers={{
              click: () => {
                if (onOpenProject) onOpenProject(p);
              }
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              <strong>{p.name || p.title}</strong><br />{p.location}
            </Tooltip>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <h4 style={{ margin: "0 0 6px 0" }}>{p.name || p.title}</h4>
                <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem", opacity: 0.9 }}>
                  {p.shortDesc || p.description || "Explore project details."}
                </p>
                <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8, fontStyle: "italic" }}>
                  Click marker to view details
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default function LeafletBundle({ projects = [], onOpenProject }) {
  const theme = document.documentElement.dataset.theme || "day";
  const tiles = theme === "night"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const points = useMemo(() => {
    return projects
      .filter(p => typeof p.lat === "number" && typeof p.lng === "number")
      .map(p => ({
        ...p,
        position: [p.lat, p.lng]
      }));
  }, [projects]);

  if (points.length === 0) {
    return (
      <div style={{
        height: "500px",
        display: "grid",
        placeItems: "center",
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--muted)",
        borderRadius: "var(--radius)"
      }}>
        No project locations available
      </div>
    );
  }

  return (
    <MapContainer
      center={centerIndia}
      zoom={5}
      minZoom={4}
      maxBounds={indiaBounds}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
      className="project-map-container"
    >
      <TileLayer 
        url={tiles}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBounds points={points} />
      <MarkerGroup points={points} onOpenProject={onOpenProject} />
    </MapContainer>
  );
}

