
import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class AddressDetailsDto {

  @IsNotEmpty()
  @IsString()
  lineOne: string;

  @IsString()
  lineTwo: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  suburb: string;

  @IsNotEmpty()
  @IsString()
  province: string;


  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  postalCode: number;


}
