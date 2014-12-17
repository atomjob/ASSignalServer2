eventListener = module.exports;

msgstrUtils = require("./msgstringUtils.js");


// msg format:{msgType:"",from:"",to:"",msgData:{}}
// type: candidate / offer / answer / reject / hangup / getIceConfig /getPeerNum
// from: peer
// to:  peer
// msgData : sdp description
eventListener.onInComingMsg =  function(type, from, to, msgData, appObj, callback){
    switch (type) {
        case "candidate":
        case "offer":
        case "answer":
        case "reject":
        case "hangup":
        case "getIceConfig":
        case "getPeerNum":
            callback(type, from, to, msgData);
        break;
        return;
    }
}



eventListener.onCandidate = function(type, from, to, msgData, appObj,useData){


}

/**
 *
 * @param type
 * @param from
 * @param to
 * @param msgData
 * @param appObj
 * @param useData
 */
eventListener.onOffer = function(type, from, to, msgData, appObj,useData){
    console.log("===>onOffer");
    console.log("from : "+from +" to : "+to+" msgData : "+msgData);
    console.log("msgData : "+msgData);
    console.log("onOffer===>");
    useData.send(JSON.stringify(msgstrUtils.buildRequest("offer",from,to,msgData)));
}

eventListener.onAnswer = function(type, from, to, msgData, appObj,useData){

}


eventListener.onReject = function(type, from, to, msgData, appObj,useData){

}

eventListener.onHangup = function(type, from, to, msgData, appObj,useData){

}

eventListener.onGetIceConfig = function(type, from, to, msgData, appObj,useData){

}

/**
 * send the current client's peer number, the peer number is the unique number of the every client
 * @param type
 * @param from    no used in this callback
 * @param to      no used in this callback
 * @param msgData no used in this callback
 * @param appObj
 */
eventListener.onGetPeerNum = function(type, from, to, msgData, appObj,useData){
    if(type=="getPeerNum"){
        var peer = appObj.peerInit++;
        var responseJSON = {"peer": peer};
        responseJSON.type = type;
        appObj.sockets[peer] = useData;// this useData is client socket
//        return JSON.stringify(responseJSON);
        useData.send(JSON.stringify(responseJSON));
    }
//    return "";
}