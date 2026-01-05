import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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
    async create(@Body() createGymItemDto: CreateGymItemDto) {
        return this.gymItemService.create(createGymItemDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: string, @Body() updateGymItemDto: UpdateGymItemDto) {
        return this.gymItemService.update(id, updateGymItemDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async remove(@Param('id') id: string) {
        return this.gymItemService.remove(id);
    }
}
