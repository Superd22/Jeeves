import { Spectrum } from '../spectrum-bot/';
import { config } from './config/config';
import { JeevesCommands } from './commands/_.commands';

var bot = new Spectrum();

// Init the bot as user (you need to declare a config)
bot.initAsUser(config.username, config.password).then( (isConnected) => {
    let state = bot.getState();

    // Wait for internal state to be ready
    state.whenReady().then(() => {
        console.log("readyyy");
        // Get a community
        let global = state.getCommunityByName("Star Citizen");
        // Get a lobby in that community
        //let concierge = global.getLobbyByName("concierge");

        // Get events from Lobby
        //concierge.subscribe();

        console.log("euh");
        var commands = new JeevesCommands();        
    });
});
    