var requireDir  = require('require-dir');
var fs          = require('fs');
var appDir      = process.cwd();

var lolo = 'sddsd';

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulptasks', { recurse: true });
