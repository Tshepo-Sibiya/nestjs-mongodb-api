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

import { CreateRelationshipDto } from 'src/family-tree/dto/ralationship/create-relationship.dto';
import { UpdateRelationshipDto } from 'src/family-tree/dto/ralationship/update-relationship.dto';
import { RelationshipService } from 'src/family-tree/services/relationship/relationship.service';

@ApiTags('Relationship')
@Controller('relationship')
@UseGuards(AuthGuard()) // apply guard globally to all routes in this controller
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  /** CREATE */
  @Post()
  @ApiOperation({ summary: 'Create a new relationship' })
  @ApiResponse({ status: 201, description: 'Relationship successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  createRelationship(@Req() req, @Body() createDto: CreateRelationshipDto) {
    return this.relationshipService.createRelationship(createDto, req.user);
  }

  /** READ ALL */
  @Get()
  @ApiOperation({ summary: 'Get all relationships' })
  @ApiResponse({ status: 200, description: 'List of relationships returned.' })
  findAll() {
    return this.relationshipService.findAll();
  }

  /** READ ONE */
  @Get(':id')
  @ApiOperation({ summary: 'Get relationship by ID' })
  @ApiResponse({ status: 200, description: 'Relationship found.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  findOne(@Param('id') id: string) {
    return this.relationshipService.findOne(id);
  }

  /** UPDATE */
  @Put(':id')
  @ApiOperation({ summary: 'Update relationship by ID' })
  @ApiResponse({ status: 200, description: 'Relationship successfully updated.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateRelationshipDto,
  ) {
    return this.relationshipService.update(id, updateDto, req.user);
  }

  /** DELETE */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete relationship by ID' })
  @ApiResponse({ status: 200, description: 'Relationship successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  remove(@Param('id') id: string) {
    return this.relationshipService.remove(id);
  }
}
