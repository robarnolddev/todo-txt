export default class AppConstants {
    public static readonly ACCEPTED_FILENAMES = [
        'todo.txt',
        'done.txt'
    ]

    public static ARCHIVE_FILENAME = 'done.txt';
    public static TODO_FILENAME = 'todo.txt';

    public static DATE_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}/g);
    public static PROJECT_REGEX = new RegExp(/\B\+\w+/g);
    public static CONTEXT_REGEX = new RegExp(/\B\@\w+/g);
    public static PRIORITY_REGEX = new RegExp(/[(][A-Z][)]/g);
    public static OVERDUE_REGEX = new RegExp(/due:\d{4}-\d{2}-\d{2}/g);
    public static THRESHOLD_REGEX = new RegExp(/t:(\d{4}-\d{2}-\d{2})/g);
}