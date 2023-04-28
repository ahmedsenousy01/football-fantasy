import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import TeamService from "@/services/team.service";
import catchAsyncError from "@/utils/tools/catchAsyncError";
import { jwtTokenRequiringMiddleware } from "@/middleware/jwt.middleware";

class TeamController implements Controller {
    public path = "/teams";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            `${this.path}/:id`,
            jwtTokenRequiringMiddleware,
            catchAsyncError(this.getTeamsByUserId)
        );
        this.router.post(`${this.path}/`, catchAsyncError(this.createTeam));
        this.router.put(`${this.path}/:id`, catchAsyncError(this.updateTeam));
        this.router.delete(
            `${this.path}/:id`,
            catchAsyncError(this.deleteTeam)
        );
    }

    private async getTeamsByUserId(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = res.locals.token;
        const teams = await TeamService.GetTeamsByUserId(id);
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
}

export default new TeamController();
