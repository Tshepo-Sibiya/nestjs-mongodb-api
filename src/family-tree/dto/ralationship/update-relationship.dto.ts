import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/common/enums/gender.enum';

export class UpdateRelationshipDto {

    @IsString()
    @IsNotEmpty()
    parent_id: string;

    @IsString()
    @IsNotEmpty()
    child_id: string;

    @IsString()
    @IsNotEmpty()
    relationship_type: string;


}