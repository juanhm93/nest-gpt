import {  Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';
import { ProsConsDiscusserDto } from './dtos/propscrosdiscusser.dto';
import { prosConsDicusserUseCase } from './use-cases/prosConsDiscusser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/pros-cons-discusser-stream.use-case';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';
import * as path from "path";
import * as fs from "fs";
import { audioToTextUseCase } from './use-cases/audio-to-text.use-case';
import { AudioToTextDto } from './dtos/audio-to-text.dto';
import { ImageGerationDto } from './dtos/image-generation.dto';
import { imageGenerationUseCase } from './use-cases/image-generation.use-case';
import { ImageVariationDto } from './dtos/image-variation.dto';
import { imageVariationUseCase } from './use-cases/image-variation.use-case';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    // Solo va a llamar casos de uso

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase(this.openai, {
            prompt: orthographyDto.prompt
        });
        // return {hola: "mundo desde orthographyCheck"}
    }

    async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
        return await prosConsDicusserUseCase(this.openai, { prompt });
    }

    async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
        return await prosConsDicusserStreamUseCase(this.openai, { prompt });
    }

    async translate({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openai, { prompt, lang });
    }

    async textToAudio({ prompt, voice }: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, { prompt, voice });
    }

    async textToAudioGetter(fileId: string){
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`)

       const wasFound =   fs.existsSync(filePath);

       if(!wasFound) throw new NotFoundException(`File ${fileId} not Found`);

       return filePath;
    }
    
    async audioToText(audioFile: Express.Multer.File,  audioToTextDto: AudioToTextDto) {
        const { prompt } = audioToTextDto
        return await audioToTextUseCase(this.openai, {audioFile, prompt })
    }

    async imageGeneration(imageGerationDto: ImageGerationDto){
        return await imageGenerationUseCase(this.openai, {...imageGerationDto})
    }
   

    getGeneratedImage(fileName: string) {
        const filePath = path.resolve('./','./generated/images/', fileName)
        const exists = fs.existsSync(filePath)

        if(!exists) {
            throw new NotFoundException('File not found')
        }

        return filePath
    }

    async generateImageVariation({baseImage}: ImageVariationDto){
        return await imageVariationUseCase(this.openai, { baseImage })
    }


}
