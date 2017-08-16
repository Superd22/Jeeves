import { SpectrumUser } from 'spectrum-bot/lib/';
import { aBotCommand } from 'spectrum-bot/lib/';
import { receivedTextMessage } from 'spectrum-bot/lib/';
import { SpectrumLobby } from 'spectrum-bot/lib/';
import { aSpectrumCommand } from 'spectrum-bot/lib/';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class GiftableCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "";
    protected statName = "giftable";

    public constructor() {
    }

    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<any>) => {
        console.log(this.shortCode);
        console.log(matchs);
        let username = GiftablesHelper.getTarget(message, matchs);
        let hasT = GiftablesHelper.hasTarget(matchs); 
        let originalUser = new SpectrumUser(message.member);

        // If we have a target,
        if (!GiftablesHelper.hasTarget(matchs)) username = originalUser.mention();

        lobby.sendPlainTextMessage("[BOT] " + this.messageToSend(originalUser, username, message.member.displayname, hasT)); 
        GiftablesHelper.updateStatsForGiftable(this.statName, message.member.displayname, GiftablesHelper.getTarget(message, matchs));
    };

    /**
     * Register the short code for this giftable command
     */
    public registerShortCode(shortcode: string) {
        this.shortCode = shortcode + GiftablesHelper.optTarget + "$";
    }

    public messageToSend(originalUser: SpectrumUser, username: SpectrumUser | String, target: String, hasT: boolean) {

    }

    public name = "";
    public manual = "";
}
