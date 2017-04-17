import { PizzaCommand } from './giftables/pizza';
import { isUpCommand } from './isUp/is-up';
import { addKillCommand } from './kill/addKill';
import { SpectrumCommands } from 'spectrum-bot/lib/Spectrum/services/commands.service';
import * as Datastore from 'nedb';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { removeKillCommand } from './kill/removeKill';
import { topKillsCommand } from './kill/topKills';
import { coffeeCommand } from './giftables/coffee';
import { StatCoffeeCommand } from './giftables/statCoffee';
import { HelpCommand } from './help/help';
import { TeaCommand } from './giftables/tea';
import { BeerCommand } from './giftables/beer';
import { WhenIsCommand } from './when/when';
import { TopHatCommand } from './giftables/topHat';
import { WineCommand } from './giftables/wine';
import { RulesCommand } from './rules/rules';
import { addSaveCommand } from './save/addSave';
import { countSaveCommand } from './save/countSave';
import { removeSaveCommand } from './save/removeSave';

export class JeevesCommands {
    public static commands:aSpectrumCommand[] = [new isUpCommand(), new addKillCommand(), new removeKillCommand(), new topKillsCommand(),
    new coffeeCommand(), new StatCoffeeCommand(), new HelpCommand(), new TeaCommand(), new BeerCommand(), new WhenIsCommand(), new WineCommand(),
    new TopHatCommand(), new PizzaCommand(), new RulesCommand(), new addSaveCommand(), new countSaveCommand(), new removeSaveCommand()];
    private scCommands:SpectrumCommands = new SpectrumCommands();
    public constructor() {
        console.log("constructing");
        this.scCommands.setPrefix("!jeeves");
        JeevesCommands.commands.forEach( command => {
            console.log("registering");
            this.scCommands.registerCommand(command);
        });
    }
}

export let DbKills:Datastore = new Datastore({ filename: './bot/db/kills.db', autoload: true });
export let DbStats:Datastore = new Datastore({ filename: './bot/db/stats.db', autoload: true });
export let DbSaves:Datastore = new Datastore({ filename: './bot/db/saves.db', autoload: true });