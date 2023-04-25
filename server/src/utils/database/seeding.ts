import Player from "@/models/Player";
import FootballService from "@/services/footballAPI.service";
import Top5Leagues from "@/utils/database/leagues";

class Seeding {
    public async seedPlayers() {
        const leagueApiId: number = Top5Leagues.get("Ligue 1") || 0;

        for (let i = 27; i <= 40; i++) {
            const response = await FootballService.getPlayers(
                leagueApiId.toString(),
                "2022",
                i.toString()
            ).then((res) => res.response);
            console.log(response)

            for (const player of response) {
                const playerExists = await Player.findOne({
                    name: player.player.name,
                }).exec();
                if (!playerExists)
                    await Player.insertMany({
                        name: player.player.name,
                        age: player.player.age,
                        position: player?.statistics[0]?.games?.position,
                        picture: player.player.photo,
                        price: 0,
                        leagueId: "6444fb4b5eda8c2223b29b78",
                        statistics: {
                            games: {
                                current: null,
                                total: player?.statistics[0]?.games
                                    ?.appearences,
                            },
                            minutesPerGame: {
                                current: {
                                    "02/12/2022": 65,
                                    "07/12/2022": 75,
                                },
                                total: 1200,
                            },
                            goals: {
                                current: null,
                                total: player?.statistics[0]?.goals?.total,
                            },
                            assists: {
                                current: null,
                                total: player?.statistics[0]?.goals?.assists,
                            },
                            cards: {
                                yellow: {
                                    current: 0,
                                    total: player?.statistics[0]?.cards?.yellow,
                                },
                                red: {
                                    current: 0,
                                    total: player?.statistics[0]?.cards?.red,
                                },
                            },
                            defensive: {
                                current: {
                                    saves: null,
                                    penaltySaves: null,
                                    cleanSheets: null,
                                },
                                total: {
                                    saves: player?.statistics[0]?.goals?.saves,
                                    penaltySaves:
                                        player?.statistics[0]?.penalty?.saved,
                                    cleanSheets: null,
                                },
                            },
                            team: {
                                name: player?.statistics[0]?.team?.name,
                                logo: player?.statistics[0]?.team?.logo,
                            },
                        },
                    });
            }
        }
        console.log('done');
    }
}

export default new Seeding();