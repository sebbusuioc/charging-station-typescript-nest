import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetStationsDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsNumber()
  radius: number;

  @ApiProperty()
  @IsNumber()
  company_id?: number;
}

export class CreateStationDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNumber()
    latitude: number;
  
    @ApiProperty()
    @IsNumber()
    longitude: number;
  
    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNumber()
    company_id: number;
  }