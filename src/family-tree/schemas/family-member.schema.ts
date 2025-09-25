import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { User } from 'src/user/schemas/user.schema';

export type FamilyMemberDetailsDocument = FamilyMemberDetails & Document;

@Schema({ timestamps: true })
export class FamilyMemberDetails extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: false })
    lastName: string;

    @Prop({ required: false })
    gender: Gender;

    @Prop({ required: true })
    birthDate: Date;

    @Prop({ required: false })
    deathDate: Date;

    @Prop({ required: true })
    generation: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'FamilyMemberDetails' }] })
    parents: FamilyMemberDetails[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'FamilyMemberDetails' }] })
    children: FamilyMemberDetails[];

    @Prop({ required: false })
    notes: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const FamilyMemberDetailsSchema = SchemaFactory.createForClass(FamilyMemberDetails);
