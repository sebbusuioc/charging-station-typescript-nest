import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateCompanyDto } from './company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({ status: 200, description: 'The created company', type: Company, isArray: true })
  @ApiBody({ type: CreateCompanyDto})
  @Post()
  create(@Body() company: Company) {
    return this.companyService.create(company);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'All found companies', type: Company, isArray: true })
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @ApiOperation({ summary: 'Get one company' })
  @ApiResponse({ status: 200, description: 'The found company', type: Company, isArray: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one company' })
  @ApiResponse({ status: 200, description: 'Updated company', type: Company, isArray: true })
  @Put(':id')
  update(@Param('id') id: string, @Body() company: Company) {
    return this.companyService.update(+id, company);
  }

  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({ status: 200, description: 'The deleted company', type: Company, isArray: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
