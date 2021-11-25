import { IsEmail, IsNotEmpty } from "class-validator";

export class DonationDto{
    @IsEmail()
    email_donor: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    category: string
}