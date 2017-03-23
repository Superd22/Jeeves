import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbKills } from '../_.commands';
import { removeKillCommand } from './removeKill';

export class addKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill add @([^ ]*)";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        // Trim spaces in handle name
        matchs[1] = matchs[1].replace(" ", "").trim();

        DbKills.insert({handle: matchs[1], time: new Date().getTime()}, () => {
            DbKills.count({handle: matchs[1]}, (err, count) => {
                lobby.sendPlainTextMessage("[BOT] +1 Kill for @"+matchs[1]+" ("+count+" kills)");
                removeKillCommand.canRemove = true;
            });
        });
    };
    public name = "KillCount - Add";
    public manual = "Adds a killcount to the specified handle";
}