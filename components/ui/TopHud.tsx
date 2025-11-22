import React from "react";
import { InteractableType } from "@/game/types";

interface TopHudProps {
  isNight: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onToggleNight: () => void;
  onSelectModal: (type: InteractableType) => void;
}

export function TopHud({
  isNight,
  menuOpen,
  onToggleMenu,
  onToggleNight,
  onSelectModal,
}: TopHudProps) {
  return (
    <div
      data-ui-element="true"
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        zIndex: 120,
        fontFamily: "'VT323', monospace",
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
      }}
    >
      {/* Menu button with dropdown directly underneath */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <button
          onClick={onToggleMenu}
          style={{
            padding: "6px 12px",
            background: "#ffecb3",
            border: "3px solid #5d4037",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "16px",
            color: "#3e2723",
            boxShadow: "0 2px 0 #3e2723",
          }}
        >
          Menu ▾
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              background: "#ffecb3",
              border: "3px solid #5d4037",
              borderRadius: "6px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              minWidth: "150px",
              marginTop: "4px",
            }}
          >
            {[
              { label: "About Me", type: "farmHouse" as InteractableType },
              { label: "Resume", type: "redBarn" as InteractableType },
              {
                label: "Projects",
                type: "projectGreenhouse" as InteractableType,
              },
              { label: "Blog", type: "board" as InteractableType },
              { label: "Contact", type: "mailbox" as InteractableType },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => onSelectModal(item.type)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 10px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(93,64,55,0.4)",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  color: "#3e2723",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Light / Dark mode toggle */}
      <button
        onClick={onToggleNight}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "3px solid #5d4037",
          background: isNight ? "#263238" : "#ffecb3",
          color: isNight ? "#ffe082" : "#3e2723",
          cursor: "pointer",
          boxShadow: "0 2px 0 #3e2723",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        {isNight ? "⏾" : "☀︎"}
      </button>
    </div>
  );
}


