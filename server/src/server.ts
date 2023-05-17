import "module-alias/register";
import UserController from "@/controllers/user.controller";
import PlayerController from "@/controllers/player.controller";
import LeagueController from "@/controllers/league.controller";
import TeamController from "@/controllers/team.controller";
import SearchController from "@/controllers/search.controller";
import config from "@/core/config";
import App from "@/core/app";

new App(
    [
        UserController,
        PlayerController,
        LeagueController,
        TeamController,
        SearchController,
    ],
    config.port
);
