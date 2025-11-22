import React from "react";
import PixelArtHeadshot from "@/Pixel_Art_Headshot.png";
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
        width: "85%",
        maxWidth: "720px",
        maxHeight: "80vh",
        overflowY: "auto",
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
              borderBottom: isNight ? "2px solid #cfd8dc" : "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            About Me
          </h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "16px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <img
              src={PixelArtHeadshot}
              alt="Pixel art portrait of Charity Quinn"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "4px",
                border: isNight ? "3px solid #cfd8dc" : "3px solid #3e2723",
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: "1.2rem",
                margin: 0,
                lineHeight: 1.4,
                flex: 1,
                minWidth: "220px",
              }}
            >
              Hi! I'm Charity Quinn, a technical problem-solver driven by
              curiosity. I build tools, learn new systems, and write about what
              I discover.
              <br />
              <br />
              I'm an AI Solutions Engineer in NYC working at Retool, where I
              help companies ship internal tools, AI workflows, and cloud
              deployments quickly and securely. Before that, I was a Software
              Engineer at Capital One, building automation platforms, internal
              applications, and large-scale AWS infrastructure.
              <br />
              <br />
              I’m writing about my path into AI systems engineering, the lessons
              from each role, the real problems I see across organizations, how
              I’d apply LLMs in industrial environments.
            </p>
          </div>
        </div>
      )}

      {modalOpen === "redBarn" && (
        <div>
          <h2
            style={{
              borderBottom: isNight ? "2px solid #cfd8dc" : "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Resume
          </h2>
          <div style={{ fontSize: "1.1rem" }}>
            <h3>Education</h3>
            <ul>
              <li>
                <strong>Georgia Institute of Technology</strong> – M.S. Computer
                Science
              </li>
              <li>
                <strong>Pennsylvania State University</strong> – B.S. Chemical
                Engineering
              </li>
            </ul>

            <h3>Experience</h3>
            <div style={{ marginBottom: "10px" }}>
              <strong>Solutions Engineer</strong> – Retool
              <div>
                <small>Jun 2025 – Present</small>
              </div>
              <ul>
                <li>
                  Partnered with customers from startups to Fortune 100s to
                  design and deploy custom Retool applications, reducing
                  implementation time by 50%+.
                </li>
                <li>
                  Built AI-driven workflows and agents with LLMs, embeddings,
                  and RAG to automate workflows in highly regulated industries
                  (healthcare, fintech) while maintaining compliance.
                </li>
                <li>
                  Delivered tailored technical demos and proof of concepts to
                  C-suite stakeholders, accelerating enterprise adoption.
                </li>
                <li>
                  Architected self-hosted deployments using Docker, Kubernetes,
                  and AWS ECS/EC2 for security-first environments.
                </li>
              </ul>
            </div>

            <div>
              <strong>Senior Software Engineer</strong> – Capital One
              <div>
                <small>Aug 2022 – Jun 2025</small>
              </div>
              <ul>
                <li>
                  Migrated 40+ RPA bots from VDIs to AWS EC2, cutting annual
                  costs by $500K and improving reliability.
                </li>
                <li>
                  Designed and managed cloud infrastructure for 50+ internal
                  clients, ensuring scalable and secure deployments.
                </li>
                <li>
                  Automated CI/CD pipelines (Jenkins, AWS CodeDeploy, GitHub
                  Actions), accelerating releases and improving consistency.
                </li>
                <li>
                  Shipped internal React/Node.js apps for call center agents,
                  improving credit card dispute resolution by reducing
                  processing time by 20%.
                </li>
                <li>
                  Product-managed and built a self-service RPA platform enabling
                  business teams to launch automated workflows without direct
                  engineering support.
                </li>
                <li>
                  Presented published research on team effectiveness at Grace
                  Hopper National Conference and Capital One WITX.
                </li>
              </ul>
            </div>

            <h3>Skills</h3>
            <ul>
              <li>
                <strong>Languages:</strong> JavaScript, Python, SQL
              </li>
              <li>
                <strong>Frameworks:</strong> React, Node.js, Vue
              </li>
              <li>
                <strong>Cloud &amp; Data:</strong> AWS Certified Solutions
                Architect – Associate, Databricks, Snowflake, Docker, Kubernetes
              </li>
              <li>
                <strong>AI / ML:</strong> LLM integration, RAG, embeddings,
                compliance-driven AI workflows
              </li>
              <li>
                <strong>Other:</strong> RPA (Automation Anywhere), CI/CD
                (Jenkins, GitHub Actions), REST APIs
              </li>
            </ul>
            <a
              href="/Charity_Quinn_Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              download
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "5px 10px",
                background: "#4caf50",
                border: "2px solid #1b5e20",
                color: "white",
                fontFamily: "inherit",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}

      {modalOpen === "projectGreenhouse" && (
        <div>
          <h2
            style={{
              borderBottom: isNight ? "2px solid #cfd8dc" : "2px solid #3e2723",
              paddingBottom: "10px",
            }}
          >
            Projects
          </h2>
          <div style={{ display: "grid", gap: "10px" }}>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
              }}
            >
              <strong>Farm Portfolio</strong>
              <p>A gamified react portfolio inspired by RPGs.</p>
            </div>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
              }}
            >
              <strong>Cloud Scaler</strong>
              <p>Automated scaling solution for k8s clusters.</p>
            </div>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
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
              borderBottom: isNight ? "2px solid #cfd8dc" : "2px solid #3e2723",
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
            <p>How to use HTML5 Canvas with React refs for performance...</p>
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
              href="mailto:hipplecharity@gmail.com"
              style={{
                display: "block",
                color: isNight ? "#ffcc80" : "#3e2723",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              hipplecharity@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/charity-quinn/"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: "block",
                color: isNight ? "#ffcc80" : "#3e2723",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/quinncharity"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: "block",
                color: isNight ? "#ffcc80" : "#3e2723",
                textDecoration: "underline",
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
          color: isNight ? "#cfd8dc" : "#5d4037",
        }}
      ></div>
    </div>
  );
}
