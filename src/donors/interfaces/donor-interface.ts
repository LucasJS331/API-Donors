import { Donation } from "src/donations/interfaces/donation-interface";
export interface Donor{
    name: string,
    email: string,
    city: string,
    phone_number: string,
    donations: Donation[]
}