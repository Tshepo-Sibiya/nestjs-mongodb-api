import { Model } from 'mongoose';
import { CreateRelationshipDto } from 'src/family-tree/dto/ralationship/create-relationship.dto';
import { UpdateRelationshipDto } from 'src/family-tree/dto/ralationship/update-relationship.dto';
import { RelationshipDetails } from 'src/family-tree/schemas/relationship.schema';
import { User } from 'src/user/schemas/user.schema';
export declare class RelationshipService {
    private readonly relationshipModel;
    constructor(relationshipModel: Model<RelationshipDetails>);
    createRelationship(createRelationshipDto: CreateRelationshipDto, user: User): Promise<RelationshipDetails>;
    findAll(): Promise<RelationshipDetails[]>;
    findOne(id: string): Promise<RelationshipDetails>;
    update(id: string, updateRelationshipDto: UpdateRelationshipDto, user: User): Promise<RelationshipDetails>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
