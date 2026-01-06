import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGymItemDto, UpdateGymItemDto } from 'src/gym-buddy/dto/gym-item';
import { GymItemService } from 'src/gym-buddy/services/gym-item/gym-item.service';

@Controller('gym-item')
export class GymItemController {
    constructor(private gymItemService: GymItemService) {

    }
    @Get()
    @UseGuards(AuthGuard())
    async findAll() {
        return this.gymItemService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async findOne(@Param('id') id: string) {
        return this.gymItemService.findById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Req() req, @Body() createGymItemDto: CreateGymItemDto) {
        return this.gymItemService.create(req.user, createGymItemDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: string, @Body() updateGymItemDto: UpdateGymItemDto) {

        try {
            
            const updatedItem = await this.gymItemService.update(id, updateGymItemDto);
            return updatedItem;

        } catch (error) {
            // Handle error appropriately
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            // throw new NotFoundException(`Gym item with id ${id} not found`);
        }

        
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async remove(@Param('id') id: string) {
        return this.gymItemService.remove(id);
    }
}
