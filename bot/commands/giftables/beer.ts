import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot';
import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class BeerCommand extends GiftableCommand {
    public listenerID;
    public shortCode = "(?:beer|fosters)";
    protected statName = "beer";
    public constructor() {
        super();
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "What are we celebrating, if I might ask. :beers: ?",
            "Starting early as per usual I see " + username + " . :beers:",
            "You will not find a finest brew anywhere in the verse " + username + ". :beer:" + (hasT ? " you can thank " + originalUser.mention() + " for that one." : ""),
            ":beer: A Lot more left where that one came from. In case you develop a thirst " + username + (hasT ? " and or " + originalUser.mention() + " does." : "..."),
            "Here you go " + username + " :beer:" + (hasT ? " courtesy " + originalUser.mention() + "." : ""),
            "Maybe you should consider cutting on the beer dear " + username + ". But alas" + (hasT ? " I know " + originalUser.mention() + " is pressuring you, so" : ",") + " here you go :beer:",
            "I guess one more won't do much more damage " + username + " :beer:" + (hasT ? " But I *will* hold you responsible " + originalUser.mention() + " for any stain on the carpet." : ""),
            "Ask and you shall receive my dear " + username + ". :beers:",
            "This one's on the house! :beer:",
            "How about this instead? :sake:",
            "Cheers! :beers:",
        ];

        return pickRandom(messages);
    }
    public name = "Serve beer";
    public manual = "Serves beer.";
}