import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StationService } from './station.service';
import { Station } from './station.entity';
import { GetStationsDto, CreateStationDto } from './station.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('station')
@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @ApiOperation({ summary: 'Create a station' })
  @ApiResponse({ status: 200, description: 'The created station', type: Station, isArray: true })
  @ApiBody({ type: CreateStationDto})
  @Post()
  create(@Body() station: Station) {
    return this.stationService.create(station);
  }

  @ApiOperation({ summary: 'Get all stations' })
  @ApiResponse({ status: 200, description: 'The found stations', type: Station, isArray: true })
  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @ApiOperation({ summary: 'Get one station' })
  @ApiResponse({ status: 200, description: 'The found station', type: Station, isArray: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a station' })
  @ApiResponse({ status: 200, description: 'The updated station', type: Station, isArray: true })
  @Put(':id')
  update(@Param('id') id: string, @Body() station: Station) {
    return this.stationService.update(+id, station);
  }

  @ApiOperation({ summary: 'Delete a station' })
  @ApiResponse({ status: 200, description: 'The deleted station', type: Station, isArray: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(+id);
  }

  @Post('getStationsInRadius')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Retrieve all stations in the radius' })
  @ApiBody({ type: GetStationsDto})
  @ApiResponse({ status: 200, description: 'The found stations in the radius', type: Station, isArray: true })
  getStations(@Body() getStationsDto: GetStationsDto) {
    return this.stationService.getStations(getStationsDto.latitude, getStationsDto.longitude, getStationsDto.radius, getStationsDto.company_id);
  }
}
