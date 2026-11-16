import * as path from 'path';
import * as vscode from 'vscode';

export function terminalFolder(terminal: vscode.Terminal, execution: vscode.TerminalShellExecution) {
  const cwd = execution.cwd ?? terminal.shellIntegration?.cwd;
  return cwd ? path.basename(cwd.fsPath) : terminal.name;
}

/** Fills `${key}` placeholders in the format, leaving unknown ones untouched. */
export function formatName(format: string, vars: Record<string, string>) {
  return format.replace(/\$\{(\w+)\}/g, (token, key) => vars[key] ?? token);
}

export async function renameTerminal(terminal: vscode.Terminal, name: string) {
  if (terminal.name === name) return;

  // renameWithArg only acts on the active terminal, so switch to it and back
  const previous = vscode.window.activeTerminal;
  terminal.show(true);
  await vscode.commands.executeCommand('workbench.action.terminal.renameWithArg', { name });
  if (previous && previous !== terminal) previous.show(true);
}
