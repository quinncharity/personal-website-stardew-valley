import React, { useEffect, useRef, useState } from "react";
import { SCALE, BOUNDS } from "@/game/constants";
import { Entity, EntityType, Interactable, InteractableType } from "@/game/types";
import { Assets } from "@/game/assets";
import {
  interactables,
  ponds,
  initialEntities,
  cornField,
  scenery,
  tilesX,
  tilesY,
} from "@/game/world";
import { TopHud } from "@/components/ui/TopHud";
import { GameModal } from "@/components/ui/GameModal";
import { MobileHint } from "@/components/ui/MobileHint";

export function Game() {
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
    wateredCorn: [] as { x: number; y: number; timer: number }[],
    wateringStream: {
      active: false,
      sx: 0,
      sy: 0,
      tx: 0,
      ty: 0,
    },
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
        const player = gameState.current.entities.find((e) => e.id === "player");
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
    const {
      entities,
      keys,
      camera,
      targetPos,
      fishAnim,
      particles,
      wateredCorn,
      wateringStream,
    } = gameState.current;
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

    // Water corn when player is close (daytime only)
    if (!isNight) {
      const px = player.x + 16;
      const py = player.y + 24; // feet
      const WATER_RADIUS = 45;

      let nearestCorn: { cx: number; cy: number } | null = null;
      let nearestDist = Infinity;

      cornField.forEach((pos) => {
        const cx = pos.x + 16;
        const cy = pos.y + 24; // near base of stalk
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < WATER_RADIUS) {
          let entry = wateredCorn.find((w) => w.x === pos.x && w.y === pos.y);
          if (!entry) {
            entry = { x: pos.x, y: pos.y, timer: 160 };
            wateredCorn.push(entry);

            // Water splash particles around the corn tile base
            for (let i = 0; i < 8; i++) {
              particles.push({
                x: cx,
                y: cy + 4,
                vx: (Math.random() - 0.5) * 1.2,
                vy: -Math.random() * 1.8 - 0.4,
                life: 20 + Math.random() * 10,
                maxLife: 30,
              });
            }
          } else {
            // Refresh timer while player stays close
            entry.timer = 160;
          }

          if (dist < nearestDist) {
            nearestDist = dist;
            nearestCorn = { cx, cy };
          }
        }
      });

      // Update watering stream from can to nearest corn base
      if (nearestCorn) {
        wateringStream.active = true;
        // Approximate can spout position on player sprite
        wateringStream.sx = player.x + 6;
        wateringStream.sy = player.y + 22;
        wateringStream.tx = nearestCorn.cx;
        wateringStream.ty = nearestCorn.cy;
      } else {
        wateringStream.active = false;
      }

      // Decay watered state over time
      for (let i = wateredCorn.length - 1; i >= 0; i--) {
        wateredCorn[i].timer -= 1;
        if (wateredCorn[i].timer <= 0) {
          wateredCorn.splice(i, 1);
        }
      }
    } else {
      // No watering stream at night
      gameState.current.wateringStream.active = false;
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
    const {
      entities,
      camera,
      targetPos,
      fishAnim,
      particles,
      wateredCorn,
      wateringStream,
    } = gameState.current;

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

    // Draw Water Particles (pond splashes / corn splashes)
    ctx.fillStyle = "#e1f5fe";
    particles.forEach((p) => {
      ctx.globalAlpha = p.life / p.maxLife;
      // Larger droplets for better visibility
      ctx.fillRect(p.x, p.y, 4, 4);
    });
    ctx.globalAlpha = 1.0;

    // Draw water stream from can to nearest watered corn (if any)
    if (wateringStream.active) {
      ctx.save();
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      const midX = (wateringStream.sx + wateringStream.tx) / 2;
      const midY = Math.min(wateringStream.sy, wateringStream.ty) - 10;
      ctx.moveTo(wateringStream.sx, wateringStream.sy);
      ctx.quadraticCurveTo(midX, midY, wateringStream.tx, wateringStream.ty);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

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

    // Draw Corn (with watered ground + subtle water overlay)
    cornField.forEach((pos) => {
      const isWatered = wateredCorn.some((w) => w.x === pos.x && w.y === pos.y);
      if (isWatered) {
        // Darker, richer ground patch just under the stalk base
        ctx.fillStyle = "#33691e";
        ctx.fillRect(pos.x, pos.y + 20, 32, 12);
      }

      // Corn sprite
      ctx.drawImage(Assets.corn, pos.x, pos.y);

      if (isWatered) {
        // Smaller blue highlight at the stalk base
        ctx.fillStyle = "rgba(129, 212, 250, 0.5)";
        ctx.fillRect(pos.x + 10, pos.y + 18, 12, 10);
      }
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

      <TopHud
        isNight={uiState.isNight}
        menuOpen={uiState.menuOpen}
        onToggleMenu={() =>
          setUiState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }))
        }
        onToggleNight={() =>
          setUiState((prev) => ({ ...prev, isNight: !prev.isNight }))
        }
        onSelectModal={(type) =>
          setUiState((prev) => ({
            ...prev,
            modalOpen: type,
            menuOpen: false,
          }))
        }
      />

      <GameModal
        modalOpen={uiState.modalOpen}
        isNight={uiState.isNight}
        onClose={() => setUiState((prev) => ({ ...prev, modalOpen: null }))}
      />

      <MobileHint />
    </div>
  );
}


