import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbKills } from '../_.commands';
import { removeKillCommand } from './removeKill';

export class addKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill add @([^ ]*)";
    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<string>) => {
        if (!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        // Trim spaces in handle name
        matchs[1] = matchs[1].replace(" ", "").trim();

        if (matchs[1].toLowerCase().indexOf("azaral") > -1 && Math.random() > 0.3) {
            lobby.sendPlainTextMessage("[BOT] Sorry @azaral, you have cheated too many times.");
            return;
        }

        DbKills.insert({ handle: matchs[1], time: new Date().getTime() }, () => {
            DbKills.count({ handle: matchs[1] }, (err, count) => {
                lobby.sendPlainTextMessage("[BOT] +1 Kill for @" + matchs[1] + " (" + count + " kills)");
                removeKillCommand.canRemove = true;
            });
        });
    };
    public name = "KillCount - Add";
    public manual = "Adds a killcount to the specified handle";
}
