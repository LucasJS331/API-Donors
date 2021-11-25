import { BadRequestException, PipeTransform } from "@nestjs/common";
import validator from 'validator'
export class IdValidation implements PipeTransform{
    transform(value: string){
        validator.isMongoId(value);

       if(!validator.isMongoId(value)) throw new BadRequestException('_id is invalid!');

       return value
    }
}