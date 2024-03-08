import OpenAI from "openai";

interface Options {
    prompt: string;

}

export const orthographyCheckUseCase = async (openai: OpenAI,options: Options) => {

    const { prompt } = options

    const completion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:   `
            Te seran proveidos texos en español con posibles errores ortograficos y gramaticales,
            Las parablas usadas deben de existir en el diccionario de la Real Academia Española,
            Debes responder en formato JSON,
            tu tarea es corregirlos y retornar informacion soluciones,
            tambien debes de dar un porcentaje de acierto por el usuario,

            Si no hay errores, debes retornar un mensaje de felicitaciones.

            Ejemplo de salida:
            {
                userScore: number,
                errors: string[], // ['error -> solucion']
                message: string, emojies y texto para felicitar al usuario
            }


            `
        },
        {
            role: "user", 
            content: prompt,
        }
    ],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 150,
      });
    
    console.log(completion);
    
    const jsonResp = JSON.parse(completion.choices[0].message.content)
    return jsonResp;
    // return completion.choices[0].message.content;

    return {
        prompt: prompt,
        // apikey: process.env.OPENAI_API_KEY
    }
}