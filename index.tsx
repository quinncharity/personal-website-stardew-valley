import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "@/components/Game";

const root = createRoot(document.getElementById("root")!);
root.render(<Game />);
