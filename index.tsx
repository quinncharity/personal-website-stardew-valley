import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// --- Constants & Types ---
const TILE_SIZE = 32;
const SCALE = 2; // Visual scale
// Reduced map size to create a compact "Farm Yard" feel
const MAP_WIDTH = 30; // 30 * 32 = 960px
const MAP_HEIGHT = 25; // 25 * 32 = 800px

// Playable Area Bounds (Fence placement)
const BOUNDS = {
  x: 0,
  y: 0,
  w: 800,
  h: 600,
};

type EntityType = "player" | "dog" | "donkey" | "goat" | "rabbit" | "cow";
type SceneryType = "tree" | "bush" | "fence_h" | "fence_v" | "fence_c" | "gate"; // fence horizontal, vertical, corner
type InteractableType =
  | "farmHouse"
  | "redBarn"
  | "projectGreenhouse"
  | "mailbox"
  | "board"
  | "silo";

interface Entity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  direction: "down" | "up" | "left" | "right";
  frame: number;
  state: "idle" | "walk" | "run";
  speed: number;
  idleTimer?: number;
}

interface Scenery {
  id: string;
  type: SceneryType;
  x: number;
  y: number;
}

interface Interactable {
  type: InteractableType;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  interactive?: boolean; // Defaults to true
}

interface Pond {
  x: number;
  y: number;
  width: number;
  height: number;
}

// --- Asset Generation (Procedural Pixel Art) ---
const createSprite = (
  width: number,
  height: number,
  drawFn: (ctx: CanvasRenderingContext2D) => void
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx);
  }
  return canvas;
};

const Assets = {
  ground: createSprite(32, 32, (ctx) => {
    ctx.fillStyle = "#567d46"; // Grass base
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = "#4a6b3c"; // Darker grass blades
    ctx.fillRect(4, 4, 2, 2);
    ctx.fillRect(20, 10, 2, 2);
    ctx.fillRect(10, 25, 2, 2);
  }),
  path: createSprite(32, 32, (ctx) => {
    ctx.fillStyle = "#9b7653"; // Dirt
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = "#8a6645"; // Pebbles
    ctx.fillRect(5, 5, 4, 4);
    ctx.fillRect(20, 20, 3, 3);
  }),
  pond: createSprite(128, 96, (ctx) => {
    // Water base
    ctx.fillStyle = "#4fc3f7";
    ctx.beginPath();
    // Rough organic shape
    ctx.moveTo(10, 20);
    ctx.bezierCurveTo(10, 0, 118, 0, 118, 20);
    ctx.bezierCurveTo(128, 50, 118, 96, 64, 96);
    ctx.bezierCurveTo(10, 96, 0, 50, 10, 20);
    ctx.fill();

    // Border/Shore
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ripples
    ctx.strokeStyle = "#e1f5fe";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(50, 30);
    ctx.moveTo(80, 60);
    ctx.lineTo(100, 60);
    ctx.stroke();
  }),
  fish: createSprite(16, 16, (ctx) => {
    ctx.fillStyle = "#ff7043"; // Orange fish
    ctx.beginPath();
    ctx.ellipse(8, 8, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#d84315"; // Tail
    ctx.beginPath();
    ctx.moveTo(14, 8);
    ctx.lineTo(16, 6);
    ctx.lineTo(16, 10);
    ctx.fill();
    ctx.fillStyle = "#fff"; // Eye
    ctx.fillRect(4, 6, 2, 2);
  }),
  corn: createSprite(32, 32, (ctx) => {
    ctx.fillStyle = "#388e3c"; // Stalk Green
    ctx.fillRect(12, 4, 8, 28);
    ctx.fillStyle = "#4caf50"; // Leaves
    ctx.beginPath();
    ctx.ellipse(10, 16, 8, 4, Math.PI / 4, 0, Math.PI * 2);
    ctx.ellipse(22, 20, 8, 4, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fbc02d"; // Corn Cob
    ctx.fillRect(14, 8, 4, 10);
  }),
  fence_h: createSprite(32, 32, (ctx) => {
    // Wood Fence Horizontal
    ctx.fillStyle = "#8d6e63"; // Medium Wood
    ctx.fillRect(10, 12, 12, 20); // Post
    ctx.fillStyle = "#6d4c41"; // Darker Post Shadow
    ctx.fillRect(18, 12, 4, 20);

    ctx.fillStyle = "#a1887f"; // Light Wood Rail
    ctx.fillRect(0, 16, 32, 4); // Top Rail
    ctx.fillRect(0, 24, 32, 4); // Bottom Rail

    ctx.fillStyle = "#5d4037"; // Rail Shadow
    ctx.fillRect(0, 20, 32, 1);
    ctx.fillRect(0, 28, 32, 1);
  }),
  fence_v: createSprite(32, 32, (ctx) => {
    // Wood Fence Vertical
    ctx.fillStyle = "#8d6e63"; // Medium Wood
    ctx.fillRect(10, 0, 12, 32); // Post continuous
    ctx.fillStyle = "#6d4c41"; // Darker Post Shadow
    ctx.fillRect(18, 0, 4, 32);

    // Hint of connection
    ctx.fillStyle = "#a1887f";
    ctx.fillRect(12, 10, 8, 4);
    ctx.fillRect(12, 20, 8, 4);
  }),
  fence_c: createSprite(32, 32, (ctx) => {
    // Corner Post
    ctx.fillStyle = "#8d6e63";
    ctx.fillRect(8, 8, 16, 24);
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(20, 8, 4, 24);
    // Rails going right and down? Simplified to just a post.
    ctx.fillStyle = "#a1887f";
    ctx.fillRect(8, 8, 16, 2); // Cap
  }),
  gate: createSprite(32, 32, (ctx) => {
    // Gate posts
    ctx.fillStyle = "#8d6e63";
    ctx.fillRect(0, 8, 6, 24);
    ctx.fillRect(26, 8, 6, 24);
    // Gate door (lighter wood)
    ctx.fillStyle = "#bcaaa4";
    ctx.fillRect(6, 12, 20, 4); // Top rail
    ctx.fillRect(6, 24, 20, 4); // Bottom rail
    ctx.fillRect(10, 12, 4, 16); // Vertical slat
    ctx.fillRect(18, 12, 4, 16); // Vertical slat
    // Hinge/Latch
    ctx.fillStyle = "#3e2723";
    ctx.fillRect(24, 14, 2, 2);
  }),
  tree: createSprite(48, 64, (ctx) => {
    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(24, 58, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Trunk
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(20, 40, 8, 24);
    // Leaves (Pine style)
    ctx.fillStyle = "#2e7d32";
    ctx.beginPath();
    ctx.moveTo(8, 48);
    ctx.lineTo(24, 16);
    ctx.lineTo(40, 48);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(10, 32);
    ctx.lineTo(24, 4);
    ctx.lineTo(38, 32);
    ctx.fill();
  }),
  bush: createSprite(32, 32, (ctx) => {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(16, 28, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1b5e20"; // Dark Green
    ctx.beginPath();
    ctx.arc(16, 16, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4caf50"; // Highlights
    ctx.beginPath();
    ctx.arc(12, 12, 4, 0, Math.PI * 2);
    ctx.arc(20, 14, 3, 0, Math.PI * 2);
    ctx.fill();
  }),
  target: createSprite(32, 32, (ctx) => {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(16, 16, 4, 0, Math.PI * 2);
    ctx.fill();
  }),
  player: createSprite(32, 32, (ctx) => {
    // Charity: Brown hair, White shirt, Blue pants
    ctx.fillStyle = "#5d4037"; // Hair
    ctx.fillRect(10, 2, 12, 10);
    ctx.fillRect(8, 6, 2, 8); // Side hair
    ctx.fillRect(22, 6, 2, 8);
    ctx.fillStyle = "#ffccaa"; // Skin
    ctx.fillRect(10, 8, 12, 8);
    ctx.fillStyle = "#ffffff"; // Shirt
    ctx.fillRect(10, 16, 12, 8);
    ctx.fillStyle = "#2196f3"; // Pants
    ctx.fillRect(11, 24, 4, 8);
    ctx.fillRect(17, 24, 4, 8);

    // Watering Can
    ctx.fillStyle = "#90a4ae"; // Metal Grey
    ctx.fillRect(0, 18, 8, 6); // Can Body
    ctx.fillRect(1, 16, 2, 4); // Handle
    ctx.fillRect(8, 16, 4, 2); // Spout
  }),
  dog: createSprite(48, 32, (ctx) => {
    // Bernese Mountain Dog: Enhanced Profile
    ctx.fillStyle = "#111"; // Jet Black
    ctx.fillRect(8, 10, 28, 14);
    ctx.fillStyle = "#111";
    ctx.fillRect(28, 4, 12, 12);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(36, 10, 6, 6);
    ctx.fillRect(32, 4, 4, 10);
    ctx.fillStyle = "#111";
    ctx.fillRect(28, 4, 6, 6);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(8, 14, 10, 10);
    ctx.fillStyle = "#8d6e63";
    ctx.fillRect(8, 24, 6, 8);
    ctx.fillRect(30, 24, 6, 8);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 10, 8, 4);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 10, 3, 3);
  }),
  donkey: createSprite(32, 32, (ctx) => {
    // Grey Donkey
    ctx.fillStyle = "#9e9e9e";

    // Body
    ctx.beginPath();
    ctx.ellipse(16, 20, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.beginPath();
    ctx.moveTo(8, 18);
    ctx.lineTo(8, 10);
    ctx.lineTo(14, 20);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(6, 10, 5, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Mane
    ctx.fillStyle = "#424242";
    ctx.fillRect(9, 8, 2, 8); // Neck mane
    ctx.fillRect(6, 4, 2, 3); // Forelock

    // Ears (Long)
    ctx.fillStyle = "#9e9e9e";
    ctx.beginPath();
    ctx.ellipse(8, 4, 2, 5, 0.2, 0, Math.PI * 2);
    ctx.ellipse(4, 5, 2, 5, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = "#757575";
    ctx.fillRect(10, 24, 3, 8);
    ctx.fillRect(20, 24, 3, 8);

    // Hooves
    ctx.fillStyle = "#212121";
    ctx.fillRect(10, 30, 3, 2);
    ctx.fillRect(20, 30, 3, 2);

    // Muzzle
    ctx.fillStyle = "#e0e0e0"; // Light muzzle
    ctx.fillRect(2, 12, 3, 4);

    // Tail
    ctx.fillStyle = "#424242";
    ctx.beginPath();
    ctx.moveTo(26, 20);
    ctx.lineTo(28, 26);
    ctx.stroke();
  }),
  goat: createSprite(32, 32, (ctx) => {
    ctx.fillStyle = "#f5f5f5"; // White
    ctx.fillRect(8, 12, 16, 12);
    ctx.fillStyle = "#e0e0e0"; // Head
    ctx.fillRect(6, 8, 8, 8);
    ctx.fillStyle = "#795548"; // Horns
    ctx.fillRect(6, 6, 2, 4);
    ctx.fillRect(10, 6, 2, 4);
  }),
  rabbit: createSprite(16, 16, (ctx) => {
    ctx.fillStyle = "#fff8e1";
    ctx.fillRect(4, 8, 8, 6); // Body
    ctx.fillRect(4, 4, 2, 4); // Ears
    ctx.fillRect(8, 4, 2, 4);
  }),
  cow: createSprite(32, 32, (ctx) => {
    // Simple blocky cow (black & white)
    // Body
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(6, 10, 20, 14);
    // Spots
    ctx.fillStyle = "#424242";
    ctx.fillRect(8, 12, 4, 4);
    ctx.fillRect(18, 16, 5, 4);
    // Head
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(2, 10, 8, 8);
    // Muzzle
    ctx.fillStyle = "#ffcc80";
    ctx.fillRect(2, 15, 8, 4);
    // Ears
    ctx.fillStyle = "#424242";
    ctx.fillRect(2, 8, 2, 3);
    ctx.fillRect(8, 8, 2, 3);
    // Legs
    ctx.fillStyle = "#bdbdbd";
    ctx.fillRect(8, 22, 3, 6);
    ctx.fillRect(18, 22, 3, 6);
    // Hooves
    ctx.fillStyle = "#424242";
    ctx.fillRect(8, 26, 3, 2);
    ctx.fillRect(18, 26, 3, 2);
  }),
  farmHouse: createSprite(128, 128, (ctx) => {
    // Farm House (About Me) - Brick Style
    // Brick Wall
    ctx.fillStyle = "#bf360c"; // Deep Red Brick base
    ctx.fillRect(16, 48, 96, 64);

    // Brick Texture
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(16, 48 + i * 8, 96, 1); // Horiz lines
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        let offset = (i % 2) * 8;
        ctx.fillRect(16 + j * 16 + offset, 48 + i * 8, 1, 8); // Vert lines
      }
    }

    // Roof
    ctx.fillStyle = "#3e2723"; // Dark Brown
    ctx.beginPath();
    ctx.moveTo(8, 48);
    ctx.lineTo(64, 16);
    ctx.lineTo(120, 48);
    ctx.fill();

    // Porch / Deck
    ctx.fillStyle = "#4e342e";
    ctx.fillRect(16, 100, 96, 12);

    // Door
    ctx.fillStyle = "#5d4037"; // Dark Wood
    ctx.fillRect(56, 72, 16, 28);
    // Door Knob
    ctx.fillStyle = "#ffeb3b";
    ctx.fillRect(68, 86, 2, 2);

    // Windows
    ctx.fillStyle = "#81d4fa"; // Blue glass
    ctx.fillRect(24, 64, 16, 16);
    ctx.fillRect(88, 64, 16, 16);
    // Window Frame
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 64, 16, 16);
    ctx.strokeRect(88, 64, 16, 16);
  }),
  redBarn: createSprite(160, 128, (ctx) => {
    // Red Barn (Resume)
    ctx.fillStyle = "#b71c1c"; // Red
    ctx.fillRect(16, 48, 128, 80);
    ctx.fillStyle = "#3e2723"; // Dark Roof
    ctx.beginPath();
    ctx.moveTo(8, 48);
    ctx.lineTo(80, 8);
    ctx.lineTo(152, 48);
    ctx.fill();
    // Big Doors
    ctx.fillStyle = "#fff";
    ctx.fillRect(48, 80, 64, 48);
    ctx.fillStyle = "#b71c1c";
    ctx.beginPath();
    ctx.moveTo(48, 80);
    ctx.lineTo(80, 96);
    ctx.lineTo(112, 80);
    ctx.fill();
  }),
  projectGreenhouse: createSprite(128, 112, (ctx) => {
    // Base Setup
    const w = 128;
    const h = 112;
    const floorY = 108;

    // Interior (Visible through glass)
    ctx.fillStyle = "#4e342e"; // Dirt floor
    ctx.fillRect(10, floorY - 40, w - 20, 40);

    // Rows of Vegetables (Dirt Paths)
    ctx.fillStyle = "#3e2723"; // Darker Dirt rows
    ctx.fillRect(14, floorY - 36, 100, 8);
    ctx.fillRect(14, floorY - 24, 100, 8);
    ctx.fillRect(14, floorY - 12, 100, 8);

    const drawVeggie = (
      x: number,
      y: number,
      type: "pumpkin" | "carrot" | "green"
    ) => {
      if (type === "pumpkin") {
        ctx.fillStyle = "#ef6c00"; // Orange
        ctx.fillRect(x - 2, y - 2, 4, 4); // Pixel pumpkin
        ctx.fillStyle = "#2e7d32"; // Stem
        ctx.fillRect(x - 1, y - 4, 2, 2);
      } else if (type === "carrot") {
        ctx.fillStyle = "#2e7d32"; // Greens
        ctx.fillRect(x - 1, y - 4, 2, 3);
        ctx.fillStyle = "#ff6f00"; // Top of carrot visible
        ctx.fillRect(x - 1, y - 1, 2, 2);
      } else {
        // Greens/Lettuce
        ctx.fillStyle = "#43a047";
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.fillStyle = "#81c784";
        ctx.fillRect(x - 1, y - 3, 2, 2);
      }
    };

    // Row 1: Pumpkins
    for (let i = 0; i < 6; i++) drawVeggie(20 + i * 16, floorY - 32, "pumpkin");
    // Row 2: Carrots
    for (let i = 0; i < 7; i++) drawVeggie(20 + i * 14, floorY - 20, "carrot");
    // Row 3: Greens
    for (let i = 0; i < 6; i++) drawVeggie(20 + i * 16, floorY - 8, "green");

    // Glass Color
    const glass = "rgba(129, 212, 250, 0.3)"; // Light Blue Transparent (More transparent to see veggies)
    const metal = "#78909c"; // Blue Grey Frame

    const cx = 64;
    const cWidth = 48; // Center width
    const cHalf = cWidth / 2;
    const sWidth = 36; // Side width

    const peakY = 32; // Flattened roof, much lower peak
    const shoulderY = 44; // Where roof meets wall on center
    const sideRoofY = 54; // Where side roof meets side wall
    const baseY = 108;

    // --- Glass Fills ---
    ctx.fillStyle = glass;

    // Center
    ctx.beginPath();
    ctx.moveTo(cx, peakY);
    ctx.lineTo(cx + cHalf, shoulderY);
    ctx.lineTo(cx + cHalf, baseY);
    ctx.lineTo(cx - cHalf, baseY);
    ctx.lineTo(cx - cHalf, shoulderY);
    ctx.closePath();
    ctx.fill();

    // Left Side
    ctx.beginPath();
    ctx.moveTo(cx - cHalf, shoulderY);
    ctx.lineTo(cx - cHalf - sWidth, sideRoofY);
    ctx.lineTo(cx - cHalf - sWidth, baseY);
    ctx.lineTo(cx - cHalf, baseY);
    ctx.closePath();
    ctx.fill();

    // Right Side
    ctx.beginPath();
    ctx.moveTo(cx + cHalf, shoulderY);
    ctx.lineTo(cx + cHalf + sWidth, sideRoofY);
    ctx.lineTo(cx + cHalf + sWidth, baseY);
    ctx.lineTo(cx + cHalf, baseY);
    ctx.closePath();
    ctx.fill();

    // --- Metal Frames ---
    ctx.strokeStyle = metal;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";

    // Center Frame
    ctx.beginPath();
    ctx.moveTo(cx - cHalf, baseY);
    ctx.lineTo(cx - cHalf, shoulderY);
    ctx.lineTo(cx, peakY);
    ctx.lineTo(cx + cHalf, shoulderY);
    ctx.lineTo(cx + cHalf, baseY);
    ctx.stroke();

    // Center Details (Horizontal bars)
    ctx.beginPath();
    ctx.moveTo(cx - cHalf, shoulderY + 20);
    ctx.lineTo(cx + cHalf, shoulderY + 20);
    ctx.moveTo(cx - cHalf, shoulderY + 45);
    ctx.lineTo(cx + cHalf, shoulderY + 45);
    // Vertical Center Bar
    ctx.moveTo(cx, peakY);
    ctx.lineTo(cx, shoulderY);
    ctx.stroke();

    // Left Frame
    ctx.beginPath();
    ctx.moveTo(cx - cHalf, shoulderY);
    ctx.lineTo(cx - cHalf - sWidth, sideRoofY);
    ctx.lineTo(cx - cHalf - sWidth, baseY);
    ctx.lineTo(cx - cHalf, baseY);
    ctx.stroke();
    // Left Details
    ctx.beginPath();
    ctx.moveTo(cx - cHalf - sWidth, sideRoofY + 24);
    ctx.lineTo(cx - cHalf, sideRoofY + 24); // Horiz
    ctx.stroke();

    // Right Frame
    ctx.beginPath();
    ctx.moveTo(cx + cHalf, shoulderY);
    ctx.lineTo(cx + cHalf + sWidth, sideRoofY);
    ctx.lineTo(cx + cHalf + sWidth, baseY);
    ctx.lineTo(cx + cHalf, baseY);
    ctx.stroke();
    // Right Details
    ctx.beginPath();
    ctx.moveTo(cx + cHalf, sideRoofY + 24);
    ctx.lineTo(cx + cHalf + sWidth, sideRoofY + 24); // Horiz
    ctx.stroke();

    // --- Door ---
    // Wooden Door in center
    ctx.fillStyle = "#a1887f"; // Light Wood
    ctx.fillRect(cx - 14, baseY - 40, 28, 40);
    ctx.strokeStyle = "#5d4037"; // Dark Frame
    ctx.strokeRect(cx - 14, baseY - 40, 28, 40);
    // Door Window
    ctx.fillStyle = "#81d4fa";
    ctx.fillRect(cx - 10, baseY - 35, 20, 12);
    // Knob
    ctx.fillStyle = "#ffeb3b";
    ctx.fillRect(cx + 8, baseY - 18, 3, 3);

    // --- Highlights ---
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Roof Glint
    ctx.moveTo(cx - 10, peakY + 10);
    ctx.lineTo(cx, peakY + 8);
    // Side Glint
    ctx.moveTo(cx - cHalf - 20, sideRoofY + 10);
    ctx.lineTo(cx - cHalf - 10, sideRoofY + 5);
    ctx.stroke();

    // Vines
    ctx.fillStyle = "#388e3c";
    // Random clusters
    const vine = (x: number, y: number) => {
      ctx.fillRect(x, y, 4, 4);
      ctx.fillRect(x + 2, y + 2, 4, 4);
      ctx.fillRect(x - 2, y + 3, 3, 3);
    };
    vine(cx + cHalf + sWidth - 2, sideRoofY);
    vine(cx + cHalf + sWidth - 2, sideRoofY + 15);
    vine(cx - cHalf - sWidth - 2, baseY - 20);
  }),
  mailbox: createSprite(32, 64, (ctx) => {
    // Post
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(12, 32, 8, 32);
    // Box
    ctx.fillStyle = "#8d6e63"; // Wood Box
    ctx.beginPath();
    ctx.arc(16, 16, 12, Math.PI, 0); // Top curve
    ctx.lineTo(28, 32);
    ctx.lineTo(4, 32);
    ctx.fill();
    // Flag
    ctx.fillStyle = "#b71c1c";
    ctx.fillRect(28, 20, 4, 12);
    // Opening
    ctx.fillStyle = "#3e2723";
    ctx.fillRect(8, 16, 16, 12);
  }),
  board: createSprite(64, 64, (ctx) => {
    ctx.fillStyle = "#5d4037"; // Legs
    ctx.fillRect(16, 48, 4, 16);
    ctx.fillRect(44, 48, 4, 16);
    ctx.fillStyle = "#ffecb3"; // Board
    ctx.fillRect(8, 16, 48, 32);
    ctx.fillStyle = "#3e2723"; // Frame
    ctx.strokeRect(8, 16, 48, 32);
    // Text lines
    ctx.fillStyle = "#333";
    ctx.fillRect(12, 24, 40, 2);
    ctx.fillRect(12, 30, 40, 2);
  }),
  silo: createSprite(48, 144, (ctx) => {
    // Body
    ctx.fillStyle = "#bf360c"; // Burnt orange/red
    ctx.fillRect(4, 32, 40, 112);
    // Roof (Dome)
    ctx.fillStyle = "#3e2723";
    ctx.beginPath();
    ctx.arc(24, 32, 22, Math.PI, 0);
    ctx.fill();
    // Texture lines (bands)
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(4, 60, 40, 4);
    ctx.fillRect(4, 90, 40, 4);
    ctx.fillRect(4, 120, 40, 4);
    // Ladder
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(20, 40, 8, 100);
    // Ladder rungs
    ctx.fillStyle = "#d7ccc8";
    for (let i = 0; i < 10; i++) {
      ctx.fillRect(20, 44 + i * 10, 8, 2);
    }
  }),
};

// --- Game Logic ---

// Revised Layout Coordinates for Clean Paths
// Center Hub: 320, 250
const interactables: Interactable[] = [
  {
    type: "farmHouse",
    x: 60,
    y: 50,
    width: 128,
    height: 128,
    label: "About Me",
  },
  {
    type: "silo",
    x: 468,
    y: 24,
    width: 48,
    height: 144,
    label: "Silo",
    interactive: false,
  },
  { type: "redBarn", x: 500, y: 40, width: 160, height: 128, label: "Resume" },
  {
    type: "projectGreenhouse",
    x: 550,
    y: 350,
    width: 128,
    height: 112,
    label: "Projects",
  },
  // Mailbox moved to intersection of gate path (x=128) and hub horizontal path (y~250)
  { type: "mailbox", x: 96, y: 260, width: 32, height: 64, label: "Contact" },
  { type: "board", x: 320, y: 250, width: 64, height: 64, label: "Blog" },
];

const ponds: Pond[] = [{ x: 220, y: 60, width: 128, height: 96 }];

// Initial Entities
const initialEntities: Entity[] = [
  {
    id: "player",
    type: "player",
    x: 330,
    y: 330,
    vx: 0,
    vy: 0,
    direction: "down",
    frame: 0,
    state: "idle",
    speed: 4,
  },
  {
    id: "dog",
    type: "dog",
    x: 200,
    y: 200,
    vx: 0,
    vy: 0,
    direction: "right",
    frame: 0,
    state: "idle",
    speed: 6,
    idleTimer: 100,
  },
  {
    id: "donkey",
    type: "donkey",
    x: 680,
    y: 260,
    vx: 0,
    vy: 0,
    direction: "left",
    frame: 0,
    state: "idle",
    speed: 1,
    idleTimer: 200,
  },
  {
    id: "donkey2",
    type: "donkey",
    x: 620,
    y: 220,
    vx: 0,
    vy: 0,
    direction: "right",
    frame: 0,
    state: "idle",
    speed: 1,
    idleTimer: 180,
  },
  {
    id: "goat1",
    type: "goat",
    x: 520,
    y: 250,
    vx: 0,
    vy: 0,
    direction: "right",
    frame: 0,
    state: "idle",
    speed: 2,
    idleTimer: 50,
  },
  {
    id: "goat2",
    type: "goat",
    x: 560,
    y: 280,
    vx: 0,
    vy: 0,
    direction: "left",
    frame: 0,
    state: "idle",
    speed: 2,
    idleTimer: 70,
  },
  {
    id: "cow1",
    type: "cow",
    x: 420,
    y: 260,
    vx: 0,
    vy: 0,
    direction: "right",
    frame: 0,
    state: "idle",
    speed: 1.5,
    idleTimer: 120,
  },
  {
    id: "cow2",
    type: "cow",
    x: 460,
    y: 300,
    vx: 0,
    vy: 0,
    direction: "left",
    frame: 0,
    state: "idle",
    speed: 1.5,
    idleTimer: 90,
  },
  {
    id: "rabbit1",
    type: "rabbit",
    x: 450,
    y: 300,
    vx: 0,
    vy: 0,
    direction: "left",
    frame: 0,
    state: "idle",
    speed: 3,
    idleTimer: 30,
  },
  {
    id: "rabbit2",
    type: "rabbit",
    x: 120,
    y: 200,
    vx: 0,
    vy: 0,
    direction: "right",
    frame: 0,
    state: "idle",
    speed: 3,
    idleTimer: 40,
  },
  {
    id: "rabbit3",
    type: "rabbit",
    x: 200,
    y: 400,
    vx: 0,
    vy: 0,
    direction: "down",
    frame: 0,
    state: "idle",
    speed: 3,
    idleTimer: 20,
  },
];

// Generate Corn Field
const cornField: { x: number; y: number }[] = [];
// Removed Top Patch to replace with Pond
// Additional Corn Field (Bottom Center - Right of Contact area, Below Board)
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 10; c++) {
    cornField.push({ x: 180 + c * 32, y: 360 + r * 32 });
  }
}

// Generate Fence & Scenery
const scenery: Scenery[] = [];

// Fences (Border)
const tilesX = BOUNDS.w / 32;
const tilesY = BOUNDS.h / 32;

// Top & Bottom
for (let i = 0; i < tilesX; i++) {
  scenery.push({ id: `fence_t_${i}`, type: "fence_h", x: i * 32, y: 0 });
  // Add gate at path intersection (x = 128)
  if (i * 32 === 128) {
    scenery.push({
      id: `gate_b_${i}`,
      type: "gate",
      x: i * 32,
      y: BOUNDS.h - 32,
    });
  } else {
    scenery.push({
      id: `fence_b_${i}`,
      type: "fence_h",
      x: i * 32,
      y: BOUNDS.h - 32,
    });
  }
}
// Left & Right
for (let i = 1; i < tilesY - 1; i++) {
  scenery.push({ id: `fence_l_${i}`, type: "fence_v", x: 0, y: i * 32 });
  scenery.push({
    id: `fence_r_${i}`,
    type: "fence_v",
    x: BOUNDS.w - 32,
    y: i * 32,
  });
}

// Trees outside the fence (Forest effect)
for (let i = 0; i < 15; i++) {
  // Top forest
  scenery.push({
    id: `tree_top_${i}`,
    type: "tree",
    x: Math.random() * BOUNDS.w,
    y: -50 - Math.random() * 100,
  });
  // Bottom forest
  scenery.push({
    id: `tree_btm_${i}`,
    type: "tree",
    x: Math.random() * BOUNDS.w,
    y: BOUNDS.h + Math.random() * 100,
  });
  // Left forest
  scenery.push({
    id: `tree_l_${i}`,
    type: "tree",
    x: -60 - Math.random() * 100,
    y: Math.random() * BOUNDS.h,
  });
  // Right forest
  scenery.push({
    id: `tree_r_${i}`,
    type: "tree",
    x: BOUNDS.w + 30 + Math.random() * 100,
    y: Math.random() * BOUNDS.h,
  });
}

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game State Refs (Mutable for Loop Performance)
  const gameState = useRef({
    entities: JSON.parse(JSON.stringify(initialEntities)) as Entity[],
    camera: { x: 0, y: 0 },
    keys: {} as { [key: string]: boolean },
    targetPos: null as { x: number; y: number } | null,
    lastTime: 0,
    fishAnim: { active: false, x: 0, y: 0, startY: 0, vy: 0, pondIndex: 0 },
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }[],
  });

  // React State for UI Overlays
  const [uiState, setUiState] = useState({
    modalOpen: null as InteractableType | null,
    interactionTarget: null as InteractableType | null,
    menuOpen: false,
    isNight: false,
  });

  // Ref to access UI state inside game loop without staleness
  const uiStateRef = useRef(uiState);
  useEffect(() => {
    uiStateRef.current = uiState;
  }, [uiState]);

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = true;

      // Cancel click movement if manual key is pressed
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
        ].includes(e.code)
      ) {
        gameState.current.targetPos = null;
      }

      if (e.code === "KeyE" || e.code === "Enter" || e.code === "Space") {
        const player = gameState.current.entities.find(
          (e) => e.id === "player"
        );
        if (player && !uiStateRef.current.modalOpen) {
          const target = checkInteraction(player);
          if (target) {
            setUiState((prev) => ({ ...prev, modalOpen: target.type }));
            gameState.current.keys = {}; // Stop moving
          }
        }
      }
      if (e.code === "Escape") {
        setUiState((prev) => ({ ...prev, modalOpen: null }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (uiStateRef.current.modalOpen) return;

      // Ignore clicks on UI overlay elements (e.g., dropdown menu)
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-ui-element="true"]')) {
        return;
      }

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Screen Coordinates
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // If interaction prompt is visible, treat clicks on it as "open modal"
      if (uiStateRef.current.interactionTarget) {
        const { entities, camera } = gameState.current;
        const player = entities.find((e) => e.id === "player");
        if (player) {
          // Popup world-space rect (matches draw logic)
          const popupWorldX = player.x - 20;
          const popupWorldY = player.y - 40;
          const popupW = 100;
          const popupH = 30;

          // Convert to screen-space
          const popupScreenX = (popupWorldX - camera.x) * SCALE;
          const popupScreenY = (popupWorldY - camera.y) * SCALE;
          const popupScreenW = popupW * SCALE;
          const popupScreenH = popupH * SCALE;

          const withinPopup =
            clickX >= popupScreenX &&
            clickX <= popupScreenX + popupScreenW &&
            clickY >= popupScreenY &&
            clickY <= popupScreenY + popupScreenH;

          if (withinPopup) {
            const targetType = uiStateRef.current.interactionTarget;
            setUiState((prev) => ({ ...prev, modalOpen: targetType }));
            // Stop any existing movement
            gameState.current.keys = {};
            gameState.current.targetPos = null;
            return;
          }
        }
      }

      // World Coordinates: (Screen / Scale) + Camera
      const worldX = clickX / SCALE + gameState.current.camera.x;
      const worldY = clickY / SCALE + gameState.current.camera.y;

      // Bounds Check for click target (stay inside fence)
      const clampedX = Math.max(32, Math.min(worldX, BOUNDS.w - 32));
      const clampedY = Math.max(32, Math.min(worldY, BOUNDS.h - 32));

      gameState.current.targetPos = { x: clampedX, y: clampedY };
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // Pointer down covers mouse click and touch tap
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    let animationFrameId: number;
    const loop = (time: number) => {
      if (gameState.current.lastTime === 0) gameState.current.lastTime = time;
      const dt = time - gameState.current.lastTime;
      gameState.current.lastTime = time;

      if (!uiStateRef.current.modalOpen) {
        update();
      }
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const checkInteraction = (player: Entity): Interactable | undefined => {
    const cx = player.x + 16;
    const cy = player.y + 16;
    return interactables.find((b) => {
      // Skip non-interactive items (e.g. Silo)
      if (b.interactive === false) return false;

      const dist = Math.sqrt(
        Math.pow(cx - (b.x + b.width / 2), 2) +
          Math.pow(cy - (b.y + b.height / 2), 2)
      );
      return dist < 100; // Interaction radius
    });
  };

  const checkCollision = (
    x: number,
    y: number,
    width: number,
    height: number,
    excludeId?: string
  ): boolean => {
    // Check Map Bounds (Fences)
    if (
      x < 32 ||
      x + width > BOUNDS.w - 32 ||
      y < 32 ||
      y + height > BOUNDS.h - 32
    ) {
      return true;
    }

    // Check Buildings
    for (const b of interactables) {
      // Simple AABB
      if (
        x < b.x + b.width &&
        x + width > b.x &&
        y < b.y + b.height &&
        y + height > b.y
      ) {
        return true;
      }
    }

    // Check Ponds
    for (const p of ponds) {
      if (
        x < p.x + p.width &&
        x + width > p.x &&
        y < p.y + p.height &&
        y + height > p.y
      ) {
        return true;
      }
    }

    return false;
  };

  const updateAI = (entity: Entity) => {
    if (entity.type === "player") return entity;

    let { x, y, vx, vy, idleTimer, state, direction } = entity;
    if (idleTimer === undefined) idleTimer = 0;

    // Special Logic for Dog: Follow Player
    if (entity.type === "dog") {
      const player = gameState.current.entities.find((e) => e.id === "player");
      if (player) {
        // Calculate distance to player (center points)
        const dx = player.x + 16 - (x + 24); // Dog width is 48, center ~24
        const dy = player.y + 16 - (y + 16);
        const dist = Math.sqrt(dx * dx + dy * dy);

        const TARGET_DIST = 70; // Target follow distance
        const STOP_DIST = 60; // Min distance before stopping

        if (dist > TARGET_DIST) {
          // Move towards player
          const angle = Math.atan2(dy, dx);
          // Move slightly slower than player's max speed so it doesn't jitter
          const speed = 3;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          state = "run";
        } else if (dist < STOP_DIST - 20) {
          // Too close, back away slowly
          const angle = Math.atan2(dy, dx);
          vx = -Math.cos(angle) * 1;
          vy = -Math.sin(angle) * 1;
          state = "walk";
        } else {
          // Within comfortable range, stop
          vx = 0;
          vy = 0;
          state = "idle";

          // Face the player when idle
          if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? "right" : "left";
          }
        }
      }
    } else {
      // Standard AI (Wander) for other animals - CALMER BUT STILL ACTIVE
      if (idleTimer > 0) {
        idleTimer--;
        if (state === "idle") {
          vx = 0;
          vy = 0;
        }
      } else {
        // Timer expired, pick new state
        if (state === "walk" || state === "run") {
          // Finished moving, go to idle
          state = "idle";
          vx = 0;
          vy = 0;
          // Short/medium idle times (about 1.5–3 seconds)
          idleTimer = Math.floor(Math.random() * 90) + 90;
        } else {
          // Finished idling, decide to move or stay idle
          // Lower chance to move than original, but higher than before
          if (Math.random() < 0.1) {
            // 10% chance to start walking
            state = "walk";
            const speed = entity.speed * 0.4; // Gentle pace
            const angle = Math.random() * Math.PI * 2;
            vx = Math.cos(angle) * speed;
            vy = Math.sin(angle) * speed;
            // Move for a short burst (about 1–2 seconds)
            idleTimer = Math.floor(Math.random() * 60) + 60;
          } else {
            // Stay idle for a bit before reconsidering
            idleTimer = Math.floor(Math.random() * 60) + 40;
          }
        }
      }
    }

    // Direction update based on velocity
    if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
      if (Math.abs(vx) > Math.abs(vy)) {
        direction = vx > 0 ? "right" : "left";
      } else {
        direction = vy > 0 ? "down" : "up";
      }
    }

    // Physics / Collision
    let nextX = x + vx;
    let nextY = y + vy;

    // Simple Bounce
    if (checkCollision(nextX, nextY, 32, 32, entity.id)) {
      vx = -vx;
      vy = -vy;
      nextX = x;
      nextY = y;
      // If dog hits obstacle, stop temporarily
      if (entity.type === "dog") state = "idle";
    }

    return {
      ...entity,
      x: nextX,
      y: nextY,
      vx,
      vy,
      idleTimer,
      state,
      direction,
    };
  };

  const update = () => {
    const { entities, keys, camera, targetPos, fishAnim, particles } =
      gameState.current;
    const player = entities.find((e) => e.id === "player")!;
    const isNight = uiStateRef.current.isNight;

    // Player Movement
    player.vx = 0;
    player.vy = 0;

    // Keyboard
    if (keys["ArrowUp"] || keys["KeyW"]) player.vy = -player.speed;
    if (keys["ArrowDown"] || keys["KeyS"]) player.vy = player.speed;
    if (keys["ArrowLeft"] || keys["KeyA"]) player.vx = -player.speed;
    if (keys["ArrowRight"] || keys["KeyD"]) player.vx = player.speed;

    // Mouse / Trackpad (Click to Move)
    if (player.vx === 0 && player.vy === 0 && targetPos) {
      const cx = player.x + 16;
      const cy = player.y + 24; // Feet
      const dx = targetPos.x - cx;
      const dy = targetPos.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > player.speed) {
        const angle = Math.atan2(dy, dx);
        player.vx = Math.cos(angle) * player.speed;
        player.vy = Math.sin(angle) * player.speed;
      } else {
        gameState.current.targetPos = null; // Arrived
      }
    }

    // Normalize diagonal
    if (player.vx !== 0 && player.vy !== 0) {
      if (!targetPos) {
        player.vx *= 0.707;
        player.vy *= 0.707;
      }
    }

    if (player.vx !== 0 || player.vy !== 0) {
      player.state = "walk";
      if (Math.abs(player.vx) > Math.abs(player.vy)) {
        player.direction = player.vx > 0 ? "right" : "left";
      } else {
        player.direction = player.vy > 0 ? "down" : "up";
      }
    } else {
      player.state = "idle";
    }

    // Collision Check for Player
    let nextX = player.x + player.vx;
    let nextY = player.y + player.vy;

    // Check X axis first
    if (!checkCollision(nextX, player.y, 32, 32, "player")) {
      player.x = nextX;
    } else {
      // Slide?
      player.vx = 0;
    }

    // Check Y axis
    if (!checkCollision(player.x, nextY, 32, 32, "player")) {
      player.y = nextY;
    } else {
      player.vy = 0;
    }

    // Update Camera
    const cx = player.x - window.innerWidth / (2 * SCALE);
    const cy = player.y - window.innerHeight / (2 * SCALE);
    camera.x = Math.max(
      -100,
      Math.min(cx, BOUNDS.w + 100 - window.innerWidth / SCALE)
    );
    camera.y = Math.max(
      -100,
      Math.min(cy, BOUNDS.h + 100 - window.innerHeight / SCALE)
    );

    // Update Animals
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].id !== "player") {
        if (isNight) {
          // At night, animals stay where they are and "sleep"
          entities[i].vx = 0;
          entities[i].vy = 0;
          entities[i].state = "idle";
        } else {
          entities[i] = updateAI(entities[i]);
        }
      }
    }

    // Check Interaction
    const target = checkInteraction(player);
    if (target?.type !== uiStateRef.current.interactionTarget) {
      setUiState((prev) => ({
        ...prev,
        interactionTarget: target ? target.type : null,
      }));
    }

    // Fish Animation
    if (!fishAnim.active) {
      // Small chance to jump (approx every few seconds)
      if (Math.random() < 0.005) {
        const pond = ponds[0];
        fishAnim.active = true;
        // Jump from random spot in pond (padded from edges)
        fishAnim.x = pond.x + 30 + Math.random() * (pond.width - 60);
        fishAnim.y = pond.y + 30 + Math.random() * (pond.height - 60);
        fishAnim.startY = fishAnim.y;
        fishAnim.vy = -4; // Jump Up velocity

        // Spawn Splash Particles (Start)
        for (let i = 0; i < 6; i++) {
          particles.push({
            x: fishAnim.x,
            y: fishAnim.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            life: 20 + Math.random() * 10,
            maxLife: 30,
          });
        }
      }
    } else {
      // Physics
      fishAnim.y += fishAnim.vy;
      fishAnim.vy += 0.15; // Gravity

      // Landed back in water
      if (fishAnim.y > fishAnim.startY) {
        fishAnim.active = false;
        // Spawn Splash Particles (End)
        for (let i = 0; i < 10; i++) {
          particles.push({
            x: fishAnim.x,
            y: fishAnim.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 20 + Math.random() * 10,
            maxLife: 30,
          });
        }
      }
    }

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { entities, camera, targetPos, fishAnim, particles } =
      gameState.current;

    ctx.fillStyle = "#567d46"; // Grass base color to match farm
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(-camera.x, -camera.y);

    // Draw Ground (Only inside bounds to emphasize the farm)
    // Draw slight border of grass outside fence
    for (let y = -2; y < tilesY + 2; y++) {
      for (let x = -2; x < tilesX + 2; x++) {
        ctx.drawImage(Assets.ground, x * 32, y * 32);
      }
    }

    // Draw Ponds (Ground level)
    ponds.forEach((p) => {
      ctx.drawImage(Assets.pond, p.x, p.y);
    });

    // Draw Fish (Jumping)
    if (fishAnim.active) {
      ctx.save();
      ctx.translate(fishAnim.x, fishAnim.y);
      // Rotate based on arc
      const angle = Math.atan2(fishAnim.vy, 2);
      ctx.rotate(angle);
      ctx.drawImage(Assets.fish, -8, -8);
      ctx.restore();
    }

    // Draw Water Particles
    ctx.fillStyle = "#e1f5fe";
    particles.forEach((p) => {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillRect(p.x, p.y, 2, 2);
    });
    ctx.globalAlpha = 1.0;

    // Draw Paths
    const drawPathLine = (x1: number, y1: number, x2: number, y2: number) => {
      const startX = Math.floor(x1 / 32);
      const endX = Math.floor(x2 / 32);
      const startY = Math.floor(y1 / 32);
      const endY = Math.floor(y2 / 32);
      for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++)
        ctx.drawImage(Assets.path, x * 32, startY * 32);
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++)
        ctx.drawImage(Assets.path, endX * 32, y * 32);
    };

    // Connected Paths (Hub and Spoke to avoid crop intersection)
    // Hub Center: 320, 250

    // Path to Farm House (Top Left)
    drawPathLine(320, 250, 124, 250);
    drawPathLine(124, 250, 124, 180);

    // Path to Red Barn (Top Right)
    drawPathLine(320, 250, 580, 250);
    drawPathLine(580, 250, 580, 170);

    // Path to Mailbox/Gate (Bottom Left)
    // Align to 128 (4*32) for clean gate entry
    drawPathLine(320, 250, 128, 250);
    drawPathLine(128, 250, 128, BOUNDS.h);

    // Path to Project Greenhouse (Bottom Right)
    drawPathLine(320, 250, 600, 250);
    drawPathLine(600, 250, 600, 400);

    // Draw Corn
    cornField.forEach((pos) => {
      ctx.drawImage(Assets.corn, pos.x, pos.y);
    });

    // Buildings (Layer 0 - Behind Player mostly)
    interactables.forEach((b) => {
      const asset = Assets[b.type as keyof typeof Assets];
      if (asset) {
        // Simple Shadow
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(b.x + 10, b.y + b.height - 10, b.width - 20, 10);
        ctx.drawImage(asset, b.x, b.y);
      }
    });

    // Target Marker (Click to Move)
    if (targetPos) {
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.2;
      ctx.drawImage(Assets.target, targetPos.x - 16, targetPos.y - 16);
      ctx.globalAlpha = 1.0;
    }

    // Entities & Scenery Sorted by Y for Depth
    const renderQueue = [
      ...entities.map((e) => ({ ...e, isEntity: true })),
      ...scenery.map((s) => ({ ...s, isEntity: false })),
    ];

    renderQueue.sort(
      (a, b) => a.y + (a.isEntity ? 32 : 32) - (b.y + (b.isEntity ? 32 : 32))
    );

    renderQueue.forEach((obj) => {
      if (obj.isEntity) {
        const e = obj as any;
        const asset = Assets[e.type as keyof typeof Assets];
        let frameOffset = 0;
        if (e.state !== "idle") {
          frameOffset = Math.sin(Date.now() / 100) * 2;
        }
        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.ellipse(e.x + 16, e.y + 28, 10, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        if (asset) {
          const isNight = uiStateRef.current.isNight;
          const isPlayer = e.id === "player";

          // Basic per-entity sprite size (for rotation when sleeping)
          const sizeMap: { [key in EntityType]: { w: number; h: number } } = {
            player: { w: 32, h: 32 },
            dog: { w: 48, h: 32 },
            donkey: { w: 32, h: 32 },
            goat: { w: 32, h: 32 },
            rabbit: { w: 16, h: 16 },
            cow: { w: 32, h: 32 },
          };
          const sz = sizeMap[e.type as EntityType] || { w: 32, h: 32 };

          // Draw sprite (possibly rotated for sleeping)
          ctx.save();
          if (isNight && !isPlayer) {
            // At night, animals lay down: rotate sprite 90 degrees at its center
            const cx = e.x + sz.w / 2;
            const cy = e.y + sz.h / 2;
            ctx.translate(cx, cy);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(asset, -sz.w / 2, -sz.h / 2);
          } else {
            // Daytime / player rendering with simple left/right flip
            if (e.direction === "left") {
              ctx.translate(e.x + 32, e.y);
              ctx.scale(-1, 1);
              ctx.drawImage(asset, 0, frameOffset);
            } else {
              ctx.drawImage(asset, e.x, e.y + frameOffset);
            }
          }
          ctx.restore();

          // Draw sleep ZZZ above animals at night
          if (isNight && !isPlayer) {
            ctx.save();
            ctx.font = "12px VT323";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(255,255,255,0.9)";
            const zBaseX = e.x + sz.w / 2;
            const zBaseY = e.y - 4;
            ctx.fillText("Z", zBaseX, zBaseY);
            ctx.fillText("Z", zBaseX + 4, zBaseY - 10);
            ctx.fillText("Z", zBaseX + 8, zBaseY - 20);
            ctx.textAlign = "left";
            ctx.restore();
          }
        }
      } else {
        const s = obj as Scenery;
        const asset = Assets[s.type];
        if (asset) ctx.drawImage(asset, s.x, s.y);
      }
    });

    // Night-time overlay and farmhouse lights
    if (uiStateRef.current.isNight) {
      // Dim the whole farm slightly
      ctx.fillStyle = "rgba(0, 0, 40, 0.45)";
      ctx.fillRect(
        camera.x - 100,
        camera.y - 100,
        BOUNDS.w + 200,
        BOUNDS.h + 200
      );

      // Make farmhouse windows glow warm yellow
      const farm = interactables.find((b) => b.type === "farmHouse");
      if (farm) {
        ctx.fillStyle = "rgba(255, 241, 118, 0.95)";
        // Window positions match farmhouse sprite design
        ctx.fillRect(farm.x + 24, farm.y + 64, 16, 16);
        ctx.fillRect(farm.x + 88, farm.y + 64, 16, 16);
      }
    }

    // Interaction Prompt
    if (uiStateRef.current.interactionTarget && !uiStateRef.current.modalOpen) {
      const player = entities.find((e) => e.id === "player");
      if (player) {
        const b = interactables.find(
          (i) => i.type === uiStateRef.current.interactionTarget
        );
        // Only draw if user hasn't explicitly disabled interaction
        if (b && b.interactive !== false) {
          ctx.fillStyle = "#fff";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(player.x - 20, player.y - 40, 100, 30, 5);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#000";
          ctx.font = "16px VT323";
          ctx.textAlign = "center";
          ctx.fillText(
            `${b.label || "Interact"}`,
            player.x + 30,
            player.y - 20
          );
          ctx.textAlign = "left";
        }
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* Top-left Navigation + Theme Toggle */}
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
          alignItems: "center",
        }}
      >
        <button
          onClick={() =>
            setUiState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }))
          }
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
        {/* Light / Dark mode toggle */}
        <button
          onClick={() =>
            setUiState((prev) => ({ ...prev, isNight: !prev.isNight }))
          }
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "3px solid #5d4037",
            background: uiState.isNight ? "#263238" : "#ffecb3",
            color: uiState.isNight ? "#ffe082" : "#3e2723",
            cursor: "pointer",
            boxShadow: "0 2px 0 #3e2723",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {uiState.isNight ? "⏾" : "☀︎"}
        </button>
        {uiState.menuOpen && (
          <div
            style={{
              marginTop: "4px",
              background: "#ffecb3",
              border: "3px solid #5d4037",
              borderRadius: "6px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              minWidth: "150px",
            }}
          >
            {[
              { label: "About", type: "farmHouse" as InteractableType },
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
                onClick={() =>
                  setUiState((prev) => ({
                    ...prev,
                    modalOpen: item.type,
                    menuOpen: false,
                  }))
                }
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

      {/* UI Overlay Modal */}
      {uiState.modalOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            backgroundColor: uiState.isNight ? "#263238" : "#ffecb3",
            border: uiState.isNight ? "8px solid #90a4ae" : "8px solid #5d4037",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
            fontFamily: "'VT323', monospace",
            color: uiState.isNight ? "#eceff1" : "#3e2723",
            zIndex: 100,
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setUiState((prev) => ({ ...prev, modalOpen: null }))}
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

          {/* Content Based on Building */}
          {uiState.modalOpen === "farmHouse" && (
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
                business value. When I'm not coding, I'm probably playing
                Stardew Valley or hanging out with my Bernese Mountain Dog.
              </p>
            </div>
          )}

          {uiState.modalOpen === "redBarn" && (
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
                  React, TypeScript, Python, Cloud Architecture, Client
                  Solutions
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

          {uiState.modalOpen === "projectGreenhouse" && (
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

          {uiState.modalOpen === "board" && (
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
                  Coding is great, but solving customer problems with code is
                  even better...
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

          {uiState.modalOpen === "mailbox" && (
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
      )}

      {/* Mobile Controls Hint */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        Click/Tap to Move • WASD/Arrows to Walk • Walk into buildings
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<Game />);
