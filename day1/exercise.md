1. console 'hello world' in REPL.
```js
> node 
    console.log('hello World');
> .exit

```
2. Write a function to multiply two numbers and execute it in REPL.

```js 

> node 

function multiply () {
    return 10*20;
}
> .exit 

exports.multiply = (a,b) => {
    return a*b;
}

let data = require('./fileName.js');
data.multiply(10,20);
```
3. Explain v8 in your own words ?
```js 

// v8 is a enginer or browser engine from chrome which is again single threaded like javascript does so it is . and call stack is the feature of v8 engine.
//  and v8 is the runtime environment for nodeJs.

 ```

4. console 'hello World' in a script file and run it using script writer.
```js
let fs = fs.require('fs')
let display = fs.readFileSync('./fileName.js','utf-8');
console.log(display);
```

5. create a new Buffer and write 'welcome to nodejs' in REPL. Calculate length of buffer.
```js

let newBuff = new Buffer('Welcome to node js');
console.log(newBuff.length);

```
6. create a buffer of length 5 and write 'hello nodejs' in REPL. Print the output and convert it to string.
```js
let buff = new Buffer(5)
console.log(buff.length)
let node = new Buffer('hello nodejs')
console.log(node.toString());
```

7. write a script where you read a file.
    Folder
        Entry file - index.js
        File to be read - hello.txt

        ```js 
        let fs = require('fs')
        let read = fs.readFileSync('./hello.txt','utf-8')
        console.log(read)

        ```
8. write a script where you write to a file.
    Folder
        Entry file - index.js
        File to write to - hello.txt
        Content to be written - "Hey, I am being written to the file".

        ```js
        <!-- hello.txt {
            "Hey, I am being written to the file"
        } -->

        let fs = require('fs')
        let read = fs.readFileSync('./hello.txt','utf-8')
        console.log(read)

9. parse the url and get the following properties:
    URL: "https://localhost:4000/editors/dashboard?uname=asdf&key=ah463hg"
    1. protocol
    2. host
    3. pathname
    4. query
    ```js
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'localhost:4000',
  port: '4000',
  hostname: 'localhost',
  hash: null,
  search: '?uname=asdf&key=ah463hg',
  query: 'uname=asdf&key=ah463hg',
  pathname: '/editors/dashboard',
  path: '/editors/dashboard?uname=asdf&key=ah463hg',
  href:
   'https://localhost:4000/editors/dashboard?uname=asdf&key=ah463hg'
   
   ```