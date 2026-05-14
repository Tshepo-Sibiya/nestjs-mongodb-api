import { CreateRelationshipDto } from 'src/family-tree/dto/ralationship/create-relationship.dto';
import { UpdateRelationshipDto } from 'src/family-tree/dto/ralationship/update-relationship.dto';
import { RelationshipService } from 'src/family-tree/services/relationship/relationship.service';
export declare class RelationshipController {
    private readonly relationshipService;
    constructor(relationshipService: RelationshipService);
    createRelationship(req: any, createDto: CreateRelationshipDto): Promise<import("../../schemas/relationship.schema").RelationshipDetails>;
    findAll(): Promise<import("../../schemas/relationship.schema").RelationshipDetails[]>;
    findOne(id: string): Promise<import("../../schemas/relationship.schema").RelationshipDetails>;
    update(req: any, id: string, updateDto: UpdateRelationshipDto): Promise<import("../../schemas/relationship.schema").RelationshipDetails>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
