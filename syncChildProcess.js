/**
The *Sync function
The functions spawn, exec, and execFile from the child_process module also have synchronous blocking versions that will wait until 
the child process exits.

const { 
  spawnSync, 
  execSync, 
  execFileSync,
} = require('child_process');
Those synchronous versions are potentially useful when trying to simplify scripting tasks or any startup processing tasks, but they 
should be avoided otherwise
 */