import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { RelationshipType } from '../enums/relationship-type.enum';
import { FamilyMemberDetails } from './family-member.schema';
import { User } from 'src/user/schemas/user.schema';

export type FamilyDetailsDocument = FamilyDetails & Document;

@Schema({ timestamps: true })
export class FamilyDetails extends Document {

    @Prop({ required: true })
    familyName: string;

    @Prop({ required: false })
    clanName: string;

    @Prop({ required: false })
    language: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'FamilyMemberDetails' }] })
    familyMembers: FamilyMemberDetails[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

}

export const FamilyDetailsSchema = SchemaFactory.createForClass(FamilyDetails);
