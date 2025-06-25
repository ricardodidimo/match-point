import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Version,
  UseGuards,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth,guard';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new rental' })
  @ApiResponse({ status: 201, description: 'Rental created successfully' })
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.createRental(createRentalDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({ status: 200, description: 'List of rentals' })
  findAll() {
    return this.rentalsService.getAllRentals();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get rental by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Rental found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.getRentalById(id);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Update rental by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Rental updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    return this.rentalsService.updateRental(id, updateRentalDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete rental by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Rental deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.deleteRental(id);
  }
}
