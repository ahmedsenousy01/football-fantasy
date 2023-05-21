import { Types, SchemaTypes } from "mongoose";
import UserService from "@/services/user.service";
import PlayerService from "@/services/player.service";
import TeamInterface from "@/interfaces/team.interface";
import TeamModel from "@/models/Team";

class TeamService {
    private model: typeof TeamModel;

    constructor() {
        this.model = TeamModel;
    }

    public async GetTeam(id: string) {
        return await this.model.findById(id).populate("players", "-_id").exec();
    }

    public async GetTeamByUserId(id: string) {
        const user = await UserService.GetUser(id);
        return user?.team;
    }

    public async CreateTeam(Team: TeamInterface) {
        return (await this.model.insertMany(Team))[0];
    }

    public async CreateEmptyTeam() {
        const emptyTeam = {
            name: "main team",
            players: [],
        };
        return (await this.model.insertMany(emptyTeam))[0];
    }

    public async UpdateTeam(id: string, Team: TeamInterface) {
        return await this.model
            .findByIdAndUpdate({ _id: id }, Team, { new: true })
            .exec();
    }

    public async DeleteTeam(id: string) {
        return await this.model.findByIdAndRemove({ _id: id }).exec();
    }

    public async BuyPlayer(playerId: string, teamId: string, userId: string) {
        const team = await this.model
            .findById(teamId)
            .populate("players")
            .exec();
        const player = await PlayerService.GetPlayer(playerId);
        let user = await UserService.GetUser(userId);
        if (team) {
            const indexOfPlayer = team.players.findIndex((e) => {
                return (
                    (e as any)._id.toString() ===
                    new SchemaTypes.ObjectId(playerId).path
                );
            });
            if (indexOfPlayer === -1) {
                if (user && user.budget >= (player?.price || 0)) {
                    const updatedTeam = await this.model
                        .findByIdAndUpdate(
                            teamId,
                            {
                                $push: {
                                    players: new Types.ObjectId(playerId),
                                },
                            },
                            { new: true }
                        )
                        .populate("players")
                        .exec();
                    user = await UserService.UpdateUser(userId, {
                        budget: (user?.budget || 100000) - (player?.price || 0),
                    });
                    return {
                        status: true,
                        message: "player bought successfully",
                        data: { team: updatedTeam, newBudget: user?.budget },
                    };
                }
                return {
                    status: false,
                    message: "user budget not sufficient",
                    data: { team, newBudget: user?.budget },
                };
            }
            return {
                status: false,
                message: "player already bought",
                data: { team, newBudget: user?.budget },
            };
        }
        return {
            status: false,
            message: "error fetching team",
            data: null,
        };
    }

    public async SellPlayer(playerId: string, teamId: string, userId: string) {
        const team = await this.model
            .findById(teamId)
            .populate("players")
            .exec();
        const player = await PlayerService.GetPlayer(playerId);
        let user = await UserService.GetUser(userId);
        if (team) {
            const indexOfPlayer = team.players.findIndex((e) => {
                return (
                    (e as any)._id.toString() ===
                    new SchemaTypes.ObjectId(playerId).path
                );
            });
            if (indexOfPlayer !== -1) {
                const updatedTeam = await this.model
                    .findByIdAndUpdate(
                        teamId,
                        { $pull: { players: new Types.ObjectId(playerId) } },
                        { new: true }
                    )
                    .populate("players")
                    .exec();
                user = await UserService.UpdateUser(userId, {
                    budget: (user?.budget || 100000) + (player?.price || 0),
                });
                return {
                    status: true,
                    message: "player sold successfully",
                    data: { team: updatedTeam, newBudget: user?.budget },
                };
            }
            return {
                status: false,
                message: "player was not found in team",
                data: { team, newBudget: user?.budget },
            };
        }
        return {
            status: false,
            message: "error fetching team",
            data: null,
        };
    }
}

export default new TeamService();
