/**
The fork() function
The fork function is a variation of the spawn function for spawning node processes. The biggest difference between spawn and fork is that a communication channel is 
established to the child process when using fork, so we can use the send function on the forked process along with the global process object itself to exchange messages 
between the parent and forked processes. We do this through the EventEmitter module interface. Here’s an example:
 */



/**
In the parent file above, we fork child.js (which will execute the file with the node command) and then we listen for the message event. The message event will be 
emitted whenever the child uses process.send, which we’re doing every second.

To pass down messages from the parent to the child, we can execute the send function on the forked object itself, and then, in the child script, we can listen to the 
message event on the global process object.

When executing the parent.js file above, it’ll first send down the { hello: 'world' } object to be printed by the forked child process and then the forked child process 
will send an incremented counter value every second to be printed by the parent process.

 */