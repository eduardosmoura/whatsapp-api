const { MongoClient, ServerApiVersion } = require('mongodb');
const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function Process(image, number) {
    try {
        console.log(`Processing your receipt for phone number <${number}> - START`)
        await client.connect();
        const db = await client.db('receipt-ai');
        const model = whatsappModel.MessageText("Processing your receipt. Please wait...", number);
        await whatsappService.SendMessageWhatsApp(model, number);
        const imageUrl = await whatsappService.SaveImageWhatsApp(image, number);
        const [raw, description] = await whatsappService.DescribeImageWhatsApp(imageUrl, number);
        const message = whatsappModel.MessageText(description.trim().length > 0 ? description : 'Could not process your receipt. Please try uploading a better quality image.', number);
        await whatsappService.SendMessageWhatsApp(message, number);
        await db.collection('receipts').insertOne({ number, imageUrl, raw, description });
        console.log(`Processing your receipt for phone number <${number}> - END`)
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

module.exports = {
    Process
};