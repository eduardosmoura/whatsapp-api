const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");

async function Process(image, number){
    console.log(`Processing your receipt for phone number <${number}> - START`)
    const model = whatsappModel.MessageText("Processing your receipt. Please wait...", number);
    await whatsappService.SendMessageWhatsApp(model, number);
    const imageUrl = await whatsappService.SaveImageWhatsApp(image, number);
    const description = await whatsappService.DescribeImageWhatsApp(imageUrl, number);
    const message = whatsappModel.MessageText(description, number);
    await whatsappService.SendMessageWhatsApp(message, number);
    console.log(`Processing your receipt for phone number <${number}> - END`)
}

module.exports = {
    Process
};