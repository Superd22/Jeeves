import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class TeaCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "tea$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = message.member.displayname;

        let messages = [
            "Certainly. :tea: ?",
            "Earl grey, Hot. As accustomed :tea:",
            "Oh you will certainly enjoy that cup. :tea:",
            "I know you would ask and took the liberty of making some as you were away. :tea:",
            "Here you go :tea:",
            "One hot :tea: for you, dear "+username+".",
            ":tea: Do mind the kettle as it is quite hot..",
            "Ask and you shall receive my dear "+username+". :tea:",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'teaServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Tea++");
        });

    };
    public name = "Serve tea";
    public manual = "Serves tea.";
}