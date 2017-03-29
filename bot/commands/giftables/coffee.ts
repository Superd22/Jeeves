import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class coffeeCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "coffee"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;
        let messages = [
            "Certainly, would you like some suggar "+username+" :coffee: ?",
            "On my way "+username+" :coffee:, black as usual I assume ?",
            "I have it ready just the way you like "+username+". :coffee:",
            "I know you would ask and took the liberty of making some as you were away. :coffee:",
            "The finest grain I know of, :coffee: made especially for you "+username+".",
            "Here you go "+username+" :coffee: "+(GiftablesHelper.hasTarget(matchs) ? "Courtesy of the dear "+originalUser+"." : ""),
            "One hot :coffee: for you, dear "+username+"."+(GiftablesHelper.hasTarget(matchs) ? "Courtesy of the dear "+originalUser+"." : ""),
            ":coffee: Do call me back and I'll bring a second cup "+username,
            "Right on time as usual "+username+". You'll find biscuits on the platter. :coffee:",
            "Ask and you shall receive my dear "+username+". :coffee:",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));

        GiftablesHelper.updateStatsForGiftable("coffee",originalUser,username);
    };
    public name = "Serve Coffee";
    public manual = "Serves coffee.";
}
