export const GlobalDebug = (function () {
    const savedConsole = console;

    return function (debugOn: boolean, suppressAll?: boolean) {
        const suppress = suppressAll || false;
        if (!debugOn) {
            // supress the default console functionality
            console = {} as Console;
            console.log = function () {};
            // supress all type of consoles
            if (suppress) {
                console.clear = function () {};
                console.time = function () {};
                console.timeEnd = function () {};
                console.table = function () {};
                console.count = function () {};
                console.group = function () {};
                console.groupEnd = function () {};
                console.info = function () {};
                console.warn = function () {};
                console.error = function () {};
            } else {
                console.clear = savedConsole.clear;
                console.time = savedConsole.time;
                console.timeEnd = savedConsole.timeEnd;
                console.table = savedConsole.table;
                console.count = savedConsole.count;
                console.group = savedConsole.group;
                console.groupEnd = savedConsole.groupEnd;
                console.info = savedConsole.info;
                console.warn = savedConsole.warn;
                console.error = savedConsole.error;
            }
        } else {
            console = savedConsole;
        }
    };
})();
