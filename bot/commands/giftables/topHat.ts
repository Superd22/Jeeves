import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot/lib/Spectrum/components/user.component';
import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class TopHatCommand extends GiftableCommand {
    public listenerID;
    public shortCode = "(?:top hat|tophat)";
    protected statName = "hat";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "Did you misplace your top hat again " + username + " ? :tophat:",
            "One should always carry his couvre-chef on oneself. :tophat: don't misplace that one  " + username,
            "We do not have an infinite supplies of those " + originalUser.mention() + "... " + (hasT ? "I expect you will be careful with that :tophat: " + username : "." + ":tophat: Do take care of it..."),
            "The finest gift " + (hasT ? "a Gentleman like " + originalUser.mention() + " could offer you " : "you could ask for ") + username + " :tophat: .",
            "" + (originalUser.getUser().displayname.toLowerCase() == "sharperifle" ? "I'll give it to you " + username + "... But you're still not classy enough." : "*gives a tophat to " + username + "*"),
        ];

        return pickRandom(messages);
    }
    public name = "Serve a top hat";
    public manual = "Serves top hat.";
}
