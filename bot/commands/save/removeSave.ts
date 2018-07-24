import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { DbSaves } from '../_.commands';
import { countSaveCommand } from './countSave';

export class removeSaveCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "save remove last$";
    public static canRemove = false;
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        
        if(!removeSaveCommand.canRemove) {
            lobby.sendPlainTextMessage("[BOT] You can not remove anymore saves. You Cheeky Cheater ;)");
            return false;
        }
        
        DbSaves.find(null).sort({ time: -1 }).limit(1).exec((err, docs: {_id:any, handle:any}[]) => {
            let last = docs[0];
            if(last) {
                DbSaves.remove({_id: last._id}, {}, (err, numRemoved) => {
                    countSaveCommand.getKillCountOfHandle(last.handle).then( (count) => {
                        lobby.sendPlainTextMessage("[BOT] Last save removed, @"+last.handle+" now has "+count+" confirmed saves");
                        removeSaveCommand.canRemove = false;
                    });
                });
            }
        });
    };
    public name = "SaveCount - count";
    public manual = "display the save-chat count of an user";
}