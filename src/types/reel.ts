export interface ProjectItem {
  id: string;
  slot: number;
  title: string;
  tag: string;
  category: string;
  description: string;
  coverImage: string;
  videoPreview?: string;
  link: string;
  external: boolean;
  featured?: boolean;
}

export interface SceneConfig {
  radius: number;
  perspective: number;
  tilt: number;
  roll: number;
  scale: number;
  anchorY?: number;
}

export interface CardPose {
  x: number;
  y: number;
  z: number;
  yaw: number;
  scale: number;
  appear: number;
  behindCamera: boolean;
  angle: number;
  distanceFromCamera: number;
}

export type AnimationState =
  | 'initializing'
  | 'loading-assets'
  | 'forming-ring'
  | 'expanding-ring'
  | 'interactive'
  | 'skipped';
