import { Gender } from 'src/common/enums/gender.enum';
export declare class UpdateFamilyMemberDto {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: Date;
    deathDate: Date;
    generation: number;
}
