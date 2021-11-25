import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidation } from 'src/common/pipes/id-pipe';
import { DonationsService } from './donations.service';
import { DonationDto } from './dto/dontation-dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Controller('api/v1/donation')
export class DonationsController {
    constructor(private donation_service: DonationsService){

    }

    @Get()
    async alldonations(){
        return await this.donation_service.getAllDonations(); 
    }

    @Get("/:_id")
    async oneDonation(@Param("_id", IdValidation) _id: string){
        return await this.donation_service.getDonationByID(_id);
    }

    @Delete("/:_id")
    async deleteDonation(@Param("_id", IdValidation) _id: string){
        return await this.donation_service.deleteDonations(_id);
    }

    @UsePipes(ValidationPipe)
    @Post()
    async saveDonation(@Body() donationDto: DonationDto){
        return await this.donation_service.saveDonation(donationDto);
    }

    @UsePipes(ValidationPipe)
    @Put("/:_id")
    async updadeDonation(
        @Param("_id", IdValidation) _id: string,
        @Body() updateDonationDto: UpdateDonationDto
    ){
        return await this.donation_service.updateDonation(_id, updateDonationDto);
    }
}
