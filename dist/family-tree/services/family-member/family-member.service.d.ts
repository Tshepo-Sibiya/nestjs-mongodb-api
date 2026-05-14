import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateFamilyMemberDetailsDto } from 'src/family-tree/dto/family-member/create-family-member.dto';
import { FamilyMemberDetails } from 'src/family-tree/schemas/family-member.schema';
import { UpdateFamilyMemberDto } from 'src/family-tree/dto/family-member/update-family-member.dto';
export declare class FamilyMemberService {
    private readonly familyMemberDetailsModel;
    private userModel;
    constructor(familyMemberDetailsModel: Model<FamilyMemberDetails>, userModel: Model<User>);
    createFamilyMember(createFamilyMemberDto: CreateFamilyMemberDetailsDto, user: User): Promise<FamilyMemberDetails>;
    getAllFamilyMembers(userId: string): Promise<FamilyMemberDetails[]>;
    getFamilyMemberById(user: User, id: string): Promise<FamilyMemberDetails>;
    updateFamilyMember(user: User, id: string, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<FamilyMemberDetails>;
    removeFamilyMember(user: User, id: string): Promise<{
        deleted: boolean;
    }>;
}
