import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class WineCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "wine"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;

        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "Is the wine satisfactory "+username+" ? Shall I serve ? :wine_glass: ",
            "I know you have quite a palate "+username+". Do tell if that bottle "+ (hasT ? "courtesy of "+originalUser : ""+" is satisfactory."),
            "I took the liberty of opening a bottle of the old reserve. :wine_glass:"+ (hasT ? ", courtesy of "+originalUser : "") ,
            "It is one of the finest bottle we have, enjoy "+username+(hasT ? ". Courtesy of "+originalUser+" by the way." : ".") ,
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'wineServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Wine++");
        });

    };
    public name = "Serve wine";
    public manual = "Serves wine.";
}