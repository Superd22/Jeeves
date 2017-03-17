import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class TopHatCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "top hat"+GiftablesHelper.optTarget+"$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        let username = GiftablesHelper.getTarget(message,matchs);
        let originalUser = message.member.displayname;

        let hasT = GiftablesHelper.hasTarget(matchs);

        let messages = [
            "Did you misplace your top hat again "+username+" ? :tophat:",
            "One should always carry his couvre-chef on oneself. :tophat: don't misplace that one  "+username,
            "We do not have an infinite supplies of those "+originalUser+"... "+( hasT ? "I expect you will be careful with that :tophat: "+username : "."+":tophat: Do take care of it..."),
            "The finest gift "+ (hasT ? "a Gentleman like "+originalUser+" could offer you " : "you could ask for ")+username+" :tophat: .",
        ];

        lobby.sendPlainTextMessage("[BOT] "+pickRandom(messages));
        DbStats.update({ stat: 'hatServed' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] Hat++");
        });

    };
    public name = "Serve a top hat";
    public manual = "Serves top hat.";
}
