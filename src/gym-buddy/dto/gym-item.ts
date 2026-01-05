import { IsOptional, IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, ArrayNotEmpty, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGymItemDto {
    @ApiPropertyOptional({ example: 'Adjustable Dumbbell', description: 'Name of the gym item' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiPropertyOptional({ example: 'Pair of adjustable dumbbells 2.5-25lbs', description: 'Detailed description' })
    @IsOptional()
    @IsString()
    description?: string;


    @ApiPropertyOptional({ example: true, description: 'Whether the item is active/available' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

}

export class CreateGymItemDto {
    @ApiPropertyOptional({ example: 'Adjustable Dumbbell', description: 'Name of the gym item' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiPropertyOptional({ example: 'Pair of adjustable dumbbells 2.5-25lbs', description: 'Detailed description' })
    @IsOptional()
    @IsString()
    description?: string;


    @ApiPropertyOptional({ example: true, description: 'Whether the item is active/available' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

}