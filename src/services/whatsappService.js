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

    console.log(image);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/v18.0/${image.id}`,
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    axios
        .request(config)
        .then((response) => {
            const url = response.url;
            console.log(url);
            const fileName = `/var/data/${image.id}.jpg`;
            config.url = url;
            config.responseType = 'arraybuffer';
            axios
                .request(config)
                .then((response) => {
                    fs.writeFile(fileName, response.data, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`${fileName} saved for number <${number}>`);
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