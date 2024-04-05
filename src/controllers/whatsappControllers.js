const fs = require("fs");
const processMessage = require("../shared/processMessage");
const VerifyToken = (req, res) => {

    try{
        var accessToken = "RTQWWTVHBDEJHJKIKIKNDS9090DS";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }
}

const ReceivedMessage = async (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            console.log(messageObject);
            var messages = messageObject[0];
            var number = messages["from"];
            if (number.includes("5583")) {
                number = number.replace("5583", "55839");
            }
            var type = messages["type"];
            if (type === 'image') {
                await processMessage.Process(messages['image'], number);
            } else {
                var text = GetTextUser(messages);
                if (text != "") {
                    processMessage.Process(text, number);
                }
            }
        }
        res.send("EVENT_RECEIVED");
    }catch(e){
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages){
    var text = "";
    var typeMessage = messages["type"];
    if(typeMessage == "text"){
        text = (messages["text"])["body"];
    }
    else if(typeMessage == "interactive"){

        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];

        if(typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"];
        }
        else if(typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];
        }else{
            console.log("unknown message");
        }
    }else{
        console.log("unknown message");
    }
    return text;
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}
