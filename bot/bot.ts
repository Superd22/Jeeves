import { JeevesTasksService } from './tasks/common/tasks.service';
import { Spectrum } from 'spectrum-bot/lib/';
import { config } from './config/config';
import { JeevesCommands } from './commands/_.commands';
import { APIServer } from './server/_.server';
import "reflect-metadata";
import { Service, Container } from "typedi";

@Service()
export class Jeeves {
    private _bot: Spectrum = new Spectrum();
    private _commands: JeevesCommands;
    private _server: APIServer;
    private _tasks: JeevesTasksService;
    public get bot() { return this._bot; }

    constructor() {
        // Init the bot as user (you need to declare a config)
        this.bot.initAsUser(config.username, config.password).then((isConnected) => {
            let state = this._bot.getState();

            // Wait for internal state to be ready
            state.whenReady().then(() => {
                this._commands = new JeevesCommands();
                this._server = new APIServer();
                this._tasks = Container.get(JeevesTasksService);
                
                // Get a community
                let global = state.getCommunityByName("Star Citizen");
                // Get a lobby in that community
                let concierge = global.getLobbyByName("concierge");

                // Get events from Lobby
                concierge.subscribe();
            });
        });

    }
}

const JeevesBot = Container.get(Jeeves);
