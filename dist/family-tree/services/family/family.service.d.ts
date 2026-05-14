import { Model } from 'mongoose';
import { CreateFamilyDetailsDto } from 'src/family-tree/dto/family/create-family.dto';
import { UpdateFamilyDetailsDto } from 'src/family-tree/dto/family/update-family.dto';
import { FamilyDetails } from 'src/family-tree/schemas/family.schema';
import { User } from 'src/user/schemas/user.schema';
export declare class FamilyService {
    private readonly familyModel;
    constructor(familyModel: Model<FamilyDetails>);
    createFamily(createFamilyDto: CreateFamilyDetailsDto, user: User): Promise<FamilyDetails>;
    getAllFamilies(userId: string): Promise<FamilyDetails[]>;
    getFamilyById(user: User, id: string): Promise<FamilyDetails>;
    updateFamily(user: User, id: string, updateFamilyDto: UpdateFamilyDetailsDto): Promise<FamilyDetails>;
    removeFamily(user: User, id: string): Promise<{
        deleted: boolean;
    }>;
}
