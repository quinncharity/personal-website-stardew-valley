import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "@/components/Game";
import { BlogDiaryEntry1 } from "@/components/BlogDiaryEntry1";
import { BlogDiaryEntry2 } from "@/components/BlogDiaryEntry2";
import { BlogDiaryEntry3 } from "@/components/BlogDiaryEntry3";
import { BlogDiaryEntry4 } from "@/components/BlogDiaryEntry4";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const normalizePath = (path: string) =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

const currentPath = normalizePath(window.location.pathname);

const routes = {
  diaryEntry1: "/blog/diary-of-a-solutions-engineer-entry-1",
  diaryEntry2: "/blog/everyone-wants-ai-but-few-know-what-it-actually-takes",
  diaryEntry3:
    "/blog/where-ai-will-drive-the-biggest-gains-in-unexpected-industrial-sectors",
  diaryEntry4:
    "/blog/the-cognitive-decoupling-why-im-betting-on-reasoning-over-flow-in-ai-coding",
} as const;

const isDiaryEntry1 = currentPath === routes.diaryEntry1;
const isDiaryEntry2 = currentPath === routes.diaryEntry2;
const isDiaryEntry3 = currentPath === routes.diaryEntry3;
const isDiaryEntry4 = currentPath === routes.diaryEntry4;

// Toggle global page mode (game vs. blog) to adjust base styling
document.body.classList.remove("game-mode", "blog-mode");
document.body.classList.add(
  isDiaryEntry1 || isDiaryEntry2 || isDiaryEntry3 || isDiaryEntry4
    ? "blog-mode"
    : "game-mode"
);

const root = createRoot(document.getElementById("root")!);

if (isDiaryEntry1) {
  root.render(
    <>
      <BlogDiaryEntry1 />
      <Analytics />
      <SpeedInsights />
    </>
  );
} else if (isDiaryEntry2) {
  root.render(
    <>
      <BlogDiaryEntry2 />
      <Analytics />
      <SpeedInsights />
    </>
  );
} else if (isDiaryEntry3) {
  root.render(
    <>
      <BlogDiaryEntry3 />
      <Analytics />
      <SpeedInsights />
    </>
  );
} else if (isDiaryEntry4) {
  root.render(
    <>
      <BlogDiaryEntry4 />
      <Analytics />
      <SpeedInsights />
    </>
  );
} else {
  root.render(
    <>
      <Game />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
