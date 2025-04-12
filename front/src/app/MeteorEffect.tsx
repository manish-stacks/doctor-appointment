import React from "react";
import "./MeteorEffect.css";

const MeteorEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="meteor-wrapper">
        {[...Array(15)].map((_, index) => (
          <span
            key={index}
            className="meteor"
            style={{ "color": getRandomColor() }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const getRandomColor = () => {
  const colors = [
    "#6366F1", // Indigo
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#D946EF", // Fuchsia
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default MeteorEffect;
