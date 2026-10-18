import { describe, it, expect } from 'vitest';
import { TERMINAL_COMMAND_SCRIPT, createTerminalInitialState } from './terminal-script';

describe('Terminal Script Specification', () => {
  it('initializes with production workspace metadata', () => {
    const initial = createTerminalInitialState();
    expect(initial.length).toBeGreaterThan(0);
    expect(initial[0].type).toBe('meta');
    expect(initial[0].text).toContain('WORKSPACE INITIALIZED');
  });

  it('contains whoami, ls projects, and npm run build commands', () => {
    const commands = TERMINAL_COMMAND_SCRIPT.map((c) => c.cmd);
    expect(commands).toContain('whoami');
    expect(commands).toContain('ls -la ./projects');
    expect(commands).toContain('npm run build');
  });

  it('features ToolKB as the first listed project directory', () => {
    const lsCommand = TERMINAL_COMMAND_SCRIPT.find((c) => c.cmd.includes('ls'));
    expect(lsCommand).toBeDefined();
    expect(lsCommand!.outputLines[0]).toContain('toolkb.in');
  });

  it('excludes TradeGate and Trade-Guardian from project outputs', () => {
    const allText = JSON.stringify(TERMINAL_COMMAND_SCRIPT);
    expect(allText).not.toContain('TradeGate');
    expect(allText).not.toContain('Trade-Guardian');
  });
});
