import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import LeagueService from "@/services/league.service";
import catchAsyncError from "@/utils/tools/catchAsyncError";

class LeagueController implements Controller {
    public path = "/leagues";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            `${this.path}/:id`,
            catchAsyncError(this.getLeagueById)
        );
        this.router.post(`${this.path}/`, catchAsyncError(this.createLeague));
        this.router.put(`${this.path}/:id`, catchAsyncError(this.updateLeague));
        this.router.delete(
            `${this.path}/:id`,
            catchAsyncError(this.deleteLeague)
        );
    }

    private async getLeagueById(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const league = await LeagueService.GetLeague(id);
        return res.status(200).json(league);
    }

    private async createLeague(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const Leagues = await LeagueService.CreateLeague(body);
        return res.status(200).json(Leagues);
    }

    private async updateLeague(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const { id } = req.params;
        const league = await LeagueService.UpdateLeague(id, body);
        return res.status(200).json(league);
    }

    private async deleteLeague(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const league = await LeagueService.DeleteLeague(id);
        return res.status(200).json(league);
    }
}

export default new LeagueController();
