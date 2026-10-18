import { describe, it, expect } from 'vitest';
import {
  reelAngle,
  reelPose,
  reelScene,
  REEL_SLOTS,
  DEFAULT_LOADER_SCENE,
  DEFAULT_HERO_SCENE,
  getResponsiveScenes,
} from './reel-geometry';

describe('reelAngle', () => {
  it('maps slot 0 to -180 when ring angle is 0', () => {
    const angle = reelAngle(0, 0, 16);
    expect(angle).toBe(-180);
  });

  it('calculates equal angular spacing of 360 / 16 = 22.5 deg per slot', () => {
    const angle0 = reelAngle(0, 0, 16);
    const angle1 = reelAngle(1, 0, 16);
    expect(angle1 - angle0).toBeCloseTo(22.5);
  });

  it('keeps angles in range [-180, 180)', () => {
    for (let slot = 0; slot < 16; slot++) {
      const angle = reelAngle(slot, 45, 16);
      expect(angle).toBeGreaterThanOrEqual(-180);
      expect(angle).toBeLessThan(180);
    }
  });

  it('wraps continuous angles smoothly when whole ring rotates', () => {
    const initial = reelAngle(4, 0, 16);
    const rotated = reelAngle(4, 360, 16);
    expect(rotated).toBeCloseTo(initial);
  });
});

describe('reelScene', () => {
  it('returns exact loader start values at expansion = 0', () => {
    const scene = reelScene(0);
    expect(scene.radius).toBe(DEFAULT_LOADER_SCENE.radius);
    expect(scene.perspective).toBe(DEFAULT_LOADER_SCENE.perspective);
    expect(scene.tilt).toBe(DEFAULT_LOADER_SCENE.tilt);
    expect(scene.roll).toBe(DEFAULT_LOADER_SCENE.roll);
    expect(scene.scale).toBe(DEFAULT_LOADER_SCENE.scale);
  });

  it('returns exact hero end values at expansion = 1', () => {
    const scene = reelScene(1);
    expect(scene.radius).toBe(DEFAULT_HERO_SCENE.radius);
    expect(scene.perspective).toBe(DEFAULT_HERO_SCENE.perspective);
    expect(scene.tilt).toBe(0);
    expect(scene.roll).toBe(0);
    expect(scene.scale).toBe(DEFAULT_HERO_SCENE.scale);
  });

  it('exhibits restrained nonlinear scaling (squared curve)', () => {
    const sceneHalf = reelScene(0.5);
    // At exp=0.5, exp^2 = 0.25, so scale is only 25% toward hero scale
    const expectedScale =
      DEFAULT_LOADER_SCENE.scale + (DEFAULT_HERO_SCENE.scale - DEFAULT_LOADER_SCENE.scale) * 0.25;
    expect(sceneHalf.scale).toBeCloseTo(expectedScale);
  });

  it('clamps out-of-range expansion values', () => {
    const sceneUnder = reelScene(-0.5);
    expect(sceneUnder.radius).toBe(DEFAULT_LOADER_SCENE.radius);
    const sceneOver = reelScene(1.5);
    expect(sceneOver.radius).toBe(DEFAULT_HERO_SCENE.radius);
  });

  it('adapts scenes responsively for mobile and desktop viewports', () => {
    const mobile = getResponsiveScenes(390, 844);
    const desktop = getResponsiveScenes(1920, 1080);
    expect(mobile.start.radius).toBeLessThan(desktop.start.radius);
    expect(mobile.end.radius).toBeLessThan(desktop.end.radius);
    expect(mobile.end.scale).toBeLessThan(desktop.end.scale);
  });
});

describe('reelPose', () => {
  const testScene = DEFAULT_HERO_SCENE;

  it('stacks all cards at front (-180 deg) when formation = 0', () => {
    for (let slot = 0; slot < REEL_SLOTS; slot++) {
      const angle = reelAngle(slot, 0, REEL_SLOTS);
      const pose = reelPose(angle, 0, testScene);
      expect(pose.angle).toBeCloseTo(-180);
      expect(pose.yaw).toBeCloseTo(-180);
      // In front of camera, x is 0
      expect(pose.x).toBeCloseTo(0, 1);
      // First card is visible as top of stack, other cards are undealt and hidden
      if (slot === 0) {
        expect(pose.appear).toBe(1);
      } else {
        expect(pose.appear).toBe(0);
      }
    }
  });

  it('spreads all cards to their expected cylindrical positions at formation = 1', () => {
    for (let slot = 0; slot < REEL_SLOTS; slot++) {
      const angle = reelAngle(slot, 0, REEL_SLOTS);
      const pose = reelPose(angle, 1, testScene);

      // Angle and yaw match slot angle
      expect(pose.yaw).toBeCloseTo(angle);
      expect(pose.appear).toBe(1);

      // Check distance from origin in XZ plane equals scene radius
      const distanceFromCenter = Math.hypot(pose.x, pose.z);
      expect(distanceFromCenter).toBeCloseTo(testScene.radius, 1);

      // Verify coordinate formulas x = -sin(r)*R, z = -cos(r)*R
      const rad = (angle * Math.PI) / 180;
      expect(pose.x).toBeCloseTo(-Math.sin(rad) * testScene.radius, 1);
      expect(pose.z).toBeCloseTo(-Math.cos(rad) * testScene.radius, 1);
    }
  });

  it('deals cards in a staggered order according to angular position', () => {
    // Halfway through formation, earlier slots are dealt, later slots are still moving
    const angleSlot1 = reelAngle(1, 0, 16);
    const angleSlot12 = reelAngle(12, 0, 16);

    const pose1 = reelPose(angleSlot1, 0.45, testScene);
    const pose12 = reelPose(angleSlot12, 0.45, testScene);

    // Slot 1 is near the start of the deal, so it should be fully or mostly dealt
    expect(pose1.appear).toBeGreaterThan(0.8);
    // Slot 12 is near the end, so it should still be undealt or lower appear
    expect(pose12.appear).toBeLessThan(pose1.appear);
  });

  it('maintains strict finite numerical values with no NaNs or infinities', () => {
    const testExpansions = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0];
    const testFormations = [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0];

    for (const exp of testExpansions) {
      const scene = reelScene(exp);
      expect(Number.isFinite(scene.radius)).toBe(true);
      expect(Number.isFinite(scene.scale)).toBe(true);
      expect(Number.isFinite(scene.perspective)).toBe(true);
      expect(Number.isFinite(scene.tilt)).toBe(true);
      expect(Number.isFinite(scene.roll)).toBe(true);

      for (const form of testFormations) {
        for (let slot = 0; slot < REEL_SLOTS; slot++) {
          const angle = reelAngle(slot, 37.5, REEL_SLOTS);
          const pose = reelPose(angle, form, scene);

          expect(Number.isFinite(pose.x)).toBe(true);
          expect(Number.isFinite(pose.y)).toBe(true);
          expect(Number.isFinite(pose.z)).toBe(true);
          expect(Number.isFinite(pose.yaw)).toBe(true);
          expect(Number.isFinite(pose.appear)).toBe(true);
          expect(pose.appear).toBeGreaterThanOrEqual(0);
          expect(pose.appear).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it('smoothly preserves circular geometry at all ring rotation angles', () => {
    for (let ringRotation = -360; ringRotation <= 360; ringRotation += 45) {
      for (let slot = 0; slot < REEL_SLOTS; slot++) {
        const angle = reelAngle(slot, ringRotation, REEL_SLOTS);
        const pose = reelPose(angle, 1, testScene);
        const dist = Math.hypot(pose.x, pose.z);
        expect(dist).toBeCloseTo(testScene.radius, 1);
      }
    }
  });
});
