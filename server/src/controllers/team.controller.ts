import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import TeamService from "@/services/team.service";
import UserService from "@/services/user.service";
import catchAsyncError from "@/utils/tools/catchAsyncError";
import { jwtTokenRequiringMiddleware } from "@/middleware/jwt.middleware";
import User from "@/models/User";
import playerService from "@/services/player.service";

class TeamController implements Controller {
    public path = "/teams";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            `${this.path}/`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.getTeamByUserId)
        );
        this.router.get(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.getTeamById)
        );
        this.router.post(`${this.path}/`, catchAsyncError(this.createTeam));
        this.router.put(`${this.path}/:id`, catchAsyncError(this.updateTeam));
        this.router.delete(
            `${this.path}/:id`,
            catchAsyncError(this.deleteTeam)
        );
        this.router.put(
            `${this.path}/buy/:playerId`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.buyPlayer)
        );
        this.router.put(
            `${this.path}/sell/:playerId`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.sellPlayer)
        );
    }

    private async getTeamById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const teams = await TeamService.GetTeam(id);
        return res.status(200).json(teams);
    }

    private async getTeamByUserId(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = res.locals.token;
        const teams = await TeamService.GetTeamByUserId(id);
        return res.status(200).json(teams);
    }

    private async createTeam(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const team = await TeamService.CreateTeam(body);
        return res.status(200).json(team);
    }

    private async updateTeam(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const { id } = req.params;
        const team = await TeamService.UpdateTeam(id, body);
        return res.status(200).json(team);
    }

    private async deleteTeam(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const team = await TeamService.DeleteTeam(id);
        return res.status(200).json(team);
    }

    private async buyPlayer(req: Request, res: Response): Promise<Response> {
        const { playerId } = req.params;
        const userId = res.locals.token.id;
        const user = await User.findById(userId).exec();
        const player = await playerService.GetPlayer(playerId);
        const serviceResponse = await TeamService.BuyPlayer(
            playerId,
            user?.team?.toString() || "",
            userId
        );
        if (serviceResponse.status === false) {
            return res.status(400).json(serviceResponse);
        }
        return res.status(200).json(serviceResponse);
    }

    private async sellPlayer(req: Request, res: Response): Promise<Response> {
        const { playerId } = req.params;
        const userId = res.locals.token.id;
        const user = await User.findById(userId).exec();
        const player = await playerService.GetPlayer(playerId);
        const serviceResponse = await TeamService.SellPlayer(
            playerId,
            user?.team?.toString() || "",
            userId
        );
        if (serviceResponse.status === false) {
            return res.status(400).json(serviceResponse);
        }
        
        return res.status(200).json(serviceResponse);
    }
}

export default new TeamController();
