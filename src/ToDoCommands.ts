'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import AppConstants from './AppConstants';

enum ArchiveType {
    Archive,
    Reactivate
}

export function ActivateCommands(context: vscode.ExtensionContext) {

    let toggleCompletion = vscode.commands.registerCommand('extension.toggleCompletion', () => {
        toggleCompletedTasks();
    });

    let archiveTasks = vscode.commands.registerCommand('extension.archiveTasks', () => {
        bulkArchiveTasks();
    });

    let reactivateCompletedTask = vscode.commands.registerCommand('extension.reactivateTask', () => {
        reactivateTask();
    });

    context.subscriptions.push(toggleCompletion);
    context.subscriptions.push(archiveTasks);
    context.subscriptions.push(reactivateCompletedTask);
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

export function bulkArchiveTasks() {

    const editor = vscode.window.activeTextEditor;
    let window = vscode.window;
    let currDoc = editor.document;
    let destinationFileName = path.dirname(currDoc.fileName) + path.sep + AppConstants.ARCHIVE_FILENAME;
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
                fs.appendFileSync(destinationFileName, lineObject.text + eol);
                lineDeletes.push(i);
            }            
        }

        deleteLines(lineDeletes, editor, currDoc);
        editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
    }
}

function reactivateTask() {
    const editor = vscode.window.activeTextEditor;
    let currLine = editor.selection.start.line;
    let currDoc = editor.document;

    if (path.basename(currDoc.fileName) != AppConstants.ARCHIVE_FILENAME) {
        vscode.window.showInformationMessage("Reactivate only available for the " + AppConstants.ARCHIVE_FILENAME + " file");
        return;
    }

    /*
     * Migrate the task to the main file
     */
    let destinationFileName = path.dirname(currDoc.fileName) + path.sep + AppConstants.TODO_FILENAME;
    let lineObject = editor.document.lineAt(currLine);
    let eol = determineEOL(vscode.window.activeTextEditor.document.eol);
    let lineText = lineObject.text;
    if (lineText.substring(0, 2).toLowerCase() == 'x ') {
        lineText = lineText.substring(2);
    }
    fs.appendFileSync(destinationFileName, eol + lineText + eol);
    let lineDeletes = [currLine];
    deleteLines(lineDeletes, editor, currDoc);

}

function determineEOL(eolValue: vscode.EndOfLine): String {
    if (eolValue == vscode.EndOfLine.CRLF) {
        return '\r\n';
    }
    return '\n';
}

function deleteLines(lineDeletes: Number[], editor: vscode.TextEditor, doc: vscode.TextDocument) {
    let sortedLines = lineDeletes.reverse();
    if (sortedLines.length > 0) {
        editor.edit(builder => {
            sortedLines.forEach(a => {
                builder.delete(doc.lineAt(a.valueOf()).rangeIncludingLineBreak);
            })
        }).then(()=>{});
    }
}

function isTaskComplete(lineText: String): Boolean {
    if (lineText.substring(0, 2).toLowerCase() == "x ") {
        return true
    }

    return false
}