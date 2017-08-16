import { aBotCommand } from 'spectrum-bot/lib/';
import { receivedTextMessage } from 'spectrum-bot/lib/';
import { SpectrumLobby } from 'spectrum-bot/lib/';
import { aSpectrumCommand } from 'spectrum-bot/lib/';
import { DbKills } from '../_.commands';

export class removeUserKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill count @([^ ]*)";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        // Trim spaces in handle name
        matchs[1] = matchs[1].replace(" ", "").trim();

        DbKills.count({handle: matchs[1]}, (err, count) => {
            lobby.sendPlainTextMessage("[BOT] @"+matchs[1]+" has "+count+ " confirmed kills.");
        });
    };
    public name = "KillCount - count";
    public manual = "display the KillCount of an user";
}