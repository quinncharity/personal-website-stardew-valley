import React from "react";

export function MobileHint() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.7)",
        fontSize: "14px",
        pointerEvents: "none",
        textAlign: "center",
      }}
    >
      Click/Tap to Move • WASD/Arrows to Walk • Walk into buildings
    </div>
  );
}


