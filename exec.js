/**
 * By default, the spawn function does not create a shell to execute the command we pass into it. 
 * This makes it slightly more efficient than the exec function, which does create a shell. 
 * The exec function has one other major difference. It buffers the command’s generated output and passes the whole output value to a 
 * callback function (instead of using streams, which is what spawn does).

Here’s the previous find | wc example implemented with an exec function.
 */


const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
});

/**
Since the exec function uses a shell to execute the command, we can use the shell syntax directly here making use of the shell pipe feature.

Note that using the shell syntax comes at a security risk if you’re executing any kind of dynamic input provided externally. 
A user can simply do a command injection attack using shell syntax characters like ; and $ (for example, command + ’; rm -rf ~’ )

The exec function buffers the output and passes it to the callback function (the second argument to exec) as the stdout argument there. 
This stdout argument is the command’s output that we want to print out.

The exec function is a good choice if you need to use the shell syntax and if the size of the data expected from the command is small. 
(Remember, exec will buffer the whole data in memory before returning it.)

The spawn function is a much better choice when the size of the data expected from the command is large, 
because that data will be streamed with the standard IO objects.
 */

/**
We can make the spawned child process inherit the standard IO objects of its parents if we want to, but also, more importantly, we can make the spawn function use the shell syntax as well. Here’s the same find | wc command implemented with the spawn function:

const child = spawn('find . -type f | wc -l', {
  stdio: 'inherit',
  shell: true
});

/**
Because of the stdio: 'inherit' option above, when we execute the code, the child process inherits the main process stdin, stdout, and stderr. 
This causes the child process data events handlers to be triggered on the main process.stdout stream, making the script output the result right away.

Because of the shell: true option above, we were able to use the shell syntax in the passed command, just like we did with exec. But with this code, 
we still get the advantage of the streaming of data that the spawn function gives us. This is really the best of both worlds.


/**
There are a few other good options we can use in the last argument to the child_process functions besides shell and stdio. We can, for example, 
use the cwd option to change the working directory of the script. For example, here’s the same count-all-files example done with a spawn function using a shell and with 
a working directory set to my Downloads folder. The cwd option here will make the script count all files I have in ~/Downloads:

const child = spawn('find . -type f | wc -l', {
  stdio: 'inherit',
  shell: true,
  cwd: '/Users/samer/Downloads'
});
 */


/**
Another option we can use is the env option to specify the environment variables that will be visible to the new child process. 
The default for this option is process.env which gives any command access to the current process environment. If we want to override that behavior, we can simply pass an 
empty object as the env option or new values there to be considered as the only environment variables:

const child = spawn('echo $ANSWER', {
  stdio: 'inherit',
  shell: true,
  env: { ANSWER: 42 },
});

The echo command above does not have access to the parent process’s environment variables. 
It can’t, for example, access $HOME, but it can access $ANSWER because it was passed as a custom environment variable through the env option.
 */