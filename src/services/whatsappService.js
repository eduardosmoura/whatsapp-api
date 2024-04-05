const axios = require('axios');

function SendMessageWhatsApp(data, number) {

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
    },
    data : data
    };

    axios
        .request(config)
        .then((response) => {
            console.log(`Message sent to phone number <${number}>:\n`, response)
        })
        .catch((error) => {
        console.log(error);
        });
}

module.exports = {
    SendMessageWhatsApp
};