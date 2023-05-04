import Player from "@/interfaces/player.interface";
import User from "@/interfaces/user.interface";
import UserModel from "@/models/User";
import PlayerModel from "@/models/Player";

class LeagueService {
    private PlayerModel: typeof PlayerModel;
    private UserModel: typeof UserModel;
    private offset: number;

    constructor() {
        this.PlayerModel = PlayerModel;
        this.UserModel = UserModel;
        this.offset = 20;
    }

    public async searchPlayersByName(query: string, page: number = 1) {
        const totalPages: number = Math.ceil(
            (await this.PlayerModel.countDocuments().exec()) / this.offset
        );
        const data = await this.PlayerModel.find({
            name: { $regex: query, $options: "i" },
        })
            .skip(this.offset * (page - 1))
            .limit(this.offset)
            .exec();

        return {
            totalPages,
            page: page || 1,
            data,
        };
    }

    public async searchUsersByName(query: string, page: number = 1) {
        const totalPages: number = Math.ceil(
            (await this.UserModel.countDocuments().exec()) / this.offset
        );
        const data = await this.UserModel.find({
            firstName: { $regex: query, $options: "i" },
        })
            .skip(this.offset * (page - 1))
            .limit(this.offset)
            .exec();

        return {
            totalPages,
            page: page || 1,
            data,
        };
    }
}

export default new LeagueService();
