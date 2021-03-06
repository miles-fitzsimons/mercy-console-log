import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.log", () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;
      if (!selection.isEmpty) {
        const line = document.lineAt(selection.start.line);
        const lineText = line.text;

        const whitespace = lineText.substring(
          0,
          line.firstNonWhitespaceCharacterIndex
        );
        const filePath = document.fileName;

        let lastSlashIndex = -1;
        if (filePath.lastIndexOf("/") !== -1) {
          lastSlashIndex = filePath.lastIndexOf("/");
        } else if (filePath.lastIndexOf("\\") !== -1) {
          lastSlashIndex = filePath.lastIndexOf("\\");
        }

        const fileName = filePath.substring(lastSlashIndex + 1);

        editor.edit(editBuilder => {
          const word = document.getText(selection);
          editBuilder.replace(
            line.range,
            `${lineText}\n${whitespace}console.log('${fileName} -> %c${word}:', 'color: red', ${word})`
          );
        });
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

// it handles \
