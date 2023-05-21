import LeagueInterface from "@/interfaces/league.interface";
import LeagueModel from "@/models/League";

class LeagueService {
    private model: typeof LeagueModel;

    constructor() {
        this.model = LeagueModel;
    }

    public async GetLeague(id: string) {
        return await this.model.findById(id).exec();
    }

    public async GetLeagueByName(name: string) {
        return await this.model.findOne({ name }).exec();
    }

    public async CreateLeague(league: LeagueInterface) {
        return (await this.model.insertMany(league))[0];
    }

    public async UpdateLeague(id: string, league: LeagueInterface) {
        return await this.model
            .findByIdAndUpdate({ _id: id }, league, {
                new: true,
            })
            .exec();
    }

    public async DeleteLeague(id: string) {
        return await this.model.findByIdAndRemove({ _id: id }).exec();
    }
}

export default new LeagueService();
