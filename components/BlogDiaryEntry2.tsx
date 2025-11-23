import React from "react";

export function BlogDiaryEntry2() {
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
            Everyone Wants AI, but Few Know What It Actually Takes
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
            <span>Observations from working with companies adopting AI</span>
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
            Across startups, mid-market teams, and even Fortune 10s, I keep
            noticing the same pattern: companies are excited about AI, they have
            budget for AI, and they want AI in their products and internal
            workflows. But they often do not know how to incorporate it, how to
            scaffold it, or how to maintain it after the initial excitement
            wears off.
          </p>

          <p>
            This post is not a prescription. It is simply a set of patterns I
            keep seeing in the field. My thinking will keep evolving, but here
            is where it stands today.
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
            The data exists, but the data foundations do not
          </h2>

          <p>
            Almost every company tells me they have plenty of data. Then I look
            at where that data lives, and it is split across warehouses, CRMs,
            internal tools, spreadsheets, SaaS systems, logs, and departmental
            databases.
          </p>

          <p>Common patterns:</p>

          <ul>
            <li>No unified identifiers</li>
            <li>No documentation</li>
            <li>Duplication across systems</li>
            <li>Stale or untrusted datasets</li>
            <li>Pipelines owned by a single engineer</li>
            <li>Inconsistent governance across data sources</li>
          </ul>

          <p>
            With this kind of fragmentation, teams do not know which data is
            suitable for AI, which data is off limits, or whether a model will
            behave consistently. The model is rarely the issue. The foundation
            beneath it is.
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
            Authentication and access control slow everything down
          </h2>

          <p>
            Many companies spend more time wrestling with tokens, identity
            providers, scopes, and access rules than with the model itself.
          </p>

          <p>Patterns I see repeatedly:</p>

          <ul>
            <li>Token rotation handled manually</li>
            <li>Legacy OAuth flows no one wants to touch</li>
            <li>Unclear documentation for internal services</li>
            <li>Permissions that break when integrating a new model</li>
            <li>
              Services that need access to data but lack a compliant way to
              authenticate
            </li>
          </ul>

          <p>
            Even the most sophisticated engineering teams run into this. AI
            reveals gaps in access control that went unnoticed for years.
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
            AI ambition arrives before the architecture
          </h2>

          <p>
            A very common moment in conversations is when a customer realizes AI
            is not just a model call. They want AI, but they do not yet have:
          </p>

          <ul>
            <li>A location in their architecture where inference should live</li>
            <li>Data routing or context retrieval</li>
            <li>Logging or observability for model behavior</li>
            <li>Guardrails or validation layers</li>
            <li>Any owner responsible for long-term maintenance</li>
          </ul>

          <p>
            Many teams only see the full picture after I show an example of what
            an AI workflow could look like inside their environment. They want
            the outcome, but the system required to support that outcome does
            not exist yet.
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
            Costs and latency surprise teams
          </h2>

          <p>
            Teams expect AI calls to behave like normal API calls. Reality is
            different.
          </p>

          <p>Surprises include:</p>

          <ul>
            <li>High GPU inference costs</li>
            <li>Latency that varies dramatically across providers</li>
            <li>The need for caching or precomputation</li>
            <li>
              Large jumps in cost when moving from prototype to production
            </li>
            <li>Multiple chained calls inflating latency unexpectedly</li>
          </ul>

          <p>
            Whether a company is optimizing for cost or performance, almost
            everyone underestimates how much orchestration is required.
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
            Pipelines are more brittle than anyone admits
          </h2>

          <p>
            Many companies have core pipelines that are operationally fragile.
            When AI is introduced, that fragility becomes obvious.
          </p>

          <p>Examples:</p>

          <ul>
            <li>A job scheduled on a forgotten cron tab</li>
            <li>A data export that silently fails</li>
            <li>A script that no one wants to modify</li>
            <li>A workflow that cannot scale to real-time usage</li>
          </ul>

          <p>The model is only as reliable as the system feeding it.</p>

          <h2
            style={{
              marginTop: "28px",
              marginBottom: "8px",
              fontSize: "1.35rem",
              letterSpacing: "-0.01em",
              color: "#111827",
            }}
          >
            Cross-team collaboration becomes the real bottleneck
          </h2>

          <p>
            AI adoption forces interaction between teams that rarely collaborate
            deeply: security, data, engineering, infra, product, compliance, and
            ML.
          </p>

          <p>The typical pattern:</p>

          <ul>
            <li>No single team has end-to-end ownership</li>
            <li>No one group can move without the others</li>
            <li>Requirements get stuck in review loops</li>
            <li>Teams disagree on risk versus benefit</li>
          </ul>

          <p>
            The blocker is not technical difficulty. It is organizational
            distribution.
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
            Shadow AI experiments appear everywhere
          </h2>

          <p>
            Before a company finishes its official AI strategy, people begin
            experimenting on their own:
          </p>

          <ul>
            <li>Ops workflows augmented with personal GPT accounts</li>
            <li>Designers creating mockups using unapproved tools</li>
            <li>PMs testing prototypes in spreadsheets</li>
            <li>Engineers building unofficial internal agents</li>
          </ul>

          <p>
            Shadow AI proves interest, but it also creates risk. It reveals that
            employees want AI before the organization has given them a safe,
            governed place to use it.
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
            No one defines what success should look like
          </h2>

          <p>
            When I ask teams to describe success, I often hear vague answers.
          </p>

          <p>Common responses:</p>

          <ul>
            <li>We want AI because everyone else is using it</li>
            <li>We will know success when we see it</li>
            <li>We need AI so we do not fall behind competitors</li>
          </ul>

          <p>
            Without metrics, error tolerances, workflow details, or user
            acceptance criteria, teams struggle to evaluate progress. Adoption
            suffers because expectations were never concretely defined.
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
            Maintenance is an afterthought
          </h2>

          <p>
            Most internal discussions focus on launch rather than longevity. But
            maintenance determines whether the system survives the first six
            months.
          </p>

          <p>Overlooked tasks include:</p>

          <ul>
            <li>Monitoring for drift</li>
            <li>Updating prompts or models</li>
            <li>Regenerating embeddings</li>
            <li>Logging and auditing</li>
            <li>Versioning instructions and policies</li>
            <li>Refreshing dependency stacks</li>
          </ul>

          <p>
            AI programs that begin as projects eventually need to function as
            living systems, but few teams prepare for that transition.
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
            The speed of innovation exceeds enterprise processes
          </h2>

          <p>
            This is one of the fastest-emerging patterns. By the time a company
            finishes vetting a model, it is often outdated.
          </p>

          <p>Typical sequence:</p>

          <ol>
            <li>The enterprise approves Model A after months of review.</li>
            <li>
              During that time, employees start using Model C or D in their
              personal workflows because it is newer and better.
            </li>
            <li>
              The organization ends up with low adoption of the approved tool
              and increased risk from unapproved usage.
            </li>
          </ol>

          <p>
            Enterprises expect employees to use sanctioned models. Employees
            expect to use what works best. The two timelines do not match. As a
            result, companies do not see the adoption they anticipated, and
            liability increases due to shadow usage.
          </p>

          <p>
            This is the first technology wave where a company’s internal
            decision cycle is slower than the pace of model evolution. That
            mismatch is becoming one of the most important factors in AI
            readiness.
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
            Closing thoughts
          </h2>

          <p>
            These patterns are not signs of failure. They are signs that
            companies are still early in their AI journey, even if the desire
            and budget are already in place.
          </p>

          <p>
            Everyone wants AI. Everyone believes they need AI. But few have the
            data foundation, architecture, governance, or internal velocity
            required to make AI stick.
          </p>

          <p>
            This gap between enthusiasm and readiness is where most of the
            meaningful work happens. And watching how different organizations
            navigate it has become one of the most interesting parts of my job.
          </p>
        </article>
      </div>
    </div>
  );
}


