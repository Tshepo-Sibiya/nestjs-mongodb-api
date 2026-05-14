import { Gender } from "src/common/enums/gender.enum";
export declare class CreateFamilyMemberDetailsDto {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: Date;
    deathDate: Date;
    generation: number;
}
