import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { RelationshipType } from '../enums/relationship-type.enum';
import { User } from 'src/user/schemas/user.schema';

export type RelationshipDetailsDocument = RelationshipDetails & Document;

@Schema({ timestamps: true })
export class RelationshipDetails extends Document {

    @Prop({ required: true })
    parentId: string;

    @Prop({ required: false })
    childId: string;

    @Prop({ required: true })
    relationshipType: RelationshipType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

}

export const RelationshipDetailsSchema = SchemaFactory.createForClass(RelationshipDetails);
