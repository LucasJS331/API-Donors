import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonorsModule } from 'src/donors/donors.module';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { DonationSchema } from './interfaces/donation-schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Donation', schema: DonationSchema}]), DonorsModule],
  controllers: [DonationsController],
  providers: [DonationsService]
})
export class DonationsModule {}
