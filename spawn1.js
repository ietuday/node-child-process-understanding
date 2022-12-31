/**
 * In the example above, the child process invokes the wc command, which counts lines, words, and characters in Linux. \
 * We then pipe the main process stdin (which is a readable stream) into the child process stdin (which is a writable stream). 
 * The result of this combination is that we get a standard input mode where we can type something and when we hit Ctrl+D, w
 * hat we typed will be used as the input of the wc command.
 */

const { spawn } = require('child_process');

const child = spawn('wc');

process.stdin.pipe(child.stdin)

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});