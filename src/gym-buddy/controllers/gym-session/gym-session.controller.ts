import { Controller } from '@nestjs/common';
import { GymSessionService } from 'src/gym-buddy/services/gym-session/gym-session.service';

@Controller('gym-session')
export class GymSessionController {
            constructor(private gymSessionService: GymSessionService) {
        
            }
}
