import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonorDto } from './dto/donor-dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './interfaces/donor-interface';

@Injectable()
export class DonorsService {
    constructor(@InjectModel('Donor') private donorModel: Model<Donor>){

    }
    async save_donor(donorDto: DonorDto){
        const verify = await this.donorModel.find({email: donorDto.email});

        if(verify.length > 0) throw new BadRequestException('emais alredy in use');

        let donor = new this.donorModel(donorDto);
        return await donor.save();
    }
  
    async getOneDonorByID(_id: string){
        let donor = await this.donorModel.findById(_id);

        if(!donor) throw new NotFoundException('donor not found');

        return donor;
    }

    async getAllDonors(){
        return await this.donorModel.find().populate("donations"); 
    }

    async deleteDonorByID(_id: string){
        const donor = this.getOneDonorByID(_id); //? if not exist return error 404

        return await this.donorModel.findByIdAndDelete(_id);
    }

    async getDonorByEmail(email: string): Promise<Donor | any>{
        let donor = await this.donorModel.find({email});

        if(donor.length == 0) throw new NotFoundException('donor not exist');

        return donor[0];
    }

    async updateDonor(_id: string, updateDonorDto: UpdateDonorDto){
        await this.getOneDonorByID(_id); //? if not exist return error 404

        return await this.donorModel.findByIdAndUpdate(_id, updateDonorDto);
    }

    async updateDonorWithDonation(_id: string, donor: Donor){

        return await this.donorModel.findByIdAndUpdate(_id, donor);
    }



}
