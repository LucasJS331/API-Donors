import { IsNotEmpty } from "class-validator";

export class UpdateDonationDto{
   
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    category: string
}