import { TerminalLine } from '../types/terminal';

export const TERMINAL_COMMAND_SCRIPT: Array<{
  cmd: string;
  outputLines: string[];
  successMessage?: string;
}> = [
  {
    cmd: 'whoami',
    outputLines: ['abhigyan_saikia (full-stack web developer // Assam, India)'],
  },
  {
    cmd: 'ls -la ./projects',
    outputLines: [
      'drwxr-xr-x toolkb.in/        [client-side productivity utilities]',
      'drwxr-xr-x arogya_relief/    [disaster healthcare & logistics]',
      'drwxr-xr-x motion_subtitles/ [kinetic typography subtitle studio]',
      'drwxr-xr-x brandcey.in/      [vetted talent collaboration platform]',
    ],
  },
  {
    cmd: 'npm run build',
    outputLines: ['vite v5.4.8: transforming 16 verified application modules...'],
    successMessage: '✓ interfaces compiled into 3D viewports [unfolding reality]',
  },
];

export function createTerminalInitialState(): TerminalLine[] {
  return [
    {
      id: 'meta-env',
      type: 'meta',
      text: 'WORKSPACE INITIALIZED // SESSION: PRODUCTION // TARGET: BROWSER_HERO',
      delayMs: 0,
    },
  ];
}
