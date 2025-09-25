import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFamilyDetailsDto } from 'src/family-tree/dto/family/create-family.dto';
import { UpdateFamilyDetailsDto } from 'src/family-tree/dto/family/update-family.dto';



import { FamilyService } from 'src/family-tree/services/family/family.service';

@ApiTags('family')
@Controller('family')
@UseGuards(AuthGuard()) // applies authentication guard to all routes
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  /** CREATE */
  @Post()
  @ApiOperation({ summary: 'Create a new family' })
  @ApiResponse({ status: 201, description: 'Family successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  createFamilyMember(@Req() req, @Body() createDto: CreateFamilyDetailsDto) {
    return this.familyService.createFamily(createDto, req.user);
  }

  /** READ ALL */
  @Get()
  @ApiOperation({ summary: 'Get all families for current user' })
  @ApiResponse({ status: 200, description: 'List of families returned.' })
  findAll(@Req() req) {
    return this.familyService.getAllFamilies(req.user._id);
  }

  /** READ ONE */
  @Get(':id')
  @ApiOperation({ summary: 'Get family by ID' })
  @ApiResponse({ status: 200, description: 'Family found.' })
  @ApiResponse({ status: 404, description: 'Family not found.' })
  findOne(@Req() req, @Param('id') id: string) {
    return this.familyService.getFamilyById(req.user, id);
  }

  /** UPDATE */
  @Put(':id')
  @ApiOperation({ summary: 'Update family by ID' })
  @ApiResponse({ status: 200, description: 'Family successfully updated.' })
  @ApiResponse({ status: 404, description: 'Family not found.' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateFamilyDetailsDto,
  ) {
    return this.familyService.updateFamily(req.user, id, updateDto);
  }

  /** DELETE */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete family by ID' })
  @ApiResponse({ status: 200, description: 'Family successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Family not found.' })
  remove(@Req() req, @Param('id') id: string) {
    return this.familyService.removeFamily(req.user, id);
  }
}
