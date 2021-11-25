import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({timestamps: true, collection: "donations"})
class Donation extends mongoose.Document{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Donor"})
    id_donor: string

    @Prop()
    description: string

    @Prop()
    category: string


}

export const DonationSchema = SchemaFactory.createForClass(Donation);