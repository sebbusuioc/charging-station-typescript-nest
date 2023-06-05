import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { Station } from './station.entity';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, Company]),
  ],
  controllers: [StationController],
  providers: [StationService],
})
export class StationModule {}
