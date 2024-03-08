import { IsOptional, IsString } from "class-validator";

export class ImageGerationDto {
    @IsString()
    readonly prompt: string;

    @IsString()
    @IsOptional()
    readonly originalImage?: string;
  
    @IsString()
    @IsOptional()
    readonly maskImage?: string;

    
}