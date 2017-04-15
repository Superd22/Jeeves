import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbSaves } from '../_.commands';

export class topSavesCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "save top(.*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {

        let str = "[BOT] Top 3 best chat saver ever :"
        let eng = ["1st", "2nd", "3rd"];

        topSavesCommand.getTopCount().then( (top) => {
            console.log(top);
            for(var i = 0; i < 3; i++) {
                let kill = top[i];
                str += "\n "+eng[i]+" @"+kill.handle+" ("+kill.count+" kills)";
            }

            lobby.sendPlainTextMessage(str);
        }).catch((err) => {
            lobby.sendPlainTextMessage("[BOT] Ooops. Small DB Error.");
        });
        
    };

    public static getTopCount():Promise<{handle:string, count:number}[]> {
        return new Promise((resolve, reject) => {
            DbSaves.find({}, (err, docs) => {
                if(err) reject(err);
                let killsTop = [];

                for(var i = 0; i < docs.length; i++) {
                    let kill = docs[i];

                    let pos = killsTop.findIndex( (killTab) => {
                        return killTab.handle === kill.handle;
                    });

                    if(pos >= 0) killsTop[pos].count++;
                    else killsTop.push({handle: kill.handle, count:1});
                }

                killsTop.sort(function(a, b) {
                    return b.count - a.count;
                });

                resolve(killsTop);
            });
        });        
    }
    public name = "SaveCount - count";
    public manual = "display the chat-save count of an user";
}