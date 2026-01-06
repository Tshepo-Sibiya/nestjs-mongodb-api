import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GymSessionService } from 'src/gym-buddy/services/gym-session/gym-session.service';

@Controller('gym-session')
export class GymSessionController {
            constructor(private gymSessionService: GymSessionService) {
        
            }

            @Post()
            @UseGuards(AuthGuard())
            async create(@Req() req,@Body() createGymSessionDto: any) {
                return this.gymSessionService.create(req.user,createGymSessionDto);
            }

            @Get()
            @UseGuards(AuthGuard())
            async findAll(@Query() query: any) {
                return this.gymSessionService.findAll();
            }

            @Get(':id')
            @UseGuards(AuthGuard())
            async findOne(@Param('id') id: string) {
                return this.gymSessionService.findOne(id);
            }

            @Put(':id')
            @UseGuards(AuthGuard())
            async update(@Param('id') id: string, @Body() updateGymSessionDto: any) {
                return this.gymSessionService.update(id, updateGymSessionDto);
            }

            @Delete(':id')
            @UseGuards(AuthGuard())
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
