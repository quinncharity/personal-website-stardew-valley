import React from "react";

export function BlogDiaryEntry3() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

  const outerPadding = isMobile ? "24px 12px 48px" : "32px 16px 64px";
  const cardPadding = isMobile ? "24px 16px 32px" : "32px 24px 40px";
  const titleFontSize = isMobile ? "1.9rem" : "2.35rem";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: outerPadding,
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
          padding: cardPadding,
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
            flexWrap: "wrap",
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
          <h1
            style={{
              fontSize: titleFontSize,
              lineHeight: 1.15,
              margin: "6px 0 10px",
              letterSpacing: "-0.03em",
              color: "#0f172a",
              fontWeight: 650,
            }}
          >
            Where AI Will Drive the Biggest Gains in Unexpected Industrial
            Sectors
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
            <span>Industrial AI, process optimization, and safety</span>
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
            When AI makes headlines, the focus is usually on software companies,
            finance, or customer service. But based on my experience in chemical
            engineering research, industry work, and now helping companies
            deploy AI systems at Retool, I believe some of the most significant
            opportunities sit inside industries that are rarely part of the
            mainstream conversation: chemical production, manufacturing, and oil
            and gas.
          </p>

          <p>
            These sectors operate large, complex physical systems with tight
            margins, strict safety requirements, and high regulatory pressure.
            They also generate enormous amounts of real-world sensor data.
            Studies confirm that modern industrial operations produce extremely
            large volumes of time-series data tied to process conditions and
            equipment health.
          </p>

          <p>
            Across projects, I have seen the same theme appear consistently:
            industrial environments are already data rich but operationally
            constrained. The ingredients for AI impact are present, but the
            surrounding infrastructure has not kept pace. This is why these
            unexpected industries may actually be among the best positioned to
            benefit from AI in the coming decade.
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
            Industrial Settings Are Quietly Some of the Most Data-Rich Places in
            the World
          </h2>

          <p>
            Chemical plants, refineries, food processing facilities, and
            large-scale manufacturing lines contain dense networks of
            instrumentation. It is common for a plant to collect years,
            sometimes decades, of high-frequency sensor data. Typical sensors
            include:
          </p>

          <ul>
            <li>flowmeters</li>
            <li>heat and energy meters</li>
            <li>pressure and level indicators</li>
            <li>reaction calorimetry</li>
            <li>FTIR, NIR, or Raman spectrometry</li>
            <li>vibration and acoustic monitoring</li>
            <li>emissions and off-gas analysis</li>
          </ul>

          <p>
            Much of this data ends up in historian databases and SCADA systems
            that log thousands of tags every second. Engineers routinely export
            this information into spreadsheets, clean it manually, and piece
            together trend analyses under time pressure. I have done this myself
            repeatedly and it is slow and frustrating.
          </p>

          <p>The data exists. The challenge is consuming it effectively.</p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            1. Subsurface and Reservoir Intelligence
          </h2>

          <p>
            One of the clearest examples of AI&apos;s value in non-obvious
            industries comes from subsurface modeling and well placement. I
            worked with a customer who used AI models trained on geological
            exploration data, reservoir pressure histories, fracturing profiles,
            and production curves to determine where to place new gas wells.
          </p>

          <p>
            Traditional geology and physics-only reservoir models often struggle
            with nonlinear subsurface interactions. AI helped uncover patterns
            that more rigid models missed. This mirrors what is happening across
            the industry, where operators increasingly explore AI-assisted
            reservoir characterization and drilling optimization.
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
            2. Predictive Safety, Stability, and Risk Reduction
          </h2>

          <p>
            Environmental, health, and safety (EHS) is an area where I believe
            companies stand to gain significantly from AI. Catastrophic failures
            in industrial environments are often preceded by weak signals such
            as:
          </p>

          <ul>
            <li>small temperature deviations in reactors</li>
            <li>irregular vibration signatures in rotating equipment</li>
            <li>slight shifts in flow ratios</li>
            <li>abnormal alarm patterns</li>
          </ul>

          <p>AI models can detect these early signs and support:</p>

          <ul>
            <li>identification of thermal runaway risks</li>
            <li>prediction of equipment failures</li>
            <li>early detection of emissions spikes or leaks</li>
            <li>recommendations for corrective action</li>
            <li>insights into unsafe operating conditions</li>
          </ul>

          <p>
            A 2025 survey found that 49 percent of EHS functions plan to invest
            in AI within the next 12 months, while only 28 percent currently use
            it, highlighting a large gap between intent and deployment.
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
            3. Process Optimization and Efficiency Gains
          </h2>

          <p>
            Chemical and manufacturing processes are highly nonlinear, shaped by
            factors such as feed variability, catalyst degradation,
            hydrodynamics, and thermal gradients. AI can identify complex
            relationships within these systems and improve:
          </p>

          <ul>
            <li>process stability</li>
            <li>setpoint control</li>
            <li>yield</li>
            <li>energy efficiency</li>
            <li>detection of process drift</li>
            <li>batch-to-batch consistency</li>
          </ul>

          <p>
            Even small optimization gains can drive substantial financial impact
            in large-scale operations.
          </p>

          <p>
            A 2025 industry survey reported that nearly one third of
            manufacturers have deployed AI or ML at the facility or network
            level, driven primarily by optimization and predictive maintenance
            use cases.
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
            Why These Sectors Are Ripe for a Software Overhaul
          </h2>

          <p>
            In my experience, one of the biggest barriers to industrial AI
            adoption is not the models themselves but the software ecosystem
            surrounding them.
          </p>

          <p>
            A surprising amount of plant software was originally designed in the
            1980s or earlier. Many facilities still run:
          </p>

          <ul>
            <li>SCADA platforms with proprietary protocols</li>
            <li>PLCs programmed in decades-old ladder logic</li>
            <li>historian databases without modern APIs</li>
            <li>thick-client HMIs that require physical terminals</li>
            <li>OPC Classic servers</li>
            <li>Windows XP or Windows 7 machines for equipment interfaces</li>
          </ul>

          <p>
            Even the engineering tools used for simulation reflect this legacy
            constraint. Aspen Plus, for example, is one of the most widely used
            process simulators in the chemical and refining industries and has
            more than 40 years of development behind it. It is extremely
            powerful and data rich, but its architecture and integration model
            predate modern interoperability standards. Many workflows depend on
            file-based transfers, manual iteration, or fragile intermediate
            formats.
          </p>

          <p>
            These tools remain industry gold standards, but they were not built
            for:
          </p>

          <ul>
            <li>real-time data connectivity</li>
            <li>programmatic integrations</li>
            <li>end-to-end workflow automation</li>
            <li>AI-driven closed-loop optimization</li>
          </ul>

          <p>This creates structural bottlenecks:</p>

          <ul>
            <li>data trapped in siloed systems</li>
            <li>limited interoperability</li>
            <li>reliance on manual exports</li>
            <li>slow change-management cycles</li>
            <li>fragmented IT and OT responsibilities</li>
          </ul>

          <p>
            AI cannot thrive without modernization. I believe unified data
            models, cloud historians, API-forward simulation tools, and more
            interoperable control systems will be the biggest unlock for
            meaningful industrial AI.
          </p>

          <p>
            The gap is not in capability. It is in the scaffolding around the
            capability.
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
            Conclusion
          </h2>

          <p>
            Industrial sectors such as chemicals, manufacturing, and oil and gas
            may not be the first industries people think of when discussing AI,
            but I believe they will become some of the most important AI success
            stories. They operate complex physical systems, generate massive
            amounts of real-world data, and face constant pressure to improve
            efficiency, safety, reliability, and sustainability.
          </p>

          <p>
            The opportunity is enormous, but it depends heavily on modernizing
            the digital infrastructure that surrounds these operations. As
            legacy systems evolve and data becomes more accessible, these
            industries will see the largest gains. They are not late to the AI
            revolution. They are simply waiting for the systems, interfaces, and
            workflows needed to unlock the value of the data they have been
            collecting for decades.
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
            References
          </h2>

          <ol>
            <li>
              SymphonyAI.{" "}
              <em>
                Industrial AI Insights: Using Historians as a Strategic
                Advantage.
              </em>{" "}
              2024.
            </li>
            <li>
              AVEVA.{" "}
              <em>
                Smarter Chemicals: AI Applications in the Chemicals Sector.
              </em>{" "}
              2023.
            </li>
            <li>
              MDPI Energies.{" "}
              <em>
                AI in Unconventional Oil and Gas Exploration and Development.
              </em>{" "}
              2025.
            </li>
            <li>
              Wolters Kluwer.{" "}
              <em>Survey: AI Adoption and Investment Trends in EHS.</em> 2025.
            </li>
            <li>
              Safety and Health Magazine.{" "}
              <em>Survey Asks Safety Pros if They Are Using AI.</em> 2025.
            </li>
            <li>
              Deloitte. <em>2025 Smart Manufacturing and Operations Survey.</em>{" "}
              2025.
            </li>
            <li>
              AspenTech. <em>Aspen Plus Product Overview.</em> 2024.
            </li>
          </ol>
        </article>
      </div>
    </div>
  );
}
