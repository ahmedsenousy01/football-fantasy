import UserService from '@/services/user.service';
import TeamInterface from "@/interfaces/team.interface";
import TeamModel from "@/models/Team";

class TeamService {
    private model: typeof TeamModel;

    constructor() {
        this.model = TeamModel;
    }

    public async GetTeam(id: string) {
        return await this.model.findById(id).exec();
    }

    public async GetTeamsByUserId(id: string) {
        const user = await UserService.GetUser(id);
        return user?.teams;
    }

    public async CreateTeam(Team: TeamInterface) {
        return await this.model.insertMany(Team);
    }

    public async UpdateTeam(id: string, Team: TeamInterface) {
        return await this.model
            .findByIdAndUpdate({ _id: id }, Team, { new: true })
            .exec();
    }

    public async DeleteTeam(id: string) {
        return await this.model.findByIdAndRemove({ _id: id }).exec();
    }
}

export default new TeamService();
