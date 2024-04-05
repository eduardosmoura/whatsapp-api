const axios = require('axios');
const fs = require('fs');

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

function SaveImageWhatsApp(image, number) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/v18.0/${image.id}`,
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
        responseType: 'arraybuffer',
    };

    axios
        .request(config)
        .then((response) => {
            const url = response.url;
            console.log(url);

            config.url = url;
            axios
                .request(config)
                .then((response) => {
                    fs.writeFile(`${image.id}.jpg`, response.data, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`${image.id}.jpg saved for number <${number}>`);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    SendMessageWhatsApp,
    SaveImageWhatsApp
};