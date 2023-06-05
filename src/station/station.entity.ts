import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../company/company.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column('decimal', { nullable: true})
  @ApiProperty()
  latitude: number;

  @Column('decimal', { nullable: true})
  @ApiProperty()
  longitude: number;

  @Column()
  @ApiProperty()
  address: string;

  @Column({ nullable: true})
  @ApiProperty()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.stations)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
