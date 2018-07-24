import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { pickRandom } from '../common/pickRandom';

export class WhenIsCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "when (.*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {

        let m = [':soon:','Soon :tm:',':soon: :tm:', 'I just checked, and it\'s soon :tm: .'];


        lobby.sendPlainTextMessage("[BOT] "+pickRandom(m));
    };
    public name = "When will ?";
    public manual = "Fetches and return release date for feature.";
}