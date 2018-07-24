import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbKills } from '../_.commands';

export class countKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill count @([^ ]*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        countKillCommand.displayKillOfHandle(matchs[1], lobby);
    };

    public static getKillCountOfHandle(handle:string):Promise<any> {
       return new Promise( (resolve, reject) => {
        DbKills.count({handle: handle}, (err, count) => {
            if(err) reject(err);
            resolve(count);
        });
       });
        
    }

    public static displayKillOfHandle(handle:string, lobby:SpectrumLobby) {
        countKillCommand.getKillCountOfHandle(handle).then( (count) => {
            lobby.sendPlainTextMessage("[BOT] @"+handle+" has "+count+ " confirmed kills.");
        });
    }

    public name = "KillCount - count";
    public manual = "display the KillCount of an user";
}