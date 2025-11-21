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

export const Assets = {
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
    // Bernese Mountain Dog: sharper tri-color side profile
    // --- Base black silhouette (body, neck, head) ---
    ctx.fillStyle = "#111"; // Jet black coat
    // Torso
    ctx.fillRect(6, 12, 28, 12);
    // Neck
    ctx.fillRect(24, 10, 6, 10);
    // Head block
    ctx.fillRect(30, 6, 10, 10);

    // Tail (slightly raised)
    ctx.fillRect(2, 10, 6, 4);

    // --- White markings (chest, blaze, muzzle, tail tip) ---
    ctx.fillStyle = "#ffffff";
    // Chest / ruff
    ctx.fillRect(10, 14, 8, 8);
    // Belly highlight
    ctx.fillRect(16, 18, 8, 4);
    // Forehead blaze
    ctx.fillRect(33, 6, 3, 8);
    // Muzzle
    ctx.fillRect(38, 11, 6, 5);
    // Tail tip
    ctx.fillRect(2, 10, 3, 3);

    // --- Rust / tan markings for Bernese tri-color pattern ---
    ctx.fillStyle = "#c47a3c"; // Warm rust
    // Eyebrows
    ctx.fillRect(31, 9, 3, 2);
    ctx.fillRect(36, 9, 3, 2);
    // Cheeks
    ctx.fillRect(30, 13, 3, 4);
    ctx.fillRect(40, 13, 3, 4);
    // Leg tan sections
    // Front leg
    ctx.fillRect(12, 26, 5, 4);
    // Hind leg
    ctx.fillRect(26, 26, 5, 4);

    // --- Legs: black upper, tan mid, white paws ---
    ctx.fillStyle = "#111";
    // Front leg upper
    ctx.fillRect(12, 22, 5, 4);
    // Hind leg upper
    ctx.fillRect(26, 22, 5, 4);

    // White paws
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(12, 28, 5, 2);
    ctx.fillRect(26, 28, 5, 2);

    // --- Face details (eye, nose, ear) ---
    // Ear hanging over side of head
    ctx.fillStyle = "#000000";
    ctx.fillRect(30, 6, 4, 6);

    // Eye on the white blaze so the face reads clearly
    ctx.fillStyle = "#111";
    ctx.fillRect(35, 10, 2, 2);

    // Nose at the tip of the muzzle
    ctx.fillRect(41, 12, 2, 2);

    // Slight shadow along belly to sharpen silhouette
    ctx.fillStyle = "#000000";
    ctx.fillRect(6, 22, 20, 2);
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
  hayBales: createSprite(64, 48, (ctx) => {
    // Ground shadow (a bit wider for the cluster)
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(32, 40, 26, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    const drawBale = (x: number, y: number, w: number, h: number) => {
      // Base color
      ctx.fillStyle = "#fbc02d"; // Golden hay
      ctx.fillRect(x, y, w, h);

      // Edge / outline
      ctx.strokeStyle = "#f57f17";
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

      // Straps
      ctx.fillStyle = "#f9a825";
      ctx.fillRect(x + w * 0.28, y, 2, h);
      ctx.fillRect(x + w * 0.64, y, 2, h);

      // Straw texture
      ctx.fillStyle = "#fff59d";
      for (let i = 0; i < 6; i++) {
        const sx = x + 2 + Math.random() * (w - 4);
        const sy = y + 2 + Math.random() * (h - 4);
        ctx.fillRect(sx, sy, 2, 1);
      }
    };

    // Bottom row (two bales) – pulled closer together
    drawBale(6, 22, 24, 16);
    drawBale(34, 22, 24, 16);

    // Bridging bale in front to close the middle gap visually
    drawBale(18, 26, 28, 12);

    // Top bale slightly forward so the stack feels pushed toward the viewer
    drawBale(20, 10, 24, 16);
  }),
};
