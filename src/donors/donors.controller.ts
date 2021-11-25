import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidation } from 'src/common/pipes/id-pipe';
import { DonorsService } from './donors.service';
import { DonorDto } from './dto/donor-dto';
import { UpdateDonorDto } from './dto/update-donor.dto';

@Controller('api/v1/donor')
export class DonorsController {
    constructor(private donor_service: DonorsService){

    }
    @Get()
    async get_donors(){
        return await this.donor_service.getAllDonors();
    }

    @Get("/:_id")
    async getOneDonor(@Param('_id', IdValidation) _id: string){
        return this.donor_service.getOneDonorByID(_id);
    }

    @UsePipes(ValidationPipe)
    @Post()
    async save_donor(@Body() donor_dto: DonorDto){

        return await this.donor_service.save_donor(donor_dto);
    }

    @UsePipes(ValidationPipe)
    @Put("/:_id")
    async updateDonor(
        @Param("_id", IdValidation) _id: string,
        @Body() update_donor_dto: UpdateDonorDto
    ){
        return await this.donor_service.updateDonor(_id, update_donor_dto);
    }

    @Delete("/:_id")
    async deleteDonor(@Param('_id',IdValidation) _id: string){

        return await this.donor_service.deleteDonorByID(_id);

    }
}
