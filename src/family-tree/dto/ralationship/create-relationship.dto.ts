import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateRelationshipDto {

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