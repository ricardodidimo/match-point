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
  UseGuards,
  Version,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles, RolesGuard } from '../auth/roles-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth,guard';

@ApiTags('courts')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a court' })
  @ApiResponse({ status: 201, description: 'Court created' })
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.createCourt(createCourtDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all courts' })
  @ApiResponse({ status: 200, description: 'List of courts' })
  findAll() {
    return this.courtsService.getAllCourts();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get court by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Court found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courtsService.getCourtById(id);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Update court by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Court updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtsService.updateCourt(id, updateCourtDto);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete court by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Court deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courtsService.deleteCourt(id);
  }
}
