import PlayerInterface from "@/interfaces/player.interface";
import PlayerModel from "@/models/Player";

class PlayerService {
    private model: typeof PlayerModel;

    constructor() {
        this.model = PlayerModel;
    }

    public async GetPlayer(id: string) {
        return await this.model.findById(id).exec();
    }

    public async GetPlayersByLeagueId(id: string, page: number = 1) {
        const offset: number = 20;
        const totalPages: number = Math.ceil(
            (await this.model.countDocuments().exec()) / offset
        );
        const players = await this.model
            .find({ leagueId: id })
            .skip(offset * (page - 1))
            .limit(offset)
            .exec();

        return {
            page: {
                current: page || 1,
                total: totalPages,
            },
            results: players,
        };
    }

    public async CreatePlayer(player: PlayerInterface) {
        return await this.model.insertMany(player);
    }

    public async UpdatePlayer(id: string, player: PlayerInterface) {
        return await this.model
            .findByIdAndUpdate({ _id: id }, player, { new: true })
            .exec();
    }

    public async DeletePlayer(id: string) {
        return await this.model.findByIdAndRemove({ _id: id }).exec();
    }
}

export default new PlayerService();
