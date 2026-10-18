import { Window3DPose, SceneCameraConfig } from '../types/browser-window';

export interface BasePose {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  zIndex: number;
}

// Compact starting stack poses (overlapping near center in perspective)
export const STACK_POSES: BasePose[] = [
  { x: 0, y: 0, z: 0, rotX: 10, rotY: -2, rotZ: 0, scale: 0.85, zIndex: 10 },
  { x: 6, y: -6, z: -25, rotX: 9, rotY: -1, rotZ: 2, scale: 0.83, zIndex: 9 },
  { x: -8, y: 8, z: -50, rotX: 8, rotY: 2, rotZ: -2.5, scale: 0.82, zIndex: 8 },
  { x: -4, y: -10, z: -75, rotX: 10, rotY: 3, rotZ: -4, scale: 0.8, zIndex: 7 },
  { x: 10, y: 6, z: -100, rotX: 7, rotY: -3, rotZ: 3, scale: 0.78, zIndex: 6 },
  { x: -12, y: -4, z: -125, rotX: 9, rotY: 4, rotZ: -5, scale: 0.76, zIndex: 5 },
  { x: 14, y: -8, z: -150, rotX: 8, rotY: -4, rotZ: 4.5, scale: 0.74, zIndex: 4 },
  { x: 0, y: -14, z: -175, rotX: 11, rotY: 0, rotZ: 1, scale: 0.72, zIndex: 3 },
];

// Unfolded target poses in the floating 3D hero composition
export const UNFOLDED_POSES: BasePose[] = [
  // 0: ToolKB.in (Center Front Anchor)
  { x: 0, y: 40, z: 120, rotX: 2, rotY: -1, rotZ: -0.5, scale: 1.05, zIndex: 20 },
  // 1: Brandcey (Top-Right Supporting)
  { x: 410, y: -100, z: -20, rotX: 5, rotY: -14, rotZ: 2.5, scale: 0.95, zIndex: 18 },
  // 2: Arogya Relief (Bottom-Left Supporting)
  { x: -400, y: 110, z: 0, rotX: -4, rotY: 15, rotZ: -2, scale: 0.94, zIndex: 17 },
  // 3: Motion Subtitles (Top-Left Elevated)
  { x: -410, y: -120, z: -80, rotX: 8, rotY: 18, rotZ: 3.5, scale: 0.88, zIndex: 15 },
  // 4: Qrivna Web App (Bottom-Right Elevated)
  { x: 420, y: 130, z: -60, rotX: -5, rotY: -16, rotZ: -2.5, scale: 0.89, zIndex: 14 },
  // 5: BrollWriter SaaS (Distant Left Depth)
  { x: -660, y: 10, z: -200, rotX: 4, rotY: 22, rotZ: 5, scale: 0.8, zIndex: 10 },
  // 6: Dhankathaa Analytics (Distant Right Depth)
  { x: 670, y: -15, z: -180, rotX: 5, rotY: -20, rotZ: -4, scale: 0.82, zIndex: 9 },
  // 7: ResumeIQ Tech (Deep Upper Center Anchor)
  { x: 20, y: -210, z: -280, rotX: 12, rotY: -3, rotZ: 1, scale: 0.75, zIndex: 8 },
];

/**
 * Calculates camera parameters between loader state and expanded hero state.
 */
export function sceneCamera(expansion: number, viewportWidth = 1440): SceneCameraConfig {
  const clampExp = Math.max(0, Math.min(1, expansion));
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  const startPerspective = isMobile ? 850 : 1200;
  const endPerspective = isMobile ? 650 : 850;

  const startPitch = 16; // tilted view during loader
  const endPitch = 0;    // level view during hero

  const perspective = startPerspective + (endPerspective - startPerspective) * clampExp;
  const pitch = (startPitch * (1 - clampExp)) || 0;

  let baseScale = 1.0;
  if (isMobile) {
    baseScale = 0.58;
  } else if (isTablet) {
    baseScale = 0.82;
  } else if (viewportWidth < 1440) {
    baseScale = 0.92;
  }

  const scale = (0.75 + 0.25 * clampExp) * baseScale;

  return {
    perspective,
    pitch,
    yaw: 0,
    roll: 0,
    scale,
  };
}

/**
 * Pure pose calculation function for a 3D browser window.
 *
 * During formation (0 -> 1):
 * - Windows unfold sequentially from the central stack with ease-out cubic.
 * - Staggered by index order.
 * - Waiting windows remain tucked in the stack with controlled opacity.
 *
 * During expansion (0 -> 1):
 * - Positions expand outward into the hero arrangement.
 * - The primary focal window remains prominent while depth layers settle naturally.
 */
export function windowPose(
  index: number,
  formation: number,
  expansion: number,
  viewportWidth = 1440,
  dealShare = 0.35
): Window3DPose {
  const clampForm = Math.max(0, Math.min(1, formation));
  const clampExp = Math.max(0, Math.min(1, expansion));

  const total = STACK_POSES.length;
  const safeIndex = Math.max(0, Math.min(total - 1, index));

  const stack = STACK_POSES[safeIndex];
  const unfolded = UNFOLDED_POSES[safeIndex];

  // Staggered slice of formation
  const order = safeIndex / total;
  const DEAL = Math.max(0.1, Math.min(0.8, dealShare));
  const t = Math.max(0, Math.min(1, (clampForm - order * (1 - DEAL)) / DEAL));

  // Ease-out cubic: 1 - (1 - t)^3
  const dealt = 1 - Math.pow(1 - t, 3);

  // Responsive spread factor
  let spreadFactor = 1.0;
  if (viewportWidth < 600) {
    spreadFactor = 0.45; // keep windows compact on small mobile
  } else if (viewportWidth < 992) {
    spreadFactor = 0.72;
  } else if (viewportWidth < 1440) {
    spreadFactor = 0.9;
  }

  // Combined progression: formation unfolds the stack, expansion widens the composition
  const unfoldProgress = dealt;
  const expandProgress = clampExp;

  // Interpolate position
  const targetX = (stack.x + (unfolded.x - stack.x) * unfoldProgress) * (1 + 0.25 * expandProgress) * spreadFactor;
  const targetY = (stack.y + (unfolded.y - stack.y) * unfoldProgress) * (1 + 0.15 * expandProgress) * (viewportWidth < 600 ? 0.6 : 1);
  const targetZ = stack.z + (unfolded.z - stack.z) * unfoldProgress * (0.8 + 0.2 * expandProgress);

  // Interpolate rotation
  const targetRotX = (stack.rotX + (unfolded.rotX - stack.rotX) * unfoldProgress) * (1 - 0.2 * expandProgress);
  const targetRotY = (stack.rotY + (unfolded.rotY - stack.rotY) * unfoldProgress);
  const targetRotZ = (stack.rotZ + (unfolded.rotZ - stack.rotZ) * unfoldProgress);

  // Interpolate scale
  const targetScale = stack.scale + (unfolded.scale - stack.scale) * unfoldProgress;

  // Opacity: front window (index 0) is always visible in stack; others fade in as dealt
  const opacity = safeIndex === 0 ? 1 : Math.min(1, 0.2 + t * 0.8);

  return {
    x: targetX,
    y: targetY,
    z: targetZ,
    rotX: targetRotX,
    rotY: targetRotY,
    rotZ: targetRotZ,
    scale: targetScale,
    opacity,
    zIndex: unfoldProgress > 0.8 ? unfolded.zIndex : stack.zIndex,
  };
}

/**
 * Standard cubic ease-out easing curve for camera and scene expansions.
 */
export function easeBezier(t: number): number {
  const clampT = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clampT, 3);
}

