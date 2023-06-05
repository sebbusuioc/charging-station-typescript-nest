import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Station } from '../station/station.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  parent_company_id: number;

  @OneToMany(() => Station, (station) => station.company)
  stations: Station[];
 
  @ManyToOne(() => Company, (company) => company.childCompanies)
  @JoinColumn({ name: 'parent_company_id' })
  parentCompany: Company;

  @OneToMany(() => Company, company => company.parentCompany)
  childCompanies: Company[];
}
