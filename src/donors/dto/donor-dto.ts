import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class DonorDto{

    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    city: string

    @IsNumberString()
    @IsNotEmpty()
    phone_number
}