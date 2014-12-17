socketEvent = module.exports;
signal = require("./signal.js");

var peerInit = 0;

var appObject = {};

appObject.peerInit = peerInit;
appObject.sockets = {};

/**
 * define the signal callback
 * @type {{candidate: onCandidate, offer: onOffer, answer: onAnswer, reject: onReject, hangup: onHangup, getIceConfig: onGetIceConfig, getPeerNum: onGetPeerNum}}
 */
var appEvnetCallbacks = {
    "candidate": signal.onCandidate,
    "offer": signal.onOffer,
    "answer": signal.onAnswer,
    "reject": signal.onReject,
    "hangup": signal.onHangup,
    "getIceConfig": signal.onGetIceConfig,
    "getPeerNum":signal.onGetPeerNum
};

function getSocketByPeerId(peerId){
    return appObject.sockets[peerId];
}

socketEvent.addSignalEventListener = function(eventname,callback){
    appEvnetCallbacks[eventname] = callback;
}


socketEvent.removeSignalEventListener = function(eventname){
    for (var key in callbacks) {
        if(key == eventname) appEvnetCallbacks[key] = null;
    }
}


socketEvent.onReceive = function(message){
    var msgJson = JSON.parse(message);
    var type = msgJson.type;
    var from = msgJson.from;
    var to = msgJson.to;
    var msgData = msgJson.msgData;
    var response = "";
    var ws = this.caller;
    if(appEvnetCallbacks[type] != null || !appEvnetCallbacks[type].isUndefined){
        var userData;
        if(type == "getPeerNum"){
            userData = this;
        }else if(type == "offer"){
            userData = appObject.sockets[to];
        }
        console.log("type : "+type+" from : "+from +" to : "+to);
        console.log(msgData);
//        response = appEvnetCallbacks[type](type, from, to, msgData, appObject,userData);
        response = appEvnetCallbacks[type](type, from, to, msgData, appObject,userData);
    }
    //this.send(JSON.stringify(response));
}

socketEvent.onOpen = function(ws){
//    peerInit++;
//    var client = new Object();
//    client.peer = peerInit;
//    client.socket = ws;
//    sockets[peerInit] = client;
//    appObject["sockets"] = sockets;
}

socketEvent.onClose = function(code, message){
    console.log("onClose: code "+code +" message:"+message);
}

