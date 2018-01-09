'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as ToDoCommands from './ToDoCommands';
import ToDoController from './ToDoController';
import ToDoDecorator from './ToDoDecorator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let toDoDecorator = new ToDoDecorator();
    let toDoController = new ToDoController(toDoDecorator);
    ToDoCommands.ActivateCommands(context);
    
    // By Default Decorate the document
    toDoDecorator.decorateDocument();
}

// this method is called when your extension is deactivated
export function deactivate() {
}