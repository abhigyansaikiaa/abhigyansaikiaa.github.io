import { describe, it, expect } from 'vitest';
import {
  windowPose,
  sceneCamera,
  STACK_POSES,
  UNFOLDED_POSES,
} from './browser-scene';

describe('sceneCamera', () => {
  it('starts with tilted perspective at expansion = 0', () => {
    const cam = sceneCamera(0, 1440);
    expect(cam.pitch).toBe(16);
    expect(cam.perspective).toBe(1200);
  });

  it('levels out to pitch = 0 at expansion = 1', () => {
    const cam = sceneCamera(1, 1440);
    expect(cam.pitch).toBe(0);
    expect(cam.perspective).toBe(850);
  });

  it('scales responsively for mobile vs desktop', () => {
    const desktopCam = sceneCamera(1, 1920);
    const mobileCam = sceneCamera(1, 390);
    expect(mobileCam.scale).toBeLessThan(desktopCam.scale);
  });

  it('clamps expansion inputs outside [0, 1]', () => {
    const camUnder = sceneCamera(-1, 1440);
    expect(camUnder.pitch).toBe(16);
    const camOver = sceneCamera(2, 1440);
    expect(camOver.pitch).toBe(0);
  });
});

describe('windowPose', () => {
  it('keeps all windows compact near center at formation = 0', () => {
    for (let i = 0; i < STACK_POSES.length; i++) {
      const pose = windowPose(i, 0, 0, 1440);
      expect(Math.abs(pose.x)).toBeLessThanOrEqual(25);
      expect(Math.abs(pose.y)).toBeLessThanOrEqual(25);
      expect(Number.isFinite(pose.z)).toBe(true);
      expect(Number.isFinite(pose.rotX)).toBe(true);
      expect(Number.isFinite(pose.rotY)).toBe(true);

      // Primary window is visible on top of stack
      if (i === 0) {
        expect(pose.opacity).toBe(1);
        expect(pose.x).toBe(0);
        expect(pose.y).toBe(0);
      }
    }
  });

  it('unfolds windows sequentially in a staggered sequence', () => {
    const pose1 = windowPose(1, 0.45, 0, 1440);
    const pose6 = windowPose(6, 0.45, 0, 1440);

    // Window 1 is near the start of the deal and should have moved significantly from its stack position
    expect(Math.abs(pose1.x)).toBeGreaterThan(Math.abs(STACK_POSES[1].x));
    // Window 6 is near the end and should be less unfolded
    expect(pose1.opacity).toBeGreaterThan(pose6.opacity);
  });

  it('reaches expected unfolded coordinates at formation = 1, expansion = 1', () => {
    for (let i = 0; i < UNFOLDED_POSES.length; i++) {
      const pose = windowPose(i, 1, 1, 1440);
      expect(Number.isFinite(pose.x)).toBe(true);
      expect(Number.isFinite(pose.y)).toBe(true);
      expect(Number.isFinite(pose.z)).toBe(true);
      expect(Number.isFinite(pose.rotX)).toBe(true);
      expect(Number.isFinite(pose.rotY)).toBe(true);
      expect(Number.isFinite(pose.rotZ)).toBe(true);
      expect(pose.opacity).toBe(1);
    }
  });

  it('adapts spread factor responsively for mobile viewports', () => {
    const desktopPose = windowPose(1, 1, 1, 1440);
    const mobilePose = windowPose(1, 1, 1, 390);

    expect(Math.abs(mobilePose.x)).toBeLessThan(Math.abs(desktopPose.x));
  });
});
