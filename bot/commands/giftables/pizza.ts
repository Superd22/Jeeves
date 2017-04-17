import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class PizzaCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "pizza"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;
        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "I need to get it my chest : I despise Sharpe42 . Now here is your pizza "+username,
            ":pizza: for you "+username+ (hasT ? " you can thank "+originalUser+" for that one." : ""),
            "I studied for years in an that old Italian restaurant to learn the perfect recipe :pizza: for you "+username+ (hasT ? " you can thank "+originalUser+" for that one though." : ""),
            "It seems someone found it funny to have a *pizza* delivered here for your name "+username+"... " + (hasT ? " why do i suspect "+originalUser+" ?" : ""),
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));

        GiftablesHelper.updateStatsForGiftable("pizza",originalUser,username);

    };
    public name = "Serve pizza";
    public manual = "Serves pizza.";
}