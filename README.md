# todo-txt README

- [Features](#features)
    - [Commands](#commands)
- [Feature Roadmap](#feature-roadmap)
- [Requirements](#requirements)
- [Extension Settings](#extension-settings)
- [Known Issues](#known-issues)
- [Release Notes](#release-notes)

## Features

- Syntax highlighting for todo.txt and done.txt files
- Commands

### Commands

The current command pallete is:

- `todo-txt: Toggle Task Completion`: Toggle the completion state of the current task line
- `todo-txt: Archive Completed Tasks`: Migrate all completed tasks to a done.txt file in the current directory
- `todo-txt: Reactivate Completed Task`: Move a completed task from done.txt to todo.txt
- `todo-txt: Sort By Project`: Sort the entire file by project
- `todo-txt: Sort By Priority`: Sort the entire file by task priority
- `todo-txt: Sort By Due Date`: Sort the entire file by due date
- `todo-txt: Sort By Context`: Sort the entire file by context

Please see [todo.txt](http://todotxt.org) for full features and functionality of the todo.txt format.

## Feature Roadmap

Soon:

- Configurable colors + filename conventions
- Tests!

## Requirements

Minimum Visual Studio Code 1.19, no other dependencies than any basic vscode extension.

## Extension Settings

No settings at the moment - see Feature Roadmap for the upcoming list of changes/enhancements.

## Known Issues

Blank lines may get introduced when reactivating a completed task.  Sorting will take care of the blank lines.

## Release Notes

See the CHANGELOG.md file for a full changelog list.