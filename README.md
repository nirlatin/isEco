# isEco express-mvc-node es6

I wrote this project to learn some new technologies.
This version is Demo (!!!) of simple eccomerce system.
The project was written using nodejs and es6 in server side and client side in browswrify and jquery.

### Prerequisities && Installing

install node.js v6+ (support 6th Edition - ECMAScript 2015):
1. Open link: https://nodejs.org/en/download/current/
2. Download
3. Install
4. Check if install success by run "node -v" command. 

install & run mongoDb:
1. open link: https://docs.mongodb.com/manual/tutorial/
2. choose the installation mongoDb by your OS.
3. install & run

windows example:
1. Download mongoDb
2. Install
3. Follow after the Instructions.

After you have written the command "net start MongoDB" on cmd,
you will see how many connections you have (0 connection).

Finally, clone this repository and install its dependencies
1. git clone "https://github.com/nirlatin/isEco"
2. cd isEco
3. npm install
4. run project - "node app.js"" 
5. set credentials (user,pass) to using Gmail service in lib/email.js file. 
6. One connection in mongo service window.
7. "The magic happens on port 3001" in node server cmd window.
8. open "localhost:3001/" in your browser.

There is 4 pages in the project:
1. http://localhost:3001/ - home page with three buttons (checkout,admin/users,admin/orders)
2. checkout page - send details to server side.
3. admin/users - watch all users added.
4. admin_orders - watch all orders added.