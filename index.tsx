import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "@/components/Game";
import { BlogDiaryEntry1 } from "@/components/BlogDiaryEntry1";

const normalizePath = (path: string) =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

const currentPath = normalizePath(window.location.pathname);
const isDiaryEntry1 =
  currentPath === "/blog/diary-of-a-solutions-engineer-entry-1";

// Toggle global page mode (game vs. blog) to adjust base styling
document.body.classList.remove("game-mode", "blog-mode");
document.body.classList.add(isDiaryEntry1 ? "blog-mode" : "game-mode");

const root = createRoot(document.getElementById("root")!);

if (isDiaryEntry1) {
  root.render(<BlogDiaryEntry1 />);
} else {
  root.render(<Game />);
}
