import * as vscode from 'vscode';
import { readConfig } from './config';
import { findPort } from './portDetector';
import { formatName, renameTerminal, terminalFolder } from './terminal';

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.window.onDidStartTerminalShellExecution(onExecutionStart));
}

async function onExecutionStart({ terminal, execution }: vscode.TerminalShellExecutionStartEvent) {
  const { patterns, format } = readConfig();
  if (!patterns.length) return;

  const port = await findPort(execution.read(), patterns);
  if (!port) return;

  const folder = terminalFolder(terminal, execution);
  await renameTerminal(terminal, formatName(format, { folder, port }));
}

export function deactivate() {}
