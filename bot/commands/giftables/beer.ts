import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class BeerCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "beer"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;
        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "What are we celebrating, if I might ask. :beers: ?",
            "Starting early as per usual I see "+username+" . :beers:",
            "You will not find a finest brew anywhere in the verse "+username+". :beer:" + (hasT ? " you can thank "+originalUser+" for that one." : ""),
            ":beer: A Lot more left where that one came from. In case you develop a thirst "+username+(hasT ? " and or "+originalUser+" does." : "..."),
            "Here you go "+username+" :beer:"+ (hasT ? " courtesy "+originalUser+"." : ""),
            "Maybe you should consider cutting on the beer dear "+username+". But alas"+(hasT ? " I know "+originalUser+" is pressuring you, so" : ",")+" here you go :beer:",
            "I guess one more won't do much more damage "+username+" :beer:"+(hasT ? " But I *will* hold you responsible "+originalUser+" for any stain on the carpet." : ""),
            "Ask and you shall receive my dear "+username+". :beers:",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));

        GiftablesHelper.updateStatsForGiftable("beer",originalUser,username);

    };
    public name = "Serve beer";
    public manual = "Serves beer.";
}