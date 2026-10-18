import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { ProjectItem, SceneConfig } from '../types/reel';
import {
  REEL_SLOTS,
  reelAngle,
  reelPose,
  reelScene,
  getResponsiveScenes,
} from '../lib/reel-geometry';
import { ReelCard } from './ReelCard';

export interface ReelSceneProps {
  projects: ProjectItem[];
  formation: number; // 0 to 1
  expansion: number; // 0 to 1
  isInteractive: boolean;
  onProjectSelect?: (project: ProjectItem) => void;
}

export const ReelScene: React.FC<ReelSceneProps> = ({
  projects,
  formation,
  expansion,
  isInteractive,
  onProjectSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Viewport dimensions for responsive scene
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Target and current rotation angle in degrees
  const angleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const [renderedAngle, setRenderedAngle] = useState<number>(0);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const lastActiveTimeRef = useRef<number>(Date.now());
  const rafIdRef = useRef<number | null>(null);

  // Cache for CSS variables written to DOM
  const styleCache = useRef<Map<string, string>>(new Map());

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive scene configuration
  const scenes = useMemo(() => {
    return getResponsiveScenes(viewport.width, viewport.height);
  }, [viewport.width, viewport.height]);

  // Current interpolated scene parameters
  const currentScene: SceneConfig = useMemo(() => {
    return reelScene(expansion, scenes);
  }, [expansion, scenes]);

  // Write scene CSS variables to ring element with caching to avoid layout thrashing
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const writeVar = (key: string, val: string) => {
      if (styleCache.current.get(key) === val) return;
      styleCache.current.set(key, val);
      ring.style.setProperty(key, val);
    };

    writeVar('--scene-perspective', `${currentScene.perspective.toFixed(1)}px`);
    writeVar('--scene-tilt', `${currentScene.tilt.toFixed(2)}deg`);
    writeVar('--scene-roll', `${currentScene.roll.toFixed(2)}deg`);
  }, [currentScene]);

  // Smooth animation loop for rotation & spring easing
  useEffect(() => {
    const animateLoop = () => {
      const now = Date.now();
      const isIdle = now - lastActiveTimeRef.current > 1200;

      if (isInteractive && !isDraggingRef.current && isIdle) {
        // Slow idle auto-rotation (approx 0.045 deg/frame = ~2.7 deg/sec)
        targetAngleRef.current += 0.045;
      }

      // Smooth spring chase
      const diff = targetAngleRef.current - angleRef.current;
      if (Math.abs(diff) > 0.001) {
        angleRef.current += diff * 0.09;
        setRenderedAngle(angleRef.current);
      }

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    rafIdRef.current = requestAnimationFrame(animateLoop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isInteractive]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (!isInteractive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        lastActiveTimeRef.current = Date.now();
        targetAngleRef.current -= 360 / REEL_SLOTS;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        lastActiveTimeRef.current = Date.now();
        targetAngleRef.current += 360 / REEL_SLOTS;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInteractive]);

  // Pointer interaction: drag & swipe
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isInteractive) return;
      // Only primary mouse button or touch
      if (e.button !== 0) return;

      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      dragDistanceRef.current = 0;
      lastActiveTimeRef.current = Date.now();

      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    },
    [isInteractive]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isInteractive || !isDraggingRef.current) return;

      const deltaX = e.clientX - startXRef.current;
      startXRef.current = e.clientX;
      dragDistanceRef.current += Math.abs(deltaX);
      lastActiveTimeRef.current = Date.now();

      // Drag sensitivity: scale for screen width
      const sensitivity = 0.28 * (1000 / Math.max(600, viewport.width));
      targetAngleRef.current += deltaX * sensitivity;
    },
    [isInteractive, viewport.width]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      lastActiveTimeRef.current = Date.now();

      if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
        containerRef.current.releasePointerCapture(e.pointerId);
      }
    },
    []
  );

  // Wheel interaction with sensible threshold
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isInteractive) return;
      // Only horizontal wheel or shift+wheel should rotate carousel to avoid hijacking vertical page scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
        lastActiveTimeRef.current = Date.now();
        targetAngleRef.current += e.deltaX * 0.15;
      }
    },
    [isInteractive]
  );

  // Card click handler
  const handleCardClick = useCallback(
    (project: ProjectItem) => {
      // If user was dragging, ignore click
      if (dragDistanceRef.current > 8) return;

      lastActiveTimeRef.current = Date.now();

      // Smoothly rotate clicked card toward front
      const targetDeg = -project.slot * (360 / REEL_SLOTS);
      // Normalize target to closest rotational wrap
      const cur = targetAngleRef.current;
      const diff = ((targetDeg - cur + 180) % 360 + 360) % 360 - 180;
      targetAngleRef.current = cur + diff;

      if (onProjectSelect) {
        onProjectSelect(project);
      }
    },
    [onProjectSelect]
  );

  return (
    <div
      ref={containerRef}
      className={`reel-viewport ${isInteractive ? 'is-interactive' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      role="region"
      aria-label="3D Project Carousel"
    >
      <div ref={ringRef} className="reel-camera-rig">
        <div className="reel-cylinder-wrapper">
          {projects.map((project) => {
            const angle = reelAngle(project.slot, renderedAngle, REEL_SLOTS);
            const pose = reelPose(angle, formation, currentScene);

            // Angle difference relative to front of camera (angle 0 in cylindrical coordinates is back, ±180 is front)
            // A card is front-facing if it is within ±55 degrees of the front
            const angleDiffFromFront = Math.abs(Math.abs(pose.yaw) - 180);
            const isFrontFacing = angleDiffFromFront < 55;

            return (
              <ReelCard
                key={project.id}
                project={project}
                x={pose.x}
                y={pose.y}
                z={pose.z}
                yaw={pose.yaw}
                scale={pose.scale}
                appear={pose.appear}
                isInteractive={isInteractive}
                isFrontFacing={isFrontFacing}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
