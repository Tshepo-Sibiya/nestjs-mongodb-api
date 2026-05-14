import { GymSessionService } from 'src/gym-buddy/services/gym-session/gym-session.service';
export declare class GymSessionController {
    private gymSessionService;
    constructor(gymSessionService: GymSessionService);
    create(req: any, createGymSessionDto: any): Promise<import("../../schemas/gym-session.schema").GymSession>;
    findAll(query: any): Promise<import("../../schemas/gym-session.schema").GymSession[]>;
    findOne(id: string): Promise<import("../../schemas/gym-session.schema").GymSession | null>;
    update(id: string, updateGymSessionDto: any): Promise<import("../../schemas/gym-session.schema").GymSession | null>;
    remove(id: string): Promise<void>;
}
