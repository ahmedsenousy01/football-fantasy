import config from "@/core/config";

class FootballService {
    private readonly apiURL: string = config.footballAPI.url;
    private readonly apiKey: string = config.footballAPI.key;

    public async getPlayers(leagueId: string, season: string = "2022", page: string = "1") {
        return fetch(
            `${this.apiURL}/players?league=${leagueId}&season=${season}&page=${page}`,
            {
                method: "GET",
                headers: {
                    "x-apisports-key": this.apiKey,
                },
            }
        ).then((response) => response.json());
    }

    public async getLeague(leagueId: string, season: string = "2022") {
        return fetch(
            `${this.apiURL}/leagues?id=${leagueId}&season=${season}`,
            {
                method: "GET",
                headers: {
                    "x-apisports-key": this.apiKey,
                },
            }
        ).then((response) => response.json());
    }
}

export default new FootballService();
