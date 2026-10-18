import { CardPose, SceneConfig } from '../types/reel';

export const REEL_SLOTS = 16;
export const REFERENCE_CARD_WIDTH = 270;
export const REFERENCE_CARD_HEIGHT = 480;

/**
 * Calculates the normalized angle in degrees [-180, 180) for a given slot and rotation offset.
 * 0 degrees is the far center of the ring.
 * ±180 degrees is the front of the ring nearest to the camera.
 */
export function reelAngle(slot: number, angle: number, slots = REEL_SLOTS): number {
  return (((slot * 360) / slots + angle) % 360 + 360) % 360 - 180;
}

/**
 * Base loader and hero scene targets as specified by the reference architecture.
 */
export const DEFAULT_LOADER_SCENE: SceneConfig = {
  radius: 460,
  perspective: 1000,
  tilt: -22,
  roll: -20,
  scale: 0.52,
  anchorY: 0,
};

export const DEFAULT_HERO_SCENE: SceneConfig = {
  radius: 1800,
  perspective: 450,
  tilt: 0,
  roll: 0,
  scale: 2.3,
  anchorY: 0,
};

/**
 * Computes responsive scene target configurations based on viewport width and height.
 */
export function getResponsiveScenes(viewportWidth: number, viewportHeight: number): {
  start: SceneConfig;
  end: SceneConfig;
} {
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isSmallMobile = viewportWidth <= 400;

  // Responsive start (loader) scene
  let loaderRadius = 460;
  let loaderScale = 0.52;
  let loaderPerspective = 1000;

  if (isSmallMobile) {
    loaderRadius = Math.max(220, viewportWidth * 0.55);
    loaderScale = 0.38;
    loaderPerspective = 750;
  } else if (isMobile) {
    loaderRadius = Math.max(260, viewportWidth * 0.58);
    loaderScale = 0.44;
    loaderPerspective = 850;
  } else if (isTablet) {
    loaderRadius = 380;
    loaderScale = 0.48;
    loaderPerspective = 950;
  }

  // Responsive end (hero carousel) scene
  let heroRadius = 1800;
  let heroScale = 2.3;
  let heroPerspective = 450;

  if (isSmallMobile) {
    heroRadius = Math.max(750, viewportWidth * 2.1);
    heroScale = 1.35;
    heroPerspective = 360;
  } else if (isMobile) {
    heroRadius = Math.max(880, viewportWidth * 2.2);
    heroScale = 1.5;
    heroPerspective = 380;
  } else if (isTablet) {
    heroRadius = Math.max(1200, viewportWidth * 1.55);
    heroScale = 1.85;
    heroPerspective = 420;
  } else if (viewportWidth < 1440) {
    heroRadius = 1550;
    heroScale = 2.05;
    heroPerspective = 440;
  }

  return {
    start: {
      ...DEFAULT_LOADER_SCENE,
      radius: loaderRadius,
      scale: loaderScale,
      perspective: loaderPerspective,
    },
    end: {
      ...DEFAULT_HERO_SCENE,
      radius: heroRadius,
      scale: heroScale,
      perspective: heroPerspective,
    },
  };
}

/**
 * Pure scene interpolation function between loader (0) and hero (1).
 * Uses quadratic scale curve so cards remain compact initially and swell as camera enters the ring.
 * Applies anchor offset to keep the visual anchor stable as tilt flattens.
 */
export function reelScene(
  expansion: number,
  customScenes?: { start: SceneConfig; end: SceneConfig }
): SceneConfig {
  const clampExp = Math.max(0, Math.min(1, expansion));
  const start = customScenes?.start ?? DEFAULT_LOADER_SCENE;
  const end = customScenes?.end ?? DEFAULT_HERO_SCENE;

  // Radius interpolation
  const radius = start.radius + (end.radius - start.radius) * clampExp;

  // Perspective interpolation
  const perspective = start.perspective + (end.perspective - start.perspective) * clampExp;

  // Camera tilt & roll ease to 0 (cleanly avoiding -0)
  const rawTilt = start.tilt * (1 - clampExp);
  const rawRoll = start.roll * (1 - clampExp);
  const tilt = Math.abs(rawTilt) < 1e-6 ? 0 : rawTilt;
  const roll = Math.abs(rawRoll) < 1e-6 ? 0 : rawRoll;

  // Nonlinear scale interpolation (squared progression)
  const scale = start.scale + (end.scale - start.scale) * (clampExp * clampExp);

  // Anchor offset to cancel vertical drift as the tilt flattens
  // At tilt -22deg, the back of the ring is raised. We compensate with anchorY.
  const tiltRad = (tilt * Math.PI) / 180;
  const anchorY = -Math.sin(tiltRad) * radius * 0.18 * (1 - clampExp);

  return {
    radius,
    perspective,
    tilt,
    roll,
    scale,
    anchorY,
  };
}

/**
 * Pure pose calculation function for a card at a given resting angle on the cylinder.
 *
 * During formation (0 -> 1):
 * - Undealt cards sit at angle -180 (the front) and get dealt outward toward their slot.
 * - Each card has its own slice of formation, staggered by angular order around the ring.
 * - Dealt motion follows ease-out cubic.
 * - Waiting stack is kept hidden (appear = 0) and appears as one card at front.
 * - Radius has a small offset during deal so the stacked cards read as a single deck.
 *
 * During normal rotation (formation = 1):
 * - Card sits at cylindrical position x = -sin(r) * radius, z = -cos(r) * radius.
 * - Yaw = angle so card faces outward tangentially.
 */
export function reelPose(
  angle: number,
  formation: number,
  scene: SceneConfig,
  dealShare = 0.3
): CardPose {
  const clampForm = Math.max(0, Math.min(1, formation));

  // Angular progress from front (-180) around the ring in [0, 360)
  const around = ((angle + 180) % 360 + 360) % 360;
  const order = around / 360; // 0 at front, ~0.5 at back, approaching 1 back at front

  // Staggered slice of formation
  const DEAL = Math.max(0.1, Math.min(0.8, dealShare));
  const t = Math.max(0, Math.min(1, (clampForm - order * (1 - DEAL)) / DEAL));

  // Ease-out cubic: 1 - (1 - t)^3
  const dealt = 1 - Math.pow(1 - t, 3);

  // Angle swings from the front (-180) to its assigned destination angle
  const placed = -180 + around * dealt;
  const r = (placed * Math.PI) / 180;

  // Deck stack reads as one card before dealing
  const stackOffset = (1 - dealt) * order * 24;
  const radius = scene.radius - stackOffset;

  const x = -Math.sin(r) * radius;
  const z = -Math.cos(r) * radius;
  const y = scene.anchorY ?? 0;
  const yaw = placed;

  // Never show the waiting stack; fade in quickly as card starts moving
  // Front card (around === 0) is visible as the top card of the deck
  const isFrontCard = around < 1e-4;
  const appear = isFrontCard ? 1 : Math.min(1, t * 2.5);

  // Behind camera or facing back
  const behindCamera = z > 0;

  // Distance from camera for depth sorting / fog / opacity cues
  // Camera is roughly at (0, 0, scene.perspective)
  const distanceFromCamera = Math.hypot(x, y, z - (scene.perspective || 1000));

  return {
    x,
    y,
    z,
    yaw,
    scale: scene.scale,
    appear,
    behindCamera,
    angle: placed,
    distanceFromCamera,
  };
}
