import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonorsService } from 'src/donors/donors.service';
import { DonationDto } from './dto/dontation-dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './interfaces/donation-interface';

@Injectable()
export class DonationsService {
    constructor(@InjectModel('Donation') private donationModel: Model<Donation>,
        private readonly donors_service: DonorsService
    ){}

    async saveDonation(donationDto: DonationDto){
        //? verify if donor exists
        let donor = await this.donors_service.getDonorByEmail(donationDto.email_donor);

        let donation: Donation ={
            id_donor: donor.id,
            description: donationDto.description,
            category: donationDto.category
        }   
        const new_donation =  new this.donationModel(donation);

        let resp =  await new_donation.save();

        donor.donations.push(resp.id);
        await this.donors_service.updateDonorWithDonation(donor.id, donor);

        return resp;
    }

    async getDonationByID(_id: string){
        let donation =  await this.donationModel.findById(_id);

        if(!donation) throw new NotFoundException('Donation not found');

        return donation;
    }


    async getAllDonations(){
        return await this.donationModel.find();
    }

    async deleteDonations(_id: string){
        await this.getDonationByID(_id); //?  return 404 if donation dont exist

        return await this.donationModel.findByIdAndDelete(_id);
    }

    async updateDonation(_id: string, updated_donation: UpdateDonationDto){
        await this.getDonationByID(_id);

        return await this.donationModel.findByIdAndUpdate(_id, updated_donation);
    }
}
