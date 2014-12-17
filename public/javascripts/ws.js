var connection = null;
var peerconnection = null;
var peerid = -1;
//var serverAddress = "ws://54.92.6.152:8080";
var serverAddress = "ws://127.0.0.1:8080";

var ACTION_SEND_OFFER = "action_send_offer";
var ACTION_GET_CURRENT_PEER = "getCurrentPeerId";

var doResponseFunctions = {
//    "candidate": onCandidate,
//    "offer": onOffer,
//    "answer": onAnswer,
//    "reject": onReject,
//    "hangup": onHangup,
//    "getIceConfig": onGetIceConfig,
    "getPeerNum":onGetPeerNum
};


function startWSConnect(url){
    connection = new WebSocket(url);
    connection.onopen = function () {
        console.log('WebSocket Open ');
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
        paserMessage(e.data);
        document.getElementById("receiveMsg").value = e.data;
        var responseJSON = JSON.parse(e.data);
//        if(doResponseFunctions[responseJSON.type]!=null){
//            doResponseFunctions[responseJSON.type](responseJSON);
//        }
        if(responseJSON.type == "getPeerNum"){
            onGetPeerNum(responseJSON);
        }
    };
}

function paserMessage(data){
    var jsonObject = JSON.parse(data);
    if(jsonObject.msgType =="getCurrentPeerId"){
        peerid = jsonObject.peerId;
    }
}


//ws_connect("ws://54.92.6.152:8080");
//ws_connect("ws://127.0.0.1:8080");

function clickStartWSConnect(){
    startWSConnect(serverAddress);
}

function clickWSDisconnect(){
    connection.disconnect();
}

function clickWSSendMsg(){
    var sendBtn = document.getElementById("sendBtn");
    var msg = document.getElementById("messageContent").value;
    connection.send(msg);
}

function clickPeerConnection(){
    var otherPeer = document.getElementById("otherPeer").value;
    startPeerConnectioin(otherPeer);
}

function startPeerConnectioin(otherPeer){
    var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

    peerconnection = new webkitRTCPeerConnection(pc_config);
    peerconnection.createOffer(function(offerSDP){
        peerconnection.setLocalDescription(offerSDP);
        var offerSignalJSON = {};
        offerSignalJSON.peerid = peerid;
        offerSignalJSON.otherPeer = otherPeer;
        offerSignalJSON.offerSDP = offerSDP;
        connection.send(JSON.stringify(offerSignalJSON));
    });
}


function buildRequest(type,from,to,msgData){
    var requestJSON = {};
    requestJSON.type = type;
    requestJSON.from = from;
    requestJSON.to = to;
    requestJSON.msgData = msgData;
    return JSON.stringify(requestJSON);
}


function onClickgetPeerNum(){
    connection.send(buildRequest("getPeerNum"));
}

function onClickSendOffer(){
    var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

    peerconnection = new webkitRTCPeerConnection(pc_config);
    peerconnection.createOffer(function(offerSDP){
        peerconnection.setLocalDescription(offerSDP);
          var otherPeer = document.getElementById("otherPeer").value;
          var requestJSON = buildRequest("offer",peerid+"",otherPeer,offerSDP);
          connection.send(requestJSON);
    });
}


var onGetPeerNum = function (responseJSON) {
    if(!responseJSON.type.isUndefined && responseJSON.type=="getPeerNum"){
        peerid = responseJSON.peer;
        document.getElementById("peerId").value = peerid;
    }
}