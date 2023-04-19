import FootballService from '@/services/footballAPI.service';
import Top5Leagues from '@/utils/database/leagues';

export default class Seeding {

    // TODO: this should get players from the football api and filter out the properties of each player that isn't needed then store them in our database
    public seedPlayers() {
        
        Top5Leagues.forEach(league => {
            const response = FootballService.getPlayers(league.toString()).then((res) => res.response);
            
        })
    }
}