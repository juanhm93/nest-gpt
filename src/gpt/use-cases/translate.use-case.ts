import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;

}

export const translateUseCase = async (openai: OpenAI,options: Options) => {

    const { prompt, lang } = options
    // console.log({ prompt, lang })
    const completion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:  `Traduce el siguiente texto al idioma ${lang}:${ prompt }`
        },
    ],
        model: "gpt-3.5-turbo",
        // temperature: 1,
        max_tokens: 150,
      });
    
    
    return {
        message: completion.choices[0].message.content
    };

   
}