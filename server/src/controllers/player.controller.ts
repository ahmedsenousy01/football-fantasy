import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import PlayerService from "@/services/player.service";
import catchAsyncError from "@/utils/tools/catchAsyncError";
import {
    adminRoleRequiringMiddleware,
    jwtTokenRequiringMiddleware,
} from "@/middleware/jwt.middleware";

class PlayerController implements Controller {
    public path = "/players";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            `${this.path}/:id`,
            catchAsyncError(this.getPlayersByLeagueId)
        );

        this.router.get(
            `${this.path}/points/:id`,
            catchAsyncError(this.getPlayerPoints)
        );

        this.router.post(
            `${this.path}/`,
            jwtTokenRequiringMiddleware,
            adminRoleRequiringMiddleware,
            catchAsyncError(this.createPlayer)
        );

        this.router.put(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            adminRoleRequiringMiddleware,
            catchAsyncError(this.updatePlayer)
        );

        this.router.delete(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            adminRoleRequiringMiddleware,
            catchAsyncError(this.deletePlayer)
        );
    }

    private async getPlayersByLeagueId(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const page: number = Number(req.query.page);
        const players = await PlayerService.GetPlayersByLeagueId(id, page);
        return res.status(200).json(players);
    }

    private async getPlayerPoints(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const player = await PlayerService.CalculatePoints(id);
        return res.status(200).json(player);
    }

    private async createPlayer(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const players = await PlayerService.CreatePlayer(body);
        return res.status(200).json(players);
    }

    private async updatePlayer(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const { id } = req.params;
        const player = await PlayerService.UpdatePlayer(id, body);
        return res.status(200).json(player);
    }

    private async deletePlayer(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const player = await PlayerService.DeletePlayer(id);
        return res.status(200).json(player);
    }
}

export default new PlayerController();
