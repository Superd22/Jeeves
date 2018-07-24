import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class StatCoffeeCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "stat coffee$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        DbStats.find({ stat: 'coffeeServed'}, (err, docs) => {
            if(err || !docs[0]) {
                lobby.sendPlainTextMessage("[BOT] Ooops. Small DB issue...");
                return false;
            }


            let stat = docs[0];
            lobby.sendPlainTextMessage("[BOT] If you must know, I have served exactly "+stat.count+" coffees.\nAnd it has been my privilege.");
        });

    };
    public name = "Stats Coffee";
    public manual = "Stats for coffee usage.";
}