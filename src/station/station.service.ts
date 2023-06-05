import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './station.entity';
import { Company } from '../company/company.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async findOne(id: number): Promise<Station> {
    return this.stationRepository.findOne({ where: { id }, relations: ["stations", "childCompanies"] });
  }

  async create(station: Station): Promise<Station> {
    return this.stationRepository.save(station);
  }

  async update(id: number, station: Station): Promise<Station> {
    await this.stationRepository.update(id, station);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.stationRepository.delete(id);
  }

  async getStations(latitude: number, longitude: number, radius: number, companyId?: number): Promise<Station[]> {
    // Get all companies and stations
    const companies = await this.companyRepository.find({ relations: ["stations"] });

    // Filter stations by companyId
    let stations = [];
    const company = companies.find(company => company.id === companyId);
    stations = this.getAllStationsFromCompany(company);

    // Calculate distances and filter by radius
    const result = stations.filter(station => {
      const distance = this.calculateDistance(latitude, longitude, station.latitude, station.longitude);
      station.distance = distance;
      return distance <= radius;
    });

    // Sort by distance
    result.sort((a, b) => a.distance - b.distance);

    return result;
  }

  private getAllStationsFromCompany(company: Company): Station[] {
    let stations = [...company.stations];
    company.childCompanies.forEach(childCompany => {
      stations.push(...this.getAllStationsFromCompany(childCompany));
    });
    return stations;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180)
  }
}
