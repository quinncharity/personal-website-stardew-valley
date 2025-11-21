import { BOUNDS } from "./constants";
import { Entity, Interactable, Pond, Scenery } from "./types";

// Revised Layout Coordinates for Clean Paths
// Center Hub: 320, 250
export const interactables: Interactable[] = [
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

export const ponds: Pond[] = [{ x: 220, y: 60, width: 128, height: 96 }];

// Initial Entities
export const initialEntities: Entity[] = [
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
const cornFieldInternal: { x: number; y: number }[] = [];
// Removed Top Patch to replace with Pond
// Additional Corn Field (Bottom Center - Right of Contact area, Below Board)
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 10; c++) {
    cornFieldInternal.push({ x: 180 + c * 32, y: 360 + r * 32 });
  }
}

export const cornField = cornFieldInternal;

// Generate Fence & Scenery
export const scenery: Scenery[] = [];

// Fences (Border)
export const tilesX = BOUNDS.w / 32;
export const tilesY = BOUNDS.h / 32;

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


