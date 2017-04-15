import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbSaves } from '../_.commands';

export class countSaveCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "save count @([^ ]*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) matchs[1] = message.member.nickname.toLowerCase();

        countSaveCommand.displayKillOfHandle(matchs[1], lobby);
    };

    public static getKillCountOfHandle(handle:string):Promise<any> {
       return new Promise( (resolve, reject) => {
        DbSaves.count({handle: handle}, (err, count) => {
            if(err) reject(err);
            resolve(count);
        });
       });
        
    }

    public static displayKillOfHandle(handle:string, lobby:SpectrumLobby) {
        countSaveCommand.getKillCountOfHandle(handle).then( (count) => {
            lobby.sendPlainTextMessage("[BOT] @"+handle+" has "+count+ " confirmed saves.");
        });
    }

    public name = "SaveCount - count";
    public manual = "display the chat-save count of an user";
}