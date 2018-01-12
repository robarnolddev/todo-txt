'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import AppConstants from './AppConstants';

export function ActivateCommands(context: vscode.ExtensionContext) {

    let toggleCompletion = vscode.commands.registerCommand('extension.toggleCompletion', () => {
        toggleCompletedTasks();
    });

    let archiveTasks = vscode.commands.registerCommand('extension.archiveTasks', () => {
        archiveCompletedTasks();
    });

    context.subscriptions.push(toggleCompletion);
}

export function toggleCompletedTasks() {
    // Get the current line and find the first 2 characters
    const editor = vscode.window.activeTextEditor;
    let currLine = editor.selection.start.line;
    let currDoc = editor.document;

    if (isTaskComplete(currDoc.lineAt(currLine).text)) {
        editor.edit(builder => {
            builder.delete(new vscode.Range(new vscode.Position(currLine, 0), new vscode.Position(currLine, 2)));
            editor.selection = new vscode.Selection(new vscode.Position(currLine, 3), new vscode.Position(currLine, 3));
        })
    } else {
        editor.edit(builder => {
            builder.insert(new vscode.Position(currLine, 0), "x ");
        })
    }
    editor.selection = new vscode.Selection(new vscode.Position(currLine, 0), new vscode.Position(currLine, 0));
}

export function archiveCompletedTasks() {

    const editor = vscode.window.activeTextEditor;
    let window = vscode.window;
    let currDoc = editor.document;
    let doneFileName = path.dirname(currDoc.fileName) + path.sep + 'done.txt';
    let lineDeletes = [];

    if (path.basename(currDoc.fileName) != AppConstants.TODO_FILENAME) {
        vscode.window.showInformationMessage("Archive only available for the " + AppConstants.TODO_FILENAME + " file");
        return;
    }

    if (window.activeTextEditor != undefined) {

        // Only Decorate Document if it's in the classic filenaming convention
        let fileName = path.basename(window.activeTextEditor.document.fileName);
        let eol = determineEOL(vscode.window.activeTextEditor.document.eol);
        
        let totalLines = window.activeTextEditor.document.lineCount;
        for (var i = 0; i <= totalLines - 1; i++) {
            let lineObject = window.activeTextEditor.document.lineAt(i);

            if (isTaskComplete(currDoc.lineAt(i).text)) {
                console.log(doneFileName);
                fs.appendFileSync(doneFileName, lineObject.text + eol);
                lineDeletes.push(i);
            }            
        }

        deleteLines(lineDeletes, editor, currDoc);
        editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
    }
}

function determineEOL(eolValue: vscode.EndOfLine): String {
    if (eolValue == vscode.EndOfLine.CRLF) {
        return '\r\n';
    }
    return '\n';
}

function deleteLines(lineDeletes: Number[], editor: vscode.TextEditor, doc: vscode.TextDocument) {
    let sortedLines = lineDeletes.reverse();

    sortedLines.forEach(a => {
        editor.edit(builder => {
            builder.delete(doc.lineAt(a.valueOf()).rangeIncludingLineBreak);
        })
    })
}

function isTaskComplete(lineText: String): Boolean {
    if (lineText.substring(0, 2).toLowerCase() == "x ") {
        return true
    }

    return false
}