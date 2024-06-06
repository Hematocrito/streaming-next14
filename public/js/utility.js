import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";

var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "ws://localhost:5080/MyAdultFan/websocket",
  localVideoElement: document.getElementById("localVideo"),
 
  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "publish_started") {
        console.log("publish started");
        statusInfo.innerHTML = "Broadcasting - Stream Id: " + streamId; 
     }
     else if (info == "publish_finished") {
        console.log("publish finished")
        statusInfo.innerHTML = "Offline"

     }
  },
  
});
var streamId = "stream" + parseInt(Math.random()*999999);
var statusInfo = document.getElementById("status_info");/*
document.getElementById("publish_start").addEventListener("click",()=> {
  webRTCAdaptor.publish(streamId)
})

document.getElementById("publish_stop").addEventListener("click",()=> {
  webRTCAdaptor.stop(streamId)
})*/