export type TerminalStoryPhase =
  | 'empty-workspace'     // Scene 01: quiet screen, blinking cursor, metadata
  | 'system-startup'      // Scene 02: authentic commands executed
  | 'code-shaping'        // Scene 03: layout boundaries & wireframe guides bloom
  | 'interfaces-emerging' // Scene 04: wireframes become 3D browser windows (ToolKB focal)
  | 'portfolio-opened'    // Scene 05: camera pulls back, painted sky reveals, header handoff
  | 'interactive';        // Scene 06: full interactive hero & portfolio exploration

export interface TerminalLine {
  id: string;
  type: 'cmd' | 'output' | 'success' | 'meta';
  text: string;
  delayMs: number;
}
