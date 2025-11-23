import React from "react";

export function BlogDiaryEntry1() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 16px 64px",
        background:
          "radial-gradient(circle at top, #ffffff 0, #f5f5f7 45%, #eceff1 100%)",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow:
            "0 18px 45px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(148, 163, 184, 0.3)",
          padding: "32px 24px 40px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, system-ui, "SF Pro Text", "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <a
            href="/"
            style={{
              fontSize: "0.9rem",
              color: "#4b5563",
              textDecoration: "none",
              padding: "6px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(156, 163, 175, 0.8)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background:
                "linear-gradient(120deg, rgba(243,244,246,0.9), rgba(229,231,235,0.9))",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>←</span>
            <span>Back to the farm</span>
          </a>
          <span
            style={{
              fontSize: "0.85rem",
              padding: "4px 10px",
              borderRadius: "999px",
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid rgba(129, 140, 248, 0.35)",
            }}
          >
            Diary of a Solutions Engineer
          </span>
        </div>

        <header style={{ marginBottom: "24px" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "0.8rem",
              color: "#6b7280",
              margin: 0,
            }}
          >
            Entry #1
          </p>
          <h1
            style={{
              fontSize: "2.35rem",
              lineHeight: 1.15,
              margin: "6px 0 10px",
              letterSpacing: "-0.03em",
              color: "#0f172a",
              fontWeight: 650,
            }}
          >
            Diary of a Solutions Engineer – Entry #1
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.98rem",
              color: "#6b7280",
            }}
          >
            <span>Published November 23, 2025</span>
            <span style={{ margin: "0 6px" }}>•</span>
            <span>Career journey, systems thinking, and AI</span>
          </p>
        </header>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid rgba(209, 213, 219, 0.9)",
            margin: "20px 0 26px",
          }}
        />

        <article
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#111827",
          }}
        >
          <p style={{ marginTop: 0 }}>
            I grew up as the youngest of nine children in rural Pennsylvania. I
            was homeschooled for most of my childhood, far from any real
            exposure to computers or technology. We did not even have a TV. My
            world was shaped by lively family discussions where my dad asked
            thoughtful questions and pushed us to examine our assumptions. Much
            of my free time was spent outdoors with my brother or in our large
            home library, reading economics, history, politics, and philosophy.
            My mother, a chemistry professor, made sure I had a strong
            foundation in math and science.
          </p>

          <p>
            My early strengths did not point toward software or AI. I excelled
            in mock trial. I loved debate, structure, strategy, and the
            challenge of thinking on my feet. Competing nationally taught me how
            to write persuasively and understand people. For years, law seemed
            like the path I would take.
          </p>

          <p>
            But I also loved science. I loved understanding systems and how
            things worked. I loved the idea that if you understood something
            well enough, you could change it for the better.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Where It Actually Started
          </h2>

          <p>
            For my high-school senior capstone, I attended an engineering camp
            at the University of Dayton. That week shifted everything.
            Engineering felt practical and alive. It was not just solving
            problems on paper, it was building something real. I built a small
            radio and speaker using an Arduino and felt an unexpected sense of
            accomplishment.
          </p>

          <p>
            There may have also been a small rebellious streak in me that wanted
            to choose something entirely different from what people expected.
          </p>

          <p>
            I remember my mock trial coach asking almost daily which major I had
            decided on because I genuinely went back and forth. I was torn
            between two futures: law and engineering.
          </p>

          <p>
            In the end, engineering won. I knew I could always pursue law later,
            but choosing a humanities major first would have made pivoting
            toward engineering difficult. More importantly, engineering felt
            like the discipline that built the world. It let me pursue my other
            interests while contributing something tangible.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Penn State and the Years of Grit
          </h2>

          <p>
            I entered Penn State as an engineering major and joined a research
            lab immediately. By the end of my freshman year, I had contributed
            to a published research project.
          </p>

          <p>
            Then came the intensity. While studying thermodynamics, reactor
            design, mass and heat transfer, calculus, and organic chemistry, I
            worked as a resident assistant to make college more affordable and
            continued competing nationally in mock trial.
          </p>

          <p>
            Most weekends we drove seven or more hours to tournaments and stayed
            in Red Roof Inns because that was all our team could afford. I
            studied reaction kinetics in the backseat of the car and reviewed
            case law between rounds.
          </p>

          <p>
            Those years shaped me. They built endurance and taught me how to
            operate under pressure. They made me comfortable living between
            communication and technical rigor.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Discovering Automation
          </h2>

          <p>
            During the first of my two co-op rotations at Dow Chemical, I
            encountered industrial automation. I had dabbled in coding before,
            but seeing automated systems orchestrate complex processes at scale
            opened my eyes to how software could amplify engineering far beyond
            manual design.
          </p>

          <p>
            That realization stayed with me. It eventually changed the direction
            of my career.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            The Big Leap
          </h2>

          <p>
            I am not someone who settles easily. The feeling that software was
            the future grew stronger, and eventually I made a decision that
            surprised almost everyone. I turned down a competitive chemical
            engineering offer to pursue software engineering instead.
          </p>

          <p>
            I called the manager who extended the offer to explain my decision.
            She encouraged me, saying that adding software skills would make me
            an even stronger engineer. Her support helped reinforce my
            conviction.
          </p>

          <p>
            My family and friends were confused because they saw how hard I had
            worked as an engineering student. But the truth is that chemical
            engineering shaped the way I think. It taught me to model systems
            from both molecular and macro perspectives, which later helped me
            understand cloud computing, distributed systems, and large-scale
            software architecture.
          </p>

          <p>
            Imposter syndrome arrived quickly. Many people around me had been
            coding since childhood while I had only recently opened a command
            line. But I learned by building, and the more I built, the more
            everything clicked.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Capital One: Becoming a Builder
          </h2>

          <p>
            I began my software engineering career on the RPA team at Capital
            One, building automations for paper workflows and back-office
            customer service operations. I was eager to learn and take on more
            responsibility. Within months, I was helping lead modernization
            efforts, including migrating automation processes from legacy VDI
            environments to AWS EC2. This improved reliability and scalability
            and generated meaningful cost savings.
          </p>

          <p>
            I also won first place in a company-wide hackathon for a project
            that introduced quick-search keyboard shortcuts to speed up customer
            service agent workflows. Around the same time, I had the opportunity
            to attend the Grace Hopper Celebration for a paper I submitted in
            undergrad on innovation dynamics within engineering design teams.
          </p>

          <p>
            As I worked across teams, I noticed a pattern. People did not just
            want engineering to build solutions for them. They wanted autonomy,
            transparency, and the ability to build and modify workflows
            themselves.
          </p>

          <p>
            So I interviewed stakeholders, mapped pain points, and identified
            the blockers. This led to one of the most impactful projects of my
            early career. I pitched and built a self-serve RPA platform that
            abstracted repetitive tasks and enabled users to create and manage
            automations independently.
          </p>

          <p>
            During that project, something became clear. I loved engineering,
            but I also loved collaborating with people, understanding their
            goals, and shaping solutions with them.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Finding Solutions Engineering
          </h2>

          <p>
            For years, I envied people who instantly recognized their passion.
            Mine never felt singular. In solutions engineering, everything
            finally aligned. It was the intersection of my interests:
            engineering, communication, systems thinking, problem solving, and
            real collaboration.
          </p>

          <p>
            Today, I pitch to executives, debug issues with engineers, ideate
            with product and project managers, and learn something new every
            day.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Why This Journey Gives Me an Edge
          </h2>

          <p>
            Looking back, the through-line in my path has always been the same.
            I learned to think like a scientist and communicate like an
            advocate. Growing up homeschooled in a large family taught me to be
            resourceful and self-driven. Years of national mock trial
            competition taught me to break down complex ideas for any audience.
            Chemical engineering trained me to see the world as interconnected
            systems. Software engineering taught me to build those systems. And
            solutions engineering showed me how to bring people into the
            process, align with their goals, and turn technology into something
            genuinely useful.
          </p>

          <p>
            That combination gives me a perspective that is not common. I can
            speak the language of deep technical teams while also explaining
            technical constraints to business stakeholders. I can model problems
            the way an engineer does and communicate solutions the way a
            strategist does. It lets me move fluidly from debugging
            infrastructure to walking a CFO through return on investment to
            designing AI-powered architectures that meet real constraints in the
            field.
          </p>

          <p>
            It is also why AI systems have become such a natural extension of my
            work. Understanding large models, training dynamics, and performance
            tradeoffs feels like the culmination of everything I have done so
            far. It brings together the systems mindset from engineering, the
            communication skills from mock trial, and the practical problem
            solving from solutions engineering.
          </p>

          <p>
            What sets me apart is not that I followed a traditional path. It is
            that my path taught me how to integrate multiple modes of thinking.
            I build, analyze, question, explain, and connect. And in a field
            where cutting-edge technology only matters when it can be applied to
            real problems, that combination has become my greatest strength.
          </p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Where I Am Now: AI, Systems Performance, and What Comes Next
          </h2>

          <p>
            The newest part of my journey has been exploring AI systems and
            model performance. Working with customers in highly regulated
            industries made it clear that AI, when paired with good engineering,
            can unlock enormous value.
          </p>

          <p>
            I have been building AI-driven workflows using LLMs, embeddings,
            RAG, and multi-agent patterns, with a strong focus on compliance,
            observability, and reliability.
          </p>

          <p>
            I am currently working through{" "}
            <em>
              AI Systems Performance: End-to-End Infrastructure and Platforms
              for Training Large AI Models
            </em>{" "}
            and pairing this with what I learned in my M.S. program at Georgia
            Tech, where I built financial LLM models, explored bias mitigation
            techniques, and designed agent frameworks for industrial
            environments.
          </p>

          <p>
            This intersection of AI, systems engineering, and human-centered
            design has become the focus of my work.
          </p>

          <p>
            Because the constant across my journey has never changed. I care
            about enabling positive change. I care about building things that
            matter. And I care about making technology more human-centered and
            accessible.
          </p>

          <p>
            This diary is where I plan to document that journey, what I am
            learning now, and where I hope to contribute next. Stay tuned for my
            next article on how I think industrial settings could benefit from
            AI.
          </p>
        </article>
      </div>
    </div>
  );
}


