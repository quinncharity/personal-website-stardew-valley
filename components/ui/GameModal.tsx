import React from "react";
import { InteractableType } from "@/game/types";

interface GameModalProps {
  modalOpen: InteractableType | null;
  isNight: boolean;
  onClose: () => void;
}

export function GameModal({ modalOpen, isNight, onClose }: GameModalProps) {
  if (!modalOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "600px",
        backgroundColor: isNight ? "#263238" : "#ffecb3",
        border: isNight ? "8px solid #90a4ae" : "8px solid #5d4037",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
        fontFamily: "'VT323', monospace",
        color: isNight ? "#eceff1" : "#3e2723",
        zIndex: 100,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "#b71c1c",
          color: "#fff",
          border: "2px solid #3e2723",
          fontFamily: "inherit",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        X
      </button>

      {modalOpen === "farmHouse" && (
        <div>
          <h2
            style={{
              borderBottom: "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            About Me
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            Hi! I'm Charity Quinn, a Software Engineer turned Solutions
            Engineer.
            <br />
            <br />I love bridging the gap between technical complexity and
            business value. When I'm not coding, I'm probably playing Stardew
            Valley or hanging out with my Bernese Mountain Dog.
          </p>
        </div>
      )}

      {modalOpen === "redBarn" && (
        <div>
          <h2
            style={{
              borderBottom: "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Resume
          </h2>
          <div style={{ fontSize: "1.1rem" }}>
            <h3>Experience</h3>
            <ul>
              <li>
                <strong>Senior Solutions Engineer</strong> - TechCorp
                (2021-Present)
              </li>
              <li>
                <strong>Software Engineer</strong> - DevStudio (2018-2021)
              </li>
            </ul>
            <h3>Skills</h3>
            <p>
              React, TypeScript, Python, Cloud Architecture, Client Solutions
            </p>
            <button
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "#4caf50",
                border: "2px solid #1b5e20",
                color: "white",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}

      {modalOpen === "projectGreenhouse" && (
        <div>
          <h2
            style={{
              borderBottom: "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Projects
          </h2>
          <div style={{ display: "grid", gap: "10px" }}>
            <div
              style={{
                background: "#fff",
                padding: "10px",
                border: "2px dashed #3e2723",
              }}
            >
              <strong>Farm Portfolio</strong>
              <p>A gamified react portfolio inspired by RPGs.</p>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "10px",
                border: "2px dashed #3e2723",
              }}
            >
              <strong>Cloud Scaler</strong>
              <p>Automated scaling solution for k8s clusters.</p>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "10px",
                border: "2px dashed #3e2723",
              }}
            >
              <strong>Code Viz</strong>
              <p>Visualizing git history in 3D.</p>
            </div>
          </div>
        </div>
      )}

      {modalOpen === "board" && (
        <div>
          <h2
            style={{
              borderBottom: "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Blog
          </h2>
          <article style={{ marginBottom: "15px" }}>
            <h3 style={{ margin: "0 0 5px 0" }}>
              Why I moved to Solutions Engineering
            </h3>
            <small>Oct 12, 2023</small>
            <p>
              Coding is great, but solving customer problems with code is even
              better...
            </p>
          </article>
          <article>
            <h3 style={{ margin: "0 0 5px 0" }}>
              Procedural Generation in React
            </h3>
            <small>Sep 05, 2023</small>
            <p>
              How to use HTML5 Canvas with React refs for performance...
            </p>
          </article>
        </div>
      )}

      {modalOpen === "mailbox" && (
        <div>
          <h2
            style={{
              borderBottom: "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Contact
          </h2>
          <p style={{ fontSize: "1.3rem", textAlign: "center" }}>
            Let's build something together!
          </p>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="#"
              style={{
                display: "block",
                color: "#3e2723",
                marginBottom: "10px",
              }}
            >
              charity.quinn@example.com
            </a>
            <a
              href="#"
              style={{
                display: "block",
                color: "#3e2723",
                marginBottom: "10px",
              }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              style={{
                display: "block",
                color: "#3e2723",
                marginBottom: "10px",
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#5d4037",
        }}
      >
        (Press ESC to close)
      </div>
    </div>
  );
}


