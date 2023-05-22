import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsyncError from "@/utils/tools/catchAsyncError";
import searchService from "@/services/search.service";

class SearchController implements Controller {
    public path = "/search";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            `${this.path}/players`,
            catchAsyncError(this.searchPlayersByName)
        );

        this.router.get(
            `${this.path}/users`,
            catchAsyncError(this.searchUsersByName)
        );
    }

    private async searchPlayersByName(
        req: Request,
        res: Response
    ): Promise<Response> {
        const name = String(req.query.name);
        const page: number = Number(req.query.page);
        const serviceResponse = await searchService.searchPlayersByName(
            name,
            page
        );
        return res.status(200).json(serviceResponse);
    }

    private async searchUsersByName(
        req: Request,
        res: Response
    ): Promise<Response> {
        const name = String(req.query.name);
        const page: number = Number(req.query.page);
        const serviceResponse = await searchService.searchUsersByName(
            name,
            page
        );
        return res.status(200).json(serviceResponse);
    }
}

export default new SearchController();
