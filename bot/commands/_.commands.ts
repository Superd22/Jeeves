import { isUpCommand } from './isUp/is-up';
import { addKillCommand } from './kill/addKill';
import { SpectrumCommands } from '../../spectrum-bot/src/Spectrum/services/commands.service';
import * as Datastore from 'nedb';
import { aSpectrumCommand } from '../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { removeKillCommand } from './kill/removeKill';
import { topKillsCommand } from './kill/topKills';

export class JeevesCommands {
    public commands:aSpectrumCommand[] = [new isUpCommand(), new addKillCommand(), new removeKillCommand(), new topKillsCommand()];
    private scCommands:SpectrumCommands = new SpectrumCommands();
    public constructor() {
        console.log("constructing");
        this.scCommands.setPrefix("!jeeves");
        this.commands.forEach( command => {
            console.log("registering");
            this.scCommands.registerCommand(command);
        });
    }
}

export let DbKills:Datastore = new Datastore({ filename: './bot/db/kills.db', autoload: true });
