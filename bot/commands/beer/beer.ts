import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class BeerCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "beer$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = message.member.displayname;

        let messages = [
            "What are we celebrating, if I might ask. :beer: ?",
            "Starting early as per usual. :beers:",
            "You will not find a finest brew anywhere in the verse. :beer:",
            ":beer: A Lot more left where that one came from.",
            "Here you go :beer:",
            "Maybe you should consider cutting on the beer dear "+username+". But alas, here you go :beer:",
            "I guess one more won't do much more damage :beer:",
            "Ask and you shall receive my dear "+username+". :beers:",
            "This one's on the house! :beer:",
            "How about this instead? :sake:",
            "Cheers! :beers:",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'beerServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Beer++");
        });

    };
    public name = "Serve tea";
    public manual = "Serves tea.";
}
