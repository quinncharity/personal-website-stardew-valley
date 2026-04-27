import React from "react";
import PixelArtHeadshot from "@/Pixel_Art_Headshot.png";
import { InteractableType } from "@/game/types";

interface GameModalProps {
  modalOpen: InteractableType | null;
  isNight: boolean;
  onClose: () => void;
}

const blogPosts = [
  {
    slug: "/blog/the-cognitive-decoupling-why-im-betting-on-reasoning-over-flow-in-ai-coding",
    title:
      'The Cognitive Decoupling: Why I\'m Betting on "Reasoning" Over "Flow" in AI Coding',
    date: "February 8, 2026",
    description:
      "Exploring the stratification of AI coding tools—from Cursor's flow-first IDE to Devin's autonomous reasoning—and why the long-term value is shifting toward reasoning engines.",
  },
  {
    slug: "/blog/where-ai-will-drive-the-biggest-gains-in-unexpected-industrial-sectors",
    title:
      "Where AI Will Drive the Biggest Gains in Unexpected Industrial Sectors",
    date: "November 23, 2025",
    description:
      "Why some of the biggest AI gains may come from chemical production, manufacturing, and oil and gas—industries that are data rich but operationally constrained.",
  },
  {
    slug: "/blog/everyone-wants-ai-but-few-know-what-it-actually-takes",
    title: "Everyone Wants AI, but Few Know What It Actually Takes",
    date: "November 21, 2025",
    description:
      "Patterns I keep seeing as companies adopt AI. From data foundations and access control, to architecture, costs, shadow AI, and the gap between enthusiasm and readiness.",
  },
  {
    slug: "/blog/diary-of-a-solutions-engineer-entry-1",
    title:
      "Diary of a Solutions Engineer – From Chemical Engineering to AI Solutions Engineering",
    date: "November 19, 2025",
    description:
      "From growing up as the youngest of nine in rural Pennsylvania to building AI systems, this entry traces how I moved from chemical engineering into AI solutions engineering.",
  },
];

export function GameModal({ modalOpen, isNight, onClose }: GameModalProps) {
  if (!modalOpen) return null;

  const isMobileViewport =
    typeof window !== "undefined" && window.innerWidth <= 480;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobileViewport ? "92%" : "85%",
        maxWidth: "720px",
        maxHeight: isMobileViewport ? "85vh" : "80vh",
        overflowY: "auto",
        backgroundColor: isNight ? "#263238" : "#ffecb3",
        border: isNight ? "8px solid #90a4ae" : "8px solid #5d4037",
        borderRadius: "10px",
        padding: isMobileViewport ? "16px" : "20px",
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
              I'm an AI Solutions Engineer in NYC working at Retool, an
              enterprise app-generation layer used to build and manage internal
              tools. I help companies design and deploy AI workflows, internal
              applications, and cloud-backed systems quickly and securely.
              Before that, I worked as a Software Engineer at Capital One
              building automation platforms, internal applications, and
              large-scale cloud infrastructure.
              <br />
              <br />I have a B.S. in Chemical Engineering from Penn State and an
              M.S. in Computer Science from Georgia Tech. I write about the
              lessons I've learned across roles, the patterns I see in
              real-world engineering challenges, and how AI can be applied in
              enterprise environments.
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
              <strong>Founding Applied AI Engineer</strong> – Cognition
              <div>
                <small>Mar 2026 – Present</small>
              </div>
              <ul>
                <li>
                  Second hire on a two-person onsite customer program driving
                  Devin adoption inside Fortune 100 engineering organizations;
                  partner with account teams to diagnose highest-toil workflows
                  and convert them into hands-on AI implementation work.
                </li>
                <li>
                  Run 1-2 week onsite workshops using customers&apos; real
                  engineering backlogs, leading 4-5 pair-coding pods per day
                  with groups of 6-20 engineers rather than sandboxed demos.
                </li>
                <li>
                  Increased strategic account usage 400-600% above pre-workshop
                  baselines post-engagement, with lift sustained beyond the
                  workshop period.
                </li>
                <li>
                  Stand up Centers of Excellence, train internal champions, and
                  return to strategic accounts to expand adoption across
                  additional teams so the motion compounds after the onsite
                  engagement ends.
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <strong>Solutions Engineer</strong> – Retool
              <div>
                <small>Jun 2025 – Mar 2026</small>
              </div>
              <ul>
                <li>
                  Ranked #1 SE Globally in Q4 2025: Finished the quarter as the
                  top Solutions Engineer across all regions and segments in
                  total ARR.
                </li>
                <li>
                  Ranked #1 MMK SE in Q3 2025: Finished the quarter as the top
                  mid market Solutions Engineer in total ARR.
                </li>
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
              <a
                href="https://github.com/quinncharity/personal-website-stardew-valley"
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  color: isNight ? "#ffcc80" : "#3e2723",
                  textDecoration: "underline",
                  fontSize: "0.95rem",
                }}
              >
                View source on GitHub
              </a>
            </div>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
              }}
            >
              <strong>Policy-Aware LLM Workflow Orchestrator</strong>
              <p>
                A lightweight orchestration engine that routes user requests
                through an intake agent, applies enforceable policy checks, and
                executes tasks with Claude using structured JSON output. The
                system demonstrates how to build safe, auditable, multi-agent
                LLM workflows similar to those used in enterprise environments.
              </p>
              <a
                href="https://github.com/quinncharity/Orchestrator"
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  color: isNight ? "#ffcc80" : "#3e2723",
                  textDecoration: "underline",
                  fontSize: "0.95rem",
                }}
              >
                View source on GitHub
              </a>
            </div>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
              }}
            >
              <strong>PawStrips – Dog Comic Generator</strong>
              <p>
                A playful dog comic generator that turns prompts into comic
                strips. Built with Next.js using v0.app and deployed on Vercel.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <a
                  href="https://pawstrips.vercel.app"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    display: "inline-block",
                    marginTop: "4px",
                    color: isNight ? "#ffcc80" : "#3e2723",
                    textDecoration: "underline",
                    fontSize: "0.95rem",
                  }}
                >
                  View live site
                </a>
                <a
                  href="https://github.com/quinncharity/pawstrips"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    display: "inline-block",
                    marginTop: "4px",
                    color: isNight ? "#ffcc80" : "#3e2723",
                    textDecoration: "underline",
                    fontSize: "0.95rem",
                  }}
                >
                  View source on GitHub
                </a>
              </div>
            </div>
            <div
              style={{
                background: isNight ? "#37474f" : "#fff",
                padding: "10px",
                border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                color: isNight ? "#eceff1" : "#3e2723",
              }}
            >
              <strong>ML Trading on Databricks</strong>
              <p>
                A personal research project exploring end-to-end ML-driven
                trading workflows on Databricks—from data ingestion and feature
                engineering to model training and backtesting.
              </p>
              <a
                href="https://github.com/quinncharity/ml-trading-databricks"
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  color: isNight ? "#ffcc80" : "#3e2723",
                  textDecoration: "underline",
                  fontSize: "0.95rem",
                }}
              >
                View source on GitHub
              </a>
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
          <div style={{ marginTop: "12px", display: "grid", gap: "12px" }}>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                style={{
                  padding: "10px 12px",
                  background: isNight ? "#37474f" : "#fff8e1",
                  border: `2px dashed ${isNight ? "#cfd8dc" : "#3e2723"}`,
                  borderRadius: "6px",
                }}
              >
                <h3 style={{ margin: "0 0 4px 0" }}>
                  <a
                    href={post.slug}
                    style={{
                      color: isNight ? "#ffcc80" : "#3e2723",
                      textDecoration: "underline",
                    }}
                  >
                    {post.title}
                  </a>
                </h3>
                <small
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: isNight ? "#cfd8dc" : "#5d4037",
                    fontSize: "0.9rem",
                  }}
                >
                  {post.date}
                </small>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "1.05rem",
                    lineHeight: 1.4,
                  }}
                >
                  {post.description}
                </p>
                <a
                  href={post.slug}
                  style={{
                    display: "inline-block",
                    marginTop: "2px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: `1px solid ${isNight ? "#ffcc80" : "#5d4037"}`,
                    color: isNight ? "#ffcc80" : "#5d4037",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Read full entry →
                </a>
              </article>
            ))}
          </div>
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
              href="mailto:hi@quinn.charity"
              style={{
                display: "block",
                color: isNight ? "#ffcc80" : "#3e2723",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              hi@quinn.charity
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
