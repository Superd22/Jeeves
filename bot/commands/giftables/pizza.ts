import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot/lib/Spectrum/components/user.component';
import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class PizzaCommand extends GiftableCommand {
    public listenerID;
    public shortCode = "pizza";
    protected statName = "pizza";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "I need to get it my chest : I despise <scAPIM>@Sharpe42:17313</scAPIM>. Now here is your pizza " + username,
            ":pizza: for you " + username + (hasT ? " you can thank " + originalUser.mention() + " for that one." : ""),
            "I studied for years in an that old Italian restaurant to learn the perfect recipe :pizza: for you " + username + (hasT ? " you can thank " + originalUser.mention() + " for that one though." : ""),
            "It seems someone found it funny to have a :pizza: delivered here to your name " + username + "... " + (hasT ? " why do i suspect " + originalUser.mention() + " ?" : ""),
        ];

        return pickRandom(messages);
    }
    public name = "Serve pizza";
    public manual = "Serves pizza.";
}