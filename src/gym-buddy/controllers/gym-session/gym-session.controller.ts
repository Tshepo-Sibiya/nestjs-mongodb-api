import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GymSessionService } from 'src/gym-buddy/services/gym-session/gym-session.service';

@Controller('gym-session')
export class GymSessionController {
            constructor(private gymSessionService: GymSessionService) {
        
            }

            @Post()
            async create(@Body() createGymSessionDto: any) {
                return this.gymSessionService.create(createGymSessionDto);
            }

            @Get()
            async findAll(@Query() query: any) {
                return this.gymSessionService.findAll();
            }

            @Get(':id')
            async findOne(@Param('id') id: string) {
                return this.gymSessionService.findOne(id);
            }

            @Patch(':id')
            async update(@Param('id') id: string, @Body() updateGymSessionDto: any) {
                return this.gymSessionService.update(id, updateGymSessionDto);
            }

            @Delete(':id')
            async remove(@Param('id') id: string) {
                return this.gymSessionService.remove(id);
            }

            // @Post(':id/join')
            // async join(@Param('id') id: string, @Body('userId') userId: string) {
            //     return this.gymSessionService.join(id, userId);
            // }

            // @Post(':id/leave')
            // async leave(@Param('id') id: string, @Body('userId') userId: string) {
            //     return this.gymSessionService.leave(id, userId);
            // }

}
