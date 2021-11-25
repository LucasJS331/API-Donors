import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({timestamps: true, collection: "donors"})
class Donor extends mongoose.Document{
    @Prop()
    name: string

    @Prop({unique: true})
    email: string

    @Prop()
    city: string

    @Prop()
    phone_number: string

    @Prop()
    donations: string[]


}

export const DonorSchema = SchemaFactory.createForClass(Donor);