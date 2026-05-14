import { CreateFamilyDetailsDto } from 'src/family-tree/dto/family/create-family.dto';
import { UpdateFamilyDetailsDto } from 'src/family-tree/dto/family/update-family.dto';
import { FamilyService } from 'src/family-tree/services/family/family.service';
export declare class FamilyController {
    private readonly familyService;
    constructor(familyService: FamilyService);
    createFamilyMember(req: any, createDto: CreateFamilyDetailsDto): Promise<import("../../schemas/family.schema").FamilyDetails>;
    findAll(req: any): Promise<import("../../schemas/family.schema").FamilyDetails[]>;
    findOne(req: any, id: string): Promise<import("../../schemas/family.schema").FamilyDetails>;
    update(req: any, id: string, updateDto: UpdateFamilyDetailsDto): Promise<import("../../schemas/family.schema").FamilyDetails>;
    remove(req: any, id: string): Promise<{
        deleted: boolean;
    }>;
}
