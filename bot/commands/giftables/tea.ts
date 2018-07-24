import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot';
import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class TeaCommand extends GiftableCommand {
    public listenerID;
    public shortCode = "tea";
    protected statName = "tea";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "Certainly. Here you go " + username + " :tea: ",
            "Earl grey, Hot. As accustomed :tea:" + (hasT ? "courtesy of " + originalUser.mention() : ""),
            "Oh you will certainly enjoy that cup. :tea:" + (hasT ? "Courtesy of " + originalUser.mention() : ""),
            "I know you would ask and took the liberty of making some as you were away. :tea:",
            "Here you go " + username + " :tea:" + (hasT ? "Courtesy of " + originalUser.mention() : ""),
            "One hot :tea: for you, dear " + username + "." + (hasT ? "Courtesy of " + originalUser.mention() : ""),
            ":tea: Do mind the kettle " + username + " as it is quite hot..",
        ];

        return pickRandom(messages);
    }
    public name = "Serve tea";
    public manual = "Serves tea.";
}