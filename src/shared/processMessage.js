const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");

function Process(image, number){
    // if(textUser.includes("hola")){
    //     //SAUDAR
    //     var model = whatsappModel.MessageText("Hola, un gusto saludarte. 👋", number);
    //     models.push(model);
    //     var modelList = whatsappModel.MessageList(number);
    //     models.push(modelList);
    // }
    // else if(textUser.includes("gracias")){
    //     // agradecimiento
    //     var model = whatsappModel.MessageText("Gracias a ti por escribirme. 😉😎", number);
    //     models.push(model);

    // }
    // else if(textUser.includes("adios") ||
    // textUser.includes("adiós")||
    // textUser.includes("bye")||
    // textUser.includes("me voy")
    // ){
    //     // despedir
    //     var model = whatsappModel.MessageText("Ve con cuidado. 😊", number);
    //     models.push(model);
    // }
    // else if(textUser.includes("comprar")){
    //     // comprar
    //     var model = whatsappModel.MessageComprar(number);
    //     models.push(model);

    // }
    // else if(textUser.includes("vender")){
    //     // vender
    //     var model = whatsappModel.MessageText("👉 Regístrate en el siguiente formulario para poder evaluarte: https://form.jotform.com/222507994363665", number);
    //     models.push(model);

    // }
    // else if(textUser.includes("agencia")){
    //     // agencia
    //     var model = whatsappModel.MessageText("Aquí tienes nuestra dirección. 😊", number);
    //     models.push(model);
    //     var modelLocation = whatsappModel.MessageLocation(number);
    //     models.push(modelLocation);

    // }
    // else if(textUser.includes("contacto")){
    //     // vender
    //     var model = whatsappModel.MessageText("📞*Centro de contacto:*\n912345678", number);
    //     models.push(model);

    // }
    // else{
    //     //No entiende
    //     var model = whatsappModel.MessageText("No entiendo lo que dices", number);
    //     models.push(model);
    // }

    console.log(`Processing your receipt for phone number <${number}>`)

    var model = whatsappModel.MessageText("Processing your receipt. Please wait...", number);
    whatsappService.SendMessageWhatsApp(model, number);
    whatsappService.SaveImageWhatsApp(image, number);
}

module.exports = {
    Process
};