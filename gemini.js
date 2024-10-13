// Importamos dotenv para manejar variables de entorno
const dotenv = require('dotenv');

// Importamos la biblioteca de Google para la inteligencia artificial generativa
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Cargamos las variables de entorno desde el archivo .env
dotenv.config();

// Inicializamos el modelo de inteligencia artificial con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Función para generar una respuesta basada en el texto del usuario
async function chat(prompt, text) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // Obtenemos el modelo generativo que vamos a usar

    //Aqui le daras el contexto mas detallado a la IA segun tus necesidades
    const formatPrompt = `
    ${prompt}
    El input del usuario es el siguiente: ${text}`; 

    const result = await model.generateContent(formatPrompt);   // Generamos contenido utilizando el modelo
    
    console.log(result);    // Imprimimos el resultado en la consola
    
    const response = result.response;   // Obtenemos la respuesta generada
    
    // Verificamos si hay una respuesta válida
    if (response && response.text) { 
        const answ = response.text();   // Extraemos el texto de la respuesta
        return answ;    // Devolvemos la respuesta
    } else {
        return "Lo siento, no pude procesar tu solicitud.";  
    }
}

// Exportamos la función chat para usarla en otros archivos
module.exports = { chat };