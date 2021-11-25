import { IsNotEmpty, IsNumberString } from "class-validator";

export class UpdateDonorDto{

    @IsNotEmpty()
    name: string

    @IsNumberString()
    @IsNotEmpty()
    phone_number
}