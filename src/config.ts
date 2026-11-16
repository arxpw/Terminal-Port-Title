import * as vscode from 'vscode';

export interface Config {
  patterns: RegExp[];
  format: string;
}

export function readConfig(): Config {
  const config = vscode.workspace.getConfiguration('terminalPortTitle');
  return {
    patterns: config.get<string[]>('patterns', []).flatMap(compilePattern),
    format: config.get<string>('format', '${port}'),
  };
}

function compilePattern(source: string): RegExp[] {
  try {
    return [new RegExp(source)];
  } catch {
    vscode.window.showWarningMessage(`Terminal Port Title: invalid pattern ${source}`);
    return [];
  }
}
