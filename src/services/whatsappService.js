const axios = require('axios');
const client = require('filestack-js').init(process.env.FILESTACK_API_KEY);
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function SendMessageWhatsApp(data, number) {
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

    try {
        await axios.request(config);
        console.log(`Message sent to phone number <${number}>`)
    } catch (err) {
        console.log(error);
    }
}

async function SaveImageWhatsApp(image, number) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/v18.0/${image.id}`,
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    try {
        const { data } = await axios.request(config);
        const url = data.url;
        const fileName = `/var/data/${image.id}.jpg`;
        config.url = url;
        config.responseType = 'arraybuffer';
        const response = await axios.request(config);
        fs.writeFileSync(fileName, response.data);
        console.log(`${fileName} saved for number <${number}>`);
        const result = await client.upload(fileName);
        console.log(`${result.url} uploaded for number <${number}>`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    SendMessageWhatsApp,
    SaveImageWhatsApp
};