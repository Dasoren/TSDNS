# TSDNS for Node.JS and Redis #
___
This is a remake of the teamspeak TSDNS server app that teamspeak provides with there server code. The reason this was made is for http://tsdns.link a TSDNS provider. This is a fully working node.js app that connects to a redis database to load and server TSDNS records to TS3 users.

###Note: This server code could update at anytime and if you modify it, it may brake. The API and Redis database values will not be messed with.
___
###Requirements:

- Node.js [http://nodejs.org/](http://nodejs.org/ "Node.js")
- Redis   [http://redis.io/](http://redis.io/ "Redis")
- NPM     [https://www.npmjs.org/](https://www.npmjs.org/ "NPM")
 - redis  [https://www.npmjs.org/package/redis](https://www.npmjs.org/package/redis "Redis NPM")
 - net    [https://www.npmjs.org/package/net](https://www.npmjs.org/package/net "Net NPM")
 - colors [https://www.npmjs.org/package/colors](https://www.npmjs.org/package/colors "Colors NPM")

Standard install of Node.js and Redis, will give the build command everything it needs, most of the time.
Please see install for more info.
___

###Files:
- `tsdns-server.js`  This is the main script in this app, it is the TSDNS server file.
- `tsdns-tools.js`  This is the admin tool for managing the TSDNS database from command line.
- `tsdns-web.js`  This is the TSDNS web server for using the API to send commands to the TSDNS database.
- `tsdns-config.js` This is the configuration file for all of the `tsdns-*` files
___
###TODO:
1. tsdns-tools.js Command line tools for TSDNS (Version 2.0.0)
2. tsdns-web.js Web API for TSDNS (Version 3.0.0)
3. Better Logging (Version 2.5.0)
4. Web Control Panel (Verion 3.5.0)
5. Add MySQL/SQLite support (Version 4.0.0)
___
###Change Log:
8/29/2014 6:25:49 PM Version 1.0.0 Released.
___
###Mission:
To make a better TSDNS server then what is out there right now. It being Both fast and useful.
To make a command like admin too and web API to manage the server settings and database of domains.
___
###Copyright:
This TSDNS for Node.js and Redis is made for [http://tsdns.link/about](http://tsdns.link/about "TSDNS.link")


#####TSDNS for node.js and Redis  Copyright (C) 2014  Dasoren
If you wish to modify this code in any way, 
Please contact Dasoren for permission to distribute tsdns@dasoren.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.


#####This code comment here will be in every file, Do not edit or remove. 

    /*
    *TSDNS for Node.js and Redis  Copyright (C) 2014  Dasoren tsdns@dasoren.com
    *
    *This program comes with ABSOLUTELY NO WARRANTY;
    *This is free software, and you are welcome to redistribute it
    *under certain conditions. If you wish to add to or modify this
    *file, Please contact Dasoren for permission to distribute;
    */