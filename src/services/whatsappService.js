const axios = require('axios');
const client = require('filestack-js').init(process.env.FILESTACK_API_KEY);
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
        .then(() => {
            console.log(`Message sent to phone number <${number}>`)
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
    };

    axios
        .request(config)
        .then(({ data }) => {
            const url = data.url;
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
                        client.upload(fileName).then(
                            function (result) {
                                console.log(`${result.url} uploaded for number <${number}>`);
                            },
                            function(error){
                                console.log(error);
                            }
                        );
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