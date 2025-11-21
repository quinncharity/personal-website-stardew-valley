export type EntityType = "player" | "dog" | "donkey" | "goat" | "rabbit" | "cow";

export type SceneryType =
  | "tree"
  | "bush"
  | "fence_h"
  | "fence_v"
  | "fence_c"
  | "gate"
  | "hayBales";

export type InteractableType =
  | "farmHouse"
  | "redBarn"
  | "projectGreenhouse"
  | "mailbox"
  | "board"
  | "silo";

export interface Entity {
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

export interface Scenery {
  id: string;
  type: SceneryType;
  x: number;
  y: number;
}

export interface Interactable {
  type: InteractableType;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  interactive?: boolean; // Defaults to true
}

export interface Pond {
  x: number;
  y: number;
  width: number;
  height: number;
}


