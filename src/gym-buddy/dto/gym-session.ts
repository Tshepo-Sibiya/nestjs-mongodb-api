
import { IsString, IsNotEmpty,  IsOptional } from 'class-validator';



export class UpdateGymSessionDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class CreateGymSessionDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

}

