import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbKills } from '../_.commands';

export class removeUserKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill count @(.*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        DbKills.count({handle: matchs[1]}, (err, count) => {
            lobby.sendPlainTextMessage("[BOT] @"+matchs[1]+" has "+count+ " confirmed kills.");
        });
    };
    public name = "KillCount - count";
    public manual = "display the KillCount of an user";
}