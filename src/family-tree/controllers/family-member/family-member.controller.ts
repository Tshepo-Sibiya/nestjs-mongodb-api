import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FamilyMemberService } from 'src/family-tree/services/family-member/family-member.service';
import { CreateFamilyMemberDetailsDto } from 'src/family-tree/dto/family-member/create-family-member.dto';
import { UpdateFamilyMemberDto } from 'src/family-tree/dto/family-member/update-family-member.dto';




@Controller('family-member')
@ApiTags('family-member')
@UseGuards(AuthGuard()) // applies authentication guard to all routes
export class FamilyMemberController {

    constructor(private familyMemberService: FamilyMemberService) { }


    /** CREATE */
    @Post()
    @ApiOperation({ summary: 'Create a new family member' })
    @ApiResponse({ status: 201, description: 'Family member successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    createFamily(@Req() req, @Body() createDto: CreateFamilyMemberDetailsDto) {
        return this.familyMemberService.createFamilyMember(createDto, req.user);
    }

    /** READ ALL */
    @Get()
    @ApiOperation({ summary: 'Get all family member for current user' })
    @ApiResponse({ status: 200, description: 'List of family member returned.' })
    findAll(@Req() req) {
        return this.familyMemberService.getAllFamilyMembers(req.user._id);
    }

    /** READ ONE */
    @Get(':id')
    @ApiOperation({ summary: 'Get family member by ID' })
    @ApiResponse({ status: 200, description: 'Family member found.' })
    @ApiResponse({ status: 404, description: 'Family member not found.' })
    findOne(@Req() req, @Param('id') id: string) {
        return this.familyMemberService.getFamilyMemberById(req.user, id);
    }

    /** UPDATE */
    @Put(':id')
    @ApiOperation({ summary: 'Update family member by ID' })
    @ApiResponse({ status: 200, description: 'Family memeber successfully updated.' })
    @ApiResponse({ status: 404, description: 'Family member not found.' })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() updateDto: UpdateFamilyMemberDto,
    ) {
        return this.familyMemberService.updateFamilyMember(req.user, id, updateDto);
    }

    /** DELETE */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete family member by ID' })
    @ApiResponse({ status: 200, description: 'Family member successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Family member not found.' })
    remove(@Req() req, @Param('id') id: string) {
        return this.familyMemberService.removeFamilyMember(req.user, id);
    }


}
