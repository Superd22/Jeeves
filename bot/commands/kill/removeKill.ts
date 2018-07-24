import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbKills } from '../_.commands';
import { countKillCommand } from './countKill';

export class removeKillCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "kill remove last$";
    public static canRemove = false;
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        if(!removeKillCommand.canRemove) {
            lobby.sendPlainTextMessage("[BOT] You can not remove anymore kills. You Cheeky Cheater ;)");
            return false;
        }
        
        DbKills.find(null).sort({ time: -1 }).limit(1).exec((err, docs: {_id:any, handle:any}[]) => {
            let last = docs[0];
            if(last) {
                DbKills.remove({_id: last._id}, {}, (err, numRemoved) => {
                    countKillCommand.getKillCountOfHandle(last.handle).then( (count) => {
                        lobby.sendPlainTextMessage("[BOT] Last kill removed, @"+last.handle+" now has "+count+" confirmed kills");
                        removeKillCommand.canRemove = false;
                    });
                });
            }
        });
    };
    public name = "KillCount - count";
    public manual = "display the KillCount of an user";
}