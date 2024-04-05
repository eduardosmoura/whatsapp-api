const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsApp(data, number){

    const options = {
        host: "graph.facebook.com",
        path: `/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end((resp) => {
        console.log(`Message sent to phone number <${number}>:\n`, JSON.stringify(resp))
    });
}

module.exports = {
    SendMessageWhatsApp
};