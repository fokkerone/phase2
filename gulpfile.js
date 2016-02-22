var requireDir  = require('require-dir');
var fs          = require('fs');
var appDir      = process.cwd();

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulptasks', { recurse: true });
