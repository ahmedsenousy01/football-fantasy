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

    public async UpdatePlayer(
        id: string,
        player: {
            name?: string;
            points?: number;
            statistics?: any;
        }
    ) {
        return await this.model
            .findByIdAndUpdate({ _id: id }, player, { new: true })
            .exec();
    }

    public async DeletePlayer(id: string) {
        return await this.model.findByIdAndRemove({ _id: id }).exec();
    }

    public async CalculatePoints(id: string) {
        const player = await this.GetPlayer(id);
        let points = 0;
        switch (player?.position) {
            case "Midfielder": {
                points = this.calculatePointsForMidfielder(player);
                break;
            }
            case "Attacker": {
                points = this.calculatePointsForAttacker(player);
                break;
            }
            case "Defender": {
                points = this.calculatePointsForDefender(player);
                break;
            }
            case "Goalkeeper": {
                points = this.calculatePointsForGoalkeeper(player);
                break;
            }
        }
        return await this.UpdatePlayer(id, { points });
    }

    private calculatePointsForMidfielder(player: PlayerInterface) {
        let points = this.getGamesPlayedPoints(player);
        points += (player.statistics?.assists.current || 0) * 3;
        points += (player.statistics?.goals.current || 0) * 5;
        points += (player.statistics?.defensive.current.cleanSheets || 0) * 1;
        points -= (player.statistics?.cards.yellow.current || 0) * 1;
        points -= (player.statistics?.cards.red.current || 0) * 3;

        return points;
    }

    private calculatePointsForAttacker(player: PlayerInterface) {
        let points = this.getGamesPlayedPoints(player);
        points += (player.statistics?.assists.current || 0) * 3;
        points += (player.statistics?.goals.current || 0) * 4;
        points += (player.statistics?.defensive.current.cleanSheets || 0) * 4;
        points -= (player.statistics?.cards.yellow.current || 0) * 1;
        points -= (player.statistics?.cards.red.current || 0) * 3;

        return points;
    }

    private calculatePointsForDefender(player: PlayerInterface) {
        let points = this.getGamesPlayedPoints(player);
        points += (player.statistics?.assists.current || 0) * 3;
        points += (player.statistics?.goals.current || 0) * 6;
        points -= (player.statistics?.cards.yellow.current || 0) * 1;
        points -= (player.statistics?.cards.red.current || 0) * 3;

        points -= Math.floor(
            ((player.statistics?.defensive.current.goalsConceded || 0) * 1) / 2
        );

        return points;
    }

    private calculatePointsForGoalkeeper(player: PlayerInterface) {
        let points = this.getGamesPlayedPoints(player);
        points += (player.statistics?.assists.current || 0) * 3;
        points += (player.statistics?.goals.current || 0) * 6;

        points += (player.statistics?.defensive.current.cleanSheets || 0) * 4;
        points += (player.statistics?.defensive.current.penaltySaves || 0) * 5;
        points += Math.floor(
            ((player.statistics?.defensive.current.saves || 0) * 1) / 3
        );
        points -= Math.floor(
            ((player.statistics?.defensive.current.goalsConceded || 0) * 1) / 2
        );

        points -= (player.statistics?.cards.yellow.current || 0) * 1;
        points -= (player.statistics?.cards.red.current || 0) * 3;

        return points;
    }

    private getGamesPlayedPoints(player: PlayerInterface) {
        let points = 0;

        points += (player.statistics?.games.current || 0) * 1;
        Object.values(player.statistics?.minutesPerGame || {}).forEach(
            (minutes) => {
                if (minutes >= 60) points++;
            }
        );

        return points;
    }
}

export default new PlayerService();
