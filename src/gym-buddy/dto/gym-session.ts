
import { IsString, IsNotEmpty,  IsOptional } from 'class-validator';



export class UpdateGymSessionDto {

    @IsOptional()
    date?: Date;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    status?: 'completed' | 'scheduled' | 'cancelled';
}

export class CreateGymSessionDto {

    @IsOptional()
    date?: Date;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    status?: 'completed' | 'scheduled' | 'cancelled';
}

