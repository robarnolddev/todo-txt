import * as vscode from 'vscode';
import AppConstants from '../utils/AppConstants';
import { isArray } from 'util';

export namespace ToDoSort {

    export enum SortType {
        PRIORITY = "priority",
        CONTEXT = "context",
        PROJECT = "project",
        DUE_DATE = "due",
        THRESHOLD = "threshold"
    }

    export function SortLines(iSortType: SortType) {
        let editor = vscode.window.activeTextEditor;
        let docObject = convertDocToList(editor.document);
        let sortedObject = sortByKey(iSortType.valueOf(), docObject);
        deleteAndPopulate(editor, sortedObject);
    }

    function convertDocToList(iDoc: vscode.TextDocument): Array<Object> {
        var finalArray: Array<Object> = new Array<Object>();

        for (var i = 0; i < iDoc.lineCount; i++) {
            let lineText = iDoc.lineAt(i).text;
            let projectFlag = parseRegexResponse(lineText.match(AppConstants.PROJECT_REGEX));
            let contextFlag = parseRegexResponse(lineText.match(AppConstants.CONTEXT_REGEX));
            let dueFlag = parseRegexResponse(lineText.match(AppConstants.OVERDUE_REGEX));
            let priorityFlag = parseRegexResponse(lineText.match(AppConstants.PRIORITY_REGEX));
            let thresholdFlag = parseRegexResponse(lineText.match(AppConstants.THRESHOLD_REGEX));
            finalArray.push({
                "line": i,
                "lineText": lineText,
                "project": projectFlag,
                "context": contextFlag,
                "due": dueFlag,
                "priority": priorityFlag,
                "threshold": thresholdFlag
            });
        }
        return finalArray;
    }

    function parseRegexResponse(regexResponse: Array<String>): String {
        if (regexResponse != null) {
            return regexResponse.pop();
        }
        return "z";
    }

    function sortByKey(iKey: String, iArray: Array<Object>): Array<Object> {
        var sortedArray = iArray.sort((obj1, obj2) => {

            if (obj1[iKey.toString()] > obj2[iKey.toString()]) {
                return 1;
            }
            if (obj1[iKey.toString()] < obj2[iKey.toString()]) {
                return -1;
            }

            return sortByCreation(obj1, obj2)
        });

        return sortedArray;
    }

    function sortByCreation(obj1: Object, obj2: Object): number {
        let line1 = obj1['lineText']
        let line2 = obj2['lineText']

        let isBlank: number;
        if ((isBlank = sortByBlank(line1, line2)) !== 0) {
            return isBlank
        }

        let date1 = line1.slice(0, 10)
        let date2 = line2.slice(0, 10)

        if (date1 > date2) {
            return 1
        }

        if (date1 < date2) {
            return -1
        }

        return 0
    }

    function sortByBlank(line1: string, line2: string): number {
        if (line1.length === 0) {
            return 1
        }

        if (line2.length === 0) {
            return -1
        }

        return 0
    }

    function deleteAndPopulate(editor: vscode.TextEditor, docObject: Array<Object>) {

        editor.edit(builder => {

            for (var i = 0; i < docObject.length; i++) {
                let replaceRange = editor.document.lineAt(i).range;
                let lineText = docObject[i]["lineText"];
                builder.replace(replaceRange, lineText);
            }
        });

        editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
    }
}