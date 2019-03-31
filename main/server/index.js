// Setup serial port
var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new SerialPort('COM3', { baudRate: 9600 });

// Setup web socket
var WebSocketServer = require('ws').Server;

// Configure web socket server
var SERVER_PORT = 8081;
var wss = new WebSocketServer({ port: SERVER_PORT });
var connections = new Array;
wss.on('connection', handleConnection);

// Read serial data as ASCII encoded text
var parser = new Readline();
port.pipe(parser);

// Configure definitions for serial events
parser.on('data', readSerialData);

function readSerialData(data) {
    console.log(data.toString());
    if (connections.length > 0) {
        broadcast(data);
    }

    // Arduino has requested client master key 
    if (data == 3) {
        port.write("733F511D");
    }
}

// Web socket server event functions

function handleConnection(client) {
    console.log("New connection");
    connections.push(client);

    client.on('message', sendToSerial);

    client.on('close', function() {
        console.log("Connection closed");
        var position = connections.indexOf(client);
        connections.splice(position, 1);
    });
}

function sendToSerial(data) {
    console.log("Sending to serial: " + data);
    port.write(data);
}

function broadcast(data) {
    for (conn in connections) {
        connections[conn].send(JSON.stringify(data));
    }
}