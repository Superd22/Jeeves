import { SakeCommand } from './giftables/sake';
import { DiceCommand } from './dice/dice';
import { PizzaCommand } from './giftables/pizza';
import { isUpCommand } from './isUp/is-up';
import { addKillCommand } from './kill/addKill';
import { SpectrumCommands } from 'spectrum-bot/lib/';
import * as Nedb from 'nedb';
import { aSpectrumCommand } from 'spectrum-bot/lib/';
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

import { config } from '../config/config'

export class JeevesCommands {
    // is there any better way than a static array?
    public static commands:aSpectrumCommand[] = [new isUpCommand(), new addKillCommand(), new removeKillCommand(), new topKillsCommand(),
    new coffeeCommand(), new StatCoffeeCommand(), new HelpCommand(), new TeaCommand(), new BeerCommand(), new WhenIsCommand(), new WineCommand(),
    new TopHatCommand(), new PizzaCommand(), new RulesCommand(), new addSaveCommand(), new countSaveCommand(), new removeSaveCommand(), new DiceCommand(),
    new SakeCommand()];
    private scCommands:SpectrumCommands = new SpectrumCommands();
    public constructor() {
        console.log("Creating commands with prefix trigger: " + config.commandTrigger);
        this.scCommands.setPrefix(config.commandTrigger);
        JeevesCommands.commands.forEach( command => {
            console.log("registering" + command.name);
            this.scCommands.registerCommand(command);
        });
    }
}

export let DbKills:Nedb = new Nedb({ filename: './bot/db/kills.db', autoload: true });
export let DbStats:Nedb = new Nedb({ filename: './bot/db/stats.db', autoload: true });
export let DbSaves:Nedb = new Nedb({ filename: './bot/db/saves.db', autoload: true });