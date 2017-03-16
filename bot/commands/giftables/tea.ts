import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class TeaCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "tea"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;

        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "Certainly. Here you go "+username+" :tea: ",
            "Earl grey, Hot. As accustomed :tea:"+( hasT ? "courtesy of "+originalUser : ""),
            "Oh you will certainly enjoy that cup. :tea:"+ (hasT ? "Courtesy of "+originalUser : "" ),
            "I know you would ask and took the liberty of making some as you were away. :tea:",
            "Here you go "+username+" :tea:"+ (hasT ? "Courtesy of "+originalUser : ""),
            "One hot :tea: for you, dear "+username+"." + (hasT ? "Courtesy of "+originalUser : ""),
            ":tea: Do mind the kettle "+username+" as it is quite hot..",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'teaServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Tea++");
        });

    };
    public name = "Serve tea";
    public manual = "Serves tea.";
}