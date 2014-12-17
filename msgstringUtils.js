/**
 * Created by atomshuai on 14-11-21.
 */
msgstringUtils = module.exports;

msgstringUtils.buildRequest = function(type,from,to,msgData){
    var requestJSON = {};
    requestJSON.type = type;
    requestJSON.from = from;
    requestJSON.to = to;
    requestJSON.msgData = msgData;
    return JSON.stringify(requestJSON);
}