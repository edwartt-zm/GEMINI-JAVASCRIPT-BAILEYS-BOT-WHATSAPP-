// Importamos las bibliotecas necesarias
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');    // Para generar un código QR para la conexión
const BaileysProvider = require('@bot-whatsapp/provider/baileys');  // Proveedor de WhatsApp
const MockAdapter = require('@bot-whatsapp/database/mock');     // Base de datos simulada
const { chat } = require('./gemini');   // Importamos la función de chat del archivo gemini.js

// Definimos un flujo de conversación que responde a cualquier texto recibido
const flowConversacion = addKeyword(['.*']) // Escucha cualquier mensaje
    .addAction(async (ctx, { flowDynamic }) => {    // Acción a realizar cuando se recibe un mensaje
        const prompt = "";  //Define el rol y propósito de la IA
        const text = ctx.body; // El texto que el usuario envió
        const response = await chat(prompt, text);  // Llama a la función de chat para obtener una respuesta
        
        await flowDynamic(response);    // Envía la respuesta de vuelta al usuario
    });

    // Función principal que inicializa el bot
const main = async () => {
    const adapterDB = new MockAdapter();    // Crea un adaptador de base de datos simulado
    const adapterFlow = createFlow([flowConversacion]); // Crea el flujo de conversación
    const adapterProvider = createProvider(BaileysProvider);    // Crea el proveedor de WhatsApp

    // Crea el bot con los adaptadores configurados
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();  // Muestra el portal web para escanear el código QR
}

// Ejecuta la función principal
main();
