/**
 * The spawn function launches a command in a new process and we can use it to pass that command any arguments. 
 * For example, here’s code to spawn a new process that will execute the pwd command.
 */

const { spawn } = require('child_process');


/**
 * We can pass arguments to the command that’s executed by the spawn function using the second argument of the spawn function, 
 * which is an array of all the arguments to be passed to the command. For example, 
 * to execute the find command on the current directory with a -type f argument (to list files only), we can do:
 */
const child = spawn('find', ['.', '-type', 'f']);

/**
 * The handler above gives us the exit code for the child process and the signal, if any, 
 * that was used to terminate the child process. This signal variable is null when the child process exits normally.
 */
child.on('exit', function (code, signal) {
    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
  });

  /**
   * 
The other events that we can register handlers for with the ChildProcess instances are disconnect, error, close, and message.

The disconnect event is emitted when the parent process manually calls the child.disconnect function.
The error event is emitted if the process could not be spawned or killed.
The close event is emitted when the stdio streams of a child process get closed.
The message event is the most important one. It’s emitted when the child process uses the process.send() function to send messages. 
This is how parent/child processes can communicate with each other. We’ll see an example of this below.
   */


/**
 * Every child process also gets the three standard stdio streams, which we can access using child.stdin, child.stdout, and child.stderr.
 */


/**
 * Every child process also gets the three standard stdio streams, which we can access using child.stdin, child.stdout, and child.stderr.

When those streams get closed, the child process that was using them will emit the close event. This close event is different than the exit event because multiple child processes might share the same stdio streams and so one child process exiting does not mean that the streams got closed.

Since all streams are event emitters, we can listen to different events on those stdio streams that are attached to every child process. 
Unlike in a normal process though, in a child process, the stdout/stderr streams are readable streams while the stdin stream is a writable one. 
This is basically the inverse of those types as found in a main process. The events we can use for those streams are the standard ones. 
Most importantly, on the readable streams, we can listen to the data event, which will have the output of the command or 
any error encountered while executing the command:
 */
 child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });

  /**
   * The two handlers above will log both cases to the main process stdout and stderr. 
   * When we execute the spawn function above, the output of the pwd command gets printed and the child process exits with code 0, which means no error occurred.
   */

