// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "mercy-console-log" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand("extension.log", () => {
    // The code you place here will be executed every time your command is executed
    console.log("Yupppppppppppppppppp");
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      if (!selection.isEmpty) {
        const word = document.getText(selection);
        const line = document.lineAt(selection.start.line);
        const lineText = line.text;
        const whitespace = lineText.substring(
          0,
          line.firstNonWhitespaceCharacterIndex
        );
        const xx = document.fileName.lastIndexOf("/");
        const fileName = document.fileName.substring(xx + 1);

        editor.edit(editBuilder => {
          editBuilder.replace(
            line.range,
            `${lineText}\n${whitespace}console.log('${fileName}: ${word}', ${word})`
          );
        });
      }
    }

    // Display a message box to the user

    vscode.window.showInformationMessage("Hello WWWWorld!");
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
