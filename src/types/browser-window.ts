export interface BrowserWindowItem {
  id: string;
  index: number;
  title: string;
  urlLabel: string;
  category: string;
  description: string;
  screenshot: string;
  link: string;
  external: boolean;
  featured?: boolean;
  width: number;
  height: number;
}

export interface Window3DPose {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export interface SceneCameraConfig {
  perspective: number;
  pitch: number; // camera tilt in degrees
  yaw: number;   // camera yaw
  roll: number;  // camera roll
  scale: number;
}

export type PortfolioMode = 'human' | 'agent';
