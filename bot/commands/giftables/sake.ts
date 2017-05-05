import { SpectrumUser } from 'spectrum-bot/lib/Spectrum/components/user.component';
import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class SakeCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "(?:sake|japanese stuff)" + GiftablesHelper.optTarget + "$";
    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<any>) => {

        let username = GiftablesHelper.getTarget(message, matchs);
        let originalUser = new SpectrumUser(message.member);
        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "What are we celebrating, if I might ask. :sake: ?",
            "Starting early as per usual I see " + username + " . :sake:",
            "Here you go " + username + " :sake:" + (hasT ? " courtesy " + originalUser.mention() + "." : ""),
            "Maybe you should consider cutting on the sake dear, it's pretty heavy stuff. " + username + ". But alas" + (hasT ? " I know " + originalUser.mention() + " is pressuring you, so" : ",") + " here you go :sake:",
            "This one's on the house! :sake:",
            "How about this instead? :beer:",
            "Cheers! :sake:",
        ];

        lobby.sendPlainTextMessage("[BOT] " + pickRandom(messages));

        GiftablesHelper.updateStatsForGiftable("sake", message.member.displayname, username);

    };
    public name = "Serve sake";
    public manual = "Serves sake.";
}