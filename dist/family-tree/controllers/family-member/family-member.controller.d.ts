import { FamilyMemberService } from 'src/family-tree/services/family-member/family-member.service';
import { CreateFamilyMemberDetailsDto } from 'src/family-tree/dto/family-member/create-family-member.dto';
import { UpdateFamilyMemberDto } from 'src/family-tree/dto/family-member/update-family-member.dto';
export declare class FamilyMemberController {
    private familyMemberService;
    constructor(familyMemberService: FamilyMemberService);
    createFamily(req: any, createDto: CreateFamilyMemberDetailsDto): Promise<import("../../schemas/family-member.schema").FamilyMemberDetails>;
    findAll(req: any): Promise<import("../../schemas/family-member.schema").FamilyMemberDetails[]>;
    findOne(req: any, id: string): Promise<import("../../schemas/family-member.schema").FamilyMemberDetails>;
    update(req: any, id: string, updateDto: UpdateFamilyMemberDto): Promise<import("../../schemas/family-member.schema").FamilyMemberDetails>;
    remove(req: any, id: string): Promise<{
        deleted: boolean;
    }>;
}
