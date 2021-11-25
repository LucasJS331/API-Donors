import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { DonorsModule } from './donors/donors.module';
import { DonationsModule } from './donations/donations.module';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, '../.env')})

@Module({
  imports: [DonorsModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    DonationsModule,
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
