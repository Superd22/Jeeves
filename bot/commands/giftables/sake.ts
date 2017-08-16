import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot/lib/Spectrum/components/shared/user.component';
import { aBotCommand } from 'spectrum-bot/lib/';
import { receivedTextMessage } from 'spectrum-bot/lib/';
import { SpectrumLobby } from 'spectrum-bot/lib/';
import { aSpectrumCommand } from 'spectrum-bot/lib/';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class SakeCommand extends GiftableCommand {
    public listenerID;
    public shortCode = "(?:sake|japanese stuff)";
    protected statName = "sake";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        console.log("in do something sake");
        let messages = [
            "What are we celebrating, if I might ask. :sake: ?",
            "Starting early as per usual I see " + username + " . :sake:",
            ("Here you go " + username + " :sake: " + (hasT ? " courtesy " + originalUser.mention() + "." : "")),
            "Maybe you should consider cutting on the sake dear " + username + ". It's pretty heavy stuff...  But alas" + (hasT ? " I know " + originalUser.mention() + " is pressuring you, so" : ",") + " here you go :sake:",
            "This one's on the house! :sake:",
            "How about this instead? :beer:",
            "Cheers! :sake:",
        ];

        return pickRandom(messages);
    }
    public name = "Serve sake";
    public manual = "Serves sake.";
}