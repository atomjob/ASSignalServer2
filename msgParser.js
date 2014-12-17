msgParser = module.exports;

// msg format:{msgType:"",from:"",to:"",msgData:{}}
// type: candidate / offer / answer / reject / hangup / getIceConfig
// from: peer
// to:  peer
// msgData : sdp description
msgParser.parserMsgType =  function(message){
    var msgJson = JSON.parse(message);
    if(msgJson.msgType == "candidate"){

    }else if(msgJson.msgType == "offer"){

    }else if(msgJson.msgType == "answer"){

    }
}


msgParser.doValidate = function(message){
    //if()
}