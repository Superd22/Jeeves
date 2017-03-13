import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class coffeeCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "coffee$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = message.member.displayname;

        let messages = [
            "Certainly, would you like some suggar :coffe: ?",
            "On my way :coffe:, black as usual I assume ?",
            "I have it ready just the way you like. :coffe:",
            "I know you would ask and took the liberty of making some as you were away. :coffe:",
            "The finest grain I know of, :coffe: made especially for you "+username+".",
            "Here you go :coffee:",
            "One hot :coffee: for you, dear "+username+".",
            ":coffee: Do call me back and i'll bring a second cup.",
            "Right on time as usual. You'll find biscuits on the platter. :coffee:",
            "Ask and you shall receive my dear "+username+". :coffe:",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'coffeeServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Coffee++");
        });

    };
    public name = "Serve Coffee";
    public manual = "Serves coffee.";
}