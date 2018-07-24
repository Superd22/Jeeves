import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot';
import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class coffeeCommand extends GiftableCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "coffee";
    protected statName = "coffee";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "Certainly, would you like some sugar " + username + " :coffee: ?",
            "On my way " + username + " :coffee:, black as usual I assume ?",
            "I have it ready just the way you like " + username + ". :coffee:",
            "I know you would ask and took the liberty of making some as you were away. :coffee:",
            "The finest beans I know of, :coffee: made especially for you " + username + ".",
            "Here you go " + username + " :coffee: " + (hasT ? "Courtesy of the dear " + originalUser.mention() + "." : ""),
            "One hot :coffee: for you, dear " + username + "." + (hasT ? "Courtesy of the dear " + originalUser.mention() + "." : ""),
            ":coffee: Do call me back and I'll bring a second cup " + username,
            "Right on time as usual " + username + ". You'll find biscuits on the platter. :coffee:",
            "Ask and you shall receive my dear " + username + ". :coffee:",
        ];

        return pickRandom(messages);
    }

    public name = "Serve Coffee";
    public manual = "Serves coffee.";
}
