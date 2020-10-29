
C:\Users\Chidoman\Desktop\practicas nodejs\8-npm>npm -v
6.14.8

C:\Users\Chidoman\Desktop\practicas nodejs\8-npm>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (8-npm)
version: (1.0.0) 0.0.1
description: hola mundo con express
entry point: (index.js) app.js
test command:
git repository:
keywords: shingon
author: chidoman
license: (ISC)
About to write to C:\Users\Chidoman\Desktop\practicas nodejs\8-npm\package.json:

{
  "name": "8-npm",
  "version": "0.0.1",
  "description": "hola mundo con express",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "shingon"
  ],
  "author": "chidoman",
  "license": "ISC"
}


Is this OK? (yes)

C:\Users\Chidoman\Desktop\practicas nodejs\8-npm>ls
package.json

C:\Users\Chidoman\Desktop\practicas nodejs\8-npm>^X

C:\Users\Chidoman\Desktop\practicas nodejs\8-npm>npm install expres --save
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN 8-npm@0.0.1 No repository field.

+ expres@0.0.5
added 1 package from 1 contributor and audited 1 package in 12.928s
found 0 vulnerabilities