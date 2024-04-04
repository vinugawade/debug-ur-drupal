import * as vscode from 'vscode';
import { DebugMessage } from './debug-message';
import { JSDebugMessage } from './debug-message/js';
import { Command, ExtensionProperties } from './entities';
import { LineCodeProcessing } from './line-code-processing';
import { JSLineCodeProcessing } from './line-code-processing/js';
import { getAllCommands } from './commands/';
import { DebugMessageLine } from './debug-message/DebugMessageLine';
import { JSDebugMessageLine } from './debug-message/js/JSDebugMessageLine';

export function activate(): void {
  const jsLineCodeProcessing: LineCodeProcessing = new JSLineCodeProcessing();
  const debugMessageLine: DebugMessageLine = new JSDebugMessageLine(
    jsLineCodeProcessing,
  );
  const jsDebugMessage: DebugMessage = new JSDebugMessage(
    jsLineCodeProcessing,
    debugMessageLine,
  );

  // Fetch initial configuration
  let config: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('debugUrDrupal');
  let properties: ExtensionProperties = getExtensionProperties(config);

  // React to changes in configuration
  vscode.workspace.onDidChangeConfiguration(() => {
    config = vscode.workspace.getConfiguration('debugUrDrupal');
    properties = getExtensionProperties(config);
  });

  // Register commands
  const commands: Array<Command> = getAllCommands();
  for (const { name, handler } of commands) {
    vscode.commands.registerCommand(name, (args: unknown[]) => {
      handler(properties, jsDebugMessage, args);
    });
  }
}

function getExtensionProperties(
  workspaceConfig: vscode.WorkspaceConfiguration,
) {
  return {
    wrapLogMessage: workspaceConfig.wrapLogMessage ?? false,
    // logMessagePrefix: workspaceConfig.logMessagePrefix ?? '🚀',
    logMessageSuffix: workspaceConfig.logMessageSuffix ?? 'Debug Log',
    // addSemicolonInTheEnd: true,
    // insertEnclosingClass: workspaceConfig.insertEnclosingClass ?? true,
    // insertEnclosingFunction: workspaceConfig.insertEnclosingFunction ?? true,
    // insertEmptyLineBeforeLogMessage:
    //   workspaceConfig.insertEmptyLineBeforeLogMessage ?? false,
    // insertEmptyLineAfterLogMessage:
    //   workspaceConfig.insertEmptyLineAfterLogMessage ?? false,
    // quote: workspaceConfig.quote ?? '"',
    // delimiterInsideMessage: workspaceConfig.delimiterInsideMessage ?? '~',
    includeFileNameAndLineNum:
      workspaceConfig.includeFileNameAndLineNum ?? false,
    logType: workspaceConfig.logType ?? 'd',
    logFunction: workspaceConfig.logFunction ?? 'd',
  };
}
