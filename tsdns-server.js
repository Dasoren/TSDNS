#!/usr/bin/node
    /*
    *TSDNS for Node.js and Redis  Copyright (C) 2014  Dasoren tsdns@dasoren.com
    *
    *This program comes with ABSOLUTELY NO WARRANTY;
    *This is free software, and you are welcome to redistribute it
    *under certain conditions. If you wish to add to or modify this
    *file, Please contact Dasoren for permission to distribute;
    */
var net = require('net');
var redis = require('redis').createClient();
var colors = require('./node_modules/colors');

// Start Configuration
redis.select(7); // Redis database server to use on localhost with database 7.
var defaultServer = 'no'; // Send client to default server if server not found, or just send a 404 error if not found  [ yes | no ].
var server, sockets = []; // Set server and sockets arrays.
var consoleLog = 'yes'; // Show logs in console [ yes | no ]
var TSDNS = {}; // Set TSDNS Object
// End Configuration
 

  // Load TSDNS hosts
  /*
  * Load of all TSDNS server setting from the redis db into RAM
  * Also reload the settings every 10 minutes.
  */
  function loadTSDNS(key, log) {
    redis.hgetall(key, function(err, hash) {
      TSDNS[key] = {};
      TSDNS[key]['domain'] = key;
      TSDNS[key]['address'] = hash.address+':'+hash.port;
      TSDNS[key]['expire'] = hash.expire;
      TSDNS[key]['maxUse'] = hash.maxUse;
      if(log === 'yes'){
        console.log(new Date().getTime()+' TSDNS '+TSDNS[key]['domain']+' added. Address: '+TSDNS[key]['address']);
      }
    });
  }
  // Reload the tsdns server settings
  setInterval(function() {
    redis.keys('tsdns:'+'*', function(err, keys){
      for(var i = 0; i < keys.length; i++){
        loadTSDNS(keys[i]);
      }
    });
    if(consoleLog === 'yes'){ console.log(new Date().getTime()+' TSDNS Reloaded'.green); }
  }, 600 * 1000); // 600 * 1000 = 10 minutes
  // Load settings on start
  redis.keys('tsdns:'+'*', function(err, keys){
    for(var i = 0; i < keys.length; i++){
      loadTSDNS(keys[i], 'yes');
    }
  });
  // -----------------------------
  // Copyright 2014, Do not edit this Header.
  // Start Header
  var version = '1.0.0'; // Do Not edit this line, this is the version of this code.
  console.log('-----------------------------------------'.cyan);
  console.log('| Starting TSDNS Server for Teamspeak 3 |'.cyan);
  console.log('|     Powered by Node.js and Redis      |'.cyan);
  console.log('| Made by Dasoren for http://TSDNS.link |'.cyan);
  console.log('|     Copyright 2014, Verison '.cyan+version.cyan+'     |'.cyan);
  console.log('-----------------------------------------'.cyan);
  console.log('');
  // End Header
  
  //Start server
  server = net.createServer(function (socket) {
    sockets.push(socket);
    var writeEnd = function(message) {
      socket.write(message, function() {
        socket.end();
      });
    };
    var freeTimeout = setTimeout(function() {
        writeEnd('404'); // When socket is forced closed, send 404 error.
    }, 20000); // Close socket connection after 20 seconds.
    
    socket.on('data', function(data) {
      var domain = data.toString().replace(/\r|\n/g, ''); // Strip unneeded spaces from the domain.
      var clientIP = socket.remoteAddress; // Set remote client IP to var.
      if(consoleLog === 'yes'){ console.log(new Date().getTime()+' - '.yellow+clientIP.grey+' is searching for domain "'.yellow+domain.cyan+'":'.yellow); }
      if(TSDNS['tsdns:'+domain]) { // If domain is in the setting send the info to the client for it.
        if(consoleLog === 'yes'){ console.log(new Date().getTime()+' -> Found something... ('.green + TSDNS['tsdns:'+domain]['address'].cyan + ')'.green); }
        writeEnd(TSDNS['tsdns:'+domain]['address']); // Sent the IP and Port of the server found for the domain back to the Client.
        if(TSDNS['tsdns:'+domain]['expire'] !== 'no'){ // If the TSDNS setting is not set to expire, set the expiry to 30 days.
          redis.expire('tsdns:'+domain, 2592000); // Reset expiration date for redis domain. 30 days.
        }
      }
      else { // if no data was found for the domain, see if we should error out or send to default server.
        if(defaultServer === 'yes'){ // Config setting to send to default server if domain is not found.
          if(consoleLog === 'yes'){ console.log(new Date().getTime()+' -> '.green+'Found nothing, the searched Domain doesn\'t exists.'.red+' Sending to default server.'.yellow); }
          writeEnd(TSDNS['tsdns:'+domain]['address']); // send default IP and Port to the Client.
        }
        else { // Config setting to send to 404 error if domain is not found.
          if(consoleLog === 'yes'){ console.log(new Date().getTime()+' --> '.red+domain.cyan+' Not found'.red); }
          writeEnd('404'); // Send 404 error to Client.
        }
      }
    });
    socket.on('close', function() {
      for (i in sockets) {
        if (sockets[i] === socket) {
          sockets.splice(i, 1);
        }
      }
    });
    socket.on('error', function(error) {}); // Do not throw socket errors.
  });
  server.listen(41144); //Port to use, do not edit this, if you do it will brake everything.
  